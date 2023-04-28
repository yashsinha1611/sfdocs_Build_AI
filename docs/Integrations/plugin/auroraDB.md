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


## Configure sfPoller 

Ensure that both the project and application are created within sfPoller. If they have not been created yet, you can [click here](/docs/sfPoller/aws_setup#configure-sfpoller) to learn how to create a project and application in sfPoller.

Follow the below step to add endpoints and plugins:

<img src="/img/integration/auroradb/image_1.png" />

1. In the **Application** tab of sfPoller, navigate to your **Project** > **Application**.

2. Click on the **Application**, it will take you to the `Endpoint` page.

   <img src="/img/integration/auroradb/image_2.png" />

3. Click the `Add Endpoint` button, add the following data, and save.

   <img src="/img/integration/auroradb/image_3.png" />

   - **Service Type**: Select AWS Service

   - **Name**: Give a meaningful name to the endpoint

   - **IP/Endpoint**: Add the application IP

   - **Instance Name**: Give the Instance name of your application

   <img src="/img/integration/auroradb/image_5.png" />

4. In the **Plugins** window, click the `+Add` button.

   <img src="/img/integration/auroradb/image_4.png" />

5. In the **Add Plugin** window, select the below details and save.

   - **Plugin Type**: `Metric` 

   - **Plugin**: `cloudwatch-aurora` or `cloudwatch-auroramysqlinsights` or `cloudwatch-aurorapostgresinsights`

   - **Interval**: Choose an interval value. The minimum value for the interval is 300

   - **Status**: By default, the status is `Enabled`

6. Click the global `Save` button in the window's top right corner to save all the changes made so far.

## View Database Metrics

Follow the below steps to view the metrics collected from Aurora DB.

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.

   <img src="/img/integration/auroradb/image_6.png" />

2. You can view the database metrics in the **Metrics** section.

:::note

Once plugins are added to sfPoller, they will be automatically detected within the Metrics section. However, if the plugins are not detected, you can import templates to view the corresponding metrics.

:::

​       <img src="/img/integration/auroradb/image_8.png" />

3. To access the unprocessed data gathered from the plugins, navigate to the **Browse data** section and choose the `Index: Metric`, `Instance: Endpoint`, `Plugin,` and `Document Type`.

#### Template Details

| Template  | Plugin | Document Type | Description                    |
| ---------------| ----------|-----------------------|--------------------------------- |
| Aurora | cloudwatch-aurora | InstanceStats, ClusterStats | Monitors AWS AuroraDB instance to collect all the cluster-level and instance-level metrics.|
| Aurora_Postgres_Insights | cloudwatch-aurorapostgresinsights |RDSaurorapostgresDetails | Monitors AWS Aurora PostgresDB to collect both native and non-native Postgres metrics.|
| Aurora_MYSQL_Insights | cloudwatch-auroramysqlinsights | RDSauroramysqlDetails| Monitors AWS Aurora MySql DB to collect both native and non-native MySql metrics.|

#### Metric List

##### Aurora-PostgrestanceStats

| Metric | Description |
| ------ | ------ |
| SwapUsage  | The amount of swap space used. |
| StorageNetworkTransmitThroughput| 	The amount of network throughput received from the Aurora storage subsystem by each instance in the DB cluster.|
| CPUUtilization  | 	The percentage of CPU used by an instance.|
| DatabaseConnections | 	The number of client network connections to the database instance.|
| StorageNetworkReceiveThroughput  | 	The amount of network throughput received from the Aurora storage subsystem by each instance in the DB cluster.|
| ReadLatency | 	The average amount of time taken per disk I/O operation.|
| EngineUptime | 	The amount of time that the instance has been running.|
| NetworkTransmitThroughput  |   The amount of network throughput sent to clients by each instance in the Aurora DB cluster.|
| FreeableMemory | 	The amount of available random access memory, in bytes.|
| FreeLocalStorage | 	This metric reports the amount of storage available to each instance for temporary tables and logs.|
| Deadlocks | 	The average number of deadlocks in the database per second.|
| CommitThroughput | 	The average number of commit operations per second.|
| CommitLatency	| The average duration of commit operations.|
| AuroraReplicaLag 	| For an Aurora replica, the amount of lag when replicating updates from the primary instance.|
| WriteThroughput| The average number of bytes written to persistent storage every second.|
| WriteIOPS | 	The number of Aurora storage write records generated per second.|
| ReadThroughput | 	The average number of bytes read from disk per second.|
| ReadIOPS | 	The average number of disk I/O operations per second.|
| RDSToAuroraPostgreSQLReplicaLag | 	TThe lag when replicating updates from the primary RDS PostgreSQL instance to other nodes in the cluster|
|  DiskQueueDepth  |  	The number of outstanding read/write requests waiting to access the disk. |

##### Aurora-mysql InstanceStats

| Metric | Description |
| ------ | ------ |
|  RowLockTime 	 |  The total time spent acquiring row locks for InnoDB tables. |
|  SelectLatency  |  	The average amount of time for select operations. |
|  LoginFailures  |  	The average number of failed login attempts per second. |
|  InsertThroughput  |  The average number of insert operations per second. |
|  InsertLatency  |  	The average duration of insert operations. |
|  DMLThroughput 	 |  The average number of inserts, updates, and deletes per second. |
|  DMLLatency  |  	The average duration of inserts, updates, and deletes. |
|  DeleteThroughput  |  The average number of deleted queries per second. |
|  DeleteLatency  |  	The average duration of delete operations. |
|  DDLThroughput  |  The average number of DDL requests per second. |
|  DDLLatency  |  	The average duration of requests such as example, create, alter, and drop requests. |
|  BlockedTransactions  |  	The average number of transactions in the database that are blocked per second. |
|  AuroraBinlogReplicaLag  |  	The amount of time that a binary log replica DB cluster running on Aurora MySQL-Compatible Edition lags behind the binary log replication source. |
|  UpdateThroughput   |  	The average number of updates per second. |
| StorageNetworkTransmitThroughput| 	The amount of network throughput received from the Aurora storage subsystem by each instance in the DB cluster.|
| StorageNetworkReceiveThroughput  | 	The amount of network throughput received from the Aurora storage subsystem by each instance in the DB cluster.|
| SwapUsage  | 	The amount of swap space used. This metric is available for the Aurora MySQL DB instance.|
| FreeableMemory | 	The amount of available random access memory, in bytes.|
| FreeLocalStorage | 	This metric reports the amount of storage available to each instance for temporary tables and logs.|
| Deadlocks | 	The average number of deadlocks in the database per second.|
| ReadLatency | 	The average amount of time taken per disk I/O operation.|
| CPUUtilization  | 	The percentage of CPU used by an instance.|
| DatabaseConnections | 	The number of client network connections to the database instance.|
| CommitThroughput | 	The average number of commit operations per second.|
| CommitLatency	| The average duration of commit operations.|
| EngineUptime | 	The amount of time that the instance has been running.|

##### **cloudwatch-aurorapostgresinsights:**


| Metric | Description |
| ------ | ------ |
| db.SQL.tup_deleted | 	Number of rows deleted by queries in this database. | 
| db.SQL.tup_fetched	 |   Number of rows fetched by queries in this database. | 
| db.SQL.tup_inserted	 |   Number of rows inserted by queries in this database  | 
| db.SQL.tup_returned  | 	Number of rows returned by queries in this database. | 
| db.SQL.tup_updated  |    Number of rows updated by queries in this database. | 
| db.Transactions.active_transactions |     no of transactions which are currently being executed. | 
| db.Transactions.blocked_transactions |    no of transactions which are blocked. | 
| db.Transactions.xact_commit |   Number of transactions in this database that have been committed. | 
|  db.Transactions.xact_rollback  | 	Number of transactions in this database that have been rolled back. | 
| db.User.numbackends | Number of backends currently connected to this database. | 
| db.Concurrency.deadlocks |  Number of deadlocks detected in this database. | 
| db.WAL.archived_count | 	Number of WAL files that have been successfully archived. | 
| db.WAL.archive_failed_count  | 	Number of WAL files that have been failed to archive. |
| db.Checkpoint.checkpoint_sync_latency	 | The total amount of time that has been spent in the portion of checkpoint processing where files are synchronized to disk.  | 
| db.Checkpoint.checkpoint_write_latency | 	The total amount of time that has been spent in the portion of checkpoint processing where files are written to disk. | 
| db.IO.read_latency | 	The time spent reading data file blocks by backends in this instance. | 

##### **cloudwatch-auroramysqlinsights:**


| Metric | Description |
| ------ | ------ |
| db.SQL.Com_select | 	no of select statements executed. | 
| db.SQL.Innodb_rows_deleted  | 	The number of rows deleted from InnoDB tables.  | 
| db.SQL.Innodb_rows_inserted | 	The number of rows inserted into InnoDB tables.  | 
| db.SQL.Innodb_rows_read  | 	The number of rows read into InnoDB tables. | 
| db.SQL.Innodb_rows_updated  |	The number of rows updated into InnoDB tables.|
| db.SQL.Questions 	 |  The number of statements executed by the server. | 
| db.Users.Aborted_clients  | 	The number of connections that were aborted because the client died without closing the connection properly. | 
| db.Users.Aborted_connects | 	The number of failed attempts to connect to the MySQL server. | 
| db.Users.Threads_created | 	The number of threads created to handle connections.  |
| db.Cache.innoDB_buffer_pool_hits 	 | The number of reads that InnoDB could satisfy from the buffer pool.  | 
| db.Cache.innoDB_buffer_pool_hit_rate | The percentage of reads that InnoDB could satisfy from the buffer pool.  | 
| db.Cache.innoDB_buffer_pool_usage | 	The percentage of the InnoDB buffer pool that contains data (pages).  | 
| db.Cache.query_cache_hit_rate  | 	The hit ratio for the MySQL result set cache (query cache). | 
| db.SQL.innodb_rows_changed	 |  The total InnoDB row operations | 
| db.Transactions.active_transactions  | 	The total active transactions.  | 
| db.Locks.innodb_deadlocks | 	The total number of deadlocks.| 
| db.Locks.innodb_lock_timeouts | 	The total number of deadlocks that timed out. | 





