---
sidebar_position: 3 
---

# Monitor Java Application in Docker

Follow the below steps to start tracing of a Java application running in the Docker container.

## Prerequisite

Add the Java trace agent jar file to the docker container. Refer to the `SFTRACE-CONFIG` section in the `java_Docker` file.

 https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/java_Dockerfile 

## Configuration

1. Install the Java trace agent to the container and start the container by attaching the agent to the application. 
2. Add the  `profile_key`, `projectName`, `appName` to the docker file.
3. Build and start the container.

## View Trace Data

Follow the below steps to view the trace data.

1. Go to the **Application** tab in SnappyFlow and navigate  to your **Project** > **Application** > **Dashboard**.

   <img src="/img/tracing/image_2.png" />

2. In the dashboard window, navigate to the **Tracing** section and click the `View Transactions` button.

3. You can view the traces in the **Aggregate** and the **Real Time** tabs.

   <img src="/img/tracing/image_1.png" />

   <br/>

   <img src="/img/tracing/image_3.png" />