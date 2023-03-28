# Python tracing
## Overview
The Python tracing automatically instruments APIs, frameworks and application servers. The sfAPM python agent collects and sends the tracing metrics and the correlated application logs to the SnappyFlow server.

<div class="blue_textbox">
	<b>Supported Python versions</b> 
	<p>
		Python 3.6, 3.7, 3.8, 3.9, 3.10, 3.11 </p>
	<b>Supported Web Frameworks</b>
	<p>
		Django 1.11, 2.0, 2.1, 2.2, 3.0, 3.1, 3.2, 4.0 <br/>
      Flask  1.0, 1.1, 2.0 <br/>
	</p>
</div>

### Supported Platforms

**[Instances](python#instances)**

**[Docker](python#docker)**

**[Kubernetes](python#kubernetes)**

**[ECS](python#ecs)**

**[AWS Lambda](python#aws-lambda)**

### Supported Trace Features 

Below is the list of the supported trace features:

* Distributed Tracing
* Transaction Mapping
* [Log Correlation](python#log-correlation)
* [Capture request Body from Trace](python#capture-request-body-from-trace)
* Service Map

:::note

**Log Correlation** and **Capture Request Body** are not default trace features. Based on the requirement user can enable them by adding additional configurations.

:::

## Instances 

#### Supported Frameworks

**[Django](python#django)**

**[Flask](python#flask)**

#### Standard Library Modules

**[Script](python#script)**

**[Celery](python#celery)**


### Django

The below steps explain how to enable the tracing for the application based on Django Framework.

#### Prerequisite

To enable tracing for the application based on Django Framework **`sf-elastic-apm`** and **`sf-apm-lib` **must be available in your environment. These libraries can be installed by the following methods:

Add the below-mentioned entries in the `requirements.txt` file.

```
sf-elastic-apm==6.7.2
sf-apm-lib==0.1.1
```
**OR**

Install the libraries using CLI.

```
pip install sf-elastic-apm==6.7.2 
pip install sf-apm-lib==0.1.1 
```

#### Configuration
##### Case 1: sfAgent available in your instance
In this case, the trace agent picks up the `profileKey`, `projectName`, and `appName` from the `config.yaml` file. 

**Add the below entries in the `settings.py` file.** <br/>

1. Add the import statement. 

   ```
   from sf_apm_lib.snappyflow import Snappyflow 
   ```
   
2. Add the following entry in `INSTALLED_APPS` block.

   ```
   'elasticapm.contrib.django'
   ```

3.  Add the following entry in `MIDDLEWARE` block.

   ```
   'elasticapm.contrib.django.middleware.TracingMiddleware'
   ```
4. Add the following source code to integrate the Django application with SnappyFlow. 

   ```
   try: 
      # Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml
      sf = Snappyflow()  
      SFTRACE_CONFIG = sf.get_trace_config()
   
      ELASTIC_APM={ 
         # Specify your service name for tracing 
         'SERVICE_NAME': "custom-service" , 
         'SERVER_URL': SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
         'GLOBAL_LABELS': SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
         'VERIFY_SERVER_CERT': SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT'), 
         'SPAN_FRAMES_MIN_DURATION':    SFTRACE_CONFIG.get('SFTRACE_SPAN_FRAMES_MIN_DURATION'), 
         'STACK_TRACE_LIMIT': SFTRACE_CONFIG.get('SFTRACE_STACK_TRACE_LIMIT'), 
         'CAPTURE_SPAN_STACK_TRACES': SFTRACE_CONFIG.get('SFTRACE_CAPTURE_SPAN_STACK_TRACES'), 
         'DJANGO_TRANSACTION_NAME_FROM_ROUTE': True, 
         'CENTRAL_CONFIG': False, 
         'METRICS_INTERVAL': '0s'
      } 
   except Exception as error: 
      print("Error while fetching snappyflow tracing configurations", error) 
   ```

##### Case 2: sfAgent not installed in your instance

In this case, follow the below steps to enable tracing.

1. Make sure that the project and application are created in the SnappyFlow Server. [Click here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to know how to create the project and application in SnappyFlow.  

2. Export `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as the environment variables.
   ``` 
   # Update the below default values with proper values
     export SF_PROJECT_NAME=<SF_PROJECT_NAME>
     export SF_APP_NAME=<SF_APP_NAME>
     export SF_PROFILE_KEY=<SF_PROFILE_KEY> 
   ```

**Add the following entries in the `settings.py` file.** 
      

1. Add the import statement. 
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


#### Verification

Follow the below steps to verify that SnappyFlow has started to collect the trace.

1. Login into  SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. Navigate to the **Tracing** section and click the `View Transactions` button.
   <img src="/img/Trace_Service_Map.png" />

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.
   <img src="/img/Trace_AggregateTab.png" /><br/>
     <img src="/img/Trace_RealTime.png" /><br/>

#### Troubleshooting

1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `settings.py`.

2. To enable the debug logs, add the below key-value pair in the ELASTIC_APM block of the `settings.py`.

```
   'DEBUG':'true'
```

  ​    
#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

### Flask

Follow the below steps to enable the tracing for the application based on Flask Framework.

#### Prerequisite

To enable tracing for the application based on Flask Framework **`sf-elastic-apm`** and **`sf-apm-lib` **must be available in your environment. These libraries can be installed by following methods:

Add the below-mentioned entries in the `requirements.txt` file.

```
sf-elastic-apm[flask]==6.7.2
sf-apm-lib==0.1.1
```

**OR**

Install the libraries using CLI.

```
pip install sf-elastic-apm[flask]==6.7.2 
pip install sf-apm-lib==0.1.1 
```

#### Configuration

##### Case 1: sfAgent available in your instance

In this case, the trace agent picks up the `profileKey`, `projectName`, and `appName` from the `config.yaml` file. 

**Add the below entries in the `app.py` file.**

1. Add the import statement. 

```
from elasticapm.contrib.flask import ElasticAPM
from sf_apm_lib.snappyflow import Snappyflow 
```

2. Add the following source code to integrate the express application with SnappyFlow.

```
   # Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml
   sf = Snappyflow() 
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
##### Case 2: sfAgent is not installed in your instance

In this case, follow the below steps to enable tracing.

1. Make sure that the project and application is created in the SnappyFlow Server. [Click Here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to know how to create the project and application in SnappyFlow.

2. Export `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as the environment variables.
   ```         
   #Update the below default values with proper values
   SF_PROJECT_NAME=<project name>
   SF_APP_NAME=<app-name>
   SF_PROFILE_KEY=<profile-key>
   ```
   

**Add the following entries in the app.py file.**

  1. Add the import statement. 
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
         'VERIFY_SERVER_CERT':   SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT'), 
       'SPAN_FRAMES_MIN_DURATION': SFTRACE_CONFIG.get('SFTRACE_SPAN_FRAMES_MIN_DURATION'), 
       'STACK_TRACE_LIMIT': SFTRACE_CONFIG.get('SFTRACE_STACK_TRACE_LIMIT'), 
       'CAPTURE_SPAN_STACK_TRACES': SFTRACE_CONFIG.get('SFTRACE_CAPTURE_SPAN_STACK_TRACES'), 
       'METRICS_INTERVAL': '0s'
        } 
       apm = ElasticAPM(app) 
      ```

#### Verification

Follow the below steps to verify that SnappyFlow has started to collect the trace.

1. Login into  SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. Navigate to the **Tracing** section and click the `View Transactions` button.
   <img src="/img/Trace_Service_Map.png" />

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.
   <img src="/img/Trace_AggregateTab.png" /><br/>
     <img src="/img/Trace_RealTime.png" /><br/>

#### Troubleshooting
1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `app.py`.
2. To enable the debug logs, add the below key-value pair in the app.config block of the `app.py`.

   ```
   'DEBUG':'true'
   ```

#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-flask) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

### Script

1. Install following requirements

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add following code at start of script file to setup elastic apm client

   ```
   import elasticapm 
   from sf_apm_lib.snappyflow import Snappyflow 

   sf = Snappyflow() # Initialize Snappyflow. By default intialization will pick profileKey, projectName and appName from sfagent config.yaml.

   # Add below part to manually configure the initialization 
   SF_PROJECT_NAME = '<Snappyflow Project Name>' 
   SF_APP_NAME = '<Snappyflow App Name>' 
   SF_PROFILE_KEY = '<Snappyflow Profile Key>' 
   sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
   # End of manual configuration

   trace_config = sf.get_trace_config() # Returns trace config 
   client = elasticapm.Client(
      service_name="<Service name> ",# Specify service name for tracing 
      server_url=trace_config['SFTRACE_SERVER_URL'], 
      verify_cert=trace_config['SFTRACE_VERIFY_SERVER_CERT'], 
      global_labels=trace_config['SFTRACE_GLOBAL_LABELS'] 
   ) 
   elasticapm.instrument()  # Only call this once, as early as possible. 
   ```

3. Once instrumentation is completed we can create custom transaction and span

   Example

   ```
   def main(): 
       sess = requests.Session() 
       for url in [ 'https://www.elastic.co', 'https://benchmarks.elastic.co' ]: 
           resp = sess.get(url) 
           time.sleep(1) 
   client.begin_transaction(transaction_type="script") 
   main() 
   # Record an exception 
   try: 
       1/0 
   except ZeroDivisionError: 
       ident = client.capture_exception() 
       print ("Exception caught; reference is %s" % ident) 
   client.end_transaction(name=__name__, result="success") 
   ```

   Refer link to know more: 

   https://www.elastic.co/guide/en/apm/agent/python/master/instrumenting-custom-code.html 

4. Now run you script and test your trace in snappyflow server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created, Go to View dashboard -> Click on Tracing on left side bar -> Click on view transaction -> Go to real time tab 


5. Refer complete script: 

   https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-django/python_script_trace.py 

### Celery

1. Install following requirements (Following example is based on redis broker)

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install redis 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add following code at start of the file where celery app is initialized to setup elastic apm client

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
      apm_client = Client(
         service_name= '<Service_Name>', # Specify service name for tracing
         server_url= SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
         global_labels= SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
         verify_server_cert= SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT')
      )
    
      register_exception_tracking(apm_client) 
      register_instrumentation(apm_client) 
   except Exception as error: 
      print("Error while fetching snappyflow tracing configurations", error) 
   ```

3. Once instrumentation is done and celery worker is running we can see trace for each celery task in Snappyflow server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created, Go to View dashboard -> Click on Tracing on left side bar -> Click on view transaction -> Go to real time tab 

4. Refer complete code: 

   https://github.com/snappyflow/tracing-reference-apps/blob/master/ref-celery/tasks.py 


## Kubernetes
### Django

Follow the below steps to enable the tracing for the applications based on Django Framework.

#### Prerequisite

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

#### Configuration

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



#### Verification

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

##### Troubleshooting

1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `settings.py`.

2. To enable the debug logs, add the below key-value pair in the ELASTIC_APM block of the `settings.py`.

   ```
   'DEBUG':'true'
   ```

   ​    
##### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

### Flask

Follow the below steps to enable tracing for applications based on Flask Framework.

#### Prerequisite
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

#### Configuration

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

#### Verification
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
#### Troubleshooting
1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `app.py`.
2. To enable the debug logs, add the below key-value pair in the `app. config` block of the `app.py`.

   ```
   'DEBUG':'true'
   ```

#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-flask) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

### Celery

1. Install following requirements (Following example is based on redis broker)

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install redis 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add following code at start of the file where celery app is initialized to setup elastic apm client

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

3. Once instrumentation is done and celery worker is running we can see trace for each celery task in Snappyflow server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created, Go to View dashboard -> Click on Tracing on left side bar -> Click on view transaction -> Go to real time tab 

4. Refer complete code: 

   https://github.com/snappyflow/tracing-reference-apps/blob/master/ref-celery/tasks.py 

## Docker
### Django
Follow the below steps to enable the tracing for the application based on Django Framework.
#### Configuration

1. Add below mentioned entries in requirements.txt file and install these in your project environment.

   ```
   sf-elastic-apm==6.7.2
   sf-apm-lib==0.1.1
   ```

   or 

   Install the below libraries using CLI.

   ```docker
   RUN pip install sf-elastic-apm==6.7.2 
   RUN pip install sf-apm-lib==0.1.1 
   ```

2. Make sure the project and application is created in the SnappyFlow Server. **[Click Here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal)** to know how to create the project and application in SnappyFlow.

3. Add the following entries in `settings.py` file.

   1. Add the import statement.

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

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in `docker-compose.yml` or docker stack deployment file or at command line when using docker run command for deployment. 

   Follow the below referrence documentation:

   https://docs.docker.com/compose/environment-variables/ 

   Docker RUN: 

   ```docker
   docker run -d -t -i -e SF_PROJECT_NAME='' \  
   -e SF_APP_NAME='' \ 
   -e SF_PROFILE_KEY='' \ 
   -p 80:80 \ 
   --name <container_name> <dockerhub_id/image_name> 
   ```


#### Verification

Once your application is up and running, follow the below steps to verfiy that the SnappyFlow has started to collect the traces.

1. Make sure that the project and the application is created.
2. In the app, click the **View Dashboard** icon.
3. In the **Dashboard** window, go to **Tracing** section.
4. In the **Tracing** section, click the **View Transactions** button.
      <img src="/img/Trace_Service_Map.png" /><br/>
5. Now you can view the traces in **Aggregate** and **Real Time tabs**.
	 <img src="/img/Trace_AggregateTab.png" /><br/>
         <img src="/img/Trace_RealTime.png" /><br/>
	

#### Troubleshoot Steps

1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `settings.py`.

2. To enable the debug logs, add the below key-value pair in the ELASTIC_APM block of the `settings.py`.

   ```
   'DEBUG':'true'
   ```

   ​    
#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

### Flask

Follow the below steps to enable the tracing for the application based on Flask Framework.

##### Configuration

1. Add the below mentioned entries in requirements.txt file to install sf-elastic-apm and sf-apm-lib in your environment.
   
   ```
   sf-elastic-apm[flask]==6.7.2
   sf-apm-lib==0.1.1
   ```

   or 

   Install the below libraries using CLI.

   ```
   pip install sf-elastic-apm[flask]==6.7.2 
   pip install sf-apm-lib==0.1.1 
   ```
2. Make sure the project and application is created in the SnappyFlow Server. **[Click Here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal)** to know how to create the project and application in SnappyFlow.  

3. Add following entries in the `app.py`. 

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

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in `docker-compose.yml` or docker stack deployment file or at command line when using docker run command for deployment. 

   Follow the below referrence documentation:

   https://docs.docker.com/compose/environment-variables/ 

   Docker RUN: 

   ```docker
   docker run -d -t -i -e SF_PROJECT_NAME='' \  
   -e SF_APP_NAME='' \ 
   -e SF_PROFILE_KEY='' \ 
   -p 80:80 \ 
   --name <container_name> <dockerhub_id/image_name> 
   ```

##### Verification

Once your application is up and running, follow the below steps to verfiy that the SnappyFlow has started to collect the traces.
1. Make sure that the project and the application is created.
2. In the app, click the **View Dashboard** icon.
3. In the **Dashboard** window, go to **Tracing** section.
4. In the **Tracing** section, click the **View Transactions** button.
      <img src="/img/Trace_Service_Map.png" /><br/>
5. Now you can view the traces in **Aggregate** and **Real Time tabs**.
	 <img src="/img/Trace_AggregateTab.png" /><br/>
	  <img src="/img/Trace_RealTime.png" /><br/>
	
##### Troubleshooting
1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `app.py`.
2. To enable the debug logs, add the below key-value pair in the `app.config` block of the `app.py`.

   ```
   'DEBUG':'true'
   ```

### Celery

1. Install following requirements (Following example is based on redis broker)

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install redis 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add following code at start of the file where celery app is initialized to setup elastic apm client

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
      apm_client = Client(
         service_name= '<Service_Name>', # Specify service name for tracing
         server_url= SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
         global_labels= SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
         verify_server_cert= SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT')
      )

      register_exception_tracking(apm_client) 
      register_instrumentation(apm_client) 
   except Exception as error: 
      print("Error while fetching snappyflow tracing configurations", error) 
   ```

3. Once instrumentation is done and celery worker is running we can see trace for each celery task in Snappyflow server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created, Go to View dashboard -> Click on Tracing on left side bar -> Click on view transaction -> Go to real time tab 

4. Refer complete code: 

   https://github.com/snappyflow/tracing-reference-apps/blob/master/ref-celery/tasks.py 

## ECS
### Django

Follow the below steps to enable the tracing for the applications based on Django Framework.

#### Configuration


1. Add the below mentioned entries in requirements.txt file to install sf-elastic-apm and sf-apm-lib in your environment.

   ```
   sf-elastic-apm==6.7.2
   sf-apm-lib==0.1.1
   ```
   or 

   Install the below libraries using CLI.

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install sf-apm-lib==0.1.1 
   ```

2. Make sure the project and application is created in the SnappyFlow Server. **[Click Here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal)** to know how to create the project and application in SnappyFlow.

3. Add the following entries in `settings.py` file.

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

4. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in add container section of task definitions. 

   Refer the below documentation:
  
	https://catalog.us-east-1.prod.workshops.aws/workshops/c6bdf8dc-d2b2-4dbd-b673-90836e954745/en-US/container-migration/create-task-definition
   

#### Verification

Once your application is up and running, follow the below steps to verfiy that the SnappyFlow has started to collect the traces..

1. Make sure that the project and the application is created.
2. In the app, click the **View Dashboard** icon.
3. In the **Dashboard** window, go to **Tracing** section.
4. In the **Tracing** section, click the **View Transactions** button.
      <img src="/img/Trace_Service_Map.png" /><br/>
5. Now you can view the traces in **Aggregate** and **Real Time tabs**.
	 <img src="/img/Trace_AggregateTab.png" /><br/>
	  <img src="/img/Trace_RealTime.png" /><br/>
	

#### Troubleshoot Steps

1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `settings.py`.

2. To enable the debug logs, add the below key-value pair in the ELASTIC_APM block of the `settings.py`.

   ```
   'DEBUG':'true'
   ```

   ​    
#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

### Flask

Follow the below steps to enable the tracing for the application based on Flask Framework.

##### Configuration

1. Add the below mentioned entries in requirements.txt file to install sf-elastic-apm and sf-apm-lib in your environment.
   
   ```
   sf-elastic-apm[flask]==6.7.2
   sf-apm-lib==0.1.1
   ```

   or 

   Install the below libraries using CLI.

   ```
   pip install sf-elastic-apm[flask]==6.7.2 
   pip install sf-apm-lib==0.1.1 
   ```
2. Make sure the project and application is created in the SnappyFlow Server. **[Click Here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal)** to know how to create the project and application in SnappyFlow.  

3. Add following entries in the `app.py`. 

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
4. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in add container section of task definitions. 

   Refer the below documentation:
  
	https://catalog.us-east-1.prod.workshops.aws/workshops/c6bdf8dc-d2b2-4dbd-b673-90836e954745/en-US/container-migration/create-task-definition
   

##### Verification

Once your application is up and running, follow the below steps to verfiy that the SnappyFlow has started to collect the traces.
1. Make sure that the project and the application is created.
2. In the app, click the **View Dashboard** icon.
3. In the **Dashboard** window, go to **Tracing** section.
4. In the **Tracing** section, click the **View Transactions** button.
      <img src="/img/Trace_Service_Map.png" /><br/>
5. Now you can view the traces in **Aggregate** and **Real Time tabs**.
	 <img src="/img/Trace_AggregateTab.png" /><br/>
	  <img src="/img/Trace_RealTime.png" /><br/>
	
##### Troubleshooting
1. If the trace data is not collected in the SnappyFlow server, then check the trace configuration in the `app.py`.
2. To enable the debug logs, add the below key-value pair in the app.config block of the `app.py`.

   ```
   'DEBUG':'true'
   ```

##### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-flask) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

### Celery

1. Install following requirements (Following example is based on redis broker)

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install redis 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add following code at start of the file where celery app is initialized to setup elastic apm client

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
      apm_client = Client(
            service_name= '<Service_Name>', # Specify service name for tracing
            server_url= SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
            global_labels= SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
            verify_server_cert= SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT')
      )

      register_exception_tracking(apm_client) 
      register_instrumentation(apm_client) 
   except Exception as error: 
      print("Error while fetching snappyflow tracing configurations", error) 
   ```

3. Once instrumentation is done and celery worker is running we can see trace for each celery task in Snappyflow server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created, Go to View dashboard -> Click on Tracing on left side bar -> Click on view transaction -> Go to real time tab 

4. Refer complete code: 

   https://github.com/snappyflow/tracing-reference-apps/blob/master/ref-celery/tasks.py 

## AWS Lambda
### Script

1.  Add these python libraries in requirements.txt file. Follow the AWS lambda doc on adding runtime dependency to lambda function. 

   ```
   sf-apm-lib==0.1.1 
   sf-elastic-apm==6.7.2 
   ```

   Ref: https://docs.aws.amazon.com/lambda/latest/dg/python-package-create.html#python-package-create-with-dependency 

2. Instrument lambda function to enable tracing.  

   1. Import Libraries

      ```
      import elasticapm 
      from sf_apm_lib.snappyflow import Snappyflow 
      ```

   2. Add code to get SnappyFlow Trace config, outside lambda handler method. 

      ```python
      sf = Snappyflow()
      SF_PROJECT_NAME = os.environ['SF_PROJECT_NAME'] 
      SF_APP_NAME = os.environ['SF_APP_NAME'] 
      SF_PROFILE_KEY = os.environ['SF_PROFILE_KEY'] 
      sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
      trace_config = snappyflow.get_trace_config() 
      ```

   3. Add custom instrumentation in lambda handler function

      ```python
      def lambda_handler(event, context): 
         client = elasticapm.Client(service_name="<SERVICE_NAME_CHANGEME>", 
            server_url=trace_config['SFTRACE_SERVER_URL'], 
            verify_cert=trace_config['SFTRACE_VERIFY_SERVER_CERT'], 
            global_labels=trace_config['SFTRACE_GLOBAL_LABELS'] 
            ) 
         elasticapm.instrument()  
         client.begin_transaction(transaction_type="script") 
         # DO SOME WORK. No return statements. 
         client.end_transaction(name=__name__, result="success") 
         # RETURN STATEMENT e.g. return response 
      ```

3. Deploy the Lambda function. Follow README to test sample app 

   Sample code for reference: 

   https://github.com/upendrasahu/aws-lambda-python-tracing-sample 

4. Configure Lambda function before trigger/invoke. 

   1. Add the environment variable `SF_PROFILE_KEY` and set the value to your profile key copied from SnappyFlow. 
   2. Add environment variables `SF_APP_NAME` and `SF_PROJECT_NAME` with appropriate values. 
   ![](images/python_aws_picture1.png)

## Capture Request Body from Trace

This feature allows you to save the request body of the HTTP transactions to a specific index such as a log.

:::caution

Request bodies usually contain sensitive data like passwords and credit card numbers. If your service handles data like this, we advise you to enable this feature with care.

:::

### Django
1. Add the below values to enable this feature

    1. Update the **ELASTIC_APM** block with the following key-value pair in the `settings.py`.

      ```
      'CAPTURE_BODY': 'all'
      ```

    2. Add the below line in the try block of tracing instrumentation code in the `settings.py`.

     ```
     # default value is true, 
     SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
     ```
    
2. Follow the below steps in the try block of `settings.py` to customize the document type and destination index. (Optional) 

     1. Add below line to customize the destination index (Default:"log"), Applicable values(log, metric).

     ```
     # default indexType is log, applicable values are log and metric
     SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
     ```
     
     2. Add the below line to customize the document type
     
     ```
     # default documentType is user-input
     SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-input'
     ```

The overall configuration is below:

```
try: 
         
   SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
   SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
   SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-input'
         
   ELASTIC_APM={ 
      'CAPTURE_BODY': 'all'
   } 
except Exception as error: 
   print("Error while fetching snappyflow tracing configurations", error) 

```
### FLASK

1. Add the below values to enable this feature

    1. Update the **app.config['ELASTIC_APM']** block with the following key-value pair in the `app.py`.

      ```
      'CAPTURE_BODY': 'all'
      ```

    2. Add the below line in the try block of tracing instrumentation code in the `app.py`.

     ```
     # default value is true, 
     SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
     ```
    
2. Follow the below steps in the try block of `app.py` to customize the document type and destination index. (Optional) 

     1. Add below line to customize the destination index (Default:"log"), Applicable values(log, metric).

     ```
     # default indexType is log, applicable values are log and metric
     SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
     ```
     
     2. Add the below line to customize the document type
     
     ```
     # default documentType is user-input
     SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-input'
     ```

The overall sample configuration is below:

```
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-input'
app.config['ELASTIC_APM'] = {
   'CAPTURE_BODY': 'all'
}
```


## Log Correlation
log correlation refers to the ability to linking log events from different sources, applications or components of a system to gain a holistic understanding of the system's behavior. When logs are captured, they are automatically correlated with the relevant transaction and span information. This correlation is done based on the shared context information, such as the transaction ID or the span ID.

For example, when an error occurs in an application, SnappyFlow APM capture the error stack trace and link it to the relevant transaction or span. This provides context around the error and helps developers understand which part of the application was responsible for the error.

### Django

To enable log correlation in a Django application, follow the below steps:

#### Configuration

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

##### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

### Flask

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

2. Add  the following code in `app.py` after import statements to set logger configuration.

   i. if the logs are printing on the standard console follow the below steps.
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
   
   ii. if the logs are storing in a specific file location follow the below steps.
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
##### Sample Application Code

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
       {{ toYaml .Values.sfagent.resources | nindent 12 }}
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




​       
