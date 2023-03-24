# Monitoring File Stats using fileStats Plugin

# 

The fileStats Metric plugin is an agent-based plugin that collects the following data

- system allocated file handles

- system file allocated unused handles

- system max file handles

- system used file handles

- system used file handles percentage

- free inodes for each mounted directory

- total inodes for each mounted directory

- used inodes for each mounted directory

- used inodes percentage for each mounted directory

  

## Tested on[​](http://localhost:3000/docs/Integrations/os/linux/cpuloadstats_plugin#tested-on "Direct link to heading")

Centos: 7.x

RHEL: 7.x

Ubuntu: 14.x, 16.x

## Prerequisites - Install sysstat command

- [sfAgent](/docs/Quick_Start/getting_started#sfagent) must be installed

- The fileStats plugin requires sysstat to be installed

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
  - `documentType=fileStats` and `documentType=inodeStats`

- Dashboard of fileStats data can be rendered using `Template= Linux_CPULoad` 
  
- Alert of fileStats data can be rendered using  `Template= HighInodeUsage` 
