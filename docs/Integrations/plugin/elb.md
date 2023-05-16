# Monitor Elastic Load Balancer

## Description

Amazon Elastic Load Balancer used to automatically distribute incoming app traffic across AWS Instances which may be in different availability zones. Plugin will collect all metrics for Load balancer types that AWS provides which has Application, Classic and Network Load Balancer.

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
			"elasticloadbalancing:Describe*"
		  ],
		  "Effect": "Allow",
		  "Resource": "*"
		}
	  ]
	}
   ```



**Note**: Health check interval should be less than 300 Secs, since querying for data is 5mins interval it might report incorrect data from AWS.

### Configuration Settings

Select *ELB* Endpoint Type in *Add Endpoints* and add the following parameters:
- Region
- Instance Name

Select the plugin from the dropdown under Plugins tab and config the polling interval.
Plugin configuration for ELB services this includes Classic, Network and Application plugin. You can enable/disable any of the plugin based on your needs and instance support.

- Cloudwatch-classic - Collects data for classic load balancer 
- Cloudwatch-network - collects data for Network load balancers
- Cloudwatch-application – collects data for Application load balancers.


### Documents

All CloudWatch metrics are collected and tagged based on their ELB type to get displayed in their respective dashboard template. Use ELB_Network, ELB_Application and ELB_Classic for data visualization.

### Further Reading

S3 and [RDS](./rds)  for other AWS service related monitoring.

For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).