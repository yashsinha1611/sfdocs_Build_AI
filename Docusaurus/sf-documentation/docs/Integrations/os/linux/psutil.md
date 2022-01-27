# PSUtil Monitoring

## Overview

PSUtil Metric plugin is an agent-based plugin that collects below data for each process running on the machine

- Process ID
- Username
- CPU (%)
- CPU time
- Memory (%)
- Resident Memory (%)
- Virtual Memory (%)
- Elapsed time
- Processor
- State Code

## Agent Configuration

Refer to [sfAgent](/docs/Quick_Start/getting_started#sfagent) section for steps to install and automatically generate plugin configurations. User can also manually add the configuration shown below to `config.yaml` under `/opt/sfagent/` directory

```yaml
key: <profile_key> 
tags: 
  Name: <name> 
  appName: <app_name> 
  projectName: <project_name> 
metrics: 
  plugins: 
    -name: psutil 
     enabled: true 
     interval: 60 
     config: 
       numprocess: 10 
       sortby: pcpu 
```

### Configuring parameters

:::note

You can configure plugin to collect top 10 process which used High CPU (%) as in sample configuration.

:::

- **numprocess**: Number of processes for which metrics have to be collected. Set `numprocess` to 0 or leave it empty to get metrics for all processes. Default is 15.
- **sortby**: Sorts the process by `sortby` field and selects the top N processes. Default value is pcpu. E.g. you can collect top 10 processes by CPU Util if the sortby field is pcpu. Possible values are,

  ```shell
  uname   - Username 
  pid     - ProcessId 
  psr     - Processor 
  pcpu    - CPUPercent 
  cputime - CPUTime 
  pmem    - Memory Percent 
  rsz     - Resident Memory 
  vsz     - Virtual Memory 
  etime   - Elapsed Time 
  s       - State code 
  ```

## Viewing data and dashboards

- Data collected by plugin can be viewed in SnappyFlow’s browse data section under metrics
  - `plugin= psutil`
  - `documentType = processStats`
- Dashboard of psutil data can be rendered using`Template= PSUTIL`

## Test Matrix

Centos: 7.x

RHEL: 7.x

Ubuntu: 14.x, 16.x

## See Also

- [Linux monitoring](/docs/integrations/os/linux/linux_os)
- [LSOF](/docs/integrations/os/linux/lsof)
- [NETSTAT](/docs/integrations/os/linux/netstat)
- [Custom plugins using StatsD](/docs/integrations/statsd/custom_monitoring)
- [Prometheus Integration](/docs/Integrations/kubernetes/prometheus_exporter)