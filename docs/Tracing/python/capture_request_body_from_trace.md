---
sidebar_position: 3 
---
# Capture Request Body from Trace
## Overview

The capture request body feature allows you to save the request body of the HTTP transactions of a specific index.

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

