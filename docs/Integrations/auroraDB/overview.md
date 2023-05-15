---
sidebar_position: 3 
---
# Monitor Aurora Database

## Overview

Amazon Aurora is a cloud-native relational database engine and it is compatible with both MySQL and PostgreSQL. The metrics of Aurora DB are gathered by sfPoller and displayed within the dashboard of SnappyFlow.

<img src="/img/integration/auroradb/image_12.png" />

## Prerequisites

To collect metrics of Aurora DB, it is necessary to have an IAM Role with CloudWatch access and sfpoller set up within your AWS environment. 

[Click here](/docs/sfPoller/aws_setup) to learn more about setting up sfpoller in your AWS environment.

##### Create a Policy to Access CloudWatch

1. Sign in to the AWS Management Console and open the IAM console at https://console.aws.amazon.com/iam/.

2. Follow the below steps to create a policy in the IAM console.

   ​       <img src="/img/integration/auroradb/image_11.png" />

   - Navigate to **Access Management > Policies**

   - In the **Policies** window, click the `Create policy` button

   - In the **Create policy** window, go to the **JSON** tab

   - Copy and paste the below-mentioned **JSON code** into the policy editor

     ```
     {
       "Version": "2012-10-17",
       "Statement": [
           {
             "Sid": "VisualEditor0",
             "Effect": "Allow",
             "Action": [
                        "rds:DescribeDBClusters",
                        "rds:DescribeDBInstances",
                        "rds:ListTagsForResource",
                        "rds:DescribeCertificates",
                        ],
             },
         ],
     }
     ```

     

   - Click the `Next: Tags` > `Next: Review` button

   - In the **Review policy** window, give the **Name**:  `CloudWatchReadOnlyAccess` and **Description** (Optional) for the policy and review the list of permissions.

   - Click the `Create policy` button

3. Attach the `CloudWatchReadOnlyAccess` policy to a dedicated IAM Role for read-only access.

## Collect Metrics and Logs

Start collecting metrics and logs from Aurora-PostgreSQL and Aurora-MySQL.

[Aurora-PostgreSQL](/docs/Integrations/auroraDB/postgresql)

[Aurora-MySQL](/docs/Integrations/auroraDB/mysql)
