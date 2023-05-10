---
sidebar_position: 3 
---
# Log Correlation

By enabling log correlation, you can link log events from different sources, applications, or components of a system to gain a holistic understanding of the system's behavior.

**Example:**

In the event of an error in your application, SnappyFlow's trace agent captures the stack trace of the error and associates it with the corresponding transaction or span. This contextualizes the error and assists developers in identifying the specific area of the application that caused the error.

## Enable Log Correlation

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

3. Add log statements to your application code through a logging framework such as **Logback** or **Log4j**. This will typically involve configuring a logging appender that sends log messages to a specified path.
   **Example**:

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

### Add Properties to the Application

##### Application Packaged as a jar File

Add the `elastic.apm.enable_log_correlation` property in the application jar.

**Example**:

```
java -Delastic.apm.enable_log_correlation=true -jar applicationjar.jar
```

The Overall Configuration after enabling the tracing feature with Capture request Body from Trace and log correlation:

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

##### Application Packaged as a war File

Add the `elastic.apm.enable_log_correlation` property in the `tomcat_setenv.sh` file.

**Example**: 

```
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.enable_log_correlation=true"
```

The overall Configuration after enabling the tracing feature along with **Capture request Body** and **Log Correlation**:

```sh
export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/opt/sfagent/sftrace/java/sftrace-java-agent.jar"
export CATALINA_OPTS="$CATALINA_OPTS -Dsftrace.apm.service_name=custom-service"
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.disable_instrumentation=spring-mvc"
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.use_path_as_transaction_name=true"
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.enable_log_correlation=true"
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.capture_body=all"
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.global_labels='_tag_redact_body=true,_tag_IndexType=log,_tag_documentType=custom-document'" 
```

## Send Log Correlation Data to SnappyFlow

### Instance

Follow the below steps to send the correlated logs to SnappyFlow from the application running in the instance.

#### Configuration

Add the `elasticApmLog` plugin under the `logging` section of the sfagent `config.yaml` file.

**Example**:

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

#### View Correlated Logs

Follow the below steps to view the logs correlated data.

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.
2. In the dashboard window, go to the **Logs Management** section.
3. Select the **Log Type** as `elasticApmTraceLog`.
4. You can view the logs in the dashboard.

### Kubernetes

Follow the below steps to send the correlated logs to SnappyFlow from the application running in the Kubernetes cluster.

#### **Helm chart deployment** Configuration

1.  Add the following configuration in the `values.yaml` file to download the **sfKubeAgent image**.

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

2. Create a `sfagent-configmap.yaml` file in the template folder of the **Helm Chart**. 

3. Add the **`elasticApmTraceLog`** log plugin in the `sfagent-configmap.yaml` file.

   **Example configuration:**

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

4. Add the `sfKubeAgent` as a container in the existing `deployment.yaml` file.

   **Example configuration:**

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

5.  Add the log location path as a shared folder location in the `volumeMounts` section of your application container and `sfkubeagent` container.

6. Add the log correlation and `sfagent-config` volume mounts in the `volumes` section.

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

#### View Correlated Logs

Follow the below steps to view the logs correlated data.

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.
2. In the dashboard window, go to the **Log Management** section.
3. Select the **Log Type** as **`elasticApmTraceLog`**.
4. You can view the logs in the dashboard.

