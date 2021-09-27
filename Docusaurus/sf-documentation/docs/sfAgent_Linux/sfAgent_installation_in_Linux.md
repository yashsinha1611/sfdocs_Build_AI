--- 
sidebar_postion: 7
---

# sfAgent Installation in Linux

Monitoring of applications running on VM or bare-metal requires installation of a lightweight sfAgent. sfAgent provides following features: 

- Discovery of services
- Auto-recommendation of monitoring configuration based on discovered services
- Monitoring of various services based on specified configurations 
- Log parsing and collection
- Orchestration of tracing (check out sfTracing for details)

## Supported Platforms

- ubuntu 18 lts 
- ubuntu 16 lts 
- centos 7 
- RHEL 7

## Installation

Run the following commands to install sfAgent on VMs: 

```shell
wget https://raw.githubusercontent.com/snappyflow/apm-agent/master/install.sh -O install.sh
chmod +x install.sh
sudo ./install.sh
```



:::note
sfAgent executes commands such docas iostat or jcmd to fetch metrics. In order to specific path to sfAgent use -p or --include-paths

<p><b>Example</b>: '"./install.sh -p /opt/jdk1.8.0_211/bin/"'</p>
:::

To install sfAgent on multiple end-points using Ansible playbook, refer the following script at https://github.com/snappyflow/apm-agent 

## Pre-requisites 

sfAgent requires certain pre-requisites for monitoring. Common pre-requisites are mentioned below. Further, all pre-requisites and configurations needed for monitoring a specific application are mentioned under <u>Integrations</u> section.

- For Linux OS monitoring, install iostat

  ```shell
  sudo apt-get install sysstat
  ```

  or

  ```shell
  sudo yum install sysstat 
  ```

- For JVM monitoring, install java headless service for jcmd & jmap command

  ```shell
  sudo apt-get install –y openjdk-12-jdk-headless
  ```

  or

  ```shell
  sudo yum -y install  java-1.8.0-openjdk-devel-1.8.0*
  ```

  

## Configure sfAgent

sfAgent is configured through its config.yaml file. There are sections for metrics and logs where appropriate plugins with their configurations have to added to these sections. Below is an example: 

```yaml
key: <add profile key here> 
generate_name: true 
tags: 
  Name: <add name tag> 
  appName: <add application name tag> 
  projectName: <add project name tag> 
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
        log_path: /var/log/auth.log,/var/log/messages,/var/log/secure 
    - name: nginx-access 
      enabled: true 
      config: 
        geo_info: true 
        log_path: /var/log/nginx/access.log, /var/log/nginx/access_log 
        ua_parser: true 
    - name: nginx-error 
      enabled: true 
      config: 
        log_level: 
          - emerg 
          - alert 
          - error 
        log_path: /var/log/nginx/error.log, /var/log/nginx/error_log 
```

sfAgent can be either configured or manually. In an automatic configuration step, sfAgent discovers services running in a VM and automatically generates a default configuration for monitoring the discovered services. User can further modify the  configurations as needed. Detailed configuration for a specific application types are present in <u>Integrations</u> section.

Follow the steps below for automatic discovery & configuration

<iframe width="570" height="321" src="https://www.youtube.com/embed/9CvPvMd3udk?rel=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

- Run following commands to discover services and generate config:

  ```shell
  sudo su 
  cd /opt/sfagent 
  ./sfagent -generate-config 
  cp config-generated.yaml config.yaml
  ```

- Add the profile key and SnappyFlow tags in the configuration file.

  - Copy profile key from SnappyFlow and update "**key:**" 
  - Set values for "**Name:**", "**appName:**", "**projectName:**" under "**tags:**" section 
  - <p>Verify configuration and restart sfAgent</p>

  ```shell
  ./sfagent -check-config 
  service sfagent restart 
  ```

## Upgrade sfAgent

Run following commands to upgrade sfAgent:

```shell
wget https://raw.githubusercontent.com/snappyflow/apm-agent/master/install.sh -O install.sh 
chmod +x install.sh 
sudo ./install.sh --upgrade 
```

