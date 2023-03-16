# Monitor Postgres in Kubernetes

## Overview 

PostgreSQL running in Kubernetes can be monitored in SnappyFlow using two approaches: 

- [sfKubeAgent](/docs/integrations/kubernetes/sfkubeagent_installation)  as a sidecar container
- [Prometheus exporter](/docs/integrations/kubernetes/prometheus_exporter) 

## Get Started

To get started with PostgreSQL integration, create a user and grant permissions to collect data from your PostgreSQL server.

### Create New User

Create a read-only user with the following command:

```shell
create user <username> with password '<password>';
```

:::note

Use the username and password created in this section while setting access permission and configuration.

:::

### Set Access Permission

For version 10.0 or greater, use the below code to set access permission.

```shell
grant SELECT ON pg_stat_database to <username>; 
grant pg_monitor to <username>; 
```

For older versions, use the below code to set access permission.

``` shell
grant SELECT ON pg_stat_database to <username>;
```

:::note

The root user has these permissions by default.

:::

## PostgreSQL monitoring with sfKubeAgent

sfKubeAgent run as a sidecar with the configMap shown below. The config map initiates plugins for metrics, general logs, and slow queries. 

 

```yaml
apiVersion: v1 
kind: ConfigMap 
metadata: 
  name: postgres-configmap 
data: 
  config.yaml: |- 
    key: <profile_key> 
    metrics: 
      plugins: 
      - name: postgres 
        enabled: true 
        interval: 60 
        config: 
          documentsTypes:    #user can enable all or only needed documents 
            - databaseDetails 
            - indexDetails8 
            - queryDetails 
            - serverDetails 
            - tableDetails 
          host: 127.0.0.1 
          user: <userName> 
          password: <password> 
          port: 5432 
    logging: 
      plugins: 
      - name: postgres-general 
        enabled: true 
        config: 
          log_level: 
            - error 
            - warning 
            - info 
            - log 
          log_path: /var/log/postgres/*.log 
      - name: postgres-slowquery 
        enabled: true 
        config: 
          log_path: /var/log/postgres/*.log 
```

An example of PostgreSQL pod with Postgres and sfKubeAgent containers is shown below.

```yaml
kind: Pod 
apiVersion: v1 
metadata: 
 name: postgres-pod 
 labels: 
  snappyflow/appname: <app_name> 
  snappyflow/projectname: <project_name> 
spec: 
 containers: 
 - name: postgres-container 
   securityContext: {} 
   image: "postgres:9.6" 
   args: ["-c", "log_statement=all", "-c", "log_min_messages=warning", "-c", "log_min_duration_statement=200", "-c","log_directory=/var/log/postgres","-c","log_line_prefix=< %m > ","-c","log_filename=postgresql-%Y-%m-%d_%H%M%S.log","-c","log_truncate_on_rotation=off","-c","log_rotation_age=1d","-c","logging_collector=on"] 
   imagePullPolicy: IfNotPresent 
   ports: 
   - name: tcp 
     containerPort: 5432 
     protocol: TCP 
   env: 
   - name: POSTGRES_PASSWORD 
     value: <password> 
   - name: POSTGRES_USER 
     value: <userName> 
   volumeMounts: 
     - name: varlog 
       mountPath: /var/log/postgres 
   # Snappyflow's sfkubeagent container 
 - name: sfagent-container 
   image: snappyflowml/sfagent:latest 
   imagePullPolicy: Always 
   command: 
     - /app/sfagent 
     - -enable-console-log 
   env: 
     - name: APP_NAME 
       value: <app_name> 
     - name: PROJECT_NAME 
       value: <project_name> 
   volumeMounts: 
     - name: configmap-postgres 
       mountPath: /opt/sfagent/config.yaml 
       subPath: config.yaml 
     - name: varlog 
       mountPath: /var/log/postgres 
 volumes: 
 - name: configmap-postgres 
   configMap: 
     name: postgres-configmap 
 - name: varlog 
   emptyDir: {} 
```



## PostgreSQL monitoring with Prometheus 

