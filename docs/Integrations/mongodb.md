# Monitoring MongoDB

## Overview

MongoDB plugin is an sfAgent plugin used to collect mongodb metrics. It uses serverStatus, dbstats command to retrieve the statistics. In that it collects the metrics like number of collections in db, number of insert , delete, update operations, read latency, write latency and other DB stats.

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

**Viewing data and dashboards**

Data collected by plugins can be viewed in SnappyFlow’s browse data section 

**Metrics**

- `plugin`: `mongodb`
- `documentType`: `dbStats`, `systemInfo`, `operationalMetrics`
- `Dashboard template`: 

## See Also

[MySQL](/docs/integrations/mysql/overview)

[PostgresDB](/docs/integrations/postgres/overview)
