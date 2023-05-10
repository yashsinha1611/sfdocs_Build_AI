---
sidebar_position: 3 
---

# Capture Request Body

## Overview

The Capture Request Body feature feature allows to store the request body of an HTTP transaction, making it a useful tool for debugging and troubleshooting.

:::caution

Request bodies usually contain sensitive data like passwords and credit card numbers. If your service handles data like this, enable this feature with care.

:::

## Enable Capture Request Body

### Application packaged as  jar file.

Add the below properties in the `jar` file to enable the **Capture Request Body** feature.

```
-Delastic.apm.global_labels="_tag_redact_body=true"
-Delastic.apm.capture_body=all 
```

### Customize Document Type and Index

To customize the Document Type and Index, perform the following steps within the `jar` file. (Optional)

1. Add the below line to customize to **Index**.

```
-Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=log"
```

 <br/>

:::note

  The **Index Type** is set to `Log` by default, and the possible values that can be used for this field are **Logs** and **Metrics**.

:::

<br/>

2. Add the below line within the `jar` file to customize the **Document Type**.

```
-Delastic.apm.global_labels="_tag_redact_body=true,_tag_documentType=custom-document"
```

<br/>

:::note

By default, the **Document Type** is set to `custom-document`.

:::

**Complete Configuration**

```
java -Delastic.apm.capture_body=all -Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=log,_tag_documentType=custom-document" -jar (application jar name)
```

### Application packaged as war file.

Add the following properties in the `tomcat_setenv.sh` file to enable the **Capture Request Body** feature.

```
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.global_labels='_tag_redact_body=true'"
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.capture_body=all"
```

### Customize Document Type and Index 

To customize the Document Type and Index, perform the following steps within the `war` file. (Optional)

1. Add the below line to customize to **Index**.

```
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.global_labels='_tag_IndexType=log'"
```
<br/>

:::note

The **Index Type** is set to `Log` by default, and the possible values that can be used for this field are     **Logs** and **Metrics**.

:::

2. Add the below line within the `jar` file to customize the **Document Type**.

```
export CATALINA_OPTS="$CATALINA_OPTS -     Delastic.apm.global_labels='_tag_documentType=custom-document'"
```

<br/>

:::note

By default, the **Document Type** is set to `custom-document`.

:::

**Complete Configuration**

```
export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.capture_body=all"
export CATALINA_OPTS="$CATALINA_OPTS - Delastic.apm.global_labels='_tag_redact_body=true,_tag_IndexType=log,_tag_documentType=custom-document'"
```


## View the Captured Request Body

Follow the below steps to verify and view the trace data.

1. Go to the **Application** tab in SnappyFlow and navigate  to your **Project** > **Application** > **Dashboard**.

   <img src="/img/tracing/image_2.png" />

2. In the **Dashboard** window, go to the **Log Management** section.

3. Select the **Source** and **Log Type** to view logs in the dashboard.

4. To see the unprocessed data, go to the **Browse Data** section and select the following details:

   - **Index**: `Metrics`
   - **Plugin**: `trace_body`
   - **Document Type**:  `user_input`

