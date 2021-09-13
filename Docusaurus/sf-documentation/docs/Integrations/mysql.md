---
sidebar_position: 3
---
# mySQL

mySQLPlugin provides MySQL database performance related metrics.

## Kubernetes

###### Prerequisites

- Exporter Integration

  Docker Image: prom/mysqld-exporter

  Image Tag: v0.10.0

  Configuration: Container should be configured in following way

  ```
  env:
        - name : MYSQL_ROOT_PASSWORD
          value: rootPassword
      command: [ 'sh','-c', 'DATA_SOURCE_NAME="root:$MYSQL_ROOT_PASSWORD@
      (localhost:mysqlPort)/" /bin/mysqld_exporter' ]
  ```

  Kubernetes service needs to be created for exposing the default exporter port 9104

  Reference: [MySQL Exporter](https://github.com/prometheus/mysqld_exporter/blob/master/README.md)

###### Documents

Plugin Type kube-prom-mysql contains the metrics organized into following document type

- serverDetails (contains metrics related to server performance)
- tabledetails (contains metrics related to stored tables)

Use MySQL_Kubernetes_Prometheus dashboard template in APM for visualization

## Windows

##### Prerequisites

- MySQL 5.6 or above

##### Configuration Settings

Add the plugin configuration in config.yaml file under C:\Program  Files (x86)\Sfagent\ directory as follows to enable this plugin

```
- name: mysql
 enabled: true
 interval: 300
 config:
   port: 3306
   host: 127.0.0.1
   user: xxxx
   password: xxxx
```

