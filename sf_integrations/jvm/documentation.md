# Java 

## Linux

### JVM

JVM Metric plugin is an agent-based plugin which is used to collect jvm statistics of the specified Java process. It uses jstats command to retrieve the statistics. It collects the jvm arguments passed to the java process. It also is used to monitor any deadlocks that occurs in java process. Jolokia will be started internally by plugin for deadlock metric collection if monitorDeadlocks is set. Apply JVM Dashboard for metrics visualization.

###### Prerequisites

JVM plugin requires jcmd to be installed on the target machine

###### Configuration Settings

Add the plugin configuration in config.yaml file under /opt/sfagent/ directory as follows to enable this plugin

```
name: jvm
enabled: true
interval: 60
config:
       process: *
       heapInterval: 3600
       monitorDeadlocks: false
       deadLockMonitoringInterval: 300
       monitorCpuProfiling: false
       cpuProfilingInterval: 300
       stackTraceLimit: 25
       monitorMemoryProfiling: false
       memoryProfilingInterval: 300
```

Plugin collects jvm statistics of the specified Java process using jstats command. It collects the jvm arguments passed to the java process. It also is used to monitor any deadlocks that occurs in java process. Apply JVM Dashboard for metrics visualization.

###### Configuring parameters

`process` process that needs to be monitored.

`heapInterval` polling interval to collect the jvm arguments passed to the process.

`monitorDeadlocks` Flags used to enable/disable deadlock monitoring.

`deadLockMonitoringInterval*` polling interval for deadlock monitoring.

`monitorCpuProfiling` Flag used to enable CPU profiling

`cpuProfilingInterval` polling interval for CPU profiling monitoring.

`stackTraceLimit` limit for stack trace data

`monitorMemoryProfiling` Flag used to enable Memory profiling

`memoryProfilingInterval` polling interval for Memory profiling monitoring.

###### Documents

Use JVM dashboard to analysis the performance with collected metrics. It also provide the ability to generate heapdump of a given process using below command: ./sfagent –heapdump JAVA_PROCESS_NAME

### JVMJolokia

JVMJolokia Metric plugin is an agent-based plugin which is used for Java Runtime monitoring. It returns the Java Virtual Machine (JVM) runtime metrics exposed as MBean's attributes through jolokia REST endpoint to detect application performance issues.

###### Prerequisites

JVM Jolokia plugin requires jolokia agent to be deployed on the target machine and it should expose on configured port.

###### Sample configurations refer to jolokia

Let’s assume after successful configuration, agent is reachable under http://localhost:8778/jolokia/version/ , while accessing this URL (provide username and password if configured) you should get response similar to the below one.

```
{
  "request": {
    "type": "version"
  },
  "value": {
    "agent": "1.6.2",
    "protocol": "7.2",
    "config": {
      "listenForHttpService": "true",
      "maxCollectionSize": "0",
      "authIgnoreCerts": "false",
      "agentId": "192.168.1.167-34190-55cfe2ae-servlet",
      "agentType": "servlet",
      "policyLocation": "classpath:/jolokia-access.xml",
      "agentContext": "/jolokia",
      "mimeType": "text/plain",
      "discoveryEnabled": "false",
      "streaming": "true",
      "historyMaxEntries": "10",
      "allowDnsReverseLookup": "true",
      "maxObjects": "0",
      "debug": "false",
      "serializeException": "false",
      "detectorOptions": "{}",
      "dispatcherClasses": "org.jolokia.http.Jsr160ProxyNotEnabledByDefaultAnymoreDispatcher",
      "maxDepth": "15",
      "authMode": "basic",
      "authMatch": "any",
      "canonicalNaming": "true",
      "allowErrorDetails": "true",
      "realm": "jolokia",
      "includeStackTrace": "true",
      "useRestrictorService": "false",
      "debugMaxEntries": "100"
    },
    "info": {
      "product": "tomcat",
      "vendor": "Apache",
      "version": "9.0.24"
    }
  },
  "timestamp": 1582224539,
  "status": 200
}
```

###### Configuration Settings

Add the plugin configuration in config.yaml file under /opt/sfagent/ directory as follows to enable this plugin

```
name: jvmjolokia
enabled: true
interval: 300
config:
username: admin
password: admin
protocol: http
port: 8778
context: jolokia
```

Plugin collects JMX metrics from an HTTP endpoint using Jolokia's JSON over HTTP and supports jolokia configured with HTTP Basic Authentication. Apply JVM_Jolokia Dashboard for metrics visualization.
Configuring parameters

username: username configured in jolokia used for authentication.

password: Password Used for authentication

protocol: HTTP protocol to use. Should be either http or https. Default value is http

port: Port in which HTTP server is listening. Default port is 8778

context: this is used to compose jolokia URL. Default context value is “jolokia”
Documents

Use JVM_Jolokia dashboard to analysis the performance with collected metrics.

## Windows

###### Prerequisites

JDK 8 or above
java must be there in the %PATH environment variable 

###### Configuration Settings

Add the plugin configuration in config.yaml file under "C:\Program Files (x86)\Sfagent" directory as follows to enable this plugin

```
name: winjvm
enabled: true
interval: 300
config:
       process: App1 App2
       monitorDeadlocks: false
       deadLockMonitoringInterval: 300
       monitorThreadDumps: true
       threadDumpInterval: 300
       ip: 127.0.0.1
       protocol: http
       context: jolokia
```

###### Configuring parameters

`process` Process that needs to be monitored.
`monitorDeadlocks` Flag used to enable/disable deadlock monitoring.
`deadLockMonitoringInterval` Polling interval for deadlock monitoring.
`monitorThreadDumps` Flag used to enable/disable threaddump monitoring.
`threadDumpInterval` Polling interval for threaddump monitoring.

## Linux



