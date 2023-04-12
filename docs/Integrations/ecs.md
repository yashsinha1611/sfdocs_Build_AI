# ECS Container Monitoring 

## What is the AWS ECS?
Amazon Elastic Container Service (ECS) is a cloud-based and fully managed container orchestration service. ECS is a highly scalable, high-performance container orchestration service that supports Docker containers and allows you to easily run and scale containerized applications on AWS. 

Amazon ECS eliminates the need to install and operate your own container orchestration software, manage and scale a cluster of virtual machines, or schedule containers on those machines.


## Why SnappyFlow?
SnappyFlow helps you to:
1.	Collect metrics from ECS deployment.
2.	Tracks data from your ECS cluster and displays them  SnappyFlow's dashboard.
3.	Collect the container insights.
4.	Triggers alert when an issue is generated in the ECS cluster. 

## Configure Sfpoller to Monitor ECS 

### Prerequisite

Set up Sfpoller in your cloud environment.  [Click here](/docs/sfPoller/overview) to know how to set it up.

### Enable ECS Monitoring in Sfpoller

There are two ways to enable monitoring for an application deployed in ECS.

1. **Tags** - By using the tags given in the ECS cluster service.
2. **Endpoints** - By using the endpoint option available in sfpoller.

#### Monitor an application via tags

##### Prerequisite

**Tags** created in your ECS cluster.

<img src="/img/java/Enable_ECS_service_tag.PNG" />

##### Enable ECS monitoring

Follow the below steps to enable ECS monitoring via Sfpoller:

1. Login into Sfpoller.

2. Navigate to the **Applications** tab.

3. Click on the `add application` button below the **Actions** tab.

4. In the **Add Application** window, select the `Discover` option and click on the `Next` button.

5. In the **Discover and Add Application** window,  enter the following search criteria:

   - **Cloud account** - Name of the cloud provider
   - **Tag KeyName** - Key of the ECS tag
   - **Tag Value** - Value of the ECS tag
   - **Tag for generating application Name** - Give a meaningful name for the application

6. Click on the `Add Rule` button.

7. Click on the `Discover Endpoints` button.

8. You can see the endpoints discovered based on the **Tags**.

9. Select the required endpoint and click on the `Save` button.

   <img src="/img/java/Enable_ECS_Add_Tags.PNG" />

#### Monitor an application by adding endpoints

Follow the below steps to enable ECS monitoring via sfpoller:

1. Login into Sfpoller.
2. Navigate to the **Applications** tab.
3. Click on the `add application` button below the **Actions** tab.
4. In the **Add Application** window, select the `Create New ` option and click on the `Next` button.
5. In the **Create Application** window, provide an application name and click on the `Save` button.
6. Click on the application and by default, it will navigate to the endpoints page.<br/><br/>

<img src="/img/java/Enable_ECS_Endpoints.PNG" />

6. Click on the `Add Endpoint` button.

7. In the Add Endpoint window,  Add the below details 
   - **Account Type**: Type of Cloud Provider.
   
   - **Account Name**: Account create in the Sfpoller
   
   - **Endpoint Type**: Select endpoint as **ECS**
   
   - **Name**: Name of the Service in your ECS cluster
   
   - **Instance Name**: Name of your instance
   
   - **Cluster Name**: Name of your cluster
   
   - **Tag**: Enter the Key and the Value of your ECS tag 
   
     
   
     <br/>
   
   :::note
   You can add only one endpoint per service.
   :::note
   
8. Click on the `Add` button.

9. Click on the `Save` button.

10. In the Plugins window, select the following
    - **Plugin Type**: Metrics
    - **Plugin**: Cloudwatch-ecs

11. Click on the `Save` button.

12. Now click on the global `Save` button at the top right corner of the window.

<img src="/img/java/Enable_ECS_Endpoints1.PNG" />    
<img src="/img/java/Enable_ECS_Inventory.PNG" />
<img src="/img/java/Enable_ECS_Dashboard.PNG" />

## View Metrics and Logs 

1. Login into SnappyFlow
2. Navigate to the **Application** tab > **Project** > **Application** and click the **Dashboard** icon.
3. Click the **tab menu** `...` icon on the **Metric** tab.
4. In the **Metrics** tab, you can view the ECS metrics.
5. If the ECS metric is not auto-discovered then in the **Import to Metrics Panes** window, select **Filter By**: `Standard`, **Template Name**: 
6. Click the `Save` button.

 <img src="/img/java/Enable_ECS-Dashboard_TaskDetails.PNG"/>

## Metric List    

