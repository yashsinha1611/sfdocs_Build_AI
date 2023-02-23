# AWS

## Setting up SnappyFlow in your own environment

SnappyFlow can be consumed via SnappyFlow Cloud or it can be setup in your own environment such as an on-prem data center or it can be setup in your cloud account in AWS and Azure.

:::caution

The below guide is applicable for setups with an **ingest rate below 500 GB/day**. For higher ingest rates, reach out to support@snappyflow.io

:::

## What you need to get started

- A SnappyFlow account. An account can be created [here](https://accounts.snappyflow.io).

- An approximate idea of your monthly ingest rates. The more accurate your data is, the better. This data is useful to ensure the right-sizing of your infrastructure

## Size your infrastructure using the sizing tool

SnappyFlow providesHead to accounts.snappyflow.io and use your SnappyFlow credentials to login. Once logged in, click on Pricing Calculator.

Choose your cloud platform and select the region where you want to deploy SnappyFlow. The region can be changed at a later stage too.

<img src="/img/snappyflow_self_hosted/select_cloud.png" />

### Total ingest rate ###
In the configuration page, enter the total ingest rate for your stack. This ingest rate is the daily average sum of all logs, metrics and traces. The tool automatically assumes a breakup between logs, metrics and traces and you can also manually adjust this breakup to match your stack needs or leave it at its default value.

<img src="/img/snappyflow_self_hosted/ingest_configuration.png" />

### Data retention ###
The next input on data retention defines how long the ingested data is retained in a high-performance storage. A very high data retention can significantly increase storage requirements and costs. 

<img src="/img/snappyflow_self_hosted/data_retention.png" />

### Extended backup ###
Using extended backup is one way to reduce infrastructure costs. All metrics and logs stored in the backup can easily be retrieved for easy visualizations. This backup is available only for metrics and logs. Any ingested log or metric that ages beyond the primary data retention period defined in the previous section is backed up in a low cost storage service.
<img src="/img/snappyflow_self_hosted/extended_backup.png" />

### Backup for SnappyFlow account data ###
It is recommended to create a backup for SnappyFlow account data. This account data is stored in a dedicated database. This helps in quick recovery in case of cloud infrastructure failures. This database stores all account and configuration information. 

<img src="/img/snappyflow_self_hosted/dedicated_backup.png" />

Click on Calculate Price button to continue.

### Cost summary ###

A summary of the infrastructure required and their cost is provided on the right. By default, a 1 year reserved instance pricing is taken. The tool also provides a list of alternate servers that can be choose either for better performance or for optimizing costs.

<img src="/img/snappyflow_self_hosted/cost_summary.png" />

## Dowload template to create SnappyFlow stack ##

Click on the Download button at the end of the infrastructure summary to get a template depending on the choice of cloud platform selected.

For AWS, a `Cloud Formation Template` is provided.

For Azure, a `Custom Template` is provided.

These templates are pre-loaded with the required stack information such as server types, quantities and help you quickly launch a SnappyFlow stack.

## Create SnappyFlow stack on AWS

### Pre-Requisites ###

- AWS account
- IAM role with required permissions. 
- Subscription for SnappyFlow Appliance & Ubuntu from the AWS Marketplace.

### Create an IAM Role

1. Sign in to the AWS Management Console and open the IAM console at https://console.aws.amazon.com/iam/

2. Follow the below steps to create a policy in the IAM console.

   <img src="/img/iam_role/image_11.png" />

   - Navigate to **Access management > Policies**

   - In the **Policies** window, click the `Create policy` button

     <img src="/img/iam_role/image_19.png" />

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
               "rds:*",
               "aws-marketplace:*",
               "s3:*",
               "cloudwatch:*",
               "cloudformation:*",
               "ec2:*",
               "elasticloadbalancing:*",
               "acm:*",
               "iam:GetServerCertificate",
               "iam:UploadServerCertificate"
               ],
               "Resource": "*"
           }
       ]
   }
   ```

   - Click the `Next: Tags` > `Next: Review` button

     <img src="/img/iam_role/image_4.png" />

   - In the **Review policy** window, give a unique **Name** and **Description** (Optional) for the policy and review the list of permissions

   - Click the `Create policy` button

3. Follow the below steps to create an IAM role.

   <img src="/img/iam_role/image_15.png" />

   - Navigate to **Access management > Roles**

   - Click the `Create role` button

     <img src="/img/iam_role/image_16.png" />

   - In the **Select trusted entity** window, select the **AWS service**

   - Select the **Use case** as **EC2** and click `Next`

     <img src="/img/iam_role/image_14.png" />

   - Go to the **Add permissions** section

   - Select the policy created in **Step 2**

   - Click the `Next` button

     <img src="/img/iam_role/image_17.png" />
     
   - In the Role details, give a **Role name** and **Description** (optional).
   
     <img src="/img/iam_role/image_18.png" />
     
   - Review the entities and permissions.
   
   - Click the `Create role`  button
   
     

### Uploading the template ###

Sign into your AWS console. Search for `Cloudformation` using the search bar on top and select the `CloudFormation` service.

<img src="/img/snappyflow_self_hosted/cloudformation.png" />

Click on `Create Stack` and select `With new resources` option.

<img src="/img/snappyflow_self_hosted/aws_create_stack.png" />

Select `Template is ready` and upload the template provided by SnappyFlow sizing tool and click `Next`.

<img src="/img/snappyflow_self_hosted/aws_create_stack_2.png" />



### Configuration ###

In this page, provide a stack name and configure subnets and IAM Roles required for the stack.

<img src="/img/snappyflow_self_hosted/aws_stack_configuration.png" />



**Deployment**

Choose Recommended

**Database Type**

If a backup for SnappyFlow account is required, choose 'RDS'. Else select 'Local'

**Private Subnet**

APM and Opensearch instances will be created under selected Subnets. If RDS is selected as DatabaseType, add two subnets with same VPC and different availability zones, as RDS creation needs to cover all availability zones in the region. APM and Opensearch instances will be created with first subnet(first selection in checkbox) !!!

:::note
If DatabaseType is chosen as RDS, provide two Private Subnets. Without two separate subnets, stack creation will fail.
:::

**Public Subnet**

Loadbalancer and bastion will be created under this Subnet. Select public subnet of availibility zone same as first PrivateSubnetIds (first selection in checkbox) of same VPC. 

For example: If a private subnet with availability zone "a" is selected, a public subnet of availability zone "a" should be added under same VPC, so that the Loadbalancer can forward request to target group of instances.

**Allowed IP**

Provide a list of IP addresses which can access SnappyFlow server

**KeyName**

Provide an existing key for SSH access to SnappyFlow instances

**IAMRole**

Provide an existing IAM Role with appropriate permissions. This is required to discover end points and create a S3 storage required for logs and metric backup.

Click on `Next` to continue.

In the `Configure stack options` screen, provide tags and verify all permissions and other stack creation options.

Click on `Next` to continue.

Review all configuration settings and click on `Create Stack' to create SnappyFlow stack.