Refer to [Prometheus Exporter](/docs/integrations/kubernetes/prometheus_exporter) overview to understand how SnappyFlow monitors using Prometheus exporters. 

### Prerequisites 

Prometheus exporter should have been deployed as a side-car in the application container and the exporter port should accessible to the sfPod.

### Configuration 

```yaml
kind: Pod 
apiVersion: v1 
metadata: 
 name: postgres-pod 
 labels: 
  snappyflow/appname: <app_name> 
  snappyflow/projectname: <project_name> 
  snappyflow/component: postgresql 
spec: 
 containers: 
 - name: postgres-exporter 
   image: bitnami/postgres-exporter 
   ports: 
   - name: pg-exporter 
     containerPort: 9187 
   command: ["/bin/sh", "-c"] 
   args: ['DATA_SOURCE_NAME="postgresql://<user_name>:<password>@localhost:5432/<dbname>?sslmode=disable" /opt/bitnami/postgres-exporter/bin/postgres_exporter'] 
 - name: postgres-container 
   securityContext: {} 
   image: "postgres:9.6" 
   args: ["-c", "log_statement=all", "-c", "log_min_messages=warning", "-c", "log_min_duration_statement=200", "-c","log_line_prefix=< %m > "] 
   imagePullPolicy: IfNotPresent 
   ports: 
   - name: tcp 
     containerPort: 5432 
     protocol: TCP 
   env: 
   - name: POSTGRES_PASSWORD 
     value: <password> 
   - name: POSTGRES_USER 
     value: <user_name> 
   - name: POSTGRES_DB 
     value: <dbname> 
```

## PostgreSQL Pod Centralized Logging 

Refer to [Centralized Logging Overview](/docs/integrations/kubernetes/centralized_logging_of_application_pod_logs) to understand how SnappyFlow implements centralized logging. The centralized logging approach requires the application pod to stream logs to stdout, which is achieved by running a busy box container as shown below. 

```yaml
kind: Pod
apiVersion: v1
metadata:
  name: postgres-pod
  labels:
    snappyflow/appname: <app_name>
    snappyflow/projectname: <project_name>
    snappyflow/component: postgresql
spec:
  containers:
    - name: postgres-exporter
      image: bitnami/postgres-exporter
      ports:
        - name: pg-exporter
          containerPort: 9187
      command:
        - /bin/sh
        - '-c'
      args:
        - >-
          DATA_SOURCE_NAME="postgresql://<user_name>:<password>@localhost:5432/<dbname>?sslmode=disable"
          /opt/bitnami/postgres-exporter/bin/postgres_exporter
    - name: postgres-container
      securityContext: {}
      image: 'postgres:9.6'
      args:
        - '-c'
        - log_statement=all
        - '-c'
        - log_min_messages=warning
        - '-c'
        - log_min_duration_statement=200
        - '-c'
        - 'log_line_prefix=< %m > '
        - '-c'
        - log_directory=/var/log/postgres
        - '-c'
        - log_filename=postgresql.log
        - '-c'
        - logging_collector=on
      imagePullPolicy: IfNotPresent
      ports:
        - name: tcp
          containerPort: 5432
          protocol: TCP
      env:
        - name: POSTGRES_PASSWORD
          value: <password>
        - name: POSTGRES_USER
          value: <user_name>
        - name: POSTGRES_DB
          value: <dbname>
      volumeMounts:
        - name: postgres-log
          mountPath: /var/log/postgres
    - name: postgres-general
      image: busybox
      command:
        - /bin/sh
        - '-c'
      args:
        - tail -n+1 -f /var/log/postgres/*.log
      volumeMounts:
        - name: postgres-log
          mountPath: /var/log/postgres
  volumes:
    - name: postgres-log
      emptyDir: {}
```

## View Metrics and Logs

1. Login into SnappyFlow.

2. Navigate to the **Application** tab > **Project** > **Application** and click the **Dashboard** icon.

3. Click the **tab menu** `...` icon on the **Metric** tab.

4. Select the **Import from template** option.

5. In the **Import to Metrics Panes** window, select **Filter By**: `Standard`, **Template Name**: `PostgreSQL_Prom` (For PostgreSQL with Prometheus).

