# ECS Container Monitoring 

## What is the AWS ECS
Amazon Elastic Container Service (ECS) is a cloud-based and fully managed container orchestration service. ECS is a highly scalable, high-performance container orchestration service that supports Docker containers and allows you to easily run and scale containerized applications on AWS. Amazon ECS eliminates the need for you to install and operate your own container orchestration software, manage and scale a cluster of virtual machines, or schedule containers on those virtual machines.
If you are using the fargate type, add the following information to the existing task definition where your application docker container is running.

## How SnappyFlow help you monitoring ECS
SnappyFlow help you in the
1.	collect metrics from ECS deployment
2.	Track data from your ECS cluster, and its hosts and services are running in the cluster details will show in SnappyFlow dashboards
3.	Collect the container insights 
4.	Trigger the alerts to track the issues within your ECS cluster.

SnappyFlow collects detailed information about your ECS clusters using sfPoller. sfPoller is an extremely useful component of SnappyFlow which is used for collecting the metrics for the cloud services like RDS, ECS, ELB, S3 etc. sfpoller queries CloudWatch for metrics and will use the tags from ECS to collect the information about ECS and any other AWS services if you like to monitor. 
You can also deploy the snappyflow Agent as a container in task definition to your ECS clusters to gather application metrics, tracing, and logs from application container.

## Setup SnappyFlow sfpoller to collect ECS Metrics
SnappyFlow sfpoller collects ECS metrics from CloudWatch, including ECS events and tags, and the status of container instances, tasks, and services. To setup the SnappyFlow sfpoller please follow the below documentation.

See Documentation [to setup SnappyFlow sfPoller](https://docs.snappyflow.io/docs/sfPoller/aws_setup)

## Steps to enable ECS metrics
Once you done the sfpoller setup as mentioned in the documentation to enable the metrics for ECS service follow the below steps .
1.	Navigate to the Application tab
2.	Click on Create Project or if already created the project you can use the same
3.	Once the project is created SnappyFlow sfPoller providing the two ways to monitor the ECS
- First one is using the tags
    - Click on the + icon under the actions tab for a specific project and it will open add application pop up
    - Select Discover option and click on next
    - Under the search criteria select the cloud account and provide the relevant tags which you are provided in the ECS cluster service as shown below<br/><br/>
        <img src="/img/java/Enable_ECS_service_tag.png" />
    - after providing the tags click on add rule. <br/><br/>
        <img src="/img/java/Enable_ECS_Add_Tags.png" />
    - Click on the discover the endpoints and it will show the list of services matching with the tags in your aws account. 
    - Select the required endpoints and click on save.
    
- Second is using the endpoints
    - Click on the + icon under the actions tab for a specific project and it will open add application pop up.
    - Select the create new option and click on next
    - Provide the application name and click on save
    - Expand the project and select the application
    - By default, you will navigate the end points page<br/><br/>

        <img src="/img/java/Enable_ECS_Endpoints.png" />

    - Click on add endpoint and it will open add endpoint popup
    - Add the below details 
        - Select the service type as AWS service
        - Select the account name
        - Select the endpoint type as ECS
        - Provide the name
        - Provide the instance name, instance name should be the service name in ecs
        - Provide the ECS cluster name
        - Click on save
    - After adding the endpoint, select the add option in the plugins section from the right side.
    - Select the plugin type is metric and plugin is cloudwatch-ecs
    - Click on save
-  Once added the endpoints, you need to click on global save option which will shown at the top right corner. This option is used for restarting the controller after adding the new services

<img src="/img/java/Enable_ECS_Endpoints1.png" />

:::note
For each service you need to add the one endpoint. One service per one endpoint.
:::note
    
<img src="/img/java/Enable_ECS_Inventory.png" />
<img src="/img/java/Enable_ECS_Dashboard.png" />
<img src="/img/java/Enable_ECS-Dashboard_TaskDetails.png"/>
<img src="/img/java/Enable_ECS-Dashboard_Alerts.png"/>
        