<img src="/img/snappyflow_self_hosted/aws_stack_review.png" />

Once the stack is successfully created, it should appear under the list of stacks in CloudFormation service.

<img src="/img/snappyflow_self_hosted/aws_stack_complete.png" />

### Accessing SnappyFlow server ###


Click on the stack and select `Outputs` tab

<img src="/img/snappyflow_self_hosted/aws_stack_output.png" />

SnappyFLow portal can be accessed using the server URL provided here. The default username is  admin and password is the instance id.

<img src="/img/snappyflow_self_hosted/aws_stack_url.png" />

SnappyFlow will complete the installation automatically. This process takes upto 30 minutes.

<img src="/img/snappyflow_self_hosted/portal.png" />

## Create SnappyFlow stack on AWS

### Pre-Requisites ###

- AWS account
- Pre-configured IAM roles with appropriate access levels

### Uploading the template ###

Sign into your AWS console. Search for `Cloudformation` using the search bar on top and select the `CloudFormation` service.

<img src="/img/snappyflow_self_hosted/cloudformation.png" />

Click on `Create Stack` and select `With new resources` option.

<img src="/img/snappyflow_self_hosted/aws_create_stack.png" />

Select `Template is ready` and upload the template provided by SnappyFlow sizing tool and click `Next`.

<img src="/img/snappyflow_self_hosted/aws_create_stack_2.png" />



### Configuration ###

In this page, provide a stack name and configure subnets and IAM Roles required for the stack.

<img src="/img/snappyflow_self_hosted/aws_stack_configuration.png" />



**Deployment**

Choose Recommended

**Database Type**

If a backup for SnappyFlow account is required, choose 'RDS'. Else select 'Local'

**Private Subnet**

APM and Opensearch instances will be created under selected Subnets. If RDS is selected as DatabaseType, add two subnets with same VPC and different availability zones, as RDS creation needs to cover all availability zones in the region. APM and Opensearch instances will be created with first subnet(first selection in checkbox) !!!

:::note
If DatabaseType is chosen as RDS, provide two Private Subnets. Without two separate subnets, stack creation will fail.
:::

**Public Subnet**

Loadbalancer and bastion will be created under this Subnet. Select public subnet of availibility zone same as first PrivateSubnetIds (first selection in checkbox) of same VPC. 

For example: If a private subnet with availability zone "a" is selected, a public subnet of availability zone "a" should be added under same VPC, so that the Loadbalancer can forward request to target group of instances.

**Allowed IP**

Provide a list of IP addresses which can access SnappyFlow server

**KeyName**

Provide an existing key for SSH access to SnappyFlow instances

**IAMRole**

Provide an existing IAM Role with appropriate permissions. This is required to discover end points and create a S3 storage required for logs and metric backup.

Click on `Next` to continue.

In the `Configure stack options` screen, provide tags and verify all permissions and other stack creation options.

Click on `Next` to continue.

Review all configuration settings and click on `Create Stack' to create SnappyFlow stack.

<img src="/img/snappyflow_self_hosted/aws_stack_review.png" />

Once the stack is successfully created, it should appear under the list of stacks in CloudFormation service.

<img src="/img/snappyflow_self_hosted/aws_stack_complete.png" />

### Accessing SnappyFlow server ###


Click on the stack and select `Outputs` tab

<img src="/img/snappyflow_self_hosted/aws_stack_output.png" />

SnappyFLow portal can be accessed using the server URL provided here. The default username is  admin and password is the instance id.

<img src="/img/snappyflow_self_hosted/aws_stack_url.png" />

SnappyFlow will complete the installation automatically. This process takes upto 30 minutes.

<img src="/img/snappyflow_self_hosted/portal.png" />