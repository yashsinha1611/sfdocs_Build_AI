---
sidebar_position: 3 
---
# Capture Request Body
## Overview

The **Capture Request Body** feature allows to store the request body of an HTTP transaction, making it a useful tool for debugging and troubleshooting.<br/>

:::caution

The request body usually contains confidential information like credit card numbers and passwords. Therefore, if your service deals with such sensitive data, enable this feature with caution.

:::<br/>

**<u>Supported Platforms</u>** <br/>

**AWS Lambda** | **Docker** | **ECS** | **Instance** | **Kubernetes** 

:::note

The following configurations are applicable to all platforms.

:::<br/>

**<u>Supported Frameworks</u>** 

**[Django](capture_request_body_from_trace#django)** | **[Flask](capture_request_body_from_trace#flask)**

## Django

### Enable Capture Request Body 

Do the following steps in `Settings.py` to enable the **Capture Request Body** feature. 

1. Add the following key-value pair within the  **`ELASTIC_APM`** block of `Settings.py` file.

```
  'CAPTURE_BODY': 'all'
```

2. Add the below line within the `try` block of `Settings.py` file.

```
 SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
```

:::note

By default, the value is 'true'.

:::

### Customize Document Type and Index

To customize the Document Type and Index, perform the following steps within the `try` block of the `Settings.py` file. (Optional)

1. Add the below line within the `try` block in the `Settings.py` file to customize the **Index**.

```
  SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
```

:::note

The **Index Type** is set to `Log` by default, and the possible values that can be used for this field are **Logs** and **Metrics**.

:::

2. Add the below line within the `try` block in the `Settings.py` file to customize the **Document Type**.

```
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-input'
```

:::note

By default, the **Document Type** is set to `user-input`.

:::

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

### Enable Capture Request Body 

Do the following steps in `app.py` file to enable the **Capture Request Body** feature.

1. Add the following key-value pair within the **`app.config['ELASTIC_APM']`** block of the  `app.py` file.

```
  'CAPTURE_BODY': 'all'
```

2. Add the below line within the `try` block of the `app.py` file.

```
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
```

:::note

By default, the value is 'true'.

:::

### Customize Document Type and Index

To customize the Document Type and Index, perform the following steps within the `try` block of the `app.py` file. (Optional)

1. Add the below line within the `try` block of the  `app.py` file to customize the **Index**.

```
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
```

:::note

The **Index Type** is set to `Log` by default, and the possible values that can be used for this field are **Logs** and **Metrics**.

:::

2. Add the below line within the `try` block of the  `app.py` file to customize the **Document Type**.

```
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-input'
```

:::note

By default, the **Document Type** is set to `user-input`.

:::



**Complete Configuration**

```
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=log'
SFTRACE_CONFIG['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=user-input'
app.config['ELASTIC_APM'] = {
   'CAPTURE_BODY': 'all'
}
```

