---
sidebar_position: 3 
---
# Monitor PHP Application in Docker

## Prerequisite

1. Install [sfagent](/docs/Quick_Start/getting_started#sfagent) to integrate your application with SnappyFlow.

2. Make sure that the project and application are created in the SnappyFlow server. If not, [click here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to create a project and an application in SnappyFlow.

3. Provide the `PROFILE_KEY`,  `PROJECT_NAME` , and `APP_NAME`  in the `config.yaml` file.

## Configuration

1. Download the shell script into the root folder of the project.

   https://raw.githubusercontent.com/snappyflow/apm-agent-php/1.x/install_elastic_apm.sh

2. Add the `config.yaml` to the project root folder.

3. Make sure that the `projectName`, `appName` and `profileKey` values are correct.

4. Add the following changes to the docker file of the project and build the image.

   ```
   # Begin Snappyflow changes
   RUN apk add --no-cache wget git curl-dev bash jq 
   RUN mkdir -p /opt/elasticapm/phpagent 
   RUN mkdir -p /opt/sfagent 
   RUN wget https://github.com/snappyflow/apm-agent/releases/download/latest/sftrace-agent.tar.gz 
   RUN tar -zxvf sftrace-agent.tar.gz >/dev/null && mv -f sftrace /opt/sfagent && mv -f /opt/sfagent/sftrace/sftrace /bin && mv -f /opt/sfagent/sftrace/java/sftrace /opt/sfagent/sftrace 
   ADD ./config.yaml /opt/sfagent/config.yaml 
   ADD ./install_elastic_apm.sh /mnt 
   RUN chmod +x /mnt/install_elastic_apm.sh 
   # Specify trace service name
   RUN /mnt/install_elastic_apm.sh <service-name>
   # End Snappyflow Changes
   ```

   <br/>

   :::note

   Tracing service name should be specified in Docker build step.

   :::

   <br/>

   :::note

   In case, if you need to update Snappyflow `projectName`, `appName` or `profileKey` then you need to uninstall the existing PHP agent and install the agent again. While installing the agent back update the `projectName`, `appName` and `profileKey`.

   :::

## View Trace Data

Follow the below steps to view the trace data.

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.

   <img src="/img/tracing/image_2.png" />

2. In the dashboard window, navigate to the **Tracing** section and click the `View Transactions` button.

3. You can view the traces in the **Aggregate** and the **Real Time** tabs.

   <img src="/img/tracing/image_1.png" />

   <br/>
   
   <img src="/img/tracing/image_3.png" />

## Steps to Uninstall PHP Agent

1. Download the **PHP agent** configuration.

   https://raw.githubusercontent.com/snappyflow/apm-agent-php/1.x/before-uninstall.sh

2. Use the below-given command to assign executable permission.

   `chmod +x ./before-uninstall.sh`

3. Run the below script with **sudo**.

   `sudo ./before-uninstall.sh`
