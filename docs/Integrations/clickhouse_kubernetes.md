# Clickhouse on Kubernetes

Clickhouse running in Kubernetes can be monitored in SnappyFlow using Prometheus exporter.

## Clickhouse monitoring with Prometheus

Refer to Prometheus Exporter overview to understand how SnappyFlow monitors using Prometheus exporters.

 ### Pre-requisites

 Prometheus exporter is deployed as a side-car in the application container and the exporter port is accessible to sfPod

 ### Metrics list

##### Cluster Details

| **Name** | **Description**       |
| ------------- | ---------------------------- |
| DNSError |  Total count of errors in DNS resolution |
| DelayedInserts |  Number of times the INSERT of a block to a MergeTree table was throttled due to high number of active data parts for partition.|
|  ContextLocks |   Number of times the lock of Context was acquired or tried to acquire. This is global lock.|
| MergedUncompressedBytes |   Uncompressed bytes (for columns as they stored in memory) that was read for background merges. This is the number before merge.|
| MergesTimeMilliseconds |   Total time spent for background merges. |
| DiskReadElapsedMicroseconds |   Total time spent waiting for read syscall. This include reads from page cache.|
| DiskWriteElapsedMicroseconds |   Total time spent waiting for write syscall. This include writes to page cache. |
| MergeTreeDataWriterCompressedBytes |   Bytes written to filesystem for data INSERTed to MergeTree tables.|
| MergeTreeDataWriterRows |   Number of rows INSERTed to MergeTree tables. |
| NumberOfTables |   Number of tables |
| InsertedBytes  |   Number of bytes (uncompressed; for columns as they stored in memory) INSERTed to all tables. |
| InsertedRows  |  Number of rows INSERTed to all tables. |
| Merge  |   Number of launched background merges.  |
| Query  |   Number of queries to be interpreted and potentially executed. Does not include queries that failed to parse or were rejected due to AST size limits, quota limits or limits on the number of simultaneously running queries. May include internal queries initiated by ClickHouse itself. Does not count subqueries. |
| FailedQuery  |   Number of failed queries. |
| SelectQuery  |   Same as Query, but only for SELECT queries. |
| FailedSelectQuery  |   Same as FailedQuery, but only for SELECT queries. |
| fileopen  |   Number of files opened. |
| NumberOfDatabases   |   Number of databases |
| ReadonlyReplica  |    Number of Replicated tables that are currently in readonly state due to re-initialization after ZooKeeper session loss or due to startup without ZooKeeper configured. |
| OSCPUWaitMicroseconds  |    Total time a thread was ready for execution but waiting to be scheduled by OS, from the OS point of view. |
| OSIOWaitMicroseconds  |   Total time a thread spent waiting for a result of IO operation, from the OS point of view. This is real IO that doesn't include page cache. |
| UserTimeMicroseconds  |   Total time spent in processing (queries and other tasks) threads executing CPU instructions in user space. This include time CPU pipeline was stalled due to cache misses, branch mispredictions, hyper-threading, etc. |
| OSWriteBytes  |    Number of bytes written to disks or block devices. Doesn't include bytes that are in page cache dirty pages. May not include data that was written by OS asynchronously. |
| QueryDuration  (Prom Metric: chi_clickhouse_event_RealTimeMicroseconds)  |    Total (wall clock) time spent in processing (queries and other tasks) threads (not that this is a sum). |
| MergedRows   |   Rows read for background merges. This is the number of rows before merge. |
| LongestRunningQuery  |   Longest running query time |
| HardPageFaults  |   An exception that the memory management unit (MMU) raises when a process accesses a memory page without proper preparations |

  ##### Host Details

