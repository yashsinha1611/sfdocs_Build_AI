# Monitoring File Stats using fileStats Plugin

# 

fileStats Metric plugin is an agent-based plugin that collects the following data

- system allocated file handles

- system file allocated unused handles

- system max file handles

- system used file handles

- system used file handles percentage

- system free inodes

- system inodes in use

- system total inodes

- system used inodes
  
  ​

## Tested on[​](http://localhost:3000/docs/Integrations/os/linux/cpuloadstats_plugin#tested-on "Direct link to heading")

Centos: 7.x

RHEL: 7.x

Ubuntu: 14.x, 16.x

## Prerequisites - Install sysstat command

- [sfAgent](/docs/Quick_Start/getting_started#sfagent) must be installed

- The cpuLoadStats plugin requires sysstat to be installed

To install Sysstat in CentOS/RHEL:

     sudo yum install sysstat

To install Sysstat in Ubuntu OS:

     sudo apt install sysstat

# Agent Configuration

Add the configuration shown below to `config.yaml` under `/opt/sfagent/ directory`

Default config

     key: <profile_key> 
    tags: 
      Name: <name> 
      appName: <app_name> 
      projectName: <project_name> 
    metrics: 
      plugins: 
         - name: fileStats
           group_name: linux
           enabled: true

## Viewing data and dashboards

- Data collected by plugin can be viewed in SnappyFlow’s browse data section under metrics
  
  - `plugin=fileStats`
  - `documentType=fileStats`

- Dashboard of fileStats data can be rendered using `Template= Linux`
  
  ​