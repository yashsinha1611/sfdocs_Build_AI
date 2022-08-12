# Monitoring MongoDB

## Overview

MongoDB plugin is an sfAgent plugin used to collect mongodb metrics. It uses serverStatus, dbstats command to retrieve the statistics. If replication is enabled and in cluster mode(replicaset) then collects the replication information.

**Support monitoring on:**

1. Standalone mode
2. Cluster (replicaset) mode

# **MongoDB Monitoring in Standalone mode**

## Prerequisites

1. sfAgent requires access to MongoDB system tables to collect metrics. This will require adding user credentials to sfAgent plugin configuration.  User role and credentials can be created with the procedure mentioned below

   - Open `/etc/mongod.conf` file and comment security config if it exists. This is needed to make changes to config file and will be uncommented in subsequent step

     ```
      #security: 
               #authorization: enabled
     ```

   - Start mongodb service with command `service mongod start`

   - Check mongodb status is active using command `service mongod status`

   - Create `mongostatRole` and `listDatabases` roles

     - Use admin

     - Execute the command below

       ```sql
       db.createRole(
          {
                  role: "mongostatRole",
                  privileges: [
                  { resource: { cluster: true }, 
                    actions: [ "serverStatus" ] }],
                  roles: []
          })
       
       db.createRole(
           {
                   role: "listDatabases",
                   privileges: [
                   { resource: { cluster: true }, 
                   actions: [ "listDatabases" ] }],
                   roles: []
               })
       ```

       

   2. Create new user with `clusterMonitor` , `mongostatRole` and `listDatabases` roles

      ```sql
      db.createUser( { user:"Newuser", pwd: "pass",
                     roles : [
                         { role : "mongostatRole", db : "admin"  },
                         { role : "listDatabases", db :"admin" },
                         { role : "clusterMonitor", db : "admin" }           
                 ] } )
      ```

   3. Exit mongo using `exit` command.

   4. Open `/etc/mongod.conf` file and uncomment security config if exists else add the    config.

      ```
      security:
                   authorization: enabled
      ```

   5. Restart mongodb using command `service mongod restart` 

   6. Use the created mongo user credentials in sfagent config and start sfagent.

## Configuration

sfAgent section provides steps to install and automatically generate plugin configurations.  User can also manually add the configuration shown below to `config.yaml` under `/opt/sfagent/` directory

```yaml
key: <Profile_key>
tags:
  Name: <instance_name>
  appName: <app_name>
  projectName: <project_name>
metrics:
  plugins:
    - name: mongodb
      enabled: true
      interval: 300
      config:
        port: 27017
        host: localhost
        username: Newuser
        password: pass
```

 ### Metrics list

##### documentType : **dbStats**

| **Name**    | **Description**                                              |
| ----------- | ------------------------------------------------------------ |
| Collections | Contains a count of the number of collections in that database. |
| DataSize    | Total size of the data held in this database including the padding factor.Shown as byte |
| Db          | database name                                                |
| IndexSize   | Total size of all indexes created on this database.Shown as byte |
| StorageSize | Total amount of space allocated to collections in this database for document storage.Shown as byte |
| TotalSize   | Total size of the data held in this database including the padding factor. |

  ##### documentType : **systemInfo** 

| **Name**           | **Description**                                              |
| ------------------ | ------------------------------------------------------------ |
| Version            | version of mongodb                                           |
| UptimeMillis       | Number of seconds that the mongos or mongod process has been active |
| availabeConnection | Number of unused available incoming connections the database can provide. |
| currentConnection  | Number of connections to the database server from clients.   |
| activeConnections  | Number of active connections to the database server from clients |
| aggDataSize        | Total size of the data held in this database including the padding factor |
| FsTotalSize        | Total size of all disk capacity on the filesystem where MongoDB stores data. |
| aggFsUsedSize      | Total size of all disk space in use on the filesystem where MongoDB stores data. |
| aggStorageSize     | Sum of the space allocated to all collections in the database for document storage, including free space. |
| aggTotalSize       | Sum of the space allocated for both documents and indexes in all collections in the database. Includes used and free storage space. This is the sum of storageSize and indexSize. |
| TotalDb            | total number of databases                                    |


  ##### documentType : **operationalMetrics**

