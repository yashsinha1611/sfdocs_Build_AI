# LSOF (List of Open Files)

## Overview

LSOF (list open files) Metric plugin collects data for number of files opened by a process of different file descriptor types. 

## Prerequisite -  Install lsof Command

`lsof` command needs to be installed before running this plugin.

To install lsof in Centos / RHEL

```shell
sudo yum install lsof
```

To install lsof in Ubuntu

```shell
sudo apt-get install lsof
```

To verify installation, run the below command. 

```shell
lsof -v
```

Expected output: 

```shell
lsof version information: 
    revision: 4.87 
    latest revision: ftp://lsof.itap.purdue.edu/pub/tools/unix/lsof/ 
    latest FAQ: ftp://lsof.itap.purdue.edu/pub/tools/unix/lsof/FAQ 
    latest man page: ftp://lsof.itap.purdue.edu/pub/tools/unix/lsof/lsof_man 
    constructed: Tue Oct 30 16:28:19 UTC 2018 
    constructed by and on: mockbuild@x86-01.bsys.centos.org 
    compiler: cc 
    compiler version: 4.8.5 20150623 (Red Hat 4.8.5-36) (GCC) 
    compiler flags: -DLINUXV=310000 -DGLIBCV=217 -DHASIPv6 -DHASSELINUX -D_FILE_OFFSET_BITS=64 -D_LARGEFILE64_SOURCE -DHAS_STRFTIME -DLSOF_VSTR="3.10.0" -O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic 
    loader flags: -L./lib -llsof  -lselinux 
    system info: Linux x86-01.bsys.centos.org 3.10.0-693.17.1.el7.x86_64 #1 SMP Thu Jan 25 20:13:58 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux 
```

:::note

version may vary depending upon the Linux distribution. 

:::

## Agent Configuration

 

Refer to [sfAgent](/docs/Quick_Start/getting_started#sfagent) section for steps to install and automatically generate plugin configurations.  User can also manually add the configuration shown below to `config.yaml` under `/opt/sfagent/` directory 

```yaml
key: <profile_key> 
tags: 
  Name: <name> 
  appName: <app_name> 
  projectName: <project_name> 
metrics: 
  plugins: 
    - name: lsof 
      enabled: true 
      interval: 600 
      config: 
        completeStats: false 
        numProcess: 5 
        sortFilter: DIR 
```

### Configuration Details

 LSOF plugin runs in two different modes: **summary** and **complete stats**. 

- In **summary** mode, plugin returns only the count of files open of each file descriptor type (like DIR, CHR, REG etc.) at an aggregate level. Set `completeStats: false` for summary mode 
- In **completeStats** mode, plugin returns the entire list of open files in the machine, process wise along with the process id. Set `completeStats: true` for this mode. Since the list of all opened files can be huge in number, plugin is by default configured in summary mode 

Other configuration parameters include: 

- **numProcess**: Number of top N processes with maximum number of files opened. For example, if `numProcess` is set to 5, it returns top 5 process stats with maximum number of files opened. Set `numProcess` to 0 to get all process details. Default value is 10. 
- **sortFilter**: Selection of top N processes only for a particular file descriptor type. Following are the options available: `none`, `CHR`, `DIR`, `REG`, `FIFO`, `IP`, `netlink`, `socket`, `a_inode`. Default value is `none`. For example, to get top 10 processes with maximum directories opened, `numProcess` should be set to 10 and `sortFilter` as `DIR`. Set `sort filter` to none if no sorting is required. 

 

:::note

All the traffic related (IPv4, IPv6) file types are combined as *IPv4/6* type and unix sockets into *socket* type

:::

## Viewing data and dashboards 

 

- Data collected by plugins can be viewed in SnappyFlow’s browse data section under metrics section
  - plugin: lsof 
  - documentType: lsofSummary, lsofstats 
  - Dashboard template: LSOF 

 

## Test Matrix 

 

- Centos: 7.x 

- RHEL: 7.x 

- Ubuntu: 14.x, 16.x 

   


## See Also 

 

- [Linux monitoring](/docs/integrations/os/linux/linux_os)
- [PSUTIL](/docs/integrations/os/linux/psutil)
- [NETSTAT](/docs/integrations/os/linux/netstat)
- [Custom plugins using StatsD](/docs/integrations/statsd/custom_monitoring)
- [Prometheus Integration](/docs/Integrations/kubernetes/prometheus_exporter) 

