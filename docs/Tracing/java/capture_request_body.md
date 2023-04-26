---
sidebar_position: 3 
---

# Capture Request Body from Trace

## Overview

The **Capture Request Body** feature allows you to save the request body of an HTTP transaction.

:::caution

Request bodies usually contain sensitive data like passwords and credit card numbers. If your service handles data like this, we advise you to enable this feature with care.

:::

## Enable Capture Request Body

### Application packaged as  Jar file.

1. Add the below properties in the `Jar` file.

```
-Delastic.apm.global_labels="_tag_redact_body=true"
-Delastic.apm.capture_body=all 
```

2. Add the below line to customize the document type and destination index. (Optional)

```
# default indexType is log, applicable values are log and metric
-Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=log"
# default documentType is user-input
-Delastic.apm.global_labels="_tag_redact_body=true,_tag_documentType=custom-document"
```

**Complete Configuration**

```
java -Delastic.apm.capture_body=all -Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=log,_tag_documentType=custom-document" -jar (application jar name)
```

### Application packaged as War file.

1. Add the following properties in the `tomcat_setenv.sh` file.
   
   ```
   export CATALINA_OPTS="$CATALINA_OPTS  -  Delastic.apm.global_labels='_tag_redact_body=true'"
   export CATALINA_OPTS="$CATALINA_OPTS  -Delastic.apm.capture_body=all' 
   ```
2. Add the below properties to customize the **document type** and **destination index**. (Optional)

  ```
  # default indexType is log, applicable values are log and metric
  export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.global_labels='_tag_IndexType=log'"
  # default documentType is user-input
  export CATALINA_OPTS="$CATALINA_OPTS -    Delastic.apm.global_labels='_tag_documentType=custom-document'"
  ```
3. Complete Configuration:

  ```
  export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.capture_body=all"
  export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.global_labels='_tag_redact_body=true,_tag_IndexType=log,_tag_documentType=custom-document'"
  ```


## Verification

Follow the below steps to verify and view the trace data.

1. Login into SnappyFlow.

2. Go to the **Application** tab.

3. In the **Application** tab, navigate to your **Project** > **Application**.

4. Click the **Application's Dashboard** icon.

5. In the **Dashboard** window, go to the **Logs** section.

6. Select the **Source** and **Log Type** to view logs in the dashboard.

7. To see the raw data, go to the **Browse Data** section.

8. Select the plugin as `trace_body` and document type.

   <img src="/img/Trace-to-body.png" /><br/>

