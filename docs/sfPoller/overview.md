
# What Is SfPoller?


During the course of instrumenting an application for monitoring, an SRE or an architect needs a repertoire of tools to cater to varied requirements of monitoring. sfPoller is a powerful and extremely useful component of SnappyFlow and when used in conjunction with sfAgent and sfPod, allow users to reach all interfaces of an application that need to be monitored.

A few example scenarios where sfPoller is indispensable are mentioned below:
 
| **Use Cases** | **sfPoller features**       |
| ------------- | ---------------------------- |
| Monitoring Cloud Services such as ELB, S3, RDS etc.  | Includes plugins for most commonly used cloud components. Plugin connects to a cloud account, discover inventory and collect static & dynamic parameters using Public cloud APIs, Cloudwatch and Azure Monitor. |
| Database monitoring  | Includes plugins for most popular databases e.g. Oracle, MySQL, MS-SQL, Postgres, Redis, Elasticsearch etc. |
| Service Monitoring using Synthetics  | Users can deploy postman like collections on sfPoller to monitor health of API end-points. Alternatively, users can run synthetic monitoring on Blazemeter & Taurus and poll these external load generators to get results of various runs and correlate the results with application performance. |
| Monitoring of Cloud Inventory, Usage and Pricing  | Includes plugins for AWS, Azure and GCP to provide analysis of usage and billing at a very granular level. |
| Datacenter monitoring and analysis  | sfPoller contains a very highly scalable vCenter, HyperV and Baremetal pollers that can monitor extremely large deployments and provide analysis of performance and usage. |
