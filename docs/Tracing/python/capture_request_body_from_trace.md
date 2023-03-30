---
sidebar_position: 3 
---
# Capture Request Body from Trace
## Overview

The **Capture Request Body** feature allows you to save the request body of an HTTP transaction.<br/>

:::caution

Request bodies usually contain sensitive data like passwords and credit card numbers. If your service handles data like this, we advise you to enable this feature with care.

:::<br/>

**<u>Supported Platforms</u>** <br/>

**AWS Lambda** | **Docker** | **ECS** | **Instance** | **Kubernetes** 

:::note

The below configurations are common for all platforms.

:::<br/>

**<u>Supported Frameworks</u>** 

**[Django](capture_request_body_from_trace#django)** | **[Flask](capture_request_body_from_trace#flask)**

## Django

To **Capture Request Body** of an application developed by the **Flask** framework, do the following steps. in 

**Add the below values in the `Settings.py` file. to enable this feature**.

1. Update the **`ELASTIC_APM`** block with the following key-value pair.

```
  'CAPTURE_BODY': 'all'
```

2. Add the below line in the try block of tracing instrumentation code.

```
 # default value is true, 
 SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
```

To customize the **Document Type** and **Destination Index**, do the following steps in the try block of the `settings.py` file. (Optional) 

1. Add the below line to customize the destination index (Default:"log"), Applicable values(log, metric).

```
  # default indexType is log, applicable values are log and metric
  SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
```

2. Add the below line to customize the document type.

```
  # default documentType is user-input
  SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-input'
```

3. Add the below line to customize the document type.

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
## FLASK

To **Capture Request Body** of an application developed by the **Flask** framework, do the following steps. 

Add the below values in the `app.py` file to enable this feature.

1. Update the **`app.config['ELASTIC_APM']`** block with the following key-value pair.

```
  'CAPTURE_BODY': 'all'
```

2. Add the below line in the try block of tracing instrumentation code.

```
 # default value is true, 
 SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
```

To customize the **Document Type** and **Destination Index**, do the following steps in the try block of the `app.py` file. (Optional)

1. Add below line to customize the destination index (Default:"log"), Applicable values(log, metric).

```
# default indexType is log, applicable values are log and metric
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
```

2. Add the below line to customize the document type.

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

