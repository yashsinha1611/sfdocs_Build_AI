---
sidebar_position: 3 
---

# Java on Instances

### Prerequisite
Install [sfAgent](/docs/Quick_Start/getting_started#sfagent).

## Command Line

Use the following arguments while starting your application using the `java -jar` command in IDE, Maven or Gradle script: 

```
java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar -Dsftrace.service_name=<my-service> -jar <application jar> 
```
:::note

If `service_name` is not provided, an auto discovered service name will be added. `Service_name` is used to identify and filter the traces related to an application and should be named appropriately to distinctly identify it. Service name must only contain characters from the ASCII alphabet, numbers, dashes, underscores and spaces.

:::

#### Additional features available for Spring Boot Applications

By default, transaction names of unsupported Servlet API-based frameworks are in the form of `$method` unknown route. To modify this and to report the transactions names in the form of `$method $path`, use the following in javaagent configuration. This option is applicable only for spring-boot based applications.

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

## Apache Tomcat

Add the agent configuration in setenv.sh. If this file is not present,  create the file in below folder
```
<tomcat installation path>/bin
```
Refer to [tomcat_setenv.sh](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/tomcat_setenv.sh)  for tracing specific configuration that needs to be copied to setenv.sh file. 
Make the file executable using `chmod +x bin/tomcat_setenv.sh` and start the server



#### Additional features available for Spring Boot Applications

By default, transaction names of unsupported Servlet API-based frameworks are in the form of `$method` unknown route. To modify this and to report the transactions names in the form of `$method $path`, use the following in javaagent configuration. This option is applicable only for spring-boot based applications.

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

## JBOSS EAP

#### Standalone Mode 

Add the agent configuration in `standalone.conf` file and start the server 
Refer to [JBOSS_standalone.conf](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/JBOSS_standalone.conf) for tracing specific configuration. Copy from section with `SFTRACE-CONFIG` in comments 

#### Domain Mode
Add the agent configuration in `domain.xml` and start the server 
Refer to [JBOSS_domain.xml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/JBOSS_domain.xml)  for tracing specific configuration. Copy from section with `SFTRACE-CONFIG` in comments 
After updating the configuration, restart the application. 

#### Additional features available for Spring Boot Applications
By default, transaction names of unsupported Servlet API-based frameworks are in the form of `$method` unknown route. To modify this and to report the transactions names in the form of `$method $path`, use the following in javaagent configuration. This option is applicable only for spring-boot based applications.

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

