# Tomcat Linux

## Overview

Tomcat server monitoring collect multiple types of metrics like server stats, context stats, jvm stats using Jolokia

## Pre-requisites

### JVM and JCMD
Tomcat Plugin is based on Jolokia agent which requires JMX monitoring to be enabled locally.
- JCMD command must be installed in the machine
- The JVM must have HotSpot enabled and be a JVM 1.6 or larger.

### Access Log Format

Tomcat server access log format needs to be modified to capture all metrics from the access logs, which includes following steps

- Edit the file $TOMCAT_HOME/conf/server.xml

- Set log format in *“org.apache.catalina.valves.AccessLogValve*” class, pattern value to pre-defined “combined” log format or

```
%h %l %u %t &quot;%r&quot; %s %b %D &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;
```

After changing log pattern to combined or the above mentioned pattern, sample log would look like:

```
49.206.1.85 - - [30/Jun/2020:13:12:32 +0000] "GET / HTTP/1.1" 200 11286 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
```


## Configuration

[sfAgent](/docs/Quick_Start/getting_started#sfagent) section provides steps to install and automatically generate plugin configurations. User can also manually add the configuration shown below to config.yaml under /opt/sfagent/ directory 

```yaml
key: <profile key> 
generate_name: true 
tags: 
  Name: <unique instance name or will be generated from IP> 
  appName: <add application name> 
  projectName: <add project name> 
metrics: 
  plugins: 
    - name: tomcat 
      enabled: true 
      interval: 300 
      config: 
        username: xxxx 
        password: xxxx
        documentTypes:
          - tomcatStats
          - requestProcessorStats
          - jvmStats
          - contextStats
logging: 
  plugins: 
    - name: tomcat-access 
      enabled: true 
      config: 
        geo_info: true  
        log_path: /opt/apache-tomcat*/logs/localhost_access_*.txt 
        ua_parser: false
        url_normalizer: false

```

Tomcat access log options:

  1. Geo-IP: Useful to find geographical location of the client using the IP address. To enable, set the option "geo_info" to true in the above configuration.
  2. User-Agent Analysis: To get the host machine details like browser, Operating system and device by analysis the user-agent. To enable, set the option "ua_parser" to true in the above configuration. If enabled, by default it runs on port 8586.
  3. URL Normalizer (not supported in container deployment): Normalize incoming URL paths. To enable, set the option "url_normalizer" to true in the above configuration. If enabled, by default it runs on port 8587. 

Normalization specific configuration is available in /opt/sfagent/normalization/config.yaml which resonate the following,

```yaml
interval: 300
dynamic_rule_generation:
  enabled: true
  rules_length_limit: 1000 
  log_volume: 100000
rules: []
```

#### Config Field Description

*interval*: Normalization algorithm runtime interval.

*enabled*: Rely on normalization feature for rule generation.

*rules_length_limit*: Limit over size of generated rules. set the value to -1  for specifying no limit.

*log_volume*: Limit over number of logs processed. set the value to -1  for specifying no limit.

*rules*: Rules Generated.

Recommended approach is to run sfagent with *dynamic_rule_generation* enabled over a period of time. Observe whether rules generated reflect all the web app requests intended to be normalized and if its a true reflection, set *enabled* flag to *false* , indicating no further rules will be generated

Default ports used by user-agent analysis and URL Normalizer can be changed respectively with the inclusion of following in config.yaml

```yaml
agent:
  uaparserport: port_number
  url_normalizer: port_number
```

:::note
1. Latitude and Longitude are often near the center of population. These values are not precise and should not be used to identify a particular address or household.
2. User-agent parsing requires high computation power. Recommended to enable only if needed and system have enough CPU resource available.
:::

## View Data and Dashboard

Tomcat server metrics `plugin=tomcat` consists of four document types:

- Tomcat stats: contain metrics like tomcat sever version, uptime, thread details.
- Request processor stats: shows request information like processing time, request count, data received and sent.
- Context stats: contain tomcat context related metrics like hit count, lookup count etc.
- JVM stats: contain all JVM related metrics used by tomcat server like garbage collection details, memory pools, loaded/unloaded classes etc.

Tomcat access logs come under metrics section on APM dashboard with `plugin=tomcat-access` and `documentType=tomcatAccessLogs`

- Dashboard for this data can be instantiated by Importing dashboard template `Tomcat_Server`, `Tomcat_Access` to the application dashboard.