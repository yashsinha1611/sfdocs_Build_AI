---
sidebar_position: 3 
---
# Python on Instance
**<u>Supported Frameworks</u>**

**[Django](python_on_instance#django)** | **[Flask](python_on_instance#flask)**

**<u>Standard Library Modules</u>**

**[Script](python_on_instance#script)** |  **[Celery](python_on_instance#celery)**

## Django

### Prerequisite

To enable tracing for an application that is developed by the **Django** framework, **`sf-elastic-apm`** and **`sf-apm-lib` **must be available in your environment. These libraries can be installed by the following methods:

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

### Configuration

##### Case 1: sfAgent installed in your instance
In this case, the trace agent picks up the `profileKey`, `projectName`, and `appName` from the `config.yaml` file. 

**Add the below entries in the `settings.py` file.** <br/>

1. Add the following import statement. 

   ```
   from sf_apm_lib.snappyflow import Snappyflow 
   ```
   
2. Add the following entry in the `INSTALLED_APPS` block.

   ```
   'elasticapm.contrib.django'
   ```

3.  Add the following entry in the `MIDDLEWARE` block.

   ```
   'elasticapm.contrib.django.middleware.TracingMiddleware'
   ```
4. Add the following source code to integrate a Django application with SnappyFlow. 

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

1. Make sure that the project and the application are created in the SnappyFlow Server. [Click here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to know how to create a project and an application in SnappyFlow.  

2. Export `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as the environment variables.
   ``` 
   # Update the below default values with proper values
     export SF_PROJECT_NAME=<SF_PROJECT_NAME>
     export SF_APP_NAME=<SF_APP_NAME>
     export SF_PROFILE_KEY=<SF_PROFILE_KEY> 
   ```

**Add the following entries in the `settings.py` file.** 

1. Add the following import statement. 
   ```
   from sf_apm_lib.snappyflow import Snappyflow 
   import os
   ```
   
2. Add the following entry in the `INSTALLED_APPS` block.  
   ```
   'elasticapm.contrib.django'
   ```
   
3. Add the following entry in the `MIDDLEWARE` block.
   ```
   'elasticapm.contrib.django.middleware.TracingMiddleware'
   ```
   
4. Add the following source code to integrate a Django application with SnappyFlow.
          
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

### Verification

Follow the below steps to verify whether SnappyFlow has started to collect the trace data.

1. Login into  SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. Navigate to the **Tracing** section and click the `View Transactions` button.
   <img src="/img/Trace_Service_Map.png" />

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.
   <img src="/img/Trace_AggregateTab.png" /><br/>
     <img src="/img/Trace_RealTime.png" /><br/>

### Troubleshoot

1. If the trace data is not available in SnappyFlow server, then check the trace configuration in the `settings.py`.

2. To enable the debug logs, add the key-value pair in the `ELASTIC_APM` block of the `settings.py`.

```
   'DEBUG':'true'
```

#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-django) to view the sample application for which the tracing feature is enabled by the configuration mentioned in the above sections.

## Flask

### Prerequisite

To enable tracing for the application that is developed by the **Flask** framework, **`sf-elastic-apm`** and **`sf-apm-lib` **must be available in your environment. These libraries can be installed by the following methods:

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

### Configuration

##### Case 1: sfAgent installed in your instance

In this case, the trace agent picks up the `profileKey`, `projectName`, and `appName` from the `config.yaml` file. 

**Add the below entries in the `app.py` file.**

1. Add the following import statements. 

```
from elasticapm.contrib.flask import ElasticAPM
from sf_apm_lib.snappyflow import Snappyflow 
```

2. Add the following source code to integrate a **Flask** application with SnappyFlow.

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
##### Case 2: sfAgent not installed in your instance

In this case, follow the below steps to enable tracing.

1. Make sure that the project and the application are created in the SnappyFlow Server. [Click here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to know how to create a project and an application in SnappyFlow.

2. Export `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as the environment variables.
   ```         
   #Update the below default values with proper values
   SF_PROJECT_NAME=<project name>
   SF_APP_NAME=<app-name>
   SF_PROFILE_KEY=<profile-key>
   ```
   

**Add the following entries in the `app.py` file.**

  1. Add the following import statements. 
     ```
     from elasticapm.contrib.flask import ElasticAPM 
     from sf_apm_lib.snappyflow import Snappyflow 
     import os
     ```

   2. Add the following source code to integrate a **Flask** application to the SnappyFlow. 

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

### Verification

Follow the below steps to verify whether SnappyFlow has started to collect the trace data.

1. Login into  SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. Navigate to the **Tracing** section and click the `View Transactions` button.
   <img src="/img/Trace_Service_Map.png" />

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.
   <img src="/img/Trace_AggregateTab.png" /><br/>
     <img src="/img/Trace_RealTime.png" /><br/>

### Troubleshoot

1. If the trace data is not available in SnappyFlow server, then check the trace configuration in the `app.py` file.
2. To enable the debug logs, add the key-value pair in the `app.config` block of the `app.py` file.

   ```
   'DEBUG':'true'
   ```

#### Sample Application Code

[Click here](https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-flask) to view the sample application for which the tracing feature is enabled by using the configuration mentioned in the above sections.

## Script

### Prerequisite

To enable tracing for an application developed by **Script**, **`sf-elastic-apm`** and **`sf-apm-lib`** must be available in your environment. These libraries can be installed by the following method:

Install the libraries using CLI.

  ```
   pip install sf-elastic-apm==6.7.2 
   pip install sf-apm-lib==0.1.1 
  ```

### Configuration

1. To setup the `elastic apm` client, add the following code at the start of the **Script** file. 

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

2. Once instrumentation is complete you can create custom transactions and spans.

   **Example:** This example shows how to custom transactions and spans.

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

**Refer to the link to know more about instrumenting the tracing feature for an application developed by script:** https://www.elastic.co/guide/en/apm/agent/python/master/instrumenting-custom-code.html 


### Verification

Follow the below steps to verify and view the trace data.

1. Login into  SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. Navigate to the **Tracing** section and click the `View Transactions` button.
   <img src="/img/Trace_Service_Map.png" />

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.
   <img src="/img/Trace_AggregateTab.png" /><br/>
     <img src="/img/Trace_RealTime.png" /><br/>

**<u>Reference Code</u>**

**Refer to the link to get the complete configuration code**: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-django/python_script_trace.py 



## Celery
:::note
  The Celery configuration explained below is based on the redis broker.
:::  

### Prerequisite

To enable tracing for an application that is developed by Celery,  **`sf-elastic-apm`**, **`redis`** and **`sf-apm-lib` **must be available in your environment. 

Install the following requirements.
```
pip install sf-elastic-apm==6.7.2 
pip install redis 
pip install sf-apm-lib==0.1.1 
```

### Configuration

Add following code at start of the file where celery app is initialized to setup elastic apm client.

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

### Verification

Once the instrumentation is done and the celery worker is running, you can see a trace for each celery task in the Snappyflow server. Follow the below steps to verify and view the trace data.

1. Login into  SnappyFlow.
2. Go to the **Application** tab.
3. In the **Application** tab, navigate to your **Project** > **Application**.
4. Click the **Application's Dashboard** icon.
5. Navigate to the **Tracing** section and click the `View Transactions` button.
   <img src="/img/Trace_Service_Map.png" />

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.
   <img src="/img/Trace_AggregateTab.png" /><br/>
     <img src="/img/Trace_RealTime.png" /><br/>

**Reference Code**

For the complete script refer to: https://github.com/snappyflow/tracing-reference-apps/blob/master/ref-celery/tasks.py 

