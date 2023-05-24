# Monitor MySQL DB on Windows

## Prerequisites

Install [sfAgent](/docs/Quick_Start/getting_started#sfagent)  to start monitoring MySQL database running on windows using MySQL plugin.

:::note

The configurations given below apply only to the MySQL databases versions 5.6 and above.

:::

## Get Started

To get started with MySQL database monitoring, create a user and grant permissions to collect data from the MySQL database.

### Create New User

Create username and password using the following command:

```sql
create user <username> with password '<password>';
```

:::note

Use the username and password created in this section while setting access permission and configuration.

:::

### Set access permissions

Use the following command to set access permission. 

```sql
grant select on information_schema.* to 'username' identified by 'password';  
grant select on performance_schema.* to 'username' identified by 'password';  
```

:::note

By default, the root user has the permissions mentioned above.

:::

## Configuration

Add the below-mentioned configuration to the  `config.yaml` file which is located at the following path `C:\Program Files (x86)\Sfagent\`.

```yaml
tags:
 Name: WINDOWSTEST
 appName: WINDOWSMYSQLAPP
 projectName: WINDOWSMYSQLPROJECT
metrics:
  plugins:
  - name: windows
    enabled: false
    interval: 20
  - name: mysql
    enabled: true
    interval: 20
    config:
      port: 3306
      host: 127.0.0.1
      user: root
      password: root@123
      documentsTypes:
        - serverDetails

        - databaseDetails

        - tableDetails

        - masterReplicationDetails #optional use for MySQL replication details

        - slaveReplicationDetails  #optional use for MySQL replication details
logging:
  plugins:
 - name: mysql-slowquery
   enabled: true
 - name: mysql-general
   enabled: true
 - name: mysql-error
   enabled: true
```

## Enable Replication (optional)

### Prerequisites

1. Make sure that the replication is enabled on the database. 
2. Execute the following queries on the slave using username provided in the `config.yaml` file to check the replication status.

   ```
   "show slave status"
   ```

   ```
   "select * from replication_connection_status"
   ```

:::note

If the user is able to execute the above queries then the replication details can be collected.

:::

### Create New User and Set Access Permission

To enable the replication, create a replication user using the following commands. The below given commands should be executed on the master.

```shell
CREATE USER 'replica_user'@'slave_server_ip' IDENTIFIED WITH mysql_native_password BY 'password';
```

```shell
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'replica_user'@'slave_server_ip';
```

## View Database Metrics and Logs

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**<br/>

:::note
Once the MySQL configuration settings are done, the MySQL plugin will be automatically detected within the Metrics section. However, if the plugin is not detected, you can import **template** = `MySQL` or `MySQL_Replication` to view the corresponding metrics.
::: <br/>

2. MySQL database **Metrics** are displayed in the **Metrics** section of the dashboard.

   

4. To access the unprocessed data gathered from the plugins, navigate to the **Browse data** section and select the following data: `Index`, `Instance`, `Plugin`, and  `Document Type`.<br/>

   

#### Template Details

| **Template**| **Plugin**  |   **Document Type**  |
| ------------ | -------------|-------------------- |
| MySQL | mysql |databaseDetails, serverDetails, and tableDetails|
| MySQL_Replication | mysql |databaseDetails, serverDetails, tableDetails, masterReplicationDetails, and slaveReplicationDetails|

