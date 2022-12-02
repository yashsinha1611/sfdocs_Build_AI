# SIEM Appliance Setup

## Supported Cloud Platforms:

- Amazon Web Services: SnappyFlow SIEM Appliance is provided as an AMI in AWS marketplace.

## Pre-requisites

### AWS

#### Create Security Group

  1. Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/

  2. In the navigation pane, click Security Groups

  3. Click Create security group

  4. In the Basic details section, do the following:

    Enter a descriptive name and brief description for the security group.

  5. For VPC, click the VPC in which to create the security group. The security group can only be used in the VPC in which it is created

  6. Add security group rules now

    Add inbound rules:
    
    |    Type     | Protocol | Port      | Source       | Description             |
    | :---------- | :------- | :-------- | :----------- | :---------------------- |
    | Custom TCP  | TCP      | 1514-1515 | 0.0.0.0,::/0 | SIEM Manager and agent communication      |
    | SSH         | TCP      | 22        | 0.0.0.0,::/0 | sfgent configuration       |



## Launching SIEM Appliance

### AWS

1. Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/

2. In the navigation pane, click Instances

3. Click Launch Instance

4. Click on AWS Marketplace and search for `SnappyFlow SIEM Appliance`

5. Select SnappyFlow SIEM Appliance AMI

6. Read SnappyFlow SIEM Appliance usage policy in detail. Click continue to proceed

7. Select the instance type (Min Recommended: t2.small)

8. Configure security group:
    Use the security group created in the prerequisite step

9. Review changes before clicking launch

10. Click the SSH key pair and launch

SIEM Appliance Launch is complete now.

## Configure SIEM Appliance

- Login to SIEM Appliance using ssh

- Locate sfagent folder - `/opt/sfagent/` 

- Open config.yaml file

- Add Profile Key

  Provide the value for `key` field by copying profile key from "Profiles" section under "Manage" tab of your SnappyFlow cloud account or SnappyFlow server in case your hosting SnappyFlow in your own environment.

- Update the Project/ Application details
  
  Update the project name and app name under `projectName` and `appName` fields respectively.

- Save and close the `config.yaml` file.

- Restart the sfagent service by running the following command 
  ```bash
  service sfagent restart
  ```

## Getting SIEM Appliance IP address

The SIEM Appliance IP address will be used to configure SIEM agents. In AWS, the IP address is available under Instance Summary.

