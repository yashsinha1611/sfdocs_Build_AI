# Installing SIEM Agent

## Pre-requisites

- Endpoints/nodes should be able communicate to SIEM Appliance

## Agent Installation

Run the following commands to install SIEM Agent on Linux VMs

```shell
wget https://raw.githubusercontent.com/snappyflow/apm-agent/master/siemagent_installer.sh -O siemagent_installer.sh
chmod +x siemagent_installer.sh
```

To start with the installation, follow the given command and provide SIEM Appliance's IP and provide values for `projectName`,`appName` and `Name`. `Name` is the host name and the `projectName` and `appName` are the project name and application name used on the Snappyflow portal.

```shell
sudo ./siemagent_installer.sh install <ip> <projectName> <appName> <instanceName>
```
:::caution

Providing tags are crucial for endpoints to appear under the correct Project and Application in SnappyFlow Portal.

::: 

## Validating Agent Installation

To validate connection between SIEM Appliance and SIEM Agent, check the following:
- Make sure SIEM Appliance's IP is updated in `/var/ossec/etc/ossec.conf` config file in SIEM Agent machine.
- Login to SIEM Appliance and run the command `sudo /var/ossec/bin/agent_control -lc`, it lists all the connected agents.



## File Integrity Monitoring (FIM) Configuration

The FIM module is part of the SIEM agent and it runs periodic scans of the system and stores the checksums and attributes of the monitored files in a local database. The module looks for the modifications by comparing the new files’ checksums to the old checksums. All detected changes are reported to the SIEM manager (SIEM Appliance).

The FIM synchronization is based on periodic calculations of integrity between the SIEM agent and the SIEM manager databases, updating in the SIEM manager only those files that are outdated, optimizing the data transfer of FIM. Anytime the modifications are detected in the monitored files and/or registry keys, an alert is generated.

By default, each SIEM agent has the syscheck enabled and preconfigured, but it is recommended to review and amend the configuration of the monitored host.

Configuration for FIM check i.e. `<syscheck>` is located in agent's config file `/var/ossec/etc/ossec.conf`. 

To change the frequency of periodic scans, follow the given steps: 
- Locate <syscheck\> block in the file and update frequency field to desired value. Unit of this Value is seconds. 
- Save the file and restart SIEM agent service
```shell
sudo ./siemagent_installer.sh restart
```





## Uninstalling the SIEM Agent

To uninstall the agent , run the following command:
```shell
sudo ./siemagent_installer.sh uninstall
```