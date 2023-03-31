---
sidebar_position: 3 
---
# Python Tracing

## Overview

The Python tracing feature automatically instruments APIs, frameworks, and application servers for the applications built using python. The sfAPM python agent collects and sends the tracing metrics and the correlated application logs to the SnappyFlow server and you can view the tracing data in SnappyFlow's dashboard.

<div class="blue_textbox">
	<b><u>Supported Python versions</u></b> 
	<p>
		<b>Python</b> [3.6, 3.7, 3.8, 3.9, 3.10, 3.11] </p>
	<b><u>Supported Web Frameworks</u></b>
	<p>
		<b>Django</b> [1.11, 2.0, 2.1, 2.2, 3.0, 3.1, 3.2, 4.0]
	</p>
    <p>
       <b>Flask</b>  [1.0, 1.1, 2.0]  
    </p>
</div>


## Supported Platforms

**[Instances](/docs/Tracing/python/python_on_instance)** | **[Kubernetes](/docs/Tracing/python/python_in_kubernetes)** | **[ECS](/docs/Tracing/python/python_in_ECS)** | **[Docker](/docs/Tracing/python/python_in_docker)** |**[AWS Lambda](/docs/Tracing/python/aws_lamda)**



## Supported Trace Features 

**Distributed Tracing** | **Transaction Mapping** | **Log Correlation** | **Capture Request Body** | **Service Map**

<br/>

:::note

**Log Correlation** and **Capture Request Body** are not default trace features. Based on the requirement you can enable them by adding additional configurations.

:::





