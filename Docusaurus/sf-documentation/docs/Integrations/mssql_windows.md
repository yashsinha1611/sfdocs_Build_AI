# Monitoring MS SQL databases

## Overview

The MSSQL Metric plugin collects metrics for number of user connections, rate of SQL compilations, and more.

## Prerequisites

Create a read-only login to connect to your server. Follow the below given steps:

```
CREATE LOGIN <USERNAME> WITH PASSWORD = ‘<PASSWORD>’;
CREATE USER <USERNAME> FOR LOGIN <USERNAME>;
GRANT SELECT on sys.dm_os_performance_counters to <USERNAME>;
GRANT VIEW SERVER STATE to <USERNAME>;
GRANT CONNECT ANY DATABASE to <USERNAME>;
GRANT VIEW ANY DEFINITION to <USERNAME>;
```

## Configuration Settings

Add the plugin configuration in `config.yaml` file under `C:\Program Files (x86)\Sfagent` directory as follows to enable this plugin

```
- name: mssql
  enabled: true
  interval: 300
  config:
    username: xxxx
    password: xxxx
    port: 1433
    documentsTypes:
    - serverDetails
    - databaseDetails
    - tableDetails
```

For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io)
