# Tomcat Windows

## Overview

Tomcat monitoring involves metrics like server stats, context stats, jvm stats using Jolokia, and the server access logs.

## Pre-requisites

### Enabling JMX Monitoring
Tomcat Plugin is based on Jolokia agent which requires JMX monitoring to be enabled locally.
- Copy the jolokia.war file from "C:/Program Files (x86)/Sfagent/" to ${TOMCAT_HOME}/webapps
- Add jolokia as role in tomcat-users.xml (mandatory for Jolokia 1.6 or later).
```
  <role rolename="jolokia"/>
  <user username="jolokia" password="<password>" roles="jolokia"/>
```

- Restart the Tomcat server
- Verify the Jolokia agent installation by accessing the URL: http://`address`:`port`/jolokia/version.
  The result looks similar to this:
  ```json
  {
  "request": {
    "type": "version"
  },
  "value": {
    "agent": "1.3.7",
    "protocol": "7.2",
    "config": {
      "maxCollectionSize": "0",
      "agentId": "10.152.24.99-29844-172f5788-servlet",
      "debug": "false",
      "agentType": "servlet",
      "serializeException": "false",
      "detectorOptions": "{}",
      "dispatcherClasses": "org.jolokia.jsr160.Jsr160RequestDispatcher",
      "maxDepth": "15",
      "discoveryEnabled": "false",
      "canonicalNaming": "true",
      "historyMaxEntries": "10",
      "includeStackTrace": "true",
      "maxObjects": "0",
      "debugMaxEntries": "100"
    },
    "info": {
      "product": "tomcat",
      "vendor": "Apache",
      "version": "8.5.23"
    }
  },
  "timestamp": 1509955465,
  "status": 200
}
  ```

### Access Log Format
Tomcat server access log format needs to be modified to capture all metrics from the access logs, which includes following steps

- Edit the file $TOMCAT_HOME/conf/server.xml

- Set suffix *"org.apache.catalina.valves.AccessLogValve*" class, pattern value to ".log"

- Set log format in *"org.apache.catalina.valves.AccessLogValve*" class, pattern value to pre-defined "combined" log format or

```
%h %l %u %t &quot;%r&quot; %s %b %D &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;
```

After changing log pattern to combined or the above mentioned pattern, sample log would look like:

```
49.206.1.85 - - [30/Jun/2020:13:12:32 +0000] "GET / HTTP/1.1" 200 11286 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
``` 

## Configuration Settings

[sfAgent](/docs/Quick_Start/getting_started#sfagent) section provides steps to install and automatically generate plugin configurations. User can also manually add the configuration shown below to config.yaml under "C:/Program Files (x86)/Sfagent/" directory 

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
        port: 8080
        proxy: false 
        rmiport: 9000
        protocol: http
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
        log_path: "C:\\Program Files\\Apache Software Foundation\\Tomcat*\\logs\\localhost_access*.log"
        geo_info: true  
        ua_parser: false
        url_normalizer: false 
```
:::note
Keep username and password same as jolokia role updated in tomcat-users.xml.
:::

#### Tomcat Access Logger Options

  1. Geo-IP: Useful to find geographical location of the client using the IP address. To enable, set the option "geo_info" to true in the above configuration.
  2. User-Agent Analysis: To get the host machine details like browser, Operating system and device by analysis the user-agent. To enable, set the option "ua_parser" to true in the above configuration. If enabled, by default it runs on port 8586.
  3. URL Normalizer (not supported in container deployment): Normalize incoming URL paths. To enable, set the option "url_normalizer" to true in the above configuration. If enabled, by default it runs on port 8587. 

## Viewing data and dashboards

Tomcat plugin provides the following document types:

- Tomcat stats: contain metrics like tomcat sever version, uptime, thread details.
- Request processor stats: shows request information like processing time, request count, data received and sent.
- Context stats: contain tomcat context related metrics like hit count, lookup count etc.
- JVM stats: contain all JVM related metrics used by tomcat server like garbage collection details, memory pools, loaded/unloaded classes etc.
- Tomcat Access: Tomcat server access log details.

Dashboard for this data can be instantiated by Importing dashboard template `Tomcat_Server`, `Tomcat_Access` to the application dashboard. 
