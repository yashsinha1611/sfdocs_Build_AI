# Monitoring Linux OS

## Overview

OS monitoring is the most commonly needed and most important aspect of monitoring. SnappyFlow provides a comprehensive monitoring of Linux OS through multiple plugins. 

 

- Linux base metric plugin provides following data: 
  - CPU Static and Dynamic Metrics 
  - Memory Metrics 
  - Disk IO Metrics 
  - Network IO Metrics 
  - TCP Metrics 
- Syslog logging plugin 

## Configuration

Refer to [sfAgent](/docs/Quick_Start/getting_started#sfagent) section for steps to install and automatically generate plugin configurations. User can also manually add the configuration shown below to `config.yaml` under `/opt/sfagent/` directory

```yaml
key: <profile_key> 
tags: 
  Name: <name> 
  appName: <app_name> 
  projectName: <project_name> 
metrics: 
  plugins: 
    - name: linux 
      enabled: true 
      interval: 30 
logging: 
  plugins: 
    - name: linux-syslog 
      enabled: true 
      config: 
        log_level: 
          - error 
          - warning 
          - info 
        log_path: /var/log/syslog,/var/log/auth.log,/var/log/messages,/var/log/secur 
```



## Viewing data and dashboards

 

- Data collected by plugins can be viewed in SnappyFlow’s browse data section under metrics or logs or trace depending on the plugin 
- Linux metrics data

  - `plugin= linux` 
  - documentType 
    - `cpu_static` 
    - `cpu_util`
    -  `ram_util` 
    -  `disk_stats` 
    -  `nic_stats` 
    -  `tcp_stats` 
- Syslog data
  - `plugin= linux-syslog` 
  - `documentType= syslog` 


## Test Matrix

 

- Centos: 7.x 

- RHEL: 7.x 
- Ubuntu: 14.x, 16.x 

 

## See Also

 

- [LSOF](/docs/integrations/os/linux/lsof) 
- [PSUTIL](/docs/integrations/os/linux/psutil) 
- [NETSTAT](/docs/integrations/os/linux/netstat) 
- [Custom plugins using StatsD](/docs/integrations/statsd/custom_monitoring) 
- [Prometheus Integration](/docs/Integrations/kubernetes/prometheus_exporter) 
