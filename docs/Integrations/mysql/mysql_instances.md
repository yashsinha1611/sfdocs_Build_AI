# Monitor MySQL DB on Instance

## Prerequisites

Install [sfAgent](/docs/Quick_Start/getting_started#sfagent)  to start monitoring MySQL database running on instances using MySQL plugin.

:::note

The MySQL plugin has been tested on Ubuntu 16.04 and 18.04, as well as on CentOS 7, using MySQL versions 5.7 and 8.

:::

## Get Started 

To get started with MySQL database monitoring, create a user and grant permissions to collect data from the MySQL database.

### Create New User

For MySQL versions 5.6 and 5.7, create username and password using the following command:

```sql
 create user 'username'@'%' identified by 'uniquepassword';
```

For MySQL versions 8.0 and greater, create username and password using the following command:

```sql
create user 'username'@'%' identified with mysql_native_password by 'uniquepassword';
```

:::note

Use the username and password created in this section while setting up the access permission and configuration.

:::

### Set Access Permissions

Use the following command to set access permission. 

```sql
grant select on performance_schema.* to 'username'@'%';
```

:::note

By default, the root user has the above mentioned permission.

:::
## Configuration 

Add the below-mentioned configuration to the `config.yaml` which is located at the following path `/opt/sfagent/ directory` .

```yaml
metrics:  
  plugins:  
    - name: mysql  
      enabled: true  
      interval: 60  
      config:  
        documentsTypes:  
          - databaseDetails  
          - serverDetails  
          - tableDetails 
          - masterReplicationDetails  #optional to be enabled when replication is setup
          - slaveReplicationDetails  #optional to be enabled when replication is setup
        host: 127.0.0.1  
        password: USERad@123$  
        port: 3306  
        user: root  
logging:  
  plugins:  
    - name: mysql-error  
      enabled: true  
      config:  
        log_level:  
          - error  
          - warning  
          - note  
        log_path: /var/log/mysql/error.log, /var/log/mysql/mysql-error.log, /var/log/mysqld.err, /var/log/mysqld.log  
    - name: mysql-general  
      enabled: true  
      config:  
        log_path: /var/log/mysql/mysql.log , /var/log/mysql.log, /var/log/mysqld.log, /var/lib/mysql/ip-*.log  
    - name: mysql-slowquery  
      enabled: true  
      config:  
        log_path: /var/lib/mysql/ip-*slow.log, /var/log/mysql/mysql-slow.log  
```



## Enable Logs

### General Logs

1. Execute the following command and locate the `mysql.conf.d/mysqld.cnf` file.

   ```
   mysqld --verbose --help | grep -A 1 "Default options"
   ```

   **Example output**:  
   `/etc/my.cnf /etc/mysql/my.cnf ~/my.cnf`

2. Execute the below-mentioned command in the  `mysql.conf.d/mysqld.cnf` file to enable general logs.

   ```
   show_compatibility_56 = On     #neeeded for metrics 
   log-error=/var/log/mysqld.log  
   pid-file=/var/run/mysqld/mysqld.pid  
   general_log_file=/var/log/mysql/mysql.log  
   general_log=1  
   ```

3. Simultaneously, log into Mysql  DB with the root user id and execute the below commands.

   ```sql
   SET GLOBAL general_log = 'ON';  
   SET GLOBAL general_log_file= '/path/filename';  
   ```
   **Example general log format**:
   
   Once the logs are enabled, My SQL general logs will be generated in the below format.

   ```text
   2023-05-04 11:52:10.470 IST > LOG:  duration: 1006.577 ms  statement:    select pg_sleep(1);
   ```



### Slow Query Logs

1. In the `mysqld.cnf` file, modify and configure the variables as shown below: 

   ```shell
   slow_query_log= 1  
   slow_query_log_file=/var/log/mysql/mysql-slow.log  
   ```

2. Simultaneously, log into Mysql  DB with the root user id and execute the below commands:

   ```sql
   SET GLOBAL slow_query_log = 'ON';  
   SET GLOBAL long_query_time = 100;  
   SET GLOBAL slow_query_log_file = '/path/filename';  
   ```

   **Example of slow query log format**:

   ```
   # Time: 2023-05-04T06:47:52.143598Z
   # User@Host: petclinic[petclinic] @ localhost []  Id:    12
   # Query_time: 20.023072  Lock_time: 0.000000 Rows_sent: 1        Rows_examined: 1
   SET timestamp=1683182852;
   select sleep(20);
   ```

:::note

By Default `/var/log/mysql` directory is not present in **centos**, so you must create and provide ownership of that directory as mysql .

```shell
chown -R mysql:mysql /var/log/mysql 
```

:::

## Enable Replication (optional)

### Prerequisites

1. Make sure that the replication is enabled on the database. 
2. Execute the following queries on the slave using the username provided in the `config.yaml` file to check the replication status.

   ```
   show slave status;
   ```

   ```
   select * from replication_connection_status;
   ```

### Create New User and Set Access Permission

1. To enable the replication, create a replication user using the following commands. The below given commands should be executed on the master.

   ```shell
   CREATE USER 'replica_user'@'slave_server_ip' IDENTIFIED WITH   mysql_native_password BY 'password';
   ```

2. Execute the below-mentioned command to grant permission to the replication user.

   ```shell
   GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'replica_user'@'slave_server_ip';
   ```



## View Metrics and Logs

1. Go to the **Application** tab in the SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.

   <br/>

   :::note

   Once the MySQL configuration settings are done, the MySQL plugin will be automatically detected within the Metrics section. However, if the plugin is not detected, you can import **template** = `MySQL` or `MySQL_Replication` to view the corresponding metrics.

   ::: <br/>

2. MySQL database **Metrics** and **Slow Query Logs** are displayed in the **Metrics** section of the dashboard.

 

3. MySQL database **General Logs** are displayed in the **Log Management** section of the dashboard.



4. To access the unprocessed data gathered from the plugins, navigate to the **Browse data** section and select the following data: `Index`, `Instance`, `Plugin`, and `Document Type`.

#### Template Details

| **Template** | **Plugin** | **Document Type**                                |
| ------------ | ---------- | ------------------------------------------------ |
| MySQL        | mysql      | databaseDetails, serverDetails, and tableDetails |
| MySQL_Replication        | mysql      | databaseDetails, serverDetails, tableDetails, masterReplicationDetails, and slaveReplicationDetails |



