---
sidebar_position: 3 
---
# Log Correlation

## Overview

Log correlation refers to the ability to link log events from different sources, applications, or components of a system to gain a holistic understanding of the system's behavior. When logs are captured, they are automatically correlated with the relevant transaction and span information. This correlation is done based on the shared context information, such as the transaction ID or the span ID.

**Example:**

when an error occurs in an application, SnappyFlow APM captures the error stack trace and links it to the relevant transaction or span. This provides context around the error and helps developers understand which part of the application was responsible for the error.

**<u>Supported Frameworks</u>**

**[Django](log_correlation#django)** | **[Flask](log_correlation#flask)**

## Django

To enable log correlation for an application developed by the **Django** framework, follow the below steps:

#### Configuration

1. Add the import statement in the `settings.py` file.

   ```
   from elasticapm.handlers.logging import Formatter
   ```

2. Add the following logging configuration in `settings.py ` file.

   ```python
   LOGGING = {
      'version': 1,
      'disable_existing_loggers': True, // Disable existing logger
      'formatters': {
         'elastic': { // Add elastic formatter
               'format': '[%(asctime)s] [%(levelname)s] [%(message)s]',
               'class': 'elasticapm.handlers.logging.Formatter',
               'datefmt': "%d/%b/%Y %H:%M:%S"
         }
      },
      'handlers': {
         'elasticapm_log': {
               'level': 'INFO',
               'class': 'logging.handlers.RotatingFileHandler',
               'filename': '/var/log/django.log', //specify you log file path
               'formatter': 'elastic'
         }
      },
      'loggers': {
         'elasticapm': {
               'handlers': ['elasticapm_log'],
               'level': 'INFO',
         }
      }
   }
   ```

3. Add the log statements to the Django view file and other application code using the Python `logging` module. 

**Example:**

   ```
   import logging
   log = logging.getLogger('elasticapm')
   
   class ExampleView(APIView):
      def get(self, request):
         log.info('Get API called')
   ```

#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

## Flask

To enable log correlation for an application developed by the **Flask** framework, follow the below steps:

1. Add the import statement in the `app.py` file.

   ```
   import logging
   from elasticapm.handlers.logging import Formatter
   ```
   ```
   import time
   logging.Formatter.converter = time.gmtime
   ```

   :::note

      The **`import time`** statement is applicable only when the vm/instance is deployed in India Standard Time (IST) timezone. In case of other time zones, you can ignore the **`import time`** statement.

   :::

2. Add the following code in the `app.py` file to set the log configuration.

   i. Follow the below-mentioned code, if the logs are printed on the standard console.

   ```
   fh = fh=logging.StreamHandler(sys.stdout)
   # we imported a custom Formatter from the Python Agent earlier 
   formatter = Formatter("[%(asctime)s] [%(levelname)s] [%(message)s]", "%d/%b/%Y %H:%M:%S") 
   fh.setFormatter(formatter) 
   logging.getLogger().addHandler(fh)
   
   # Once logging is configured get log object using following code  
   log = logging.getLogger()
   log.setLevel('INFO')
   ```

   ii. Follow the below-mentioned code, if the logs are stored in a specific file location.

    ```
    fh = logging.FileHandler('<log-path location>') 
   
   # we imported a custom Formatter from the Python Agent earlier 
   formatter = Formatter("[%(asctime)s] [%(levelname)s] [%(message)s]", "%d/%b/%Y %H:%M:%S") 
   fh.setFormatter(formatter) 
   logging.getLogger().addHandler(fh)
   
   # Once logging is configured get log object using following code  
   log = logging.getLogger()
   log.setLevel('INFO')
    ```

3. Add log statements to the Flask `app.py` file using the Python `logging` module. 

   **Example:**
   
   ```
   @app.route('/')
   def home():
      log.info('Home API called')
      return 'Welcome to Home'
   
   ```
#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-flask/app.py) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.


## Send Log Correlation Data to SnappyFlow

### Instance
Follow the below steps to send the correlate logs data to SnappyFlow from the application running in the instances.
##### Configuration

Add the `elasticApmLog` plugin in the logging section of the sfagent `config.yaml` file and restart the sfagent service.

**Example:**

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
            log_path: <log path>
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

### Kubernetes
 Follow the below steps to send the correlated logs data to SnappyFlow from the application running in the Kubernetes cluster.

There are two ways to send the Log Correlation data to SnappyFlow APM. That is based on how the application is deployed in Kubernetes.

**Case 1:** If the application logs are stored in a specific location within the file, use the **sfKubeAgent** as a sidecar container in the existing deployment.

#### **Helm chart deployment**

Follow the below steps to send the correlated logs to SnappyFlow APM from the application deployed using the helm chart deployment.

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

##### Sample Helm Chart deployment 

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/Log-Correlation-RefApps/flask-app) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.<br/>

