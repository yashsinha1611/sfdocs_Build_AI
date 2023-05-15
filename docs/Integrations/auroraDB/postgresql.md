---
sidebar_position: 3 
---
# Monitor Aurora-PostgreSQL Database

## Prerequisites

Ensure that both the project and application are created within sfPoller. If they have not been created yet, you can [click here](/docs/sfPoller/aws_setup#configure-sfpoller) to learn how to create a project and application in sfPoller.

## Configure sfPoller to Collect Metrics

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

   - **Plugin**: `cloudwatch-aurora` or  `cloudwatch-aurorapostgresinsights`

   - **Interval**: Choose an interval value. The minimum value for the interval is 300

   - **Status**: By default, the status is `Enabled`

6. Click the global `Save` button in the window's top right corner to save all the changes made so far.

## Configure sfPoller to Collect Logs

### Prerequisites

- Ensure that the aurorapostgresql slow query logs are enabled for the instance. Please refer to the following document to learn how to enable the aurorapostgresql slow query logs.

​         [RDS for PostgreSQL database log files - Amazon Relational Database Service](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.PostgreSQL.html)

- The following parameter groups are mandatory to add when enabling the slow query logs.
  
  <br/>
  
  |Parameter Group                                 |Description|
  |----------------------------------------------------|-----------------|
  |log_min_duration_sample |(ms) Sets  the minimum execution time above which a sample of statements is logged.  Sample size is set using the log_statement_sample_rate parameter.|
  | log_min_duration_statement | Any SQL  statement that runs atleast for the specified amount of time or longer gets  logged. By default, this parameter isn't set. Turning on this parameter can  help you find unoptimized queries. |
  | log_statement_sample_rate | The  percentage of statements exceeding the time specified in log_min_duration_sample to be logged, expressed as a floating point value between 0.0 and  1.0 |
  
- Publish the database logs to the Amazon CloudWatch Logs. Please refer to the following document to learn how to publish the database logs to the Amazon CloudWatch Logs.

   [Publishing database logs to Amazon CloudWatch Logs - Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_LogAccess.Procedural.UploadtoCloudWatch.html)

### Add Enpoints and Plugin

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

   <img src="/img/integration/auroradb/image_13.png" />

5. In the **Add Plugin** window, select the below details and save.

   - **Plugin Type**: `Logger` 

   - **Plugin**: `cloudwatch_log_rds`

   - **Engine**: `generic`

   - **Interval**: Choose an interval value. The minimum value for the interval is 300

   - **Status**: By default, the status is `Enabled`

6. Click the global `Save` button in the window's top right corner to save all the changes made so far.



## View Database Metrics and Logs

Follow the below steps to view the metrics collected from Aurora DB.

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.

   <img src="/img/integration/auroradb/image_6.png" />

2. You can view the database metrics and the slow query logs in the **Metrics** section.

:::note

Once plugins are added to sfPoller, they will be automatically detected within the Metrics section. However, if the plugins are not detected, you can import templates to view the corresponding metrics.

:::

​       <img src="/img/integration/auroradb/image_8.png" />

3. To access the unprocessed data gathered from the plugins, navigate to the **Browse data** section and choose the `Index: Metric or Logger`, `Instance: Endpoint`, `Plugin`, and `Document Type`.

#### Template Details

| Template                 | Plugin                            | Document Type               | Description                                                  |
| ------------------------ | --------------------------------- | --------------------------- | ------------------------------------------------------------ |
| Aurora                   | cloudwatch-aurora                 | InstanceStats, ClusterStats | Monitors AWS AuroraDB instance to collect all the cluster-level and instance-level metrics. |
| Aurora_Postgres_Insights | cloudwatch-aurorapostgresinsights | RDSaurorapostgresDetails    | Monitors AWS Aurora-PostgresDB to collect both native and non-native Postgres metrics. |
| Aurora_Postgres_Insights | cloudwatch_log_rds                | cloudwatch_log_rds          | To collect the Aurora-PostgresDB logs.                       |

#### Metric List

##### Aurora-Postgresql-instanceStats

| Metric                           | Description                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| SwapUsage                        | The amount of swap space used.                               |
| StorageNetworkTransmitThroughput | The amount of network throughput received from the Aurora storage subsystem by each instance in the DB cluster. |
| CPUUtilization                   | The percentage of CPU used by an instance.                   |
| DatabaseConnections              | The number of client network connections to the database instance. |
| StorageNetworkReceiveThroughput  | The amount of network throughput received from the Aurora storage subsystem by each instance in the DB cluster. |
| ReadLatency                      | The average amount of time taken per disk I/O operation.     |
| EngineUptime                     | The amount of time that the instance has been running.       |
| NetworkTransmitThroughput        | The amount of network throughput sent to clients by each instance in the Aurora DB cluster. |
| FreeableMemory                   | The amount of available random access memory, in bytes.      |
| FreeLocalStorage                 | This metric reports the amount of storage available to each instance for temporary tables and logs. |
| Deadlocks                        | The average number of deadlocks in the database per second.  |
| CommitThroughput                 | The average number of commit operations per second.          |
| CommitLatency                    | The average duration of commit operations.                   |
| AuroraReplicaLag                 | For an Aurora replica, the amount of lag when replicating updates from the primary instance. |
| WriteThroughput                  | The average number of bytes written to persistent storage every second. |
| WriteIOPS                        | The number of Aurora storage write records generated per second. |
| ReadThroughput                   | The average number of bytes read from disk per second.       |
| ReadIOPS                         | The average number of disk I/O operations per second.        |
| RDSToAuroraPostgreSQLReplicaLag  | TThe lag when replicating updates from the primary RDS PostgreSQL instance to other nodes in the cluster |
| DiskQueueDepth                   | The number of outstanding read/write requests waiting to access the disk. |

##### cloudwatch-aurorapostgresinsights:


| Metric                                 | Description                                                  |
| -------------------------------------- | ------------------------------------------------------------ |
| db.SQL.tup_deleted                     | Number of rows deleted by queries in this database.          |
| db.SQL.tup_fetched                     | Number of rows fetched by queries in this database.          |
| db.SQL.tup_inserted                    | Number of rows inserted by queries in this database          |
| db.SQL.tup_returned                    | Number of rows returned by queries in this database.         |
| db.SQL.tup_updated                     | Number of rows updated by queries in this database.          |
| db.Transactions.active_transactions    | no of transactions which are currently being executed.       |
| db.Transactions.blocked_transactions   | no of transactions which are blocked.                        |
| db.Transactions.xact_commit            | Number of transactions in this database that have been committed. |
| db.Transactions.xact_rollback          | Number of transactions in this database that have been rolled back. |
| db.User.numbackends                    | Number of backends currently connected to this database.     |
| db.Concurrency.deadlocks               | Number of deadlocks detected in this database.               |
| db.WAL.archived_count                  | Number of WAL files that have been successfully archived.    |
| db.WAL.archive_failed_count            | Number of WAL files that have been failed to archive.        |
| db.Checkpoint.checkpoint_sync_latency  | The total amount of time that has been spent in the portion of checkpoint processing where files are synchronized to disk. |
| db.Checkpoint.checkpoint_write_latency | The total amount of time that has been spent in the portion of checkpoint processing where files are written to disk. |
| db.IO.read_latency                     | The time spent reading data file blocks by backends in this instance. |











