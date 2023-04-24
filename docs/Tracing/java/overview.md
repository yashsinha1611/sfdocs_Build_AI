---
sidebar_position: 3 
---
# Java Tracing

## Overview

The Java tracing feature automatically instruments APIs, frameworks, and application servers for the applications built using Java. The sfAPM Java agent collects and sends the tracing metrics and the correlated application logs to the SnappyFlow server and you can view the tracing data in SnappyFlow's dashboard.

<div class="blue_textbox">
	<b><u>Supported Java versions</u></b> 
	<p>
        <b>Oracle JDK</b>: 7u60+, 8u40+, 9, 10, 11</p>
    <p>
        <b>Open JDK</b>: 7u60+, 8u40+, 9, 10, 11  
    </p>
	<b><u>Supported Web Frameworks</u></b>
	<p>
     <b>Spring Web MVC</b> 4.x, 5.x
	</p>
    <p>
     <b>Spring Boot</b> 1.5+, 2.x (supports embedded Tomcat)       
    </p>
    <p>
     <b>JAX-RS</b> 2.x   
    </p>
    <p>
      <b>JAX-WS</b> 
    </p>
    <p>
	<b><u>Supported Application Servers</u></b>
    </p>
    <p>
      <b>Tomcat</b> 7.x, 8.5.x, 9.x  
    </p>
    <p>
      <b>Wildfly</b> 8-16  
    </p>
    <p>
     <b>JBoss EAP</b> 6.4, 7.0, 7.1, 7.2
    </p>
</div>



## Supported Platforms

**[Instances](/docs/Tracing/java/instance)** | **[Docker](/docs/Tracing/java/docker)**  |  **[ECS](/docs/Tracing/java/ecs)**  | **[Kubernetes](/docs/Tracing/java/kubernetes)**



## Supported Trace Features 

**Distributed Tracing** | **Transaction Mapping** | **Log Correlation** | **Capture Request Body** | **Service Map**

<br/>

:::note

**Log Correlation** and **Capture Request Body** are not default trace features. Based on the requirement you can enable them by adding additional configurations.

:::