**Case 2**: If the application logs are printed in the standard console, use the **gen-elastic-apm-log** component to correlate the logs.

#### Standard deployment 

Follow the below steps to send the correlated logs to SnappyFlow APM from the application deployed using the standard deployment file.

##### Configuration

1. Specify the following values in the `metadata labels` section of the `deployment.yaml` file.

 ```yaml
 snappyflow/appname: <SF_APP_NAME>
 snappyflow/projectname: <SF_PROJECT_NAME>
 # This is must for tracing log correlation
 snappyflow/component: gen-elastic-apm-log 
 ```

 **Sample deployment file**

 ```yaml
 apiVersion: apps/v1
 kind: Deployment
 metadata:
   labels:
     io.kompose.service: python-app
     snappyflow/appname: '<sf_app_name>'
     snappyflow/projectname: '<sf_project_name>'
     snappyflow/component: gen-elastic-apm-log
   name: python-app
 spec:
   replicas: 1
   selector:
     matchLabels:
       io.kompose.service: python-app
   strategy: {}
   template:
     metadata:
       labels:
         io.kompose.service: python-app
         snappyflow/appname: '<sf_app_name>'
         snappyflow/projectname: '<sf_project_name>'
         snappyflow/component: gen-elastic-apm-log
     spec:
       containers:
         - env:
             - name: SF_APP_NAME
               value: '<sf_app_name>'
             - name: SF_PROFILE_KEY
               value: '<sf_profile_key>'
             - name: SF_PROJECT_NAME
               value: '<sf_project_name>'
           image: refapp-node:latest
           imagePullPolicy: Always
           name: python-app
           ports:
             - containerPort: 3000
           resources:
             requests:
               cpu: 10m
               memory: 10Mi
             limits:
               cpu: 50m
               memory: 50Mi
       restartPolicy: Always
 ```

2. Install the **sfPod** in the Kubernetes cluster to collect the logs and metrics from the pods running inside the cluster. [Click here](https://stage-docs.snappyflow.io/docs/Integrations/kubernetes/kubernetes_monitoring_with_sfPod) to know how to install the sfPod in the Kubernetes cluster.

3. Make sure that the `projectname` and `appname` in the **sfPod** and the **deployment** file are same.

**Verification**

To view the logs:

1. Login into SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon
5. In the Dashboard window, go to the **Logs** section.
6. Select the logType as **`elasticApmTraceLog`**.
7. You can view the logs in the dashboard.


#### Helm Chart deployment

Follow the below steps to send the correlated logs to SnappyFlow APM from the application deployed using the helm chart deployment.

##### Configuration

1. Specify the following values in the `metadata labels` section of the `deployment.yaml` file.
 ```yaml
  snappyflow/appname: {{ .Values.global.sfappname }}
  snappyflow/projectname: {{ .Values.global.sfprojectname }}
  # This is must for tracing log correlation
  snappyflow/component: gen-elastic-apm-log 
 ```
**Samle deployment file**

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
      name: {{ include "flask-app.fullname" . }}
      labels:
         snappyflow/appname: {{ .Values.global.sfappname }}
         snappyflow/projectname: {{ .Values.global.sfprojectname }}
         snappyflow/component: gen-elastic-apm-log
   spec:
      template:
         metadata:
            labels:
            snappyflow/appname: {{ .Values.global.sfappname }}
            snappyflow/projectname: {{ .Values.global.sfprojectname }}
            snappyflow/component: gen-elastic-apm-log
         spec:
            containers:
               - name: {{ .Chart.Name }}
                 image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
                 imagePullPolicy: {{ .Values.image.pullPolicy }}
                 env:
                 - name: SF_PROFILE_KEY
                   value: {{ .Values.global.key }}
                 - name: SF_SERVICE_NAME
                   value: test-app
                 - name: SF_PROJECT_NAME
                   value: {{ .Values.global.sfprojectname }}
                 - name: SF_APP_NAME
                   value: {{ .Values.global.sfappname }}
   ```
2. Install the **sfPod** in the Kubernetes cluster to collect the logs and metrics from the pods running inside the cluster. [Click here](https://stage-docs.snappyflow.io/docs/Integrations/kubernetes/kubernetes_monitoring_with_sfPod) to know how to install the sfPod in the Kubernetes cluster.

3. Make sure that the `projectname` and the `appname` in the **sfPod** and the **values.yaml** file are same.

**Verification**

To view the logs:

1. Login into SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. In the Dashboard window, go to the **Logs** section.
6. Select the logType as **`elasticApmTraceLog`**.
7. You can view the logs in the dashboard.

