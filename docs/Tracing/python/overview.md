---
sidebar_position: 3 
---
# Python Tracing

## Overview

The Python tracing automatically instruments APIs, frameworks, and application servers. The sfAPM python agent collects and sends the tracing metrics and the correlated application logs to the SnappyFlow server.

<div class="grey_textbox">
	<b>Supported Python versions</b> 
	<p>
		Python 3.6, 3.7, 3.8, 3.9, 3.10, 3.11 </p>
	<b>Supported Web Frameworks</b>
	<p>
		Django 1.11, 2.0, 2.1, 2.2, 3.0, 3.1, 3.2, 4.0 <br/>
      Flask  1.0, 1.1, 2.0 <br/>
	</p>
</div>


### Supported Platforms

**[Instances](python#instances)**

**[Docker](python#docker)**

**[Kubernetes](python#kubernetes)**

**[ECS](python#ecs)**

**[AWS Lambda](python#aws-lambda)**

### Supported Trace Features 

Below is the list of the supported trace features:

* Distributed Tracing
* Transaction Mapping
* [Log Correlation](python#log-correlation)
* [Capture request Body from Trace](python#capture-request-body-from-trace)
* Service Map

:::note

**Log Correlation** and **Capture Request Body** are not default trace features. Based on the requirement user can enable them by adding additional configurations.

:::
