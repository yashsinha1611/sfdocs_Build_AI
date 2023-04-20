# CloudWatch Integration 

## Overview

CloudWatch Integration enables you to transfer logs from AWS CloudWatch to SnappyFlow. An AWS Lambda handler is specifically designed using AWS Lambda functions to integrate AWS CloudWatch and SnappyFlow.

<img src="/img/integration/cloudwatch/image_14.png" />



## How to Integrate?

### Prerequisite

Click the below URL to download the zip file that contains the latest build of the lambda handler.

https://github.com/snappyflow/apm-agent/releases/download/cloudwatch-logs-lambda-function/sfagent-lambda-handler.zip


### Step 1: Create a lambda function
1. Login into your AWS account.

   <img src="/img/integration/cloudwatch/image_6.png" />

2. Go to the **AWS Lambda** service and click the `Create function` button.

3. In the **Create function** window, choose the `Author from scratch` option.

4. In the **Basic information** window, enter the following details:

   - **Function Name**: Give a meaningful function name
   - **Runtime**: Select Go 1.x
   - **Architecture**: Select based on your requirement

5. Click the `Create function` button.

### Step 2: Add Trigger

<img src="/img/integration/cloudwatch/image_8.png" />

1. Click the `Add trigger` button.

   <img src="/img/integration/cloudwatch/image_7.png" />

2. In the **Add trigger** window, select the following details:

   - **Source**: Select the source as **CloudWatch Logs**
   - **Log group**: Select a log group
   - **Filter name**: give a filter name based on the requirement
   - **Filter pattern** (optional)

3. Click the `Add` button.

### Step 3: Enable the Lambda handler

<img src="/img/integration/cloudwatch/image_10.png" />

1. Go to the **Code** > **Code Source** tab.

2. Click the `Upload from` button and choose the `.zip file` option.

3. Upload the `Lambda-handler.zip` file and save.

   <img src="/img/integration/cloudwatch/image_13.png" />

4. Go to **Runtime settings**, click the `Edit` button, and change the default handler to `sfagent`.

### Step 4: Add Environment variables

<img src="/img/integration/cloudwatch/image_11.png" />

1. Go to the **Configuration** section.

2. Navigate to the **Environment variable** tab and click on the `Edit` button.

3. In the **Edit environment variables** window, click the `Add Environment variable` button.

   <img src="/img/integration/cloudwatch/image_12.png" />

4. Add the below-mentioned environment variables.

   - **Key**: `APP_NAME`, **Value**: Name of the application
   - **Key**: `KEY`, **Value**: Profile key copied from SnappyFlow
   - **Key**: `NAME`, **Value**: Name of the Instance
   - **Key**: `PROJECT_NAME`, **Value**: Name of the project


4. Click on the `Save` button.

## View Logs

1. Login into SnappyFlow.

2. Navigate to the **Application** tab > **Project** > **Application** and click the **Dashboard** icon.

3. In the Dashboard window, navigate to **Log Management** > **Primary Storage**.

   <img src="/img/integration/cloudwatch/image_4.png" />

4. In the **Primary Storage** window, you can see the logs transferred from CloudWatch.

   <img src="/img/integration/cloudwatch/image_3.png" />

5. To see the raw data, navigate to the **Browse Data** tab and enter the below details:

   - **Index**: Log
   - **Instance**: Select an instance

   - **Plugin**: cloudwatch-logs 
   - **Document Type**: cloudwatchLogs





