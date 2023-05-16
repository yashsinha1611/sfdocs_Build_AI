# Monitor MySQL DB on Instance

## Overview

MySQL on instances is monitored using [sfAgent](/docs/Quick_Start/getting_started#sfagent) configured with the MySQL plugin .

MySQL plugin has been tested on ubuntu (16.04 and 18.04) and centos 7 with MySQL versions 5.7 and 8.

## Get Started 

### Create New User

For MySQL 5.6 or MySQL 5.7, create a user with the following command:

```sql
 create user 'username'@'%' identified by 'uniquepassword';
```

For MySQL 8.0 or greater, create a user with the following command:

```sql
create user 'username'@'%' identified with mysql_native_password by 'uniquepassword';
```

:::note

Use the username and password created in this section while setting access permission and configuration.

:::

### Set Access Permissions

Use the below code to set access permission. 

```sql
grant select on performance_schema.* to 'username'@'%';
```

:::note

The root user has these permissions by default .

:::
## Configuration 

Refer to [sfAgent](/docs/Quick_Start/getting_started#sfagent) section for steps to install and automatically generate plugin configurations. User can also manually add the configuration shown below to `config.yaml` under `/opt/sfagent/ directory` 

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

MySql log plugin collects general logs and slow query logs and displays them in the SnappyFlow dashboard. 

### Enable General Logs

Execute the following command and locate the **`mysql.conf.d/mysqld.cnf`** file.

```
mysqld --verbose --help | grep -A 1 "Default options"
```

E.g. output:  `/etc/my.cnf /etc/mysql/my.cnf ~/my.cnf`.

Execute the below-mentioned command in the  `mysql.conf.d/mysqld.cnf` file to enable general logs.

```
show_compatibility_56 = On     #neeeded for metrics 
log-error=/var/log/mysqld.log  
pid-file=/var/run/mysqld/mysqld.pid  
general_log_file=/var/log/mysql/mysql.log  
general_log=1  
```

Alternatively, login to mysql with the root user and execute the below commands .

```sql
SET GLOBAL general_log = 'ON';  
SET GLOBAL general_log_file= '/path/filename';  
```

**Example**:

once the logs are enabled, My SQL general logs will be generated in the below format.

```text
2023-05-04 11:52:10.470 IST > LOG:  duration: 1006.577 ms  statement: select pg_sleep(1);
```



### Enable Slow Query Logs

In `mysqld.cnf` file, uncomment and configure the variables shown below: 

```shell
slow_query_log= 1  
slow_query_log_file=/var/log/mysql/mysql-slow.log  
```

Alternatively, login to mysql with the root user and execute the below commands 

```sql
SET GLOBAL slow_query_log = 'ON';  
SET GLOBAL long_query_time = 100;  
SET GLOBAL slow_query_log_file = '/path/filename';  
```

Example of slow query log format:

```
# Time: 2023-05-04T06:47:52.143598Z
# User@Host: petclinic[petclinic] @ localhost []  Id:    12
# Query_time: 20.023072  Lock_time: 0.000000 Rows_sent: 1  Rows_examined: 1
SET timestamp=1683182852;
select sleep(20);
```



:::note

By Default `/var/log/mysql` directory is not present in **centos**, so you must create and provide ownership of that directory as mysql .

```shell
chown -R mysql:mysql /var/log/mysql 
```

:::

## View Metrics and Logs

1. Login into SnappyFlow.

2. Navigate to the **Application** tab > **Project** > **Application** and click the **Dashboard** icon.

3. Click the **tab menu** `...` icon on the **Metric** tab.

4. Select the **Import from template** option.

   <img src="/img/integration/mysql/image_5.png" />

5. In the **Import to Metrics Panes** window, select **Filter By**: *`Standard`*, **Template Name**: *`MySQL`*.

6. Click the `Save` button.

#### General logs 

<img src="/img/integration/mysql/image_2.png" />

To view general logs, navigate to your ***Application's dashboard*** > ***Log management*** > ***Primary storage***. In the **Primary Storage** window, set the **Log Type** to a general log as per the requirement.

#### Slow query logs

<img src="/img/integration/mysql/image_3.png" />

To view slow query logs, navigate to ***Application's dashboard*** > ***Metrics*** > ***Slow Queries***.

#### Metrics

1. To view database metrics, navigate to ***Application's dashboard*** > ***Browse Data***.
2. In the **Browse Data** window, set the following filters:
   - **Index**: Metrics
   - **Instance**: Select your instance
   - **Plugin**: MySQL, mysql-slowquery (For slow query logs)
   - **Document type**: serverDetails, databaseDetails, tableDetails, SlowQueryLogs (For slow query logs)
## Enable Replication (optional)

To collect the replication details replication has to be enabled.

Execute the following queries on the slave. Use the user and password provided in the config.yaml file:

```
show slave status;
```

```
select * from replication_connection_status;
```

If you are able to execute the above queries, then the replication details can be collected.

Execute the below-mentioned command on the source or master to create a replication user.

```shell
CREATE USER 'replica_user'@'slave_server_ip' IDENTIFIED WITH mysql_native_password BY 'password';
```
Execute the below-mentioned command to grant permission to the replication user.
```shell
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'replica_user'@'slave_server_ip';
```



## View Metrics for Replication

1. Navigate to the **Application** tab > **Project** > **Application** and click the **Dashboard** icon.

2. Click the **tab menu** `...` icon on the **Metric** tab.

3. Select the **Import from template** option.

   <img src="/img/integration/mysql/image_7.png" />

4. In the **Import to Metrics Panes** window, select **Filter By**: *`Standard`*, **Template Name**: *`MySQL_Replication`*.

5. Click the `Save` button.


#### Metrics

1. To view database metrics, navigate to ***Application's dashboard*** > ***Browse Data***.
2. In the **Browse Data** window, set the following filters:

   - **Index**: Metrics
   - **Instance**: Select your instance
   - **Plugin**: MySQL
   - **Document type**:  masterReplication and slaveReplication



