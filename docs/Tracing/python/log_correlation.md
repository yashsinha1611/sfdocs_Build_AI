---
sidebar_position: 3 
---
# Log Correlation
Log correlation refers to the ability to linking log events from different sources, applications or components of a system to gain a holistic understanding of the system's behavior. When logs are captured, they are automatically correlated with the relevant transaction and span information. This correlation is done based on the shared context information, such as the transaction ID or the span ID.

For example, when an error occurs in an application, SnappyFlow APM capture the error stack trace and link it to the relevant transaction or span. This provides context around the error and helps developers understand which part of the application was responsible for the error.

## Django

To enable log correlation in a Django application, follow the below steps:

### Configuration

1. Add the import statement in `settings.py`.

   ```
   from elasticapm.handlers.logging import Formatter
   ```
2. Add the following logging configuration in `settings.py`.

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
3. Add logging statements to your Django views file and other application code using the Python `logging` module. For example:

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

To enable log correlation for a Flask application, follow the below steps:

1. Add the import statement in `app.py`.

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

2. Add the following code in `app.py` to set the log configuration.

   ```
   fh = logging.FileHandler('/var/log/flask.log') 
   
   # we imported a custom Formatter from the Python Agent earlier 
   formatter = Formatter("[%(asctime)s] [%(levelname)s] [%(message)s]", "%d/%b/%Y %H:%M:%S") 
   fh.setFormatter(formatter) 
   logging.getLogger().addHandler(fh)
   
   # Once logging is configured get log object using following code  
   log = logging.getLogger()
   log.setLevel('INFO')
   ```

3. Add logging statements to the Flask `app.py` using the Python `logging` module. 

   For example:
   ```
   @app.route('/')
   def home():
      log.info('Home API called')
      return 'Welcome to Home'
   
   ```
#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-flask/app.py) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

### Steps to send log correlation data to SnappyFlow APM
---
#### Instance

To send the Log Correlation data to SnappyFlow APM, you need to install the sfAgent in the instance. See [documentation to install sfAgent](https://stage-docs.snappyflow.io/docs/Integrations/os/linux/sfagent_linux) in the instance.

After installing the sfAgent and configuring the profileKey, appName and projectName in the `config.yaml` file, add the elasticApmLog plugin under logging section in the sfagent `config.yaml` file.

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
            log_path: /var/log/flask.log
   ```

##### Verification

To view the logs
1. In the app, click the View **Dashboard** icon.
2. In the Dashboard window, go to **Logs** section.
3. Select the logType as **elasticApmTraceLog**
4. Now you can view the logs in the dashboard.


#### Kubernetes

Below are the two ways to send the Log Correlation data to SnappyFlow APM from the application which is deployed in the kubernetes.

1. The application are storing in the specific location with in the file, user has to use **sfKubeAgent** as a sidecar container in the existing deployment.
2. The application logs are printing in the standard console, user has to use the **gen-elastic-apm-log** component to correlate the logs.


Follow the below steps if the application logs are storing in specific location.

**Helm chart deployment**

1. Add the following configuration in the `values.yaml` file to download the sfKubeAgent image.

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

2. Create a `sfagent-configmap.yaml` file inside the template folders in the helm chart and add the **elasticApmTraceLog** logger plugin, which will collect the logs from the specific location and sends to the SnappyFlow APM.

   Below is the sample configuration.

   ```yaml
   # sfagent-configmap.yaml
   {{- if .Values.sfagent.enabled }}
   apiVersion: v1
   kind: ConfigMap
   metadata:
   name: {{ include "flask-app.fullname" . }}-sfagent-config
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
            log_path: /var/log/flask.log 
   {{- end }}
   
   ```
3. Add the sfKubeAgent as a container in the existing `deployment.yaml` file.

   Below is the sample configuration:

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
        {{ toYaml .Values.sfagent.resources }}
   ```

4. Mount the log location path as shared folder location in volumeMounts section of your application container and sfkubeagent container. In the volumes section add the log-correlation and sfagent-config volume mounts.

   Below is the sample configuration:

   ``` yaml
   containers:
     - name: {{ .Chart.Name }}
       image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
       imagePullPolicy: {{ .Values.image.pullPolicy }}
       volumeMounts:
         - name: log-correlation
           mountPath: /var/log
     - name: sfagent
       image: "{{ .Values.sfagent.image.repository }}:{{ .Values.sfagent.image.tag }}"
       imagePullPolicy: "{{ .Values.sfagent.image.pullPolicy }}"
       volumeMounts:
         - name: log-correlation
           mountPath: /var/log
         - name: sfagent-config
           mountPath: /opt/sfagent/config.yaml
           subPath: config.yaml
   volumes:
     - name: log-correlation
       emptyDir: {}
     - name: sfagent-config
       configMap:
         name: {{ include "python-app.fullname" . }}-sfagent-config
   ```

##### Sample Helm Chart deployment 

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/Log-Correlation-RefApps/flask-app) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

---
Follow the below steps if the application logs are storing in specific location.

Specify following values in metadata labels section of deployment file.
```yaml
snappyflow/appname: <SF_APP_NAME>
snappyflow/projectname: <SF_PROJECT_NAME>
snappyflow/component: gen-elastic-apm-log # This is must for tracing log correlation
```
##### Sample deployment file
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

:::note
   For kubernetes mode we need sfagent pods to be running inside kubernetes cluster where your application pods are deployed.
:::note

For viewing trace and logs in Snappyflow server make sure project and app name is created or discovered.
Once project and app name is created.

Go to: View App dashboard -> Click on Tracing on left side bar   -> Click on view transaction -> Go to real time tab
Then click on any trace and go to logs tab to see the correlated logs to trace.

```python
# Note: To get trace in snappyflow server we need log entries to adhere following log format:
<date in following format>
[10/Aug/2021 10:51:16] [<log_level>] [<message>] | elasticapm transaction.id=<transaction_id> trace.id=<trace_id> span.id=<span_id>
```

