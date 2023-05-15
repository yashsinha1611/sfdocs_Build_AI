# Monitor AWS ECS

## Overview

Amazon Elastic Container Service (ECS) is a cloud-based and fully managed container orchestration service.  The metrics of ECS are gathered by sfPoller and displayed within the dashboard of SnappyFlow.

<img src="/img/integration/ecs/image_1.png" />



## Prerequisite

Ensure that both the project and application are created within sfPoller. If they have not been created yet, you can [click here](https://stage-docs.snappyflow.io/docs/sfPoller/aws_setup#configure-sfpoller) to learn how to create a project and application in sfPoller.



## Configure Sfpoller to Enable ECS Monitoring

Follow the below steps to add endpoints and plugin.

1. In the **Application** tab of sfPoller, navigate to your **Project** > **Application**.

2. Click on the **Application**, it will take you to the `Endpoint` page.

3. Click the `Add Endpoint` button.


4. In the **Add Endpoint** window,  add the below details:

   - **Account Type**: Type of Cloud Provider
   - **Account Name**: Account create in the sfPoller
   - **Endpoint Type**: Select endpoint as ECS
   - **Name**: Name of the Service in your ECS cluster
   - **Instance Name**: Name of the instance
   - **Cluster Name**: Name of the cluster
   - **Tag**: Enter the Key and the Value of your ECS tag <br/>

:::note
You can add only one endpoint per service.
:::

5. Click on the `Add`  and `Save`  buttons.
6. In the **Add Plugin** window, select the below details and save.
   - **Plugin Type**: `Metrics`
   - **Plugin**: `Cloudwatch-ecs`

7. Click on the global `Save` button in the window's top right corner to save all the changes made so far.

## View ECS Metrics

Follow the below steps to view the metrics collected from ECS.

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.

   <img src="/img/integration/ecs/image_2.png" />

2. You can view the ECS metrics in the **Metrics** section.

:::note 

Once plugins are added to sfPoller, they will be automatically detected within the Metrics section. However, if the plugins are not detected, you can import **template**= `ECS` to view the corresponding metrics. 

:::

3. To access the unprocessed data gathered from the plugins, navigate to the **Browse data** section and choose the `Index: Metric`, `Instance: Endpoint`, `Plugin`, and `Document Type`.

 

