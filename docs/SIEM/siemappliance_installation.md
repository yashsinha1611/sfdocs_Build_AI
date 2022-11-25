# SIEM Appliance Setup

## Supported Cloud Platforms:

- AWS(Amazon Web Services): "SnappyFlow SIEM Appliance" AMI is provided in AWS marketplace.

## Pre-requisites

### Create AWS Security Group

  1. Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/

  2. In the navigation pane, click Security Groups

  3. Click Create security group

  4. In the Basic details section, do the following:

    Enter a descriptive name and brief description for the security group.

  5. For VPC, click the VPC in which to create the security group. The security group can only be used in the VPC in which it is created

  6. Add security group rules now

    Add inbound rules:

    |    Type     | Protocol | Port      | Source       | Description    |
    | :---------- | :------- | :-------- | :----------- | :------------- |
    | Custom TCP  | TCP      | 1514-1515 | 0.0.0.0,::/0 | siem tcp       |
    | SSH         | TCP      | 22        | 0.0.0.0,::/0 | siem ssh       |


## Launching SIEM Appliance
1. Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/

2. In the navigation pane, click Instances

3. Click Launch Instance

4. Click on AWS Marketplace and search for SnappyFlow SIEM Appliance

5. Select SnappyFlow SIEM Appliance AMI

6. Read SnappyFlow SIEM Appliance usage policy and detail. Click continue to proceed

7. Select the instance type (Min Recommended: t2.medium )

8. Configure security group:
    Click the security group created in the prerequisite step

9. Review changes before clicking launch

10. Click the SSH key pair and launch

SIEM Appliance Setup is complete now.

## Configure SIEM Appliance

- Login to SIEM Appliance using ssh.

- Locate sfagent folder - `/opt/sfagent/` 

- [sfAgent](/docs/Quick_Start/getting_started#sfagent) section provides steps to automatically generate plugin configurations. User can also manually add the configuration shown below to config.yaml under `/opt/sfagent/` directory

- Add Profile Key:

  Copy profile key from "Profiles" section under "Manage" tab of your SnappyFlow SaaS account or SnappyFlow server.

- Add `wazuh-siem` logging plugin in `config.yaml` file as given below:

```yaml 
logging: 
  plugins: 
    - name: wazuh-siem
      enabled: true 
      config: 
        log_path: /var/ossec/logs/alerts/alerts.json
```
- Close and save the `config.yaml` file.

- Restart the sfagent service by running the following command 
```bash
service sfagent restart
```