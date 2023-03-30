---
sidebar_position: 3 
---
# AWS Lambda
**<u>Supported Library Modules</u>**

**[Script](aws_lamda#script)**

## Script

### Prerequisite

To enable tracing for an application based on the **Script** module,  **`sf-elastic-apm`** and **`sf-apm-lib`** must be available in your environment. These libraries can be installed by the following methods:

Add the below-mentioned entries in the `requirements.txt` file.

```
sf-apm-lib==0.1.1 
sf-elastic-apm==6.7.2 
```

For more information on **AWS Lambda** refer to: https://docs.aws.amazon.com/lambda/latest/dg/python-package-create.html#python-package-create-with-dependency 

### Configuration

Do the following steps to enable tracing for the **AWS Lambda** function.

1. Import the below-mentioned libraries.

   ```
   import elasticapm 
   from sf_apm_lib.snappyflow import Snappyflow 
   ```

2. Add the below code to get SnappyFlow Trace config outside the lambda handler method. 

   ```python
   sf = Snappyflow()
   SF_PROJECT_NAME = os.environ['SF_PROJECT_NAME'] 
   SF_APP_NAME = os.environ['SF_APP_NAME'] 
   SF_PROFILE_KEY = os.environ['SF_PROFILE_KEY'] 
   sf.init(SF_PROFILE_KEY, SF_PROJECT_NAME, SF_APP_NAME) 
   trace_config = snappyflow.get_trace_config() 
   ```

3. Add the custom instrumentation in the lambda handler function.

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

1. To deploy the Lambda function, follow the **README** content in the code reference link.

   Sample code for reference: https://github.com/upendrasahu/aws-lambda-python-tracing-sample 

2. Configure the Lambda function before trigger/invoke. 

   - Add the environment variable `SF_PROFILE_KEY` and give the profile key copied from SnappyFlow as the value to the key. 
   
   - Add the following environment variables: `SF_APP_NAME` and `SF_PROJECT_NAME` with appropriate values. 