| **Name** | **Description**       |
|------------- | ---------------------------- |
| DNSError |   Total count of errors in DNS resolution |
| Httpconnection  |  The number of connections to HTTP server |
| CompressedReadBufferBlocks  |  Number of compressed blocks (the blocks of data that are compressed independent of each other) read from compressed sources (files, network) |
| CompressedReadBufferBytes  |  Number of uncompressed bytes (the number of bytes after decompression) read from compressed sources (files, network). |
| DiskReadElapsedMicroseconds  |  Total time spent waiting for read syscall. This include reads from page cache. |
| DiskWriteElapsedMicroseconds  |  Total time spent waiting for write syscall. This include writes to page cache. |
| MergeTreeDataWriterCompressedBytes  |  Bytes written to filesystem for data INSERTed to MergeTree tables. |
| MergeTreeDataWriterRows  |  Number of rows INSERTed to MergeTree tables. |
| DistributedConnectionFailAtAll  |  Total count when distributed connection fails after all retries finished |
| InsertQuery  |  Same as Query, but only for INSERT queries. |
| NumberOfTables  |  Number of tables |
| Query Threads  |  Number of query processing threads |
| ZooKeeperUserExceptions  |   ZooKeeper User Exceptions |
| BackgroundDistributedSchedulePoolTask   |  Number of active tasks in          BackgroundDistributedSchedulePool. This pool is used for distributed sends that is done in background. |
| BackgroundMovePoolTask  |  Number of active tasks in BackgroundProcessingPool for moves |
| BackgroundSchedulePoolTask  |  Number of active tasks in BackgroundSchedulePool. This pool is used for periodic ReplicatedMergeTree tasks, like cleaning old data parts, altering data parts, replica re-initialization, etc |
| ContextLocks  |  Number of times the lock of Context was acquired or tried to acquire. This is global lock. |
| ContextLockWait  |  Number of threads waiting for lock in Context. This is global lock. |
| GlobalThreadActive  |  Number of threads in global thread pool running a task. |
| GlobalThreadTotal  |  Number of threads in global thread pool.    |
| LocalThreadActive  |  Number of threads in local thread pools running a task. |
| LocalThreadTotal  |  Number of threads in local thread pool.    |
| PartMutation  |  Number of mutations (ALTER DELETE/UPDATE) |
| FailedQuery  |  Number of failed queries. |
| SelectQuery  |  Same as Query, but only for SELECT queries. |
| FailedSelectQuery  |  Same as FailedQuery, but only for SELECT queries. |
| Fileopen  |  Number of files opened. |
| MergedRows   |  Rows read for background merges. This is the number of rows before merge. |
| Merge  |  Number of launched background merges.  |
| Query  |  Number of queries to be interpreted and potentially executed. Does not include queries that failed to parse or were rejected due to AST size limits, quota limits or limits on the number of simultaneously running queries. May include internal queries initiated by ClickHouse itself. Does not count subqueries. |
| InsertedBytes  |  Number of bytes (uncompressed; for columns as they stored in memory) INSERTed to all tables. |
| InsertedRows  |  Number of rows INSERTed to all tables. |
| MergedUncompressedBytes  |   Uncompressed bytes (for columns as they stored in memory) that was read for background merges. This is the number before merge. |
| MergesTimeMilliseconds  |  Total time spent for background merges. |
| ReplicasMaxInsertsInQueue  |  |
| ReplicasMaxMergesInQueue   |  |
| ReplicasSumInsertsInQueue  |  |
| ReplicasSumMergesInQueue  |  |
| jemalloc_background_thread_num_runs |  |
| MaxPartCountForPartition  |  |
| MemoryTrackingForMerges    |  Total amount of memory (bytes) allocated for background merges. Included in MemoryTrackingInBackgroundProcessingPool. Note that this value may include a drift when the memory was allocated in a context of background processing pool and freed in other context or vice-versa. This happens naturally due to caches for tables indexes and doesn't indicate memory leaks. |
| ZooKeeperWaitMicroseconds |  |
| ArenaAllocBytes  |  |


  ##### TableStats

 | **Name** | **Description**       |
 |------------- | ---------------------------- |
 | Table  |  Name of the table | 
 | Database  |  Name of the database | 
 | NumPartitions  |  Number of partitions of the table | 
 | NumTableParts   | Number of parts of the table | 
 | TableSize   |  Table size in bytes | 
 | NumRow  |  Number of rows in the table | 


## Configuration 

Clickhouse Deployment.yaml: 


```yaml 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: clickhouse-operator
spec:
  selector:
    matchLabels:
      app: clickhouse-operator
  template:
    metadata:
      annotations:
        prometheus.io/port: "8888"
        prometheus.io/scrape: "true"
      labels:
        app: clickhouse-operator
    spec:
      containers:
      - env:
        - name: OPERATOR_POD_NODE_NAME
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: spec.nodeName
        image: altinity/clickhouse-operator:0.10.0
        imagePullPolicy: Always
        name: clickhouse-operator
        volumeMounts:
        - mountPath: /etc/clickhouse-operator
          name: etc-clickhouse-operator-folder
        - mountPath: /etc/clickhouse-operator/conf.d
          name: etc-clickhouse-operator-confd-folder
        - mountPath: /etc/clickhouse-operator/config.d
          name: etc-clickhouse-operator-configd-folder
        - mountPath: /etc/clickhouse-operator/templates.d
          name: etc-clickhouse-operator-templatesd-folder
        - mountPath: /etc/clickhouse-operator/users.d
          name: etc-clickhouse-operator-usersd-folder
      - image: altinity/metrics-exporter:0.10.0
        imagePullPolicy: Always
        name: metrics-exporter
        ports:
        - containerPort: 8888
          name: metrics
          protocol: TCP
        volumeMounts:
        - mountPath: /etc/clickhouse-operator
          name: etc-clickhouse-operator-folder
        - mountPath: /etc/clickhouse-operator/conf.d
          name: etc-clickhouse-operator-confd-folder
        - mountPath: /etc/clickhouse-operator/config.d
          name: etc-clickhouse-operator-configd-folder
        - mountPath: /etc/clickhouse-operator/templates.d
          name: etc-clickhouse-operator-templatesd-folder
        - mountPath: /etc/clickhouse-operator/users.d
          name: etc-clickhouse-operator-usersd-folder
      volumes:
      - configMap:
          defaultMode: 420
          name: etc-clickhouse-operator-files
        name: etc-clickhouse-operator-folder
      - configMap:
          defaultMode: 420
          name: etc-clickhouse-operator-confd-files
        name: etc-clickhouse-operator-confd-folder
      - configMap:
          defaultMode: 420
          name: etc-clickhouse-operator-configd-files
        name: etc-clickhouse-operator-configd-folder
      - configMap:
          defaultMode: 420
          name: etc-clickhouse-operator-templatesd-files
        name: etc-clickhouse-operator-templatesd-folder
      - configMap:
          defaultMode: 420
          name: etc-clickhouse-operator-usersd-files
        name: etc-clickhouse-operator-usersd-folder
  
```

## Viewing data and dashboards

Data collected by plugins can be viewed in SnappyFlow’s browse data section      

-  Plugin = `kube-prom-clickhouse` 
- documentType= `clusterDetails, hostDetails, tableStats` 
- Dashboard template: `Clickhouse_Kube_Prom`
