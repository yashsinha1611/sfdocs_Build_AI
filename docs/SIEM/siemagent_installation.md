# Installing SIEM Agent

Use "siemagent_installer.sh" script for installing SIEM agent. Script is used to edit the file `/var/ossec/etc/ossec.conf` which contains all the configurations related to SIEM agent service.

## Pre-requisites

SIEM Appliance IP - should be visible to all the network devices. Based on agent's availability on the network , one can choose to provide private ip address also.

## Installation

Run the following commands to install SIEM Agent on VMs:

```shell
wget https://raw.githubusercontent.com/snappyflow/apm-agent/master/siemagent_installer.sh -O siemagent_installer.sh
chmod +x siemagent_installer.sh
```

To start with the installation, follow the given command and provide SIEM Appliance's IP and provide values for `projectName`,`appName` and `Name`. `Name` is the host name and the `projectName` and `appName` are the project name and application name used on the Snappyflow portal.

```shell
sudo ./siemagent_installer.sh install <ip> <projectName> <appName> <instanceName>
```

## Update Ip and labels/tags in SIEM Agent config

Use `update_ip` option to update SIEM Appliance's ip in agent's config using the below given format:

```shell
sudo ./siemagent_installer.sh update_ip <ip>
```

Use `update_tags` option to update tags in agent's config using the below given format:

```shell
sudo ./siemagent_installer.sh update_tags <projectName> <appName> <instanceName>
```

## Uninstalling the SIEM Agent

To uninstall the agent , run the following command:
```shell
sudo ./siemagent_installer.sh uninstall
```

To see more options, run the script with `--help` option:
```shell
sudo ./siemagent_installer.sh --help
```
Refer "SIEM Agent Installer User Guide" for complete usage of the script.


## Validating connection

To validate connection between SIEM Appliance and SIEM Agent, check the following:
- Make sure SIEM Appliance's IP is updated in `/var/ossec/etc/ossec.conf` config file in SIEM Agent machine.
- Login to SIEM Appliance and run the command `sudo /var/ossec/bin/agent_control -lc`, it lists all the connected agents.

## FIM(File Itegrity Monitoring) Configuration

The FIM module is located in the SIEM agent, where it runs periodic scans of the system and stores the checksums and attributes of the monitored files in a local FIM database. The module looks for the modifications by comparing the new files’ checksums to the old checksums. All detected changes are reported to the manager(SIEM Appliance).

The FIM synchronization is based on periodic calculations of integrity between the SIEM agent and the SIEM manager databases, updating in the SIEM manager only those files that are outdated, optimizing the data transfer of FIM. Anytime the modifications are detected in the monitored files and/or registry keys, an alert is generated.

By default, each SIEM agent has the syscheck enabled and preconfigured, but it is recommended to review and amend the configuration of the monitored host.

Configuration for FIM check i.e. `<syscheck>` is located in Wazuh agent's config file `/var/ossec/etc/ossec.conf`. 

To change the frequency of periodic scans, follow the given steps: 
- Locate \<syscheck\> block in the file and update frequency field to desired value. Unit of this Value is seconds. 
- Save the file and restart SIEM agent service
```shell
sudo ./siemagent_installer.sh restart
```
