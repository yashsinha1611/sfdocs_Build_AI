---
sidebar_position: 3 
---
# Monitor PHP Application on Instance

## Prerequisite

1. Install [sfagent](/docs/Quick_Start/getting_started#sfagent) to integrate your application with SnappyFlow.

2. Make sure that the project and application are created in the SnappyFlow server. If not, [click here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to create a project and an application in SnappyFlow.

3. Provide the `PROFILE_KEY`,  `PROJECT_NAME` , and `APP_NAME`  in the `config.yaml` file.

## Configuration

1. Download the PHP trace agent installation file.

   https://raw.githubusercontent.com/snappyflow/apm-agent-php/1.x/install_elastic_apm.sh

2. Use the below-given command to assign executable permission.
   ```
   chmod +x install_elastic_apm.sh
   ```

3. Run the script with **sudo** and provide the tracing service name as the first argument to the script.

   **Example**: `sudo ./install_elastic_apm.sh <service_name>`

:::note

In case, if you need to update Snappyflow `projectName`, `appName` or `profileKey` then you need to uninstall the existing PHP agent and install the agent again. While installing the agent back update the `projectName`, `appName` and `profileKey`.

:::



## View Trace Data

Follow the below steps to view the trace data.

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.

   <img src="/img/tracing/image_2.png" />

5. In the dashboard window, navigate to the **Tracing** section and click the `View Transactions` button.

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.

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
