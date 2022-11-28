# SIEM - Security Information and Event Management

## Overview

The SIEM (Security Information and Event Management) feature in SnappyFlow offers a simplified interface to log, track and analyze security events in your environment. Logging and tracking these security events are critical to achieving and maintaining compliance to standards like SOC2, HIPAA etc. Improve threat detection, standards compliance and security incidence management with real-time and historical event data.

### What's monitored

- System level events via `syslog`
- File integrity (New file additions, modifications and deletions)

All system level events and file integrity changes are logged and categorized into different threat levels in SnappyFlow. Alerts are generated and notified on preferred channels to enable IT admins and analysts for immediate remediation and investigation. 



### Supported Compliance Standards

- Payment Card Industry Data Security Standard (PCI DSS)

- General Data Protection Regulation (GDPR)

- NIST Special Publication 800-53 (NIST 800-53)

- Good Practice Guide 13 (GPG13)

- Trust Services Criteria (TSC SOC2)

- Health Insurance Portability and Accountability Act (HIPAA)

- Rules also include MITRE ATT&CK framework, which is used for alerts taxonomy and to provide better security context.

&nbsp;

### Supported Platforms

#### Endpoints

- Ubuntu
- CentOS
- Windows (Coming Soon)

#### SIEM Appliance

- AWS
- Azure (Coming Soon)
- Google Cloud (Coming Soon)

## SnappyFlow SIEM Architecture

SnappyFlow uses a low footprint agent, called `SIEM Agent` to collect system level events from the endpoints that are to be monitored. This `SIEM Agent` sends the data to SnappyFlow UI via the SIEM Appliance. 



![image](images/Architecture-Diagram.jpg)



### SIEM Agent

The SIEM agent is multi-platform and runs on the hosts that are to be monitored for security events. It communicates with the SIEM manager, sending data in near real time through an encrypted and authenticated channel. [Steps to install SIEM Agent](./siemagent_installation.md)

### SIEM Appliance

The SIEM Appliance is a dedicated server that collects and analyzes data from the deployed [SIEM Agents](#siem-agent). It triggers alerts when threats or anomalies are detected.  It is also used to manage the agents' configuration remotely and to monitor their status. [Steps to setup SIEM Appliance](./siemappliance_installation.md)

#### 

## SIEM Dashboard

The SIEM Tab is available under the application dashboard in SnappyFlow. [SIEM Dashboard](./SIEM_Dashboard.md)

### Summary pane

The Summary Pane provides a summary view of of all events captured by [severity level](./SIEM_events.md/#siem-eventsrules), source and is organized by compliance type. 

![image](images/doc1.png)



### Node Details Pane

This pane provides source wise statistics of all SIEM events. Events can be filtered by source and by compliance type.

![image](images/doc2.png)

### File Integrity Pane

This pane provides a summary of changes to File integrity for a given source i.e endpoint. 

![image](images/doc3.png)

&nbsp;
&nbsp;

