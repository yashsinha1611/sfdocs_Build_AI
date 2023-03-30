---
sidebar_position: 3 
---
# Capture Request Body from Trace
## Overview

The **Capture Request Body** feature allows you to save the request body of an HTTP transaction.

:::caution

Request bodies usually contain sensitive data like passwords and credit card numbers. If your service handles data like this, we advise you to enable this feature with care.

:::



#### **<u>Supported Frameworks</u>** 

#### **[Django](capture_request_body_from_trace#django)** | **[Flask](capture_request_body_from_trace#flask)**

### Django

To **Capture Request Body** of an application based on the **Flask** framework, do the following steps in the `Settings.py` file.

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

    
2. To customize the **Document Type** and **Destination Index**, do the following steps in the `try block` of the `settings.py` file. (Optional) 

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

2. Add the below line to customize the document type.
   
   ```
   # default documentType is user-input
   SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-    input'
   ```
   

**Complete Configuration**

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

To **Capture Request Body** of an application based on the **Flask** framework, do the following steps in the `app.py` file.

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

2. To customize the **Document Type** and **Destination Index**, do the following steps in the `try block` of the `app.py` file. (Optional)

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

**Complete Configuration**

```
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-input'
app.config['ELASTIC_APM'] = {
   'CAPTURE_BODY': 'all'
}
```

