# PgBouncer Integration

**PgBouncer** acts as a connection pool mechanism for **PostgreSQL**. PgBouncer creates a connection pool and enables the application to use the existing connections in the pool to interact with the database. 

The number of PostgreSQL backend processes can be reduced by this mechanism. PgBouncer reduces the resource (memory, backend, fork, etc..) consumption of the PostgreSQL. It also decreases the response time between the client application and the database.

By integrating PgBouncer with SnappyFlow, you enable SnappyFlow to collect the connection metrics from PgBouncer and visualize them in SnappyFlow's dashboard.

##  PgBouncer Monitoring

PgBouncer running on Linux can be monitored using Snappyflow sfagent. Refer to the link for installation of sfagent https://docs.snappyflow.io/docs/Integrations/os/linux/sfagent_linux.

:::note

PgBouncer version 1.12 and above can be monitored.

PgBouncer monitoring is tested on version 1.12.

:::

### **Pre-Requisites**

**PgBouncer admin and stats user configuration.**

Configure the pgbouncer user as admin and stats user by adding the below lines in the `pgbouncer.ini config` file.

The default location of the pgbouncer configuration file is `/etc/pgbouncer/pgbouncer.ini.`

Execute the following command in the Pgbouncer configuration file.

```
admin_users = <username>

stats_users =  <username>
```

**Add ignore startup parameters**

By default, PgBouncer allows only the parameters it can keep track of in the startup packets: **`client_encoding`**, **`datestyle`**, **`timezone`**, and **`standard_conforming_strings`**. All other parameters will raise an error. To allow other parameters, ignore startup parameters command is used. 

Example: `ignore_startup_parameters = extra_float_digits`

## Configuration 

Add the following configuration to the *config.yaml* file: 


```yaml 
key: <profile key> 
tags: 
  Name: <unique instance name or will be generated from IP> 
  appName: <add application name> 
  projectName: <add project name> 
metrics: 
  plugins: 
    - name: pgbouncer
      enabled: true 
      interval: 30
      config:
      	port: <port>
      	host: <host/IP>
      	user: <username>
      	password: <password>
```



 ### Metrics list

##### PgbouncerDetails

| **Metric**                           | **Description**                                              |
| ------------------------------------ | ------------------------------------------------------------ |
| **version**                          | Current Version of the PgBouncer                             |
| **numServerActive**                  | Total server connections that are linked to a client.        |
| **numServerUsed**                    | Total server connections that have been idle for more than `server_check_delay`, so they need `server_check_query` to run on them before they can be used again. |
| **numServerIdle**                    | Server connections that are unused and immediately usable for client queries. |
| **numServerLogin**                   | Server connections currently in the process of logging in.   |
| **numServerTested**                  | Server connections that are currently running either `server_reset_query` or `server_check_query` |
| **numClientsActive**                 | Server connections that are linked to a client.              |
| **numClientsWait**                   | Client connections that have sent queries but have not yet got a server connection. |
| **maximumClientConn**                | Maximum number of clients that can connect to PgBouncer      |
| **totalTransactionCount**            | Total number of SQL transactions pooled by **pgbouncer**.    |
| **totalQueryCount**                  | Total number of SQL queries pooled by **pgbouncer**.         |
| **totalRecievedBytes**               | Total volume in bytes of network traffic received by **pgbouncer**. |
| **totalSentBytes**                   | Total volume in bytes of network traffic sent by **pgbouncer**. |
| **averageTransactionCountPerSecond** | Average transactions per second in last stat period.         |
| **averageQueryCountPerSecond**       | Average queries per second in last stat period.              |
| **averageSentBytesPerSecond**        | Average sent (to clients) bytes per second.                  |
| **averageRecievedBytesPerSecond**    | Average received (from clients) bytes per second.            |

  ##### Database Stats

| **Metric**                             | **Description**                                              |
| -------------------------------------- | ------------------------------------------------------------ |
| **databaseName**                       | Statistics are presented per database.                       |
| **totalTransactionTimeMicroseconds**   | Total number of microseconds spent by **pgbouncer** when connected to PostgreSQL in a transaction, either idle in transaction or executing queries. |
| **averageTransactionTimeMicroseconds** | Average transactions per second in last stat period.         |
| **totalRecievedBytes**                 | Total volume in bytes of network traffic received by **pgbouncer**. |
| **averageTransactionCountPerSecond**   | Average transactions per second in last stat period.         |
| **averageRecievedBytesPerSecond**      | Average received (from clients) bytes per second.            |
| **totalTransactionCount**              | Total number of SQL transactions pooled by **pgbouncer**.    |
| **averageWaitTimeMicroseconds**        | Average time spent by clients waiting for a server that were assigned a backend connection within the current `stats_period`, in microseconds (averaged per second within that period). |
| **totalWaitTimeMicroseconds**          | Time spent by clients waiting for a server, in microseconds. Updated when a client connection is assigned a backend connection. |
| **averageQueryTimeMicroseconds**       | Average query duration, in microseconds.                     |
| **totalQueryCount**                    | Total number of SQL queries pooled by **pgbouncer**.         |
| **averageQueryCountPerSecond**         | Average queries per second in last stat period.              |
| **averageSentBytesPerSecond**          | Average sent (to clients) bytes per second.                  |
| **totalSentBytes**                     | Total volume in bytes of network traffic sent by **pgbouncer**. |
| **totalQueryTimeMicroseconds**         | Total number of microseconds spent by **pgbouncer** when actively connected to PostgreSQL, executing queries. |

  ##### Database Pools 

| **Metric**                   | **Description**                                              |
| ---------------------------- | ------------------------------------------------------------ |
| **user**                     | User name                                                    |
| **databaseName**             | Database name                                                |
| **numServerActive**          | Server connections that are linked to a client.              |
| **numServerUsed**            | Server connections that have been idle for more than `server_check_delay`, so they need `server_check_query` to run on them before they can be used again. |
| **numServerIdle**            | Server connections that are unused and immediately usable for client queries. |
| **numServerLogin**           | Server connections currently in the process of logging in.   |
| **numServerTested**          | Server connections that are currently running either `server_reset_query` or `server_check_query` |
| **numClientsActive**         | Server connections that are linked to a client.              |
| **numClientsWait**           | Client connections that have sent queries but have not yet got a server connection. |
| **maximumWaitTimeinSeconds** | Maximum wait time of the first (oldest) client in the queue has waited, in seconds |
| **maximumWaitMicroseconds**  | Microsecond part of the maximum waiting time.                |
| **poolMode**                 | The pooling mode in use.                                     |



## View Metrics

<img src="/img/integration/pgBouncer/image_2.png" />

1. Login into SnappyFlow.

2. Navigate to the **Application** tab > **Project** > **Application** and click the **Dashboard** icon.

3. Click the **tab menu** `...` icon on the **Metric** tab.

4. Select the **Import from template** option.

   <img src="/img/integration/pgBouncer/image_1.png" />

5. In the **Import to Metrics Panes** window, select **Filter By**: *`All`* or *`Custom`*, **Template Name**: *`PgBouncer`*.

6. Click the `Save` button.

7. To view database metrics, navigate to ***Application's dashboard*** > ***Browse Data***.

8. In the **Browse Data** window, set the following filters:

- **Index**: Metrics
- **Instance**: Select your instance
- **Plugin**: pgbouncer
- **Document type**: pgbouncerDetails, databaseStats, databasePools
