---
sidebar_position: 3 
---

## Capture Request Body from Trace

This feature allows you to save the request body of the HTTP transactions to a specific index such as a log.

:::caution

Request bodies usually contain sensitive data like passwords and credit card numbers. If your service handles data like this, we advise you to enable this feature with care.

:::

### Configuration

1. If you packaged application as a jar file, add the following properties while running the jar file.

   1. Add the below properties to enable this feature.

     ```
   -Delastic.apm.global_labels="_tag_redact_body=true"
   -Delastic.apm.capture_body=all 
     ```

   2. Add the below properties to customize the document type and destination index. (Optional)

     ```
   # default indexType is log, applicable values are log and metric
   -Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=log"
   # default documentType is user-input
   -Delastic.apm.global_labels="_tag_redact_body=true,_tag_documentType=custom-document"
     ```

   After adding the above properties the command looks like:

     ```
   java -Delastic.apm.capture_body=all -Delastic.apm.global_labels="_tag_redact_body=true,_tag_IndexType=log,_tag_documentType=custom-document" -jar (application jar name)
     ```

2. If you packaged application as a war file, add the following properties in the `tomcat_setenv.sh` file.


    1. Add the below properties to enable this feature.

       ```
       export CATALINA_OPTS="$CATALINA_OPTS  -Delastic.apm.global_labels='_tag_redact_body=true'"
       export CATALINA_OPTS="$CATALINA_OPTS  -Delastic.apm.capture_body=all' 
       ```

    2. Add the below properties to customize the document type and destination index. (Optional)

       ```
       # default indexType is log, applicable values are log and metric
       export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.global_labels='_tag_IndexType=log'"
       # default documentType is user-input
       export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.global_labels='_tag_documentType=custom-document'"
       ```

   After adding the above properties the file looks like:

   ```
   export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.capture_body=all'
   export CATALINA_OPTS="$CATALINA_OPTS -Delastic.apm.global_labels='_tag_redact_body=true,_tag_IndexType=log,_tag_documentType=custom-document'"
   ```

### Verification

1. In the app, click the **View Dashboard** icon.

2. If you provided the index type is log:

   a. In the **Dashboard** window, go to **Logs** section.

   b. In the **Overview** windows, select the **Source** and **Log Type**.

   c. Now you can view the logs in the dashboard.

3. If you provided the index type as metric:

   a. In the **Dashboard** window, go to **Browse Data** section.

   b. select the plugin as **trace_body** and document type.

   c. Now you can view the logs in the dashboard.

     <img src="/img/Trace-to-body.png" /><br/>
