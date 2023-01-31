# Java tracing


sfTrace Java Agent automatically instruments APIs, frameworks and application servers. Currently sfTrace supports the following:  
<div class="blue_textbox">
	<b>Supported Java versions</b> 
	<p>
		Oracle JDK: 7u60+, 8u40+, 9, 10, 11 <br/>
	Open JDK: 7u60+, 8u40+, 9, 10, 11 </p>
	<b>Supported Web Frameworks</b>
	<p>
		Spring Web MVC 4.x, 5.x <br/>
	Spring Boot 1.5+, 2.x supports embedded Tomcat <br/>
	JAX-RS 2.x  <br/>
	JAX-WS  <br/>
	</p>
	<b>Supported Application Servers</b>
	<p>Tomcat 7.x, 8.5.x, 9.x <br/>
	Wildfly 8-16 <br/>
	JBoss EAP 6.4, 7.0, 7.1, 7.2</p>
</div>


#### Available Platforms

[**Instances**](java#instances)

[**Docker**](java#docker)

[**Kubernetes**](java#kubernetes)

[**ECS**](java#ecs)




## Instances

Install [sfAgent](/docs/Quick_Start/getting_started#sfagent) which automatically installs sfTrace agent as well.

Link the application with sfTrace Java Agent

### Command Line

Use the following arguments while starting your application using java `–jar` command, in IDE, Maven or Gradle script: 

```
java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar -Dsftrace.service_name=<my-service> -jar <application jar> 
```
:::note

If `service_name` is not provided, an auto discovered service name will be added. `Service_name` is used to identify and filter the traces related to an application and should be named appropriately to distinctly identify it. Service name must only contain characters from the ASCII alphabet, numbers, dashes, underscores and spaces.

:::

#### Additional features available for Spring Boot Applications

By default, transaction names of unsupported Servlet API-based frameworks are in the form of $method unknown route. To modify this and to report the transactions names in the form of $method $path, use the following in javaagent configuration. This option is applicable only for spring-boot based applications.

```
-Delastic.apm.disable_instrumentations=spring-mvc  
-Delastic.apm.use_path_as_transaction_name=true 
```

#### Normalizing Transaction URLs

If your URLs contain path parameters like `/user/$userId`, it can lead to an explosion of transaction types. This can be avoided by using URL groups.
For example, if the application supports urls like: 

```
/owners, /owners/<owner_id>, /owners/<owner_id>/edit, /owners/<owner_id>/pets, 
```

then url groups would be configured as: 

```
url_groups=/owners/*,/owner/*/edit,/owners/*/pets 
```

#### Example of running java application via command line using these parameters

```
java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar 

-Dsftrace.service_name=my-service 
-Delastic.apm.disable_instrumentations=spring-mvc 
-Delastic.apm.use_path_as_transaction_name=true 
-Delastic.apm.url_groups=/owners/*,/owner/*/edit,/owners/*/pets -jar <application jar> 
```

#### Enable Trace to Log feature

1. Add below system property to enable the feature:
	```java
	-Delastic.apm.global_labels="_tag_redact_body=true"
	```

	We also provide custom document type and destination index configs for this feature.(Optional)

	a. Add below label to provide custom documentType (Default:"log"):

	```java
	-Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=metric" // Applicable values(log, metric)
	```
	b. Add below label to provide custom documentType (Default:"user-input"):
	```java
	-Delastic.apm.global_labels="_tag_redact_body=true,_tag_documentType=<document-type>"
	```
	<b>Note </b>: <i>-Delastic.apm.capture_body=all properties needs to added when enabling trace to log feature</i>

	Run Command:
	```java
	java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar 
	-Dsftrace.service_name=spring-service 
	-Delastic.apm.use_path_as_transaction_name=true
	-Delastic.apm.capture_body=all 
	-Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=<index_type>,_tag_documentType=<document_type>"
	-Delastic.apm.metrics_interval=0s -jar target/spring-petclinic-2.1.0.BUILD-SNAPSHOT.jar
	```


### Apache Tomcat

Add the agent configuration in setenv.sh. If this file is not present,  create the file in below folder
```
<tomcat installation path>/bin
```
Refer to [tomcat_setenv.sh](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/tomcat_setenv.sh)  for tracing specific configuration that needs to be copied to setenv.sh file. 
Make the file executable using `chmod +x bin/setenv.sh` and start the server



#### Additional features available for Spring Boot Applications

By default, transaction names of unsupported Servlet API-based frameworks are in the form of $method unknown route. To modify this and to report the transactions names in the form of $method $path, use the following in javaagent configuration. This option is applicable only for spring-boot based applications.

```
-Delastic.apm.disable_instrumentations=spring-mvc  
-Delastic.apm.use_path_as_transaction_name=true 
```

#### Normalizing Transaction URLs

If your URLs contain path parameters like /user/$userId, it can lead to an explosion of transaction types. This can be avoided by using URL groups.
For example, if the application supports urls like: 

```
/owners, /owners/<owner_id>, /owners/<owner_id>/edit, /owners/<owner_id>/pets, 
```

then url groups would be configured as: 

```
url_groups=/owners/*,/owner/*/edit,/owners/*/pets 
```

#### Example of running java application via command line using these parameters

```
java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar 

-Dsftrace.service_name=my-service 
-Delastic.apm.disable_instrumentations=spring-mvc 
-Delastic.apm.use_path_as_transaction_name=true 
-Delastic.apm.url_groups=/owners/*,/owner/*/edit,/owners/*/pets -jar <application jar> 
```

#### Enable Trace to Log feature

1. Add below system property to enable the feature:
	```java
	-Delastic.apm.global_labels="_tag_redact_body=true"
	```

	We also provide custom document type and destination index configs for this feature.(Optional)

	a. Add below label to provide custom documentType (Default:"log"):

	```java
	-Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=metric" // Applicable values(log, metric)
	```
	b. Add below label to provide custom documentType (Default:"user-input"):
	```java
	-Delastic.apm.global_labels="_tag_redact_body=true,_tag_documentType=<document-type>"
	```
	<b>Note </b>: <i>-Delastic.apm.capture_body=all properties needs to added when enabling trace to log feature</i>

	Run Command:
	```java
	java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar 
	-Dsftrace.service_name=spring-service 
	-Delastic.apm.use_path_as_transaction_name=true
	-Delastic.apm.capture_body=all 
	-Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=<index_type>,_tag_documentType=<document_type>"
	-Delastic.apm.metrics_interval=0s -jar target/spring-petclinic-2.1.0.BUILD-SNAPSHOT.jar
	```


### JBOSS EAP

#### Standalone Mode 

Add the agent configuration in `standalone.conf` file and start the server 
Refer to [JBOSS_standalone.conf](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/JBOSS_standalone.conf) for tracing specific configuration. Copy from section with `SFTRACE-CONFIG` in comments 

#### Domain Mode
Add the agent configuration in `domain.xml` and start the server 
Refer to [JBOSS_domain.xml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/JBOSS_domain.xml)  for tracing specific configuration. Copy from section with `SFTRACE-CONFIG` in comments 
After updating the configuration, restart the application. 

#### Additional features available for Spring Boot Applications
By default, transaction names of unsupported Servlet API-based frameworks are in the form of $method unknown route. To modify this and to report the transactions names in the form of $method $path, use the following in javaagent configuration. This option is applicable only for spring-boot based applications.

```
-Delastic.apm.disable_instrumentations=spring-mvc  
-Delastic.apm.use_path_as_transaction_name=true 
```
#### Normalizing Transaction URLs
If your URLs contain path parameters like /user/$userId, it can lead to an explosion of transaction types. This can be avoided by using URL groups.
For example, if the application supports urls like: 

```
/owners, /owners/<owner_id>, /owners/<owner_id>/edit, /owners/<owner_id>/pets, 
```
then url groups would be configured as: 

```
url_groups=/owners/*,/owner/*/edit,/owners/*/pets 
```
#### Example of running java application via command line using these parameters

```
java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar 

-Dsftrace.service_name=my-service 
-Delastic.apm.disable_instrumentations=spring-mvc 
-Delastic.apm.use_path_as_transaction_name=true 
-Delastic.apm.url_groups=/owners/*,/owner/*/edit,/owners/*/pets -jar <application jar> 
```


## Docker

- Refer to [java_Dockerfile](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/java_Dockerfile). Look at sections with `SFTRACE-CONFIG` description. 

- Installation steps are provided. Copy the trace agent to the container and start the container by attaching the agent to the application. 
- Additionally, user has to add SnappyFlow configurations for `profile_key`, `projectName`, `appName` to the docker file 
- Once updated, build and start the container.

## Kubernetes

sfTrace is run as an initContainer in the application pod. User can deploy this either using a manifest yaml or a Helm chart.

### Example of Manifest yaml
[java_k8s_standalone_deployment.yaml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/java_k8s_standalone_deployment.yaml)  

### Example of a Helm chart
**Update values.yaml**: Refer to [java_k8s_with_helm_chart_values.yaml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/java_k8s_with_helm_chart_values.yaml)  to configure agent specific properties. Look at sections with `SFTRACE-CONFIG` description 

**Update deployment.yam**l: Refer to [java_k8s_with_helm_chart_deployment.yaml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/java_k8s_with_helm_chart_deployment.yaml)  to copy trace agent to the container and start the container by attaching  the agent. Look at sections with `SFTRACE-CONFIG` description

## ECS
### [**Fargate**](java#deploying-the-snappyflow-trace-agent)  
#### Deploying the SnappyFlow trace agent
If you are using the fargate type, add the following information to the existing task definition where your application docker container is running
1.	Go to the task definitions in ECS page
2.	Select your task definition
3.	Click on create new revision

4.	Under container definitions select the container in which your application docker container is running and it will open edit container window.
5.	In edit container window under the environment section add the below details
	
    - In the entry point text box provided the sh,-c
	- In the command text box add the below command which is highlighted
  
  ```shell
  mkdir /sfagent && wget -O /sfagent/sftrace-agent.tar.gz https://github.com/snappyflow/apm-agent/releases/download/latest/sftrace-agent.tar.gz && cd /sfagent && tar -xvzf sftrace-agent.tar.gz && java -javaagent:/sfagent/sftrace/java/sftrace-java-agent.jar -jar applicationjarfile.jar  
  ```
     - Add the environmental variables which is required to send the trace data to snappyflow server
 
    |  Key | Value  |
    | --- | --- |
    | ELASTIC_APM_USE_PATH_AS_TRANSACTION_NAME  | true |
    | ELASTIC.APM.CAPTURE_BODY |  all |
    | SFTRACE_APP_NAME | APP_NAME |
    | SFTRACE_PROFILE_KEY | Profile_key |
    | SFTRACE_PROJECT_NAME | Project_Name |
    |  SFTRACE_SERVICE_NAME| Service_Name |

    :::note
    Snappyflow trace agent s should not discover the new project, the values which you are providing like app name and project name must and should already be available in the snappyflow APM.
    :::note

    -  Click on update, it will close the edit container pop up.

6. Click on create, it will create the new revision for your task definition
7. Once the new revision is completed, follow the below steps to update your service in the cluster.

    - Navigate to the cluster
    - Select the cluster
    - Select the service
    - Click on the update service, it will open the update service page
    - Under the configure service select the task definition with latest revision
    - Click on the force new deployment
    - Click on the next step and finally click on the update service.
    - Once the tasks are running under the service, trigger the request in your application and you will see the traces in SnappyFlow APM

    <img src="/img/java/Setup_snappyflow_trace_agent2.PNG" /><br/>

