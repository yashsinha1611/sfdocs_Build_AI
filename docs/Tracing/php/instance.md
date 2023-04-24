---
sidebar_position: 3 
---
# PHP Application on Instance
## Configuration

1. Install [Sfagent](/docs.snappyflow.io/docs/Integrations/os/linux/sfagent_linux).

2. Make sure that the project and application are created in the SnappyFlow server. If not, [click here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to create a project and an application in SnappyFlow.

3. Provide the `PROFILE_KEY`,  `PROJECT_NAME` , and `APP_NAME`  in the `config.yaml` file.

4. Download the PHP trace agent installation file.

   https://raw.githubusercontent.com/snappyflow/apm-agent-php/1.x/install_elastic_apm.sh

5. Use the below given command to assign executable permission.
   ```
   chmod +x install_sf_php_agent.sh
   ```

6. Run script with **sudo** and provide tracing service name as first argument to the script.

   **Example**: `sudo ./install_sf_php_agent.sh <service_name>`

7. Configure the settings in the `php.ini` file

   ```ini
   elastic_apm.server_url=http://localhost:8200
   elastic_apm.service_name="My service"
   ```

8. The agent can also be configured using environment variables:
   ```
   export ELASTIC_APM_SERVER_URL="http://localhost:8200"
   export ELASTIC_APM_SERVICE_NAME="My service"
   ```

:::note

If you use environment variables to configure the agent, make sure the process running your PHP code inherits those environment variables after they were set.

:::

:::note

In case, if you need to update snappyflow `projectName`, `appName` or `profileKey` then you need to uninstall the existing `elastic php` agent. 

:::



## Verification

Follow the below steps to verify whether SnappyFlow has started to collect the trace data.

1. Login into SnappyFlow.

2. Go to the **Application** tab.

3. In the **Application** tab, navigate to your **Project** > **Application**.

4. Click the **Application's Dashboard** icon.

   <img src="/img/tracing/image_2.png" />

5. Navigate to the **Tracing** section and click the `View Transactions` button.

6. You can view the traces in the **Aggregate** and the **Real Time** tabs.

   <img src="/img/tracing/image_1.png" />

   <img src="/img/tracing/image_3.png" />

## Steps to uninstall Elastic PHP agent

1. Download the `Elastic PHP` agent configuration.

   https://raw.githubusercontent.com/snappyflow/apm-agent-php/1.x/before-uninstall.sh

2. Use the below-given command to assign executable permission.

   `chmod +x ./before-uninstall.sh`

3. Run the below script with **sudo**.

    `sudo ./before-uninstall.sh`
