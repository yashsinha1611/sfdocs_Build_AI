---
sidebar_label: Monitoring Windows Instances
---

# Monitoring Windows Instances

## Overview

Monitoring of Windows based application requires installation of a lightweight agent, sfAgent on Windows. sfAgent provides following features:

- Monitoring of various services based on specified configurations
- Log parsing and collection
- Trace Java, Python and Golang applications (check out sfTracing for details)

## Supported Platforms

- Windows Server 2012
- Windows Server 2016
- Windows Server 2019

## Install sfAgent on Windows

1. Download the sfAgent executable from the link below

   <html>
   <body>

   <p><a href="https://github.com/snappyflow/apm-agent-windows/releases/latest/download/SfagentSetup.exe">Dowload sfAgent</a></p>
   </body>
   </html>


2. Run sfAgent.exe executable with Administrator privileges and complete the installation

   ![img](/img/sfagent_windows/1.png)

   ![img](/img/sfagent_windows/2.png)

   ![img](/img/sfagent_windows/3.png)


## Configure sfAgent on Windows

- Navigate to sfAgent installed location (C:\Program Files (x86)\sfAgent)
- Open file sample.yaml
- Add Key and edit configuration for metrics and logger
- Save it and rename sample.yaml as config.yaml

## Prerequisites

- Powershell.exe must be available in %PATH environment variable
- For winjvm plugin, java should be installed and java path should be set in %PATH environment variable

## Run sfAgent service

- Open task manager and service tab
- Search for service “sfAgent” and right click on it and click start to start service
- To stop right click on running service and click stop

## Standard Plugins and Log Parsers

sfAgent for Windows includes plugins and log parsers for a number of standard applications and operating system utilities.

| Category                               | Services                                                     |
| :------------------------------------- | :----------------------------------------------------------- |
| Windows[Windows Server 2012 and above] | CPU and RAM static and dynamic parameters [Windows](javascript:void(0))[WinPSUtil](javascript:void(0)) |
| Web Tier                               | [IIS Server](javascript:void(0)) (Server Monitoring, Access & Error Logs) |
| App Tier                               | [WinJVM](javascript:void(0))[Apache Tomcat](javascript:void(0)) |
| Database andDataflowElements           | [MySQL](javascript:void(0))[MS-SQL](javascript:void(0))      |
