# Monitor MySQL DB in AWS RDS

## Overview

The metrics of MySQL DB running in AWS are gathered by sfPoller and displayed within the dashboard of SnappyFlow

<img src="/img/integration/mysql/image_9.png" /> 

## Prerequisites

To collect metrics of Postgres DB hosted on AWS, it is necessary to have a sfpoller set up within your AWS environment.

[Click here](/docs/sfPoller/aws_setup) to learn more about setting up sfpoller in your AWS environment.

## Configure sfPoller

Ensure that both the project and application are created within sfPoller. If they have not been created yet, you can [click here](/docs/sfPoller/aws_setup#configure-sfpoller) to learn how to create a project and application in sfPoller.

The video below explains the steps involved in setting up sfPoller to monitor a MySQL database running on AWS.

<iframe title="sfPoller Setup" width="570" height="321" src="https://www.youtube.com/embed/vTs7JVLND1I" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen"></iframe>

​        

Follow the below step to add endpoints and plugins:

1. In the **Application** tab of sfPoller, navigate to your **Project** > **Application**.
2. Click on the **Application**, it will take you to the `Endpoint` page.
3. Click the `Add Endpoint` button, add the following data, and save.
   - **Account Type**: Select account type as AWS
   - **Account Name**: Name of the AWS account
   - **Endpoint Type**: MySQL
   - **Name**: Give a meaningful name to the endpoint
   - **IP**: Add the application IP address
4. In the **Plugins** window, click the `+Add` button.
5. n the **Add Plugin** window, select the below details and save.
   - **Plugin Type**: `Metric`
   - **Plugin**: `MySQL`
   - **Interval**: Choose an interval value. The minimum value for the interval is 300
6. Click the global `Save` button in the window's top right corner to save all the changes made so far.

## View Database Metrics

Follow the below steps to view the metrics collected from MySQL DB.

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.

2. You can view the database metrics in the **Metrics** section. 

   <br/>

   :::note

   Once plugins are added to sfPoller, they will be automatically detected within the Metrics section. However, if the plugins are not detected, you can import templates to view the corresponding metrics.

   :::

3. To access the unprocessed data gathered from the plugins, navigate to the **Browse data** section and choose the `Index: Metric`, `Instance: Endpoint`, `Plugin,` and `Document Type`. 

#### Template Details

| **Template**      | **Plugin** | **Document Type**                                            |
| ----------------- | ---------- | ------------------------------------------------------------ |
| MySQL             | mysql      | databaseDetails, serverDetails, and tableDetails             |
| MySQL_Replication | mysql      | databaseDetails, serverDetails, tableDetails, masterReplicationDetails, and slaveReplicationDetails |

