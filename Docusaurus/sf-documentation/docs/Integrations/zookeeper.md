# Monitoring Apache ZooKeeper running on Instances

## Overview

Zookeeper afAgent Metric plugin helps in analyzing the efficiency of zookeeper infrastructure by providing key metrics like node count, packet count, latency, watch count etc.

## Prerequisites

1. Zookeeper Plugin is based on Jolokia agent which requires JMX monitoring to be enable locally. Following property needs to be included during the start of Zookeeper process

   ```
   -Dcom.sun.management.jmxremote
   ```

2. JCMD command must be installed in the machine

3. Zookeeper ships with log4j support. Log4j property file (log4j.properties) is present in root folder of Zookeeper and has to be set as follows

   1. Enabling root logger and file appender where file appender can be of any type based on rolling strategy

      ```
      log4j.rootLogger=INFO, logfile
      log4j.appender.logFile=org.apache.log4j.DailyRollingFileAppender
      ```

   2. Specifying custom log file name along with its path , layout properties and data pattern

      ```
      log4j.appender.logFile.DatePattern='.'yyyy-MM-dd-HH
      log4j.appender.logFile.File= <..logpath..>
      log4j.appender.logFile.layout=org.apache.log4j.PatternLayout
      log4j.appender.logFile.layout.ConversionPattern=[%d] %p %m (%c)%n
      ```

   3. After configuring log4j properties, emitted log would look like

      ```
      [2020-07-09 11:15:23,376] INFO Accepted socket connection from /10.233.115.193:34962 (org.apache.zookeeper.server.NIOServerCnxnFactory)
      ```

      

## Configuration

[sfAgent](/docs/quick_start/getting_started#sfagent) section provides steps to install and automatically generate plugin configurations. User can also manually add the configuration shown below to `config.yaml` under `/opt/sfagent/` directory

```yaml
key: <Profile_key>
tags:
  Name: <instance_name>
  appName: <app_name>
  projectName: <project_name>
metrics:
  plugins:
    - name: zookeeperjmx
      enabled: true
      interval: 60
      config:
        dataDir: /tmp/zookeeper/
        documentsTypes:
          - jmxStats
          - zookeeperStats
        port: 2181
logging:
  plugins:
    - name: zookeeper-general
      enabled: true
      config:
        log_level:
          - error
          - info
          - debug
          - notice
        log_path: /home/kafka/kafka_2.12-2.6.2/bin/../logs/*.log
```

**Viewing data and dashboards**

Data collected by plugins can be viewed in SnappyFlow’s browse data section 

**Metrics**

`plugin`: `zookeepr`

`documentType`: `jmxStats`, `zookeeperStats`

`Dashboard template`: `Zookeeper`

**Logs**

`Plugin`: `zookeeper`

`documentType`: `zookeeper`

## Test Matrix

| OS               | JDK version                                                  |
| ---------------- | ------------------------------------------------------------ |
| **ubuntu 18.04** | <p>**JDK 11**</p>  openjdk version "11.0.11"  2021-04-20  OpenJDK Runtime Environment (build  11.0.11+9-Ubuntu-0ubuntu2.18.04)  OpenJDK 64-Bit Server VM (build 11.0.11+9-Ubuntu-0ubuntu2.18.04,  mixed mode, sharing) |
| **ubuntu 18.04** | <p>**JDK 8**</p>  openjdk version "1.8.0_292"  OpenJDK Runtime Environment (build  1.8.0_292-8u292-b10-0ubuntu1~18.04-b10)  OpenJDK 64-Bit Server VM (build 25.292-b10,  mixed mode) |
| **Centos 7**     | <p>**JDK 11**</p>  openjdk version "11.0.12" 2021-07-20 LTS  OpenJDK Runtime Environment 18.9 (build 11.0.12+7-LTS)  OpenJDK 64-Bit Server VM 18.9 (build 11.0.12+7-LTS, mixed mode,  sharing) |
| **Centos 7**     | <p>**JDK 8**</p>   openjdk version "1.8.0_302"  OpenJDK Runtime Environment (build 1.8.0_302-b08)  OpenJDK 64-Bit Server VM (build 25.302-b08, mixed mode) |



## See Also

[Kafka](/docs/Integrations/kafka)

Elasticsearch

Kafka-REST

Kafka-Connect

[ActiveMQ](/docs/Integrations/activemq)