6. Click the `Save` button.


#### General logs 

To view general logs, navigate to your ***Application's dashboard*** > ***Log management*** > ***Primary storage***. In the **Primary Storage** window, set the **log filter** to a general log as per the requirement.

#### Slow query logs

To view slow query logs, navigate to ***Application's dashboard*** > ***Metrics*** > ***Slow Queries***.

#### Metrics

1. To view database metrics, navigate to ***Application's dashboard*** > ***Browse Data***.
2. In the **Browse Data** window, set the following filters:

  - **Index**: Metrics
  - **Instance**: Select an instance
  - **Plugin**: `PostgreSQL`, `kube-prom-postgres` (For PostgreSQL with Prometheus)
  - **Document type**: `serverDetails`, `databaseDetails`, `tableDetails`, `queryDetails`, `postgres-general`, `postgres-slowquery`

## Metric List

Choose a metric ([Server Details](/docs/Integrations/postgres/postgres_kubernetes#####Server_Details), [Database Details](/docs/Integrations/postgres/postgres_kubernetes#####Database_Details), [Table Details](/docs/Integrations/postgres/postgres_kubernetes#####Table_Details), [Index Details](/docs/Integrations/postgres/postgres_kubernetes#####Index_Details), [Query Details](/docs/Integrations/postgres/postgres_kubernetes#####Query_Details )) to learn more about the data collected from your PostgreSQL database.

##### Server Details

| **Metric**              | **Description**                                              |
| ----------------------- | ------------------------------------------------------------ |
| **numCreatedTempFiles** | Total number of temporary files created.                     |
| **numTransactions**     | Total number of transactions that have been committed and rolled back. |
| **archiveFailCount**    | Number of failed attempts for archiving WAL files.           |
| **activeProcesses**     | Number of active process running in the server.              |
| **archivedCount**       | Number of WAL files that have been successfully archived.    |
| **numUpdate**           | Total number of rows updated by queries.                     |
| **numRollback**         | Total number of transactions that have been rolled back.     |
| **host**                | The host address of the instance.                            |
| **cacheHits**           | Number of times disk blocks were found already in the buffer cache. |
| **idle_in_transaction** | Number of idle_in_transaction process running in the server. |
| **numSelect**           | Total number of live rows fetched by select queries.         |
| **maxConnections**      | The maximum number of concurrent connections to the database server. |
| **tempFileSize**        | Total amount of data written to temporary files by queries.  |
| **idleProcesses**       | Number of idle process waiting in the server.                |
| **numCommit**           | Total number of transactions that have been committed.       |
| **cacheSize**           | The effective size of the disk cache that is available to a single query. |
| **numConnections**      | Total number of backends currently connected to this server. |
| **indexSize**           | Total size of the indices.                                   |
| **bufferSize**          | Amount of memory the database server uses for shared memory buffers. |
| **dbSize**              | Total size of the databases.                                 |
| **upTime**              | Time difference between start time and current time.         |
| **abortedConnection**   | Number of aborted process  in the server.                    |
| **numInsert**           | Total number of rows inserted by queries in this database.   |
| **numDelete**           | Total number of rows deleted by queries in this database.    |
| **cacheHitRatio**       | Cache Hit Percentage on the server.                          |
| **numDatabases**        | Number of Databases.                                         |
| **version**             | PostgreSQL version of the server.                            |

##### Database Details

| **Metric**          | **Description**                                              |
| ------------------- | ------------------------------------------------------------ |
| **blkReadTime**     | Time spent writing data file blocks by backends in this database, in milliseconds. |
| **blocksRead**      | Number of disk blocks read in this database.                 |
| **transPerSec**     | Number of transaction in this database per second.           |
| **numDeadTuple**    | Estimated number of dead rows in database.                   |
| **numTransactions** | Number of transactions in this database that have been committed and rolled back. |
| **numLiveTuple**    | Estimated number of live rows in database.                   |
| **numFetch**        | Number of live rows fetched by index scans in this database. |
| **numRollback**     | Number of transactions in this database that have been rolled back. |
| **numUpdate**       | Number of rows updated by queries in this database.          |
| **host**            | The host address of the instance.                            |
| **numReturn**       | Number of live rows fetched by sequential scans and index entries returned by index scans in this database. |
| **tempFileSize**    | Total amount of data written to temporary files by queries in this database. |
| **_dbName**         | Name of the database.                                        |
| **numCommit**       | Number of transactions in this database that have been committed. |
| **blocksHit**       | Number of times disk blocks were found already in the buffer cache, so that a read was not necessary (this only includes hits in the PostgreSQL buffer cache, not the operating system's file system cache). |
| **blkWriteTime**    | Time spent writing data file blocks by backends in this database, in milliseconds. |
| **numTempFile**     | Number of temporary files created by queries in this database. |
| **indexSize**       | Total disk space used by all indexes in the database.        |
| **dbSize**          | Size of the database.                                        |
| **numInsert**       | Number of rows inserted by queries in this database.         |
| **numDelete**       | Number of rows deleted by queries in this database.          |
| **cacheHitRatio**   | Percentage of cacheHit of this database.                     |
| **indexHitRatio**   | Percentage of indexHit of this table.                        |
| **numTables**       | Number of tables in this database.                           |

##### Table Details

| **Metric**         | **Description**                                              |
| ------------------ | ------------------------------------------------------------ |
| **numDeadTuple**   | Estimated number of dead rows.                               |
| **numLiveTuple**   | Estimated number of live rows.                               |
| **numUpdate**      | Number of rows updated.                                      |
| **_tableName**     | Name of the table.                                           |
| **_dbName**        | Name of the database for this table.                         |
| **tableSize**      | Total disk space used by the specified table.                |
| **idxBlksRead**    | Number of disk blocks read from all indexes on this table.   |
| **host**           | The host address of the instance.                            |
| **seqScan**        | Number of sequential scans initiated on this table.          |
| **indexScanFetch** | Number of live rows fetched by index scans.                  |
| **heapBlksRead**   | Number of disk blocks read from this table.                  |
| **idxBlksHit**     | Number of buffer hits in all indexes on this table.          |
| **heapBlksHit**    | Number of buffer hits in this table.                         |
| **seqScanFetch**   | Number of live rows fetched by sequential scans.             |
| **indexSize**      | Total disk space used by indexes attached to the specified table. |
| **numInsert**      | Number of rows inserted.                                     |
| **indexScan**      | Number of index scans initiated on this table.               |
| **numDelete**      | Number of rows deleted.                                      |
| **cacheHitRatio**  | Percentage of cacheHit of this table.                        |
| **_schemaName**    | Name of the schema of this table.                            |
| **indexHitRatio**  | Percentage of indexHit of this table.                        |

##### Index Details

| **Metric**      | **Description**                                              |
| --------------- | ------------------------------------------------------------ |
| **_indexName**  | Name of this index.                                          |
| **blksHit**     | Number of buffer hits in this index.                         |
| **_tableName**  | Name of the table for this index.                            |
| **blksRead**    | Number of disk blocks read from this index.                  |
| **numFetch**    | Number of live table rows fetched by simple index scans using this index. |
| **indexScan**   | Number of index scans initiated on this index.               |
| **_schemaName** | Name of the schema of this index.                            |
| **_dbName**     | Name of the database for this index.                         |
| **host**        | The host address of the instance.                            |
| **numReturn**   | Number of index entries returned by scans on this index.     |

##### Query Details

| **Metric**     | **Description**                                              |
| -------------- | ------------------------------------------------------------ |
| **runtime**    | Period of time for the current query is running.             |
| **userName**   | Name of the user logged into this backend.                   |
| **wait_event** | True if backend is currently waiting, otherwise False.       |
| **_dbName**    | Name of the database this backend is connected to.           |
| **host**       | The host address of the instance.                            |
| **state**      | Current overall state of this backend. Possible values are: **active, idle, idle in transaction, idle in transaction (aborted), fastpath function call, disabled.** |
| **_queryName** | If **state** is **active** this field shows the currently executing query. In all other states, it shows the last query that was executed. |
