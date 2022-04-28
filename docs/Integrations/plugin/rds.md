# RDS

## Description

Amazon Relational Database Service (Amazon RDS) is a managed SQL database service provided by Amazon Web Services (AWS). It is web service designed to simplify the setup, operation, and scaling of a relational database for use in applications. Plugin will get RDS related metrics from CloudWatch to monitor the performance.

### Prerequisites

1. ##### CloudWatch Access for IAM Role

   Provide Read only access for CloudWatch to the dedicated IAM Role used for APM. You can use AWS managed polices that addresses many common use cases by providing standalone IAM policies that are created and administered by AWS. Attach this AWS policy **CloudWatchReadOnlyAccess** to IAM role to get read access for all CloudWatch else create the below custom policy and attach it to IAM.


   ```json
   {
    "Version": "2012-10-17",
    "Statement": [
     {
      "Action": [
          "cloudwatch:Describe*",
          "cloudwatch:Get*",
          "cloudwatch:List*",
          "logs:Get*",
          "rds:Describe*",
          "logs:Describe*"
      ],
      "Effect": "Allow",
      "Resource": "*"
     }
    ]
   }
   ```

   

2. ##### Enable Performance Insights

   Enable Performance Insights for RDS (currently supported for MySQL and PostgreSQL) to collect insight metrics for RDS. We can enable while creating the RDS or click modify and edit . Please verify whether your RDS has support for [Performance Insights](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html) 

   Performance Insights is enabled when you choose Enable Performance Insights in the Performance Insights section . For more detailed information please refer [AWS Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.Enabling.html#USER_PerfInsights.Console.Creating).

   

3. ##### Performance Insight Access for IAM Role

   To provide access to specific users, create the custom policy with access for Performance Insight and assign the policy to IAM user. 

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
      {
        "Effect": "Allow",
        "Action": "pi:*",
        "Resource": "arn:aws:pi:*:*:metrics/rds/*"
      }
     ]
   }
   ```

   For more information how to create custom policy please refer [AWS Access](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.access-control.html).

   

4.  ##### Enable and Publish Logs to CloudWatch

    Modify the parameter group for the general_log and slow_query_log to collect logs and publish the logs to CloudWatch you need to configure the log exporter for particular database then choose modify and select the log types as needed and continue, and then choose Modify DB Instance. For detailed Information how to enable and publish, please refer [AWS Documentation](https://aws.amazon.com/premiumsupport/knowledge-center/rds-aurora-mysql-logs-cloudwatch/)

### Configuration Settings

Select *RDS* Endpoint Type in *Add Endpoints* and add the following parameters:
- IP
- Region
- Instance Name

Select the plugin from the dropdown under Plugins tab and config the polling interval.
Plugin configuration for RDS instances includes CloudWatch, CloudWatch log and native MySQL plugin. You can enable/disable any of the plugin based on your needs and instance support.

- *CloudWatch* - Collects both CloudWatch and performance insights metrics
- *CloudWatch log* – collects RDS logs which have visualization under log section
- Native *MySQL/PostgreSQL* plugin – collects database and table related metrics

Configuration for native *MySQL/PostgreSQL* plugin:
- Username: DB login username
- Password: DB login password
- Port: Connecting port
- Document Types: Select the required document types. Available options are serverDetails, databaseDetails, tableDetails.
- Interval: Polling interval


### Documents

All CloudWatch metrics are collected and displayed in RDS_MySQL/RDS_PostgreSQL dashboard. CloudWatch log for RDS are collected and tagged as RDSLogger type and slow query is captured and can be view under log section.

### Further Reading

S3 and [ELB](./elb)  for other AWS service related monitoring.

For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).