
# ElastiCache

ElastiCache is the distributed in memory cache environments in the AWS cloud. Amazon ElastiCache supports the Memcached and Redis cache engines. 

## Prerequisites:

1. CloudWatch Access for IAM Role​

    Provide Read only access for CloudWatch to the dedicated IAM Role used for APM. You can use AWS managed polices that addresses many common use cases by providing standalone IAM policies that are created and administered by AWS. Attach this AWS policy **CloudWatchReadOnlyAccess** to IAM role to get read access for all CloudWatch else create the below custom policy and attach it to IAM. 

    **Required Permissions:**  
    - cloudwatch:GetMetricData,  
    - elasticache: ListTagsForResource,  
    - elasticache:DescribeCacheClusters,  
    - elasticache:DescribeEvents    

### Configuration Settings​ 

Select **ElastiCache** Endpoint Type in **Add Endpoints** and add the following parameters: 

- Instance Name: Provide ClusterName as Instance Name
    Select a plugin from the dropdown under Plugins tab `(cloudwatch-elasticache-redis or cloudwatch-elasticache-memcached)` and config the polling interval. Plugin configuration for **ElastiCache** instances includes CloudWatch Metrics. You can enable/disable any of the plugin based on your needs and instance support 

- CloudWatch - Collects both CloudWatch and performance insights metrics  
- Interval: Polling interval 
 
 
    
### Documents and Dashboard 

Data collected by plugins can be viewed in SnappyFlow’s browse data section under metrics section. 

**Plugin:** cloudwatch-elasticache-redis 

**documentType:** hostLevelStats, redisClusterDetails, redisNodeStats, redisOperationalStats 

**Dashboard templates:** ElastiCache_Redis 

**Plugin:** cloudwatch-elasticache-memcached 

**documentType:** hostLevelStats, memcachedClusterDetails, memcachedNodeStats, memcachedOperationalStats 

**Dashboard templates:** ElastiCache_Memcached 