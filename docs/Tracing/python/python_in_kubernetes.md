---
sidebar_position: 3 
---
# Python in Kubernetes
|                **Supported Frameworks**          | 
| ----------------------------------------------------------------| 
|**[Django](python_in_kubernetes##django)**|
|**[Flask](python_in_kubernetes##flask)**|


| **Standard Library Modules** | 
| ----------------------- |
|**[Celery](python_in_kubernetes##Celery)**|

## Django
### Prerequisite
To enable tracing for the application based on Django Framework **`sf-elastic-apm`** and **`sf-apm-lib`** must be available in your environment. These libraries can be installed by the following methods:

Add the below-mentioned entries in the `requirements.txt` file.
```
sf-elastic-apm==6.7.2
sf-apm-lib==0.1.1
```
**OR**

Install the below libraries using CLI command.

```
pip install sf-elastic-apm==6.7.2 
pip install sf-apm-lib==0.1.1 
```
### Configuration

Make sure a project and an application are created in the SnappyFlow Server. [Click Here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to know how to create the project and application in SnappyFlow.  

**Add the following entries in the `settings.py` file.**
1. Add the import statements.
   ```
   from sf_apm_lib.snappyflow import Snappyflow
   import os
   ```

2. Add the following entry in `INSTALLED_APPS` block.

   ```
   'elasticapm.contrib.django'
   ```

3. Add the following entry in `MIDDLEWARE` block.

   ```
   'elasticapm.contrib.django.middleware.TracingMiddleware'
   ```

4. Add the following source code to integrate the Django application to the SnappyFlow.

   ```
   try: 
      sf = Snappyflow()  
   
      # Add below part to manually configure the initialization 
      SF_PROJECT_NAME = os.getenv('SF_PROJECT_NAME') 
      SF_APP_NAME = os.getenv('SF_APP_NAME') 
      SF_PROFILE_KEY = os.getenv('SF_PROFILE_KEY') 
      sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
      # End of manual configuration 
      SFTRACE_CONFIG = sf.get_trace_config()
      
      ELASTIC_APM={ 
         # Specify your service name for tracing 
         'SERVICE_NAME': "custom-service" , 
         'SERVER_URL': SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
         'GLOBAL_LABELS': SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
         'VERIFY_SERVER_CERT': SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT'), 
         'SPAN_FRAMES_MIN_DURATION': SFTRACE_CONFIG.get('SFTRACE_SPAN_FRAMES_MIN_DURATION'), 
         'STACK_TRACE_LIMIT': SFTRACE_CONFIG.get('SFTRACE_STACK_TRACE_LIMIT'), 
         'CAPTURE_SPAN_STACK_TRACES': SFTRACE_CONFIG.get('SFTRACE_CAPTURE_SPAN_STACK_TRACES'), 
         'DJANGO_TRANSACTION_NAME_FROM_ROUTE': True, 
         'CENTRAL_CONFIG': False, 
         'METRICS_INTERVAL': '0s'
      } 
   except Exception as error: 
      print("Error while fetching snappyflow tracing configurations", error)
   ```

5. In the **Kubernetes deployment** file, add `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as environment variables.

   ```yaml
   #deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
   name: python-app
   labels:
      app: python-app
   spec:
   containers:
   - name: python-app
      image: imagename/tag:version
      env:
      - name: SF_PROFILE_KEY
         value: <profle-key>
      - name: SF_PROJECT_NAME
         value: <project_name>
      - name: SF_APP_NAME
         value: <app-name>
   ```
6. If the deployment is with **helm charts**, add the environment variables: `SF_PROJECT_NAME`, `SF_APP_NAME`, and `SF_PROFILE_KEY` in the `values.yaml` file and use them in the deployment file of charts. 

      ```yaml
      #values.yaml
      global:
      # update the sfappname, sfprojectname and key with the proper values
      sfappname: <app-name>
      sfprojectname: <project-name>
      key: <profile-key>
      
      replicaCount: 1
      image:
      repository: djangoapp
      pullPolicy: IfNotPresent
      tag: "latest"
      ```

7. Pass the global section key-value from the `value.yaml` by setting the `deployment.yaml` as below :

      ```yaml
      #deployment.yaml
      apiVersion: apps/v1
      kind: Deployment
      spec:
      containers:
         - name: {{ .Chart.Name }}
            image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
            imagePullPolicy: {{ .Values.image.pullPolicy }}
            env:
            - name: SF_PROFILE_KEY
            value: {{ .Values.global.key }}
            - name: SF_PROJECT_NAME
            value: {{ .Values.global.sfprojectname }}
            - name: SF_APP_NAME
            value: {{ .Values.global.sfappname }}
      ```
### Verfication

Follow the below steps to verify that SnappyFlow has started to collect the trace.

1. Login into  SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. Navigate to the **Tracing** section and click the `View Transactions` button
   <img src="/img/Trace_Service_Map.png" />

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.
   <img src="/img/Trace_AggregateTab.png" /><br/>
     <img src="/img/Trace_RealTime.png" /><br/>

### Troubleshoot

1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `settings.py`.

2. To enable the debug logs, add the below key-value pair in the ELASTIC_APM block of the `settings.py`.

   ```
   'DEBUG':'true'
   ```
##### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

## Flask

### Prerequisite
To enable tracing for the application based on Flask Framework `sf-elastic-apm` and `sf-apm-lib` must be available in your environment. These libraries can be installed by following methods:

Add the below-mentioned entries in the `requirements.txt` file.
```
sf-elastic-apm[flask]==6.7.2
sf-apm-lib==0.1.1
```
**OR**

Install the libraries using CLI commands.

```
pip install sf-elastic-apm[flask]==6.7.2 
pip install sf-apm-lib==0.1.1 
```
### Configuration

Make sure that a project and an application are created in the SnappyFlow Server. [Click Here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to know how to create the project and application in SnappyFlow.  

**Add following entries in the `app.py`file.** 

1. Add imports statement

   ```
   from elasticapm.contrib.flask import ElasticAPM 
   from sf_apm_lib.snappyflow import Snappyflow 
   import os
   ```

2. Add the following source code to integrate the Flask application to the SnappyFlow.
   
   ```
      sf = Snappyflow() 
      # Add below part to manually configure the initialization 
      SF_PROJECT_NAME = os.getenv('SF_PROJECT_NAME') 
      SF_APP_NAME = os.getenv('SF_APP_NAME') 
      SF_PROFILE_KEY = os.getenv('SF_PROFILE_KEY') 
      sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
      # End of manual configuration   
      SFTRACE_CONFIG = sf.get_trace_config()
      app.config['ELASTIC_APM'] = { 
          # Specify your service name for tracing 
         'SERVICE_NAME': 'flask-service', 
         'SERVER_URL': SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
         'GLOBAL_LABELS': SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
         'VERIFY_SERVER_CERT': SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT'), 
         'SPAN_FRAMES_MIN_DURATION': SFTRACE_CONFIG.get('SFTRACE_SPAN_FRAMES_MIN_DURATION'), 
         'STACK_TRACE_LIMIT': SFTRACE_CONFIG.get('SFTRACE_STACK_TRACE_LIMIT'), 
         'CAPTURE_SPAN_STACK_TRACES': SFTRACE_CONFIG.get('SFTRACE_CAPTURE_SPAN_STACK_TRACES'), 
         'METRICS_INTERVAL': '0s'
       } 
       apm = ElasticAPM(app) 
   ```
3. In the **Kubernetes deployment** file, add `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as environment variables.
   
      ```yaml
      #deployment.yaml
      apiVersion: apps/v1
      kind: Deployment
      metadata:
      name: python-app
      labels:
         app: python-app
      spec:
      containers:
      - name: python-app
         image: imagename/tag:version
         env:
         - name: SF_PROFILE_KEY
            value: <profle-key>
         - name: SF_PROJECT_NAME
            value: <project_name>
         - name: SF_APP_NAME
            value: <app-name>
      ```
4. If the application is deployed using **helm charts**, add the environment variables:  `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` in the `values.yaml` and use the same in the deployment file of charts. 

      ```yaml
      #values.yaml
      global:
      # update the sfappname, sfprojectname and key with the proper values
      sfappname: <app-name>
      sfprojectname: <project-name>
      key: <profile-key>
      
      replicaCount: 1
      image:
      repository: djangoapp
      pullPolicy: IfNotPresent
      tag: "latest"
      ```

5. Pass the global section key-value from the `value.yaml` by setting the `deployment.yaml` as below :

      ```yaml
      #deployment.yaml
      apiVersion: apps/v1
      kind: Deployment
      spec:
      containers:
         - name: {{ .Chart.Name }}
            image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
            imagePullPolicy: {{ .Values.image.pullPolicy }}
            env:
            - name: SF_PROFILE_KEY
            value: {{ .Values.global.key }}
            - name: SF_PROJECT_NAME
            value: {{ .Values.global.sfprojectname }}
            - name: SF_APP_NAME
            value: {{ .Values.global.sfappname }}
      ```
### Verification

Follow the below steps to verify that SnappyFlow has started to collect the trace.
1. Login into  SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. Navigate to the **Tracing** section and click the `View Transactions` button
	   <img src="/img/Trace_Service_Map.png" />
	
6. You can view the traces in the **Aggregate** and the **Real Time** tabs.
	   <img src="/img/Trace_AggregateTab.png" /><br/>
	   <img src="/img/Trace_RealTime.png" /><br/>
	
### Troubleshooting
1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `app.py`.
2. To enable the debug logs, add the below key-value pair in the `app. config` block of the `app.py`.

   ```
   'DEBUG':'true'
   ```
#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-flask) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.



## Celery

:::note

The Celery configuration explained below is based on redis broker.

:::

### Prerequisite

To enable tracing for the application based on Flask Framework **`sf-elastic-apm`**, **`redis`** and **`sf-apm-lib` **must be available in your environment. 

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install redis 
   pip install sf-apm-lib==0.1.1 
   ```

### Configuration 

Add following code at start of the file where celery app is initialized to setup elastic apm client

   ```
   from sf_apm_lib.snappyflow import Snappyflow 
   from elasticapm import Client, instrument 
   from elasticapm.contrib.celery import register_exception_tracking, register_instrumentation 

   instrument()

   try: 
      sf = Snappyflow() # Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml 
      
      # Add below part to manually configure the initialization 
      SF_PROJECT_NAME = '<SF_PROJECT_NAME>' # Replace with appropriate Snappyflow project name 
      SF_APP_NAME = '<SF_APP_NAME>' # Replace with appropriate Snappyflow app name 
      SF_PROFILE_KEY = '<SF_PROFILE_KEY>' # Replace Snappyflow Profile key 
      sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
      # End of manual configuration 

      SFTRACE_CONFIG = sf.get_trace_config() 
      apm_client = Client(service_name= '<Service_Name>', # Specify service name for tracing
         server_url= SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
         global_labels= SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
         verify_server_cert= SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT')
      )

      register_exception_tracking(apm_client) 
      register_instrumentation(apm_client) 
   except Exception as error: 
      print("Error while fetching snappyflow tracing configurations", error) 
   ```

### Verification

Once instrumentation is done and celery worker is running, we can see trace for each celery task in Snappyflow server. Follow the below steps to view the traces.

1. Login into  SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. Navigate to the **Tracing** section and click the `View Transactions` button.
   <img src="/img/Trace_Service_Map.png" />
6. You can view the traces in the **Aggregate** and the **Real Time** tabs.
   <img src="/img/Trace_AggregateTab.png" /><br/>
     <img src="/img/Trace_RealTime.png" /><br/>

#### Reference Code

Refer complete code: https://github.com/snappyflow/tracing-reference-apps/blob/master/ref-celery/tasks.py

