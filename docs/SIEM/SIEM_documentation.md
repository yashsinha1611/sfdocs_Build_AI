# SIEM (Security Information and Event Management)

## Overview

SIEM (Security Information and Event Management) offers analysis of events related to security, tracking and logging of security data.  This data can be used for compliance purposes. SIEM is a security solution that helps organizations recognize potential security threats and vulnerabilities before they have a chance to disrupt business operations.

If the system detects any threats the real-time alerts are generated and delivered to the SnappyFlow directly for remediation and further investigation. SIEM system makes it possible for analysts to take action on attacks on a quick basis. It can prevent a potential decrease in your Mean time to detect and respond too. It will also be able to reduce the time that a threat actor is in your environment.

Below are the screenshots of SIEM Dashboard.


![image](images/doc1.png)

![image](images/doc2.png)

![image](images/doc3.png)


## SIEM Appliance

The SIEM Appliance collects and analyzes data from the deployed Wazuh agents. It triggers alerts when threats or anomalies are detected.  It is also used to manage the agents' configuration remotely and to monitor their status. [Steps to setup SIEM Appliance](./siemappliance_installation.md)

## SIEM Agent

The SIEM agent is multi-platform and runs on the hosts that the user wants to monitor. It communicates with the SIEM manager, sending data in near real time through an encrypted and authenticated channel. [Steps to install SIEM Agent](./siemagent_installation.md)

Supported platforms: Ubuntu, CentOS

## SIEM Dashboard

The SIEM Tab is available under the application dashboard in SnappyFlow. [SIEM Dashboard](./SIEM_Dashboard.md)
