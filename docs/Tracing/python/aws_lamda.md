---
sidebar_position: 3 
---
# AWS Lambda
## Script

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
   

