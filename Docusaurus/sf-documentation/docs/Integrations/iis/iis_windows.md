# IIS Windows

## Overview

IIS monitoring uses WMI query to fetch metrics aggregated across all of the sites, or on a per-site basis. IIS plugin collects metrics for active connections, bytes sent and received, request count by HTTP method, access-log and more.

## Pre-requisites

- Web IIS Server 8.0 or above 
- Performance counters should be enabled in IIS manager

## Configuration

Add the plugin configuration in config.yaml file under "C:\Program Files (x86)\Sfagent\" directory as follows to enable this plugin


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
    - name: iis 
      enabled: true 
      interval: 300
logging: 
  plugins: 
    - name: iis-access 
      enabled: true 
      config: 
        log_path: /log/filepath 
        ua_parser: false
        url_normalizer: false  

```

##### IIS Access Log Options:

  1. User-Agent Analysis: To get the host machine details like browser, Operating system and device by analysis the user-agent. To enable, set the option "ua_parser" to true in the above configuration. If enabled, by default it runs on port 8586.
  2. URL Normalizer (not supported in container deployment): Normalize incoming URL paths. To enable, set the option "url_normalizer" to true in the above configuration. If enabled, by default it runs on port 8587. 

## Viewing data and dashboards

Dashboard for this data can be instantiated by Importing dashboard template `IIS` to the application dashboard. 