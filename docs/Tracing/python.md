# Python tracing

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


#### Supported Platforms

**[Instances](python#instances)**

**[Docker](python#docker)**

**[Kubernetes](python#kubernetes)**

**[ECS](python#ecs)**

**[AWS Lambda](python#aws-lambda)**

#### Supported Trace Features 

Below is the list of the supported trace features:
 
 <div class="trace_feature">
   <ul >
   <li>Distributed Tracing  </li>
   <li>Transaction Mapping</li>
   <li><span>Log Correlation</span> <a href="#log-correlation"><input type="image" src="/img/link-icon.png" width="18px" /></a></li>
   <li><span>Trace to Log Body</span> <a href="#trace-to-log-body"><input type="image" src="/img/link-icon.png"  width="18px" /></a></li>
   <li>Service Map</li>
   </ul>
 </div>

## Instances 

#### Supported Frameworks

**[Django](python#django)**

**[Flask](python#flask)**

#### Standard Library Modules

**[Script](python#script)**

**[Celery](python#celery)**


### Django

Follow the below steps to enable the tracing for the application based on Django Framework.

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


2. 
   - If the agent is already installed in your instance, the trace agent picks up the profileKey, projectName, and appName from the config.yaml file. Add the below entries in the `settings.py` file <br/><br/>

   i. Add the import statement. 
   ```
   from sf_apm_lib.snappyflow import Snappyflow 
   ```
   <br/>
   ii. Add the following entry in `INSTALLED_APPS` block.

   ```
   'elasticapm.contrib.django'
   ```

   iii. Add the following entry in `MIDDLEWARE` block.

   ```
   'elasticapm.contrib.django.middleware.TracingMiddleware'
   ```
   
   iv. Add the following source code to integrate the Django application to the SnappyFlow.      
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
<br/>
   - If the sfAgent is not installed in your instance, then follow the below steps:<br/><br/>
   
      i. Make sure the project and application is created in the SnappyFlow Server. **[Click Here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal)** to know how to create the project and application in SnappyFlow.  <br/><br/>

      ii. Export `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as the environment variables.

      ``` 
      # Update the below default values with proper values
      export SF_PROJECT_NAME=<SF_PROJECT_NAME>
      export SF_APP_NAME=<SF_APP_NAME>
      export SF_PROFILE_KEY=<SF_PROFILE_KEY> 
      ``` 
      <br/>
      iii. Add the following entries in the `settings.py` file. <br/><br/>
   
    
      1. Add the import statement. 
         ```
         from sf_apm_lib.snappyflow import Snappyflow 
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

1. After following the above steps, if the trace data not collected in the SnappyFlow server check the trace configuration you added in the `settings.py`.

2. To enable the debug logs, add the below key-value pair in the ELASTIC_APM block of the `settings.py`.

   ```
   'DEBUG':'true'
   ```

       
#### Sample Application Code

The below link contains the sample application with the trace enabled by following the configuration mentioned in the above sections.
 
[Click Here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the reference application.

### Flask

1. Add 

   ```python
   sf-elastic-apm[flask]==6.7.2
   sf-apm-lib==0.1.1
   ```

   entries in requirements.txt file and install these in your project environment 

   or 

   Install the below libraries using CLI.

   ```
   pip install sf-elastic-apm[flask]==6.7.2 
   pip install sf-apm-lib==0.1.1 
   ```

2. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variable. 

3. Add following entries in `app.py` 

   1. Add imports statement

      ```python
      from elasticapm.contrib.flask import ElasticAPM 
      from sf_apm_lib.snappyflow import Snappyflow 
      ```

   2. Get trace config

      ```python
      sf = Snappyflow() # Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml

      # Add below part to manually configure the initialization 
      SF_PROJECT_NAME = os.getenv('SF_PROJECT_NAME') 
      SF_APP_NAME = os.getenv('SF_APP_NAME') 
      SF_PROFILE_KEY = os.getenv('SF_PROFILE_KEY') 
      sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
      # End of manual configuration

      SFTRACE_CONFIG = sf.get_trace_config()

      # Start Trace to log feature section
      # Add below line of code to enable Trace to log feature:
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      # Option Configs for trace to log
      # Add below line to provide custom documentType (Default:"user-input"):
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      # Add below line to provide destination index (Default:"log"):
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' # Applicable values(log, metric)
      # End trace to log section 
      ```

   3. Initialize elastic apm and instrument it to flask app

      ```python
      app.config['ELASTIC_APM'] = { 
          'SERVICE_NAME': '<SERVICE_NAME>', # Specify your service name for tracing 
          'SERVER_URL': SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
          'GLOBAL_LABELS': SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
          'VERIFY_SERVER_CERT': SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT'), 
          'SPAN_FRAMES_MIN_DURATION': SFTRACE_CONFIG.get('SFTRACE_SPAN_FRAMES_MIN_DURATION'), 
          'STACK_TRACE_LIMIT': SFTRACE_CONFIG.get('SFTRACE_STACK_TRACE_LIMIT'), 
          'CAPTURE_SPAN_STACK_TRACES': SFTRACE_CONFIG.get('SFTRACE_CAPTURE_SPAN_STACK_TRACES'), 
          'DEBUG': True,
          'METRICS_INTERVAL': '0s'
      } 
      apm = ElasticAPM(app) 
      ```

   4. Once your server is up and running you can check trace in Snappyflow Server. 

      For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

      Once project and app name is created, Go to View dashboard -> Click on Tracing on lef side bar -> Click on view transaction -> Go to real time tab<br/><br/>

 :::note 
    'CAPTURE_BODY':'all' config should be present in apm agent code instrumentation for Trace to Log feature. 
 :::note


### Script

1. Install following requirements

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add following code at start of script file to setup elastic apm client

   ```python
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

   ```python
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

   ```python
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

#### Configuration

1. Add the below mentioned entries in requirements.txt file to install sf-elastic-apm and sf-apm-lib in your environment.

   ```python
   sf-elastic-apm==6.7.2
   sf-apm-lib==0.1.1
   ```

   or 

   Install the below libraries using CLI.

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add the following entries in `settings.py` file.

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

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in Kubernetes deployment file.
   
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


   If the deployment is with helm charts, provide the above variables in the `values.yaml` and use them in the deployment file of charts. 

      ```yaml
      #values.yaml
      global:
      # update the sfappname, sfprojectname and key with the proper values
      sfappname: <app-name>
      sfprojectname: <project-name>
      sfappname_key: snappyflow/appname
      sfprojectname_key: snappyflow/projectname
      key: <profile-key>

      replicaCount: 1
      image:
      repository: djangoapp
      pullPolicy: IfNotPresent
      tag: "latest"
      ```

      Pass the global section key-value from the `value.yaml` by setting the `deployment.yaml` as below :

      ```yaml
      #deploymet.yaml
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

Once your application is up and running, follow the below steps to verfiy that the SnappyFlow has started to collect the traces.

1. Make sure that the project and the application is created.
2. In the app, click the **View Dashboard** icon.
3. In the **Dashboard** window, go to **Tracing** section.
4. In the **Tracing** section, click the **View Transactions** button.
      <img src="/img/Trace_Service_Map.png" /><br/>
5. Now you can view the traces in **Aggregate** and **Real Time tabs**.
	 <img src="/img/Trace_AggregateTab.png" /><br/>
	  <img src="/img/Trace_RealTime.png" /><br/>
       
#### Sample Application Code

The below link contains the sample application with the trace enabled by following the configuration mentioned in the above sections.
 
[Click Here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the reference application.

### Flask

1. Add 

   ```python
   sf-elastic-apm[flask]==6.7.2
   sf-apm-lib==0.1.1
   ```

   entries in requirements.txt file and install these in your project environment 

   or 

   Install through CLI using 

   ```docker
   RUN pip install sf-elastic-apm[flask]==6.7.2 
   RUN pip install sf-apm-lib==0.1.1 
   ```

2. Add following entries in app.py 

   1. Add imports statement

      ```python
      from elasticapm.contrib.flask import ElasticAPM 
      from sf_apm_lib.snappyflow import Snappyflow 
      ```

   2. Get trace config

      ```python
      sf = Snappyflow() # Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml

      # Add below part to manually configure the initialization 
      SF_PROJECT_NAME = os.getenv('SF_PROJECT_NAME') 
      SF_APP_NAME = os.getenv('SF_APP_NAME') 
      SF_PROFILE_KEY = os.getenv('SF_PROFILE_KEY') 
      sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
      # End of manual configuration 

      SFTRACE_CONFIG = sf.get_trace_config()

      # Start Trace to log feature section
      # Add below line of code to enable Trace to log feature:
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      # Option Configs for trace to log
      # Add below line to provide custom documentType (Default:"user-input"):
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      # Add below line to provide destination index (Default:"log"):
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' # Applicable values(log, metric)
      # End trace to log section 
      ```

   3. Initialize elastic apm and instrument it to flask app

      ```python
      app.config['ELASTIC_APM'] = { 
         'SERVICE_NAME': '<SERVICE_NAME>', # Specify your service name for tracing 
         'SERVER_URL': SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
         'GLOBAL_LABELS': SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
         'VERIFY_SERVER_CERT': SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT'), 
         'SPAN_FRAMES_MIN_DURATION': SFTRACE_CONFIG.get('SFTRACE_SPAN_FRAMES_MIN_DURATION'), 
         'STACK_TRACE_LIMIT': SFTRACE_CONFIG.get('SFTRACE_STACK_TRACE_LIMIT'), 
         'CAPTURE_SPAN_STACK_TRACES': SFTRACE_CONFIG.get('SFTRACE_CAPTURE_SPAN_STACK_TRACES'), 
         'DEBUG': True,
         'METRICS_INTERVAL': '0s'
      } 
      apm = ElasticAPM(app) 
      ```

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in Kubernetes deployment file. 

   https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/ 

   If deploying with helm provide above variables in values.yaml and use them in deployment file of charts. 

   https://phoenixnap.com/kb/helm-environment-variables

4. Once your server is up and running you can check trace in Snappyflow Server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created, Go to View dashboard -> Click on Tracing on lef side bar -> Click on view transaction -> Go to real time tab 

 :::note 
   'CAPTURE_BODY':'all' config should be present in apm agent code instrumentation for Trace to Log feature. 
 :::note

### Celery

1. Install following requirements (Following example is based on redis broker)

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install redis 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add following code at start of the file where celery app is initialized to setup elastic apm client

   ```python
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

   ```python
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
   --link redis:redis \   
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
       
#### Sample Application Code

The below link contains the sample application with the trace enabled by following the configuration mentioned in the above sections.
 
[Click Here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the reference application.

### Flask

1. Add 

   ```python
   sf-elastic-apm[flask]==6.7.2
   sf-apm-lib==0.1.1
   ```

   entries in requirements.txt file and install these in your project environment 

   or 

   Install through CLI using

   ```docker
   RUN pip install sf-elastic-apm[flask]==6.7.2 
   RUN pip install sf-apm-lib==0.1.1 
   ```

2. Add following entries in app.py

   1. Add imports statement

      ```
      from elasticapm.contrib.flask import ElasticAPM 
      from sf_apm_lib.snappyflow import Snappyflow 
      ```

   2. Get trace config

      ```python
      sf = Snappyflow() # Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml

      # Add below part to manually configure the initialization 
      # import os module
      SF_PROJECT_NAME = os.getenv('SF_PROJECT_NAME') 
      SF_APP_NAME = os.getenv('SF_APP_NAME') 
      SF_PROFILE_KEY = os.getenv('SF_PROFILE_KEY') 
      sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
      # End of manual configuration 

      SFTRACE_CONFIG = sf.get_trace_config()

      # Start Trace to log feature section
      # Add below line of code to enable Trace to log feature:
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      # Option Configs for trace to log
      # Add below line to provide custom documentType (Default:"user-input"):
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      # Add below line to provide destination index (Default:"log"):
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' # Applicable values(log, metric)
      # End trace to log section

      ```

   3. Initialize elastic apm and instrument it to flask app

      ```python
      app.config['ELASTIC_APM'] = { 
         'SERVICE_NAME': '<SERVICE_NAME>', # Specify your service name for tracing 
         'SERVER_URL': SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
         'GLOBAL_LABELS': SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
         'VERIFY_SERVER_CERT': SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT'), 
         'SPAN_FRAMES_MIN_DURATION': SFTRACE_CONFIG.get('SFTRACE_SPAN_FRAMES_MIN_DURATION'), 
         'STACK_TRACE_LIMIT': SFTRACE_CONFIG.get('SFTRACE_STACK_TRACE_LIMIT'), 
         'CAPTURE_SPAN_STACK_TRACES': SFTRACE_CONFIG.get('SFTRACE_CAPTURE_SPAN_STACK_TRACES'), 
         'DEBUG': True,
         'METRICS_INTERVAL': '0s'
      } 
      apm = ElasticAPM(app) 
      ```

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in docker-compose.yml or docker stack deployment file or at command line when using docker run command for deployment.  

   Eg: 

   Docker-compose and stack: https://docs.docker.com/compose/environment-variables/ 

   Docker run cli command: 

   ```docker
   docker run -d -t -i -e SF_PROJECT_NAME='<SF_PROJECT_NAME>' \  
   -e SF_APP_NAME='<SF_APP_NAME>' \ 
   -e SF_PROFILE_KEY='<snappyflow profile key>' \ 
   --name <container_name>  <dockerhub_id/image_name> 
   ```

4. Once your server is up and running you can check trace in Snappyflow Server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created, Go to View dashboard -> Click on Tracing on lef side bar -> Click on view transaction -> Go to real time tab 

 :::note 
   'CAPTURE_BODY':'all' config should be present in apm agent code instrumentation for Trace to Log feature. 
 :::note

### Celery

1. Install following requirements (Following example is based on redis broker)

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install redis 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add following code at start of the file where celery app is initialized to setup elastic apm client

   ```python
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
       
#### Sample Application Code

The below link contains the sample application with the trace enabled by following the configuration mentioned in the above sections.
 
[Click Here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the reference application.

### Flask

1. Add 

   ```python
   sf-elastic-apm[flask]==6.7.2
   sf-apm-lib==0.1.1
   ```

   entries in requirements.txt file and install these in your project environment 

   or 

   Install through CLI using

   ```docker
   RUN pip install sf-elastic-apm[flask]==6.7.2 
   RUN pip install sf-apm-lib==0.1.1 
   ```

2. Add following entries in `app.py` 

   1. Add imports statement

      ```python
      from elasticapm.contrib.flask import ElasticAPM 
      from sf_apm_lib.snappyflow import Snappyflow 
      ```

   2. Get trace config

      ```python
      sf = Snappyflow() # Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml
      
      # Add below part to manually configure the initialization 
      # import os module
      SF_PROJECT_NAME = os.getenv('SF_PROJECT_NAME') 
      SF_APP_NAME = os.getenv('SF_APP_NAME') 
      SF_PROFILE_KEY = os.getenv('SF_PROFILE_KEY') 
      sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
      # End of manual configuration
      
      SFTRACE_CONFIG = sf.get_trace_config()
      
      # Start Trace to log feature section
      # Add below line of code to enable Trace to log feature:
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      # Option Configs for trace to log
      # Add below line to provide custom documentType (Default:"user-input"):
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      # Add below line to provide destination index (Default:"log"):
      SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' # Applicable values(log, metric)
      # End trace to log section
      ```

   3. Initialize elastic apm and instrument it to flask app

      ```python
      app.config['ELASTIC_APM'] = { 
         'SERVICE_NAME': '<SERVICE_NAME>', # Specify your service name for tracing 
         'SERVER_URL': SFTRACE_CONFIG.get('SFTRACE_SERVER_URL'), 
         'GLOBAL_LABELS': SFTRACE_CONFIG.get('SFTRACE_GLOBAL_LABELS'), 
         'VERIFY_SERVER_CERT': SFTRACE_CONFIG.get('SFTRACE_VERIFY_SERVER_CERT'), 
         'SPAN_FRAMES_MIN_DURATION': SFTRACE_CONFIG.get('SFTRACE_SPAN_FRAMES_MIN_DURATION'), 
         'STACK_TRACE_LIMIT': SFTRACE_CONFIG.get('SFTRACE_STACK_TRACE_LIMIT'), 
         'CAPTURE_SPAN_STACK_TRACES': SFTRACE_CONFIG.get('SFTRACE_CAPTURE_SPAN_STACK_TRACES'), 
         'DEBUG': True,
         'METRICS_INTERVAL': '0s'
      } 
      apm = ElasticAPM(app)
      ```

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in add container section of task definitions. 

   https://docs.aws.amazon.com/AmazonECS/latest/developerguide/taskdef-envfiles.html 

4. Once your server is up and running you can check trace in Snappyflow Server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created, Go to View dashboard -> Click on Tracing on lef side bar -> Click on view transaction -> Go to real time tab 

 :::note 
   'CAPTURE_BODY':'all' config should be present in apm agent code instrumentation for Trace to Log feature. 
 :::note

### Celery

1. Install following requirements (Following example is based on redis broker)

   ```
   pip install sf-elastic-apm==6.7.2 
   pip install redis 
   pip install sf-apm-lib==0.1.1 
   ```

2. Add following code at start of the file where celery app is initialized to setup elastic apm client

   ```python
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

   ```python
   sf-apm-lib==0.1.1 
   sf-elastic-apm==6.7.2 
   ```

   Ref: https://docs.aws.amazon.com/lambda/latest/dg/python-package-create.html#python-package-create-with-dependency 

2. Instrument lambda function to enable tracing.  

   1. Import Libraries

      ```python
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

## Trace to Log Body

For the transactions that are HTTP requests which contain the request body, the sfPython trace agent capture the request body and store it in the SnappyFlow with the specific index and document type.

:::caution

Request bodies usually contain sensitive data like passwords and credit card numbers. If your service handles data like this, we advise you to enable this feature with care.

:::


1. Add the below values to enable this feature

    1. Update the **ELASTIC_APM** block with the following key-value pair in the `settings.py`.

      ```
      'CAPTURE_BODY': 'all'
      ```

    2. Add the below line in the try block of tracing instrumentation code in the `settings.py`.

     ```
     SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
     ```
    
2. Follow the below steps in the try block of `settings.py` to customize the document type and destination index. (Optional) 

     1. Add below line to customize the destination index (Default:"log"), Applicable values(log, metric).

     ```
     SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
     ```
     
     2. Add the below line to customize the document type (Default:"user-input").
     
     ```
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


## Log Correlation

For enabling the log correlation, follow the below instructions.

### Django

a.	Add import statement in settings.py
```python
from elasticapm.handlers.logging import Formatter
```

b.	Add following logging configuration in settings.py.
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
            'filename': '/var/log/trace/django.log', //specify you log file path
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
c. Usage:
```python
import logging
log = logging.getLogger('elasticapm')

class ExampleView(APIView):
   def get(self, request):
      log.info('Get API called')

```
Refer code: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-django

### Flask

1.	Add following code in app.py after import statements to set logger configuration
```python
import logging
from elasticapm.handlers.logging import Formatter
fh = logging.FileHandler('/var/log/trace/flask.log') 

# we imported a custom Formatter from the Python Agent earlier 
formatter = Formatter("[%(asctime)s] [%(levelname)s] [%(message)s]", "%d/%b/%Y %H:%M:%S") 
fh.setFormatter(formatter) 
logging.getLogger().addHandler(fh)

# Once logging is configured get log object using following code  
log = logging.getLogger()
log.setLevel('INFO')

@app.route('/')
def home():
   log.info('Home API called')
   return 'Welcome to Home'
```
Refer code: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-flask/app.py

---

## Send log correlation data to snappyflow server

Below are the modes for sending log correlated data to snappyflow server

### <b> For Appliance: </b>

Install sfagent and create config file.

Refer: https://docs.snappyflow.io/docs/Integrations/os/linux/sfagent_linux

Add elasticApmLog plugin to sfagent config.yaml and restart sfagent service.
Eg. Config.yaml
```yaml
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
         log_path: /var/log/trace/ntrace.log  # Your app log file path
```

### <b> For Kubernetes: </b>

Specify following values in metadata labels section of deployment file.
```yaml
snappyflow/appname: <SF_APP_NAME>
snappyflow/projectname: <SF_PROJECT_NAME>
snappyflow/component: gen-elastic-apm-log # This is must for tracing log correlation
```
### Sample deployment file
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




       