| **Name**             | **Description**                                              |
| -------------------- | ------------------------------------------------------------ |
| insertQuery          | Number of times insert executed                              |
| updateQuery          | Number of times update executed                              |
| deleteQuery          | Number of times delete executed                              |
| dirtyBytesInCache    | Size of the dirty data in the cache                          |
| CacheSize            | Maximum cache size                                           |
| CurrentQueueTotal    | Total number of operations queued waiting for the lock.      |
| CurrentQueueReaders  | Number of operations that are currently queued and waiting for the read lock. |
| CurrentQueueWriters  | Number of operations that are currently queued and waiting for the write lock. |
| ActiveClientsTotal   | Total number of active client connections to the database.   |
| ActiveClientsReaders | Count of the active client connections performing read operations |
| ActiveClientswriters | Count of active client connections performing write operations. |
| readLatency          | Total latency statistics for read requests per second.       |
| writeLatency         | Total latency statistics for write operations per second.    |
| PhysicalBytesIn      | The number of bytes that reflects the amount of network traffic received by this database. |
| PhysicalBytesOut     | The number of bytes that reflects the amount of network traffic sent from this database. |
| CurrentCache         | Size of the data currently in cache.                         |

**Viewing data and dashboards**

Data collected by the plugin can be viewed in SnappyFlow’s browse data section 

- `plugin`: `mongodb`
- `documentType`: `dbStats`, `systemInfo`, `operationalMetrics`
- `Dashboard template`: `MongoDB`
- `Alerts template`: `MongoDB`

------

# **MongoDB Monitoring in cluster**(replicaset) mode

MongoDB cluster is a set of nodes that are primary and secondary nodes. The nodes are synced and maintain same data in all the nodes in the replicaset type. The synchronization and the node information are collected about the cluster.

Install the agent on all the nodes in the cluster, both the primary nodes and the secondary nodes. 

**There are four documentTypes related to the replication:**

1)nodeDetails 

2)replicationMemberDetails 

3)replicationSyncDetails 

4)oplogDetails 

 ### Pre-requisites

**Note: The replication should be the replicaset based replication.** 

1. sfAgent requires access to MongoDB system tables to collect metrics. This will require adding user credentials to sfAgent plugin configuration.  User role and credentials can be created with the procedure mentioned below


- Open `/etc/mongod.conf` file and comment security config if it exists. This is needed to make changes to config file and will be uncommented in subsequent step

  ```
   #security: 
            #authorization: enabled
  ```

- Start mongodb service with command `service mongod start`

- Check mongodb status is active using command `service mongod status`

- Create `mongostatRole` and `listDatabases` roles

  - Use admin

  - Execute the command below

    ```sql
    db.createRole(
       {
               role: "mongostatRole",
               privileges: [
               { resource: { cluster: true }, 
                 actions: [ "serverStatus" ] }],
               roles: []
       })
    
    db.createRole(
        {
                role: "listDatabases",
                privileges: [
                { resource: { cluster: true }, 
                actions: [ "listDatabases" ] }],
                roles: []
            })
    ```

    

2. Create new user with `clusterMonitor` , `mongostatRole` and `listDatabases` roles

   ```sql
   db.createUser( { user:"Newuser", pwd: "pass",
                  roles : [
                      { role : "mongostatRole", db : "admin"  },
                      { role : "listDatabases", db :"admin" },
                      { role : "clusterMonitor", db : "admin" }           
              ] } )
   ```

3. Exit mongo using `exit` command.

4. Open `/etc/mongod.conf` file and uncomment security config if exists else add the    config.

   ```
   security:
                authorization: enabled
   ```

5. Restart mongodb using command `service mongod restart` 

6. Use the created mongo user credentials in sfagent config and start sfagent.

### Configuration

sfAgent section provides steps to install and automatically generate plugin configurations.  User can also manually add the configuration shown below to `config.yaml` under `/opt/sfagent/` directory

```yaml
key: <Profile_key>
tags:
  Name: <instance_name>
  appName: <app_name>
  projectName: <project_name>
metrics:
  plugins:
    - name: mongodb
      enabled: true
      interval: 300
      config:
        port: 27017
        host: localhost
        username: Newuser
        password: pass
```

 ### Metrics list

  ##### documentType : **ReplicationSyncDetails**

