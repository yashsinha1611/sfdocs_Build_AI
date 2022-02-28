# Custom Monitoring using StatsD

## Overview

StatsD is a popular standard for developing infrastructure and application plugins. A wide suite of standard plugins are available from Statsd community and can be accessed [here](https://github.com/statsd/statsd/wiki#client-implementations)



sfAgent Statsd plugin integrates to Statsd client in the following way: 

- Runs a daemon to listen to UDP port for data being sent by statsd client and accumulates all metrics being sent in the last N seconds (called flushinterval) 
- Translates the data from statsd format to SnappyFlow’s format 
- Forwards the data to SnappyFlow with necessary tags 

## Prerequisites

- Create a rules file for a statsd client or contact [support@snappyflow.io](mailto:support@snappyflow.io) to create the rules file for a specific statsd client. 

## Configuration

User can also manually add the configuration shown below to `config.yaml` under `/opt/sfagent/` directory 

```yaml
key: <profile_key> 
tags: 
  Name: <name> 
  appName: <app_name> 
  projectName: <project_name> 
metrics: 
  plugins: 
    - name: statsd 
      enabled: true 
      config: 
        port: 8125 
        flushinterval: 30 
        ruleFile: /path/to/statsd-rules/file 
```

**port**: The UDP port on which statsd client sends metrics. sfAgent runs a statsd server listening on this port for the UDP datagrams. Default value is 8125. 

**flushInterval**: SnappyFlow’s statsd plugin collects all the metrics received in the last N seconds and sends the data to SnappyFlow as a single document  

**ruleFile**: User generated statsd rules file path or please contact support@snappyflow.io to create a rule file for a specific statsd client.

## Operating Instructions 

Validate the statsd configuration and the rules. It is mandatory to run this command after any change is made in the statsd rules file, followed by restarting the sfAgent service. 

```shell
sudo /opt/sfagent/sfagent -check-statsd
```

## Creating Rules File

- statsd metrics are expected in the format shown below

  ```
  namespace.prefix.[type.]metric:value|metricType
  ```

  **Example**

  ```
  ClusterA.Kafka1.Topic1.Lag:500|g
  ```

  In this case,

  ```
  namespace= ClusterA,
  prefix= Kafka1,
  type= Topic1,
  metric= Lag,
  value= 500,
  metricType= g(gauge)
  ```

  

- The field `type` is optional. If this field is present, it will enforce a nested json else the resulting json will be flat 

  **Example**

  ```
  Kafka1.General.numTopic:5|g
  ```

  In this case,

  ```
  namespace= Kafka1,
  prefix= General,
  metric= numTopic,
  value= 5,
  metricType= g (gauge)
  ```

  `namespace`= `Kafka1`,
  `prefix`= `General`,
  `metric`= `numTopic`,
  `value`= `5`,
  `metricType`= `g` (gauge)



:::note

In special cases where namespace is not present and the metrics start directly with prefix, set `namespace`: `none`. 

Supported datatypes are `float`, `double`, `long`, `integer`. 

:::







### Rule to create nested json: "NESTED" 

**Syntax**

```
<json_key> = NESTED(namespace: <namespace>, prefix: <prefix_name>, key: <type_key>, metric: [<list of metrics along with datatypes>])
```

`<json_key>`: key of the final nested json. 

`<namespace>`: This rule is applied to all metrics having this namespace 

`<prefix>`: This rule is applied to all metrics having this prefix. 

`<key>`: adds a key:value pair in the nested json 

`<metric>`: Specify all the metrics to collect for this prefix.

**Example**

```
DB.host1.disk1.readLatency:20|g 
DB.host1.disk1.writeLatency:50|g 
```

**Rule**

```
latency = NESTED(namespace: DB, prefix: host1, key: diskName, metric:[readLatency:float, writeLatency:float]) 
```

**Output**

```json
"latency": [ 
{ 
   "diskName": disk1, 
   "readLatency":20, 
   "writeLatency": 50 
}, 
{ 
   "diskName": disk2, 
   "readLatency":25, 
   "writeLatency": 45 
} 
 ] 
```

### Rule to create flat json: "FLAT" 

**Syntax**

```
<json_key> = FLAT(namespace: <namespace>, prefix: <prefix_name>, metric: <metric_name>) 
```

`<namespace>`: This rule is applied to all metrics having this namespace 

`<prefix>`: This rule is applied to all metrics having this prefix. 

`<metric>`: Specify all the metrics to collect for this prefix. 

 **Example**

```
Kafka1.System.cpuutil:10|g,
Kafka1.System.ramutil:20|g,
```

**Rule**

```
computeMetrics = FLAT(namespace: Kafka1, prefix: System, metric: [cpuutil:float, ramutil:float]) 
```

**Output**

```
"cpuutil": 10, 
“ramutil”:20 
```

### "RENDER" Rule: 

Extraction rules mentioned above, extract a set of metrics from statsd datagrams. These extracted metrics are grouped together in documents and shipped to SnappyFlow. Render rules describe grouping of metrics into documentType 

**Syntax**

```
RENDER(_documentType: <doctype>, m1, m2,…mn) where m1..mn can be metric names or Rule names 
```

**Example**

RENDER(documentType: system, computeMetrics, latency) will create a documentType       

```json
{ 
plugin: statsd 
documentType: system 
"cpuutil": 10, 
“ramutil”: 20 
"latency": [ 
 		{ 
 		"diskName": disk1, 
 	 	"readLatency":20, 
 		"writeLatency": 50 
 		}, 
        { 
 	 	 “diskName”: disk2, 
 	 	 “readLatency”:25, 
 	 	 “writeLatency”: 45 
 		} 
 		] 
} 
```



## Tagging 

sfAgent statsD plugin is capable of parsing and forwarding the tags contained in the statsd metric datagrams. Tags are expressed in different formats based on the intended destination being Datadog, Influx or Graphite.  

 

Add TAGTYPE rule in the statsd rules file to enable the parsing. Default TAGTYPE is **None** i.e. no custom tags present. In each of the formats below, the tags are recognized and passed forward into SnappyFlow documents 

- TAGTYPE = Datadog

  Sample metric:

  ```
  Cluster1.kafka1.cpuUtil:35|c|#_tag_appName:testApp1,_tag_projectName:apmProject,_documentType:cpuStats
  ```

- TAGTYPE = Influx

  Sample metric:

  ```
  Cluster1.Kafka1.cpuUtil,_tag_appName=testApp1,_tag_projectName=apmProject,_documentType=cpuStats:35|c
  ```

- TAGTYPE = Graphite

  Sample metric:

  ```
  Cluster1.Kafka1.cpuUtil;_tag_appName=testApp1;_tag_projectName=apmProject;_documentType=cpuStats:35|c
  ```

  



## Sidekiq Use-case

This section shows to monitor sidekiq using statsd with sfAgent. 

### Description 

We will use a simple ruby on rails application which shows endangered sharks’ data. 

- There are two sidekiq worker configured, one to add the data and another to remove the sharks data named as `AddEndangeredWorker` and `RemoveEndangeredWorker` respectively. 
- Sidekiq statsd client is also configured to get the metrics. 
- For this example, [sidekiq-statsd](https://github.com/phstc/sidekiq-statsd) by phstc is used as the client. 

### Installation 

Skip this part if the statsd client is already configured. 

1. Follow this [documentation to setup the ruby on rails application](https://www.digitalocean.com/community/tutorials/how-to-add-sidekiq-and-redis-to-a-ruby-on-rails-application), if needed
2. To add the statsd client: 
   1. Create a new file sidekiq.rb under config/initializers/ and add the [configuration specified here](https://github.com/phstc/sidekiq-statsd#configuration). 
   2. Install the [sidekiq-statsd gem](https://github.com/phstc/sidekiq-statsd" /l "installation) and run the application. 

### Sample Metrics 

Metrics are generated upon worker activation in the application. 

1. Add endangered worker metrics

   ```
   production.worker.AddEndangeredWorker.processing_time:1113|ms
   production.worker.AddEndangeredWorker.success:1|c
   production.worker.enqueued:0|g
   production.worker.retry_set_size:0|g
   production.worker.processed:69|g
   production.worker.failed:0|g
   production.worker.queues.default.enqueued:0|g
   production.worker.queues.default.latency:0|g
   ```

2. Remove endangered worker metrics

   ```
   production.worker.RemoveEndangeredWorker.processing_time:1472|ms
   production.worker.RemoveEndangeredWorker.success:1|c
   production.worker.enqueued:0|g
   production.worker.retry_set_size:0|g
   production.worker.processed:107|g
   production.worker.failed:0|g
   production.worker.queues.default.enqueued:0|g
   production.worker.queues.default.latency:0|g
   ```

### Rules

Follow the Rules User Guide section to understand the rules. 

```
TAGTYPE = None

worker = NESTED(namespace: production, prefix: worker, key: worker_name, metric:[processing_time:double, success:float])

queues = NESTED(namespace: production, prefix: worker.queues, key: queue_name, metric:[enqueued:float, latency:float])

processedJobs = FLAT(namespace: production, prefix: worker, metric: processed:integer)

RENDER(_documentType: sidekiq, worker, queues, processedJobs)
```

### sfAgent Configuration

Content of the `/opt/sfagent/config.yaml`. The rules file is `/opt/sfagent/statsd-rules.txt`

```yaml
key: <profile_key>
tags:
  Name: <instance-name>
  appName: <app-name>
  projectName: <project-name>
metrics:
  plugins:
  - name: statsd
      enabled: true
      config:
        port: 8125
        flushInterval: 10
        ruleFile: '/opt/sfagent/statsd-rules.txt'
```

Output

```yaml
{
  "_documentType": "sidekiq",
  "_tag_Name": "vm",
  "queues": [
    {
      "latency": 0,
      "queue_name": "default",
      "enqueued": 0
    }
  ],
  "_plugin": "statsD",
  "processedJobs": 107,
  "worker": [
    {
      "processing_time": 1472,
      "worker_name": "RemoveEndangeredWorker",
      "success": 1
    },
    {
      "processing_time": 1113,
      "worker_name": "AddEndangeredWorker",
      "success": 1
    }
  ],
  "_tag_projectName": "statsDProject",
  "_tag_uuid": "080027957dd8",
  "time": 1616132931981,
  "_tag_appName": "statsDApp"
}
```

 

## See Also 

[Linux monitoring](/docs/integrations/os/linux/linux_os)

[LSOF](/docs/integrations/os/linux/lsof)

[NETSTAT](/docs/integrations/os/linux/netstat)

[Prometheus Integration](/docs/Integrations/kubernetes/prometheus_exporter) 
