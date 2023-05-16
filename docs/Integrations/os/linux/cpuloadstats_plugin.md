# Monitor CPU Loads

cpuLoadStats Metric plugin is an agent-based plugin that collects the following CPU data

- Uptime

- Load average in 1 minute

- Load average in 5 minute

- Load average in 15 minute

- Normalized load in 1 minute

- Normalized load in 5 minute

- Normalized load in 15 minute

## Tested on

Centos: 7.x

RHEL: 7.x

Ubuntu: 14.x, 16.x

## Prerequisites

- [sfAgent](/docs/Quick_Start/getting_started#sfagent) must be installed

- The cpuLoadStats plugin requires sysstat to be installed

**To install Sysstat in CentOS/RHEL**

     sudo yum install sysstat

**To install Sysstat in Ubuntu OS**

     sudo apt install sysstat

# Configuring the agent

Add the configuration shown below to `config.yaml` under `/opt/sfagent/ directory`

Default config

     key: <profile_key> 
    tags: 
      Name: <name> 
      appName: <app_name> 
      projectName: <project_name> 
    metrics: 
      plugins: 
         - name: cpuLoadStats
           group_name: linux
           enabled: true

## Viewing data and dashboards

- Data collected by plugin can be viewed in SnappyFlow’s browse data section under metrics
  
  - `plugin=cpuLoadStats`
  - `documentType=cpuLoadStats`

- Dashboard of cpuLoadStats data can be rendered using `Template=Linux_CPULoad`
  
  
