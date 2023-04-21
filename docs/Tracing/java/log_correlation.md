---
sidebar_position: 3 
---
# Log Correlation

By enabling log correlation, you can link log events from different sources, applications, or components of a system to gain a holistic understanding of the system's behavior.

**Example:**

when an error occurs in an application, SnappyFlow APM captures the error stack trace and links it to the relevant transaction or span. This provides context around the error and helps developers understand which part of the application was responsible for the error.

### Configuration

1. Create a file with the name: `logback.xml` in your application `src/main/resources` folder. 

2. Add the following lines in the `logback.xml` file.

   ```xml
   <?xml version = "1.0" encoding = "UTF-8"?> 
   <configuration> 
      <appender name = "FILE" class = "ch.qos.logback.core.FileAppender"> 
         <!-- Add path for your log file eg. -->
         <File>/var/log/spring-app.log </File> 
         <encoder> 
            <pattern> [%d{yyyy-MM-dd'T'HH:mm:ss.sss'Z'}] [%-2p] [%m] | elasticapm transaction.id=%X{transaction.id} trace.id=%X{trace.id} span.id=None %n </pattern> 
         </encoder> 
      </appender> 
      <root level = "INFO"> 
         <appender-ref ref = "FILE"/> 
      </root> 
   </configuration> 
   ```

3. Add logging statements to your application code through a logging framework such as Logback or Log4j. This will typically involve configuring a logging appender that sends log messages to the specified path.
For example:

  ```java
  package org.springframework.samples;
  import org.slf4j.Logger;
  import org.slf4j.LoggerFactory;
  class CustomController {
  Logger logger = LoggerFactory.getLogger(CustomController.class);
       
  @GetMapping("/getCustomer")
  public void getCustomer() {
  logger.info("Query success called GET /getCustomer");
   }
  }
  ```

4. Build your application and Add the below property.

   1. Your application is packaged as a jar file, then add the `elastic.apm.enable_log_correlation` property  like below while running your application jar.

      For Example:

      ```
      java -Delastic.apm.enable_log_correlation=true -jar applicationjar.jar
      ```

      The Overall Configuration after enable the tracing, Capture request Body from Trace and log correlation:

      ```
      java -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar 
      -Dsftrace.service_name=spring-service 
      -Delastic.apm.disable_instrumentations=spring-mvc
      -Delastic.apm.use_path_as_transaction_name=true
      -Delastic.apm.transaction_ignore_urls=/jolokia/*
      -Delastic.apm.enable_log_correlation=true 
      -Delastic.apm.capture_body=all
      -Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=log,_tag_documentType=custom-document" 
      -jar <application jar>
      ```

   2. you application is packaged as a war file, add the `elastic.apm.enable_log_correlation` property in the `tomcat_setenv.sh` file.

      For Example: 

      ```
      export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.enable_log_correlation=true"
      ```

      The Overall Configuration after enable the tracing, Capture request Body from Trace and log correlation:

      ```sh
      export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar"
      export CATALINA_OPTS="$CATALINA_OPTS -Dsftrace.apm.service_name=custom-service"
      export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.disable_instrumentation=spring-mvc"
      export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.use_path_as_transaction_name=true"
      export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.enable_log_correlation=true"
      export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.capture_body=all"
      export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.global_labels='_tag_redact_body=true,_tag_IndexType=log,_tag_documentType=custom-document'" 
      ```

## Send log correlation data to SnappyFlow

### Instance
#### Configuration

Add the elasticApmLog plugin under logging section in the sfagent `config.yaml` file.

For Example:

   ```
key: <SF_PROFILE_KEY>
tags:
Name: <any-name>
appName: <SF_APP_NAME>
projectName: <SF_PROJECT_NAME>
logging:
plugins:
   - name: elasticApmTraceLog
      enabled: true
      config:
         log_level:
            - error
            - warning
            - info
         # Your app log file path
         log_path: /var/log/spring-app.log
   ```

#### Verification
To view the logs:

1. Login into SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. In the Dashboard window, go to the Logs section.
6. Select the logType as `elasticApmTraceLog`.
7. You can view the logs in the dashboard.

### Kubernetes

 Follow the below steps to send the correlated logs data to SnappyFlow from the application running in the Kubernetes cluster.

#### **Helm chart deployment**

##### Configuration

1. To download the **sfKubeAgent image**, add the following configuration in the `values.yaml` file. 

   ```yaml
   # values.yaml
   sfagent:
     enabled: true
     image:
      repository: snappyflowml/sfagent
      tag: latest
      pullPolicy: Always
     resources:
       limits:
         cpu: 50m
         memory: 256Mi
       requests:
         cpu: 50m
         memory: 256Mi
   ```

2. Create a `sfagent-configmap.yaml` file in the template folder of the **Helm Chart**. Then add the **`elasticApmTraceLog`** logger plugin. 

   **Sample configuration:**

   ```yaml
   # sfagent-configmap.yaml
   {{- if .Values.sfagent.enabled }}
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: {{ include "<chart-name>.fullname" . }}-sfagent-config
     labels:
        {{ default "snappyflow/appname" .Values.global.sfappname_key }}: {{ default .Release.Name .Values.global.sfappname }}
        {{ default "snappyflow/projectname" .Values.global.sfprojectname_key }}: {{ default .Release.Name .Values.global.sfprojectname }}
   data:
     config.yaml: |+
       ---
       key: "{{ .Values.global.key }}"
       logging:
          plugins:
          - name: elasticApmTraceLog
            enabled: true
            config:
              log_path: <log-path location> 
   {{- end }}
   
   ```

3. Add the **sfKubeAgent** as a container in the existing `deployment.yaml` file.

   **Sample configuration:**

   ```yaml
     {{- if .Values.sfagent.enabled }}
   - name: sfagent
     image: "{{ .Values.sfagent.image.repository }}:{{ .Values.sfagent.image.tag }}"
     imagePullPolicy: "{{ .Values.sfagent.image.pullPolicy }}"
     command:
        - /app/sfagent
        - -enable-console-log
     env:
       - name: APP_NAME
         value: "{{ .Values.global.sfappname }}"
       - name: PROJECT_NAME
         value: "{{ .Values.global.sfprojectname }}"
     resources:
       {{ toYaml .Values.sfagent.resources | nindent 12 }}
   ```

4. In the `volumeMounts` section of your application container and sfkubeagent container, add the log location path as a shared folder location. Then, in the `volumes` section, add the log correlation and `sfagent-config` volume mounts.

   **Sample configuration:**

   ``` yaml
   containers:
     - name: {{ .Chart.Name }}
       image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
       imagePullPolicy: {{ .Values.image.pullPolicy }}
       volumeMounts:
         - name: log-correlation
           mountPath: <mount path ex:/var/log>
       {{- if .Values.sfagent.enabled }}
     - name: sfagent
       image: "{{ .Values.sfagent.image.repository }}:{{ .Values.sfagent.image.tag }}"
       imagePullPolicy: "{{ .Values.sfagent.image.pullPolicy }}"
       volumeMounts:
         - name: log-correlation
           mountPath: <mount path ex:/var/log>
         - name: sfagent-config
           mountPath: /opt/sfagent/config.yaml
           subPath: config.yaml
   volumes:
     - name: log-correlation
       emptyDir: {}
     - name: sfagent-config
       configMap:
         name: {{ include "<helm-chart name>.fullname" . }}-sfagent-config
   ```

##### Verification

To view the logs:

1. Login into SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. In the Dashboard window, go to the **Logs** section.
6. Select the logType as **`elasticApmTraceLog`**.
7. You can view the logs in the dashboard.

