# Monitor IIS Server on Windows

## Overview

IIS monitoring uses WMI query to fetch metrics aggregated across all of the sites, or on a per-site basis. IIS plugin collects metrics for active connections, bytes sent and received, request count by HTTP method, access-log and more.

## Pre-requisites

- Web IIS Server 8.0 or above 
- Performance counters should be enabled in IIS manager

## Configuration

Add the plugin configuration in config.yaml file under "C:\Program Files (x86)\Sfagent\" directory as follows to enable this plugin.

[sfAgent](/docs/Quick_Start/getting_started#sfagent) section provides steps to install and automatically generate plugin configurations. User can also manually add the configuration shown below to config.yaml under "C:/Program Files (x86)/Sfagent/" directory.

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

#### IIS Access Log Options

1. Geo-IP: Useful to find geographical location of the client using the IP address. To enable, set the option "geo_info" to true in the above configuration.
2. User-Agent Analysis: To get the host machine details like browser, Operating system and device by analysis the user-agent. To enable, set the option "ua_parser" to true in the above configuration. If enabled, by default it runs on port 8586.
3. URL Normalizer (not supported in container deployment): Normalize incoming URL paths. To enable, set the option "url_normalizer" to true in the above configuration. If enabled, by default it runs on port 8587. 

Normalization specific configuration is available in `/opt/sfagent/normalization/config.yaml` which resonate the following:

``` yaml
interval: 300
dynamic_rule_generation:
  enabled: true
  rules_length_limit: 1000 
  log_volume: 100000
rules: []
```

#### Config Field Description

**interval**: Normalization algorithm runtime interval.

**enabled**: Rely on normalization feature for rule generation.

**rules_length_limit**: Limit over size of generated rules. set the value to -1  for specifying no limit.

**log_volume**: Limit over number of logs processed. set the value to -1  for specifying no limit.

**rules**: Rules Generated.

Recommended approach is to run sfagent with *dynamic_rule_generation* enabled over a period of time. Observe whether rules generated reflect all the web app requests intended to be normalized and if its a true reflection, set *enabled* flag to *false* , indicating no further rules will be generated

Default ports used by user-agent analysis and URL Normalizer can be changed respectively with the inclusion of following in config.yaml

``` yaml
agent:
  uaparserport: port_number
  url_normalizer: port_number
```

#### Enhance URL Normalization

Refer the following document for comprehensive instructions and guidelines for setting up and developing rules to enhance URL normalization.

[Rule Development Guide and Setup Instructions](https://docs.google.com/document/d/1c1FWXYoAiXJa8ET9Uvq5N--nNQcwVjMGWyPbz38z0a4/edit) 

## Viewing data and dashboards

Dashboard for this data can be instantiated by Importing dashboard template `IIS` to the application dashboard. 