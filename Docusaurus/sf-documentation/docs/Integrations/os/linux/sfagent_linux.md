# sfAgent Installation on Linux

## Overview

sfAgent is a lightweight agent installed on VMs to collect metrics, logs and tracing data.

## Tested on

- Ubuntu 16 LTS, 18 LTS, 20 LTS 
- Centos 7, 8 
- RHEL 7, 8.5

## Pre-requisites 

sfAgent requires certain pre-requisites for monitoring. Common pre-requisites are mentioned below. Further, all pre-requisites and configurations needed for monitoring a specific application are mentioned under [Integrations](/docs/integrations/overview) section.

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



## Installation

Run the following commands to install sfAgent on VMs: 

```shell
wget https://raw.githubusercontent.com/snappyflow/apm-agent/master/install.sh -O install.sh
chmod +x install.sh
sudo ./install.sh
```


:::info
sfAgent executes commands such as iostat or jcmd to fetch metrics. If the utilities are not included in the PATH variable or not installed in the default location, use -p or --include-paths to add PATH in sfAgent.


**Example**:

```shell
./install.sh -p /opt/jdk1.8.0_211/bin/
```

:::

To install sfAgent on multiple end-points using Ansible playbook, refer the following script at https://github.com/snappyflow/apm-agent 

## Configuration

sfAgent can be either configured manually or automatically. In an automatic configuration step, sfAgent discovers services running in a VM and automatically generates a default configuration for monitoring the discovered services. User can further modify the  configurations as needed. Check [Configuration format](/docs/integrations/os/linux/sfagent_linux#sfagent-configuration-format) for more details. Detailed configuration for a specific application types are present in [Integrations](/docs/integrations/overview) section.

Follow the steps below for automatic discovery & configuration

<iframe title="Automatic discovery & configuration" width="570" height="321" src="https://www.youtube.com/embed/9CvPvMd3udk?rel=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen"></iframe>

- Run following commands to discover services and generate config:

  ```shell
  sudo su 
  cd /opt/sfagent 
  ./sfagent -generate-config 
  cp config-generated.yaml config.yaml
  ```

- Add the profile key and SnappyFlow tags in the configuration file (`config.yaml`).

  - Copy profile key from SnappyFlow and update `key:` 
  
  - Set values for `Name:`, `appName:`, `projectName:` under `tags:` section. `Name:` is the host name and the `projectName:`  and `appName:` are the project name and application name used on the Snappyflow portal.

  - Verify configuration and restart sfAgent
  
    ```shell
    ./sfagent -check-config 
    service sfagent restart 
    ```

:::note

sfAgent log file is present in the path `/var/log/sfagent/sfagent.log`.

:::

## Upgrade sfAgent on Linux

Run following commands to upgrade sfAgent:

```shell
wget https://raw.githubusercontent.com/snappyflow/apm-agent/master/install.sh -O install.sh 
chmod +x install.sh 
sudo ./install.sh --upgrade 
```


## sfAgent Configuration Format

sfAgent is configured through its `config.yaml` file. There are sections for metrics and logs where appropriate plugins with their configurations have to added to these sections. sfAgent config is expected in the following format: 

```yaml
key: <add profile key here> 
generate_name: true 
tags: 
  Name: <add name tag> 
  appName: <add application name tag> 
  projectName: <add project name tag> 
metrics: 
  plugins: 
    - name: <metric-plugin> 
      enabled: true 
      interval: <time in secs> 
logging: 
  plugins: 
    - name: <logger-plugin>
      enabled: true 
      config: 
        log_level: 
          - list
          - of
          - log
          - levels 
        log_path: <comma separated log paths> 
```

:::info 

### Uninstallation
Run the following commands to uninstall sfAgent on VMs: 

```shell
wget https://raw.githubusercontent.com/snappyflow/apm-agent/master/uninstall.sh -O uninstall.sh
chmod +x uninstall.sh
sudo ./uninstall.sh
```

:::