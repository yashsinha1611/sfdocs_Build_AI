---
sidebar_position: 3 
---

# Java Application on Instances

## Application Packed in a JAR file

### Prerequisite

Install [sfAgent](/docs/Quick_Start/getting_started#sfagent).

### Configuration

Add the following arguments while starting your application using the `java -jar` command in IDE, Maven, or Gradle script: 

```
java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar -Dsftrace.service_name=<my-service> -jar <application jar> 
```
:::note

If  the `service_name` is not provided, an auto-discovered service name will be added. `Service_name` is used to identify and filter the traces related to an application and should be named appropriately to distinctly identify it. The service name must only contain characters from the **ASCII alphabet**, **numbers**, **dashes**, **underscores,** and **spaces**.

:::

#### Additional Features for Spring Boot Applications

By default, transaction names of unsupported Servlet API based frameworks are in the form of `$method` unknown route. To modify this and to report the names of the transaction in the form of `$method` and `$path`, add the below-given command in Java agent configuration.

```
-Delastic.apm.disable_instrumentations=spring-mvc  
-Delastic.apm.use_path_as_transaction_name=true 
```

#### Normalizing Transaction URL

If your URL contains path parameters like `/user/$userId`, it can lead to an explosion of transaction types. To avoid this use URL groups.
**For example**, if the application supports URLs like: 

```
/owners, /owners/<owner_id>, /owners/<owner_id>/edit, /owners/<owner_id>/pets, 
```

then URL groups would be configured as: 

```
url_groups=/owners/*,/owner/*/edit,/owners/*/pets 
```

#### Example 

Below given configuration is an example of a Java application executed via command line using the parameters given in the previous sections.

```
java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar 

-Dsftrace.service_name=my-service 
-Delastic.apm.disable_instrumentations=spring-mvc 
-Delastic.apm.use_path_as_transaction_name=true 
-Delastic.apm.url_groups=/owners/*,/owner/*/edit,/owners/*/pets -jar <application jar> 
```

### Verification

Follow the below steps to verify whether SnappyFlow has started to collect the trace data.

1. Login into SnappyFlow.

2. Go to the **Application** tab.

3. In the **Application** tab, navigate to your **Project** > **Application**.

4. Click the **Application's Dashboard** icon.

   <img src="/img/tracing/image_2.png" />

5. Navigate to the **Tracing** section and click the `View Transactions` button.

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.

   <img src="/img/tracing/image_1.png" />

   <img src="/img/tracing/image_3.png" />

## Apache Tomcat

### Prerequisite

Install [sfAgent](/docs/Quick_Start/getting_started#sfagent).

### Configuration

1. Create a `setenv.sh` file in the below-mentioned folder.

   ```
   <tomcat installation path>/bin
   ```
2. Add the trace agent configuration in the `setenv.sh` file. Refer to  [tomcat_setenv.sh](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/tomcat_setenv.sh)  for tracing specific configurations.
3. 
    Execute the file using `chmod +x bin/tomcat_setenv.sh` command and start the server.

#### Additional Features for Spring Boot Applications

By default, transaction names of unsupported Servlet API based frameworks are in the form of `$method` unknown route. To modify this and to report the names of the transaction in the form of `$method` and  `$path`, use the below-given command in the Java agent configuration. 

```
-Delastic.apm.disable_instrumentations=spring-mvc  
-Delastic.apm.use_path_as_transaction_name=true 
```

#### Normalizing Transaction URL

If your URL contains path parameters like `/user/$userId`, it can lead to an explosion of transaction types. To avoid this use URL groups.
For example, if the application supports URLs like: 

```
/owners, /owners/<owner_id>, /owners/<owner_id>/edit, /owners/<owner_id>/pets, 
```

then URL groups would be configured as: 

```
url_groups=/owners/*,/owner/*/edit,/owners/*/pets 
```

#### Example 

Below given configuration is an example of a Java application executed via command line using the parameters given in the previous sections.

```
java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar 

-Dsftrace.service_name=my-service 
-Delastic.apm.disable_instrumentations=spring-mvc 
-Delastic.apm.use_path_as_transaction_name=true 
-Delastic.apm.url_groups=/owners/*,/owner/*/edit,/owners/*/pets -jar <application jar> 
```

### Verification

Follow the below steps to verify whether SnappyFlow has started to collect the trace data.

1. Login into SnappyFlow.

2. Go to the **Application** tab.

3. In the **Application** tab, navigate to your **Project** > **Application**.

4. Click the **Application's Dashboard** icon.

   <img src="/img/tracing/image_2.png" />

5. Navigate to the **Tracing** section and click the `View Transactions` button.

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.

   <img src="/img/tracing/image_1.png" />

   <img src="/img/tracing/image_3.png" />

## JBOSS EAP

### Prerequisite

Install [sfAgent](/docs/Quick_Start/getting_started#sfagent).

### Configuration

#### Standalone Mode 

Copy the configuration from the `SFTRACE-CONFIG` section and add the trace agent configuration in the `standalone.conf` file and start the server. Refer to  [JBOSS_standalone.conf](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/JBOSS_standalone.conf)  for tracing specific configurations. 

#### Domain Mode
Copy the configuration from the `SFTRACE-CONFIG` section and add the trace agent configuration in `domain.xml` and start the server. Refer to [JBOSS_domain.xml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/JBOSS_domain.xml)  for tracing specific configurations. 
After updating the configuration, restart the application. 

#### Additional Features for Spring Boot Applications
By default, transaction names of unsupported Servlet API based frameworks are in the form of `$method` unknown route. To modify this and to report the names of the transaction in the form of `$method` and  `$path`, add the below-given command in the Java agent configuration.

```
-Delastic.apm.disable_instrumentations=spring-mvc  
-Delastic.apm.use_path_as_transaction_name=true 
```
#### Normalizing Transaction URLs
If your URLs contain path parameters like `/user/$userId`, it can lead to an explosion of transaction types. To avoid this you can use URL groups.
**For example**, if the application supports URLs like: 

```
/owners, /owners/<owner_id>, /owners/<owner_id>/edit, /owners/<owner_id>/pets, 
```
then URL groups would be configured as: 

```
url_groups=/owners/*,/owner/*/edit,/owners/*/pets 
```
#### Example 

Below given configuration is an example of a Java application executed via command line using the parameters given in the previous sections.

```
java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar 

-Dsftrace.service_name=my-service 
-Delastic.apm.disable_instrumentations=spring-mvc 
-Delastic.apm.use_path_as_transaction_name=true 
-Delastic.apm.url_groups=/owners/*,/owner/*/edit,/owners/*/pets -jar <application jar> 
```



### Verification

Follow the below steps to verify whether SnappyFlow has started to collect the trace data.

1. Login into SnappyFlow.

2. Go to the **Application** tab.

3. In the **Application** tab, navigate to your **Project** > **Application**.

4. Click the **Application's Dashboard** icon.

   <img src="/img/tracing/image_2.png" />

5. Navigate to the **Tracing** section and click the `View Transactions` button.

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.

   <img src="/img/tracing/image_1.png" />

   <img src="/img/tracing/image_3.png" />