| **Name**   | **Description**                                              |
| ---------- | ------------------------------------------------------------ |
| source     | secondary node name(ip)                                      |
| syncedTo   | syncronised time                                             |
| repllag    | Delay between a write operation on the primary and its copy to a secondary. Computed on each node and tagged by 'host', but may not be representative of cluster health. Negative values do not indicate that the secondary is ahead of the primary. |
| SyncState  | when instance down it shows the info of the state            |
| ErrMessage | it shows the error message when the instance is down         |

  ##### documentType : **ReplicationMemberdetails**

| **Name**             | **Description**                                              |
| -------------------- | ------------------------------------------------------------ |
| name                 | The name of the member                                       |
| Id                   | id of the member                                             |
| SyncSourceID         | The [syncSourceId](https://www.mongodb.com/docs/manual/reference/command/replSetGetStatus/#mongodb-data-replSetGetStatus.syncSourceId) field holds the [replSetGetStatus.members[n\]._id](https://www.mongodb.com/docs/manual/reference/command/replSetGetStatus/#mongodb-data-replSetGetStatus.members-n-._id) of the member from which this instance syncs. |
| health               | A number that indicates if the member is up (i.e. 1) or down (i.e. 0). |
| state                | An integer between 0 and 10 that represents the replica state of the member. |
| stateStr             | A string that describes state                                |
| uptime               | The uptime field holds a value that reflects the number of seconds that this member has been online |
| lastHeartbeat        | An ISODate formatted date and time that reflects the last time the server that processed the replSetGetStatus command received a response from a heartbeat that it sent to this member (members[n]). |
| lastHeartbeatRecv    | An ISODate formatted date and time that reflects the last time the server that processed the replSetGetStatus command received a heartbeat request from this member (members[n]) |
| syncSourceHost       | The syncSourceHost field holds the hostname of the member from which this instance syncs |
| lastHeartbeatMessage | When the last heartbeat included an extra message, the lastHeartbeatMessage contains a string representation of that message |
| lastCommittedOpTime  | Information, from the viewpoint of this member, regarding the most recent operation that has been written to a majority of replica set members. |
| appliedOpTime        | Information, from the viewpoint of this member, regarding the most recent operation that has been applied to this member of the replica set. |
| durableOpTime        | Information, from the viewpoint of this member, regarding the most recent operation that has been written to the journal of this member of the replica set |
| InfoMessage          | gives information on the member state If the instance is down |

  ##### documentType : nodeDetails

| **Name**          | **Description**                        |
| ----------------- | -------------------------------------- |
| isWritablePrimary | is the node writable                   |
| name              | the node name(ip)                      |
| primary           | is a primary member of a replica set   |
| readOnly          | is node running in read-only mode      |
| secondary         | is a secondary member of a replica set |
| setName           | replicaset name                        |

  ##### documentType : **oplogDetails**

| **Name**          | **Description**                                              |
| ----------------- | ------------------------------------------------------------ |
| logSizeMB         | Total size of the oplog                                      |
| usedMB            | Total amount of space used by the oplog                      |
| timeDiff(in secs) | difference between the first and last operation in the oplog |
| tFirst            | Returns a time stamp for the first (i.e. earliest) operation in the oplog. Compare this value to the last write operation issued against the server.Only present if there are entries in the oplog. |
| tLast             | Returns a time stamp for the last (i.e. latest) operation in the oplog. Compare this value to the last write operation issued against the server.Only present if there are entries in the oplog. |
| now               | Returns a timestamp that reflects the current time. The shell process generates this value, and the datum may differ slightly from the server time if you're connecting from a remote host as a result. Equivalent to Date().Only present if there are entries in the oplog. |

##  Viewing data and dashboards

Data collected by the plugin can be viewed in SnappyFlow’s browse data section      

-  Plugin = `mongodb` 
-  documentType(in primary)= `dbStats, operationalMetrics, systemInfo, nodeDetails, replicationMemberDetails, replicationSyncDetails, oplogDetails` 
-  documentType(in secondary)= `dbStats, operationalMetrics, systemInfo, nodeDetails, oplogDetails` 
-  Dashboard template: `MongoDBReplication`
-  Alerts template: `MongoDBReplication`

## See Also

[MySQL](/docs/integrations/mysql/overview)

[PostgresDB](/docs/integrations/postgres/overview)
