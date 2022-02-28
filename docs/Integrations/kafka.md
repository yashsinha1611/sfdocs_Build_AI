# Monitoring Kafka Clusters running on Instances

## Overview

Monitoring Kafka cluster requires running sfAgent on all the nodes in the clusters. sfAgent collects metrics and logs from each of the nodes and the aggregate view is presented in SnappyFlow.

Following aspects of Kafka node is monitored by sfAgent

**Kafka Metrics**

- `jmxStats`: JVM health which includes heap utilization, GC Time, Loaded/Unloaded Classes, Memory pools and thread analysis
- `kafkaStats`: Aggregate metrics for the cluster which include - data in/out rate, message in-rate, Fetch follower request rate, Processing times for producer, consumer and follower requests etc.
- `partitionStats`: Size of each partition by topic
- `topicStats`: Topic metrics which includes data in/out rate, message in rate, producer request rate, failed producer request rate, failed fetch request rate etc..
- `consumerStats`: Offset and Lag by topic by partition 

**Kafka Logs** 

- `kafkaGeneralLogs`

### Prerequisites

1. Kafka Metric Plugin is based on Jolokia agent which requires JMX monitoring to be enable locally. Following property needs to be included during the start of kafka process

   ```
   -Dcom.sun.management.jmxremote
   ```

2. Jcmd has to be installed on the instance 

3. Kafka ships with log4j support . Log4j property file (log4j.properties) which is present in root folder of kafka. has to be set as follows

   1. Enable root logger and file appender where file appender can be of     any type based on rolling strategy

      ```
      log4j.rootLogger=INFO, logfile
      log4j.appender.logFile=org.apache.log4j.DailyRollingFileAppender
      ```

   2. Specify custom log file name along with its path, layout properties and data pattern

      ```
      log4j.appender.logFile.DatePattern='.'yyyy-MM-dd-HH
      log4j.appender.logFile.File=<..logpath..>
      log4j.appender.logFile.layout=org.apache.log4j.PatternLayout
      log4j.appender.logFile.layout.ConversionPattern=[%d] %p %m (%c)%n
      ```

      After configuring log4j properties, emitted log would look like

      ```
      [2020-07-09 11:15:23,376] INFO [GroupCoordinator 1]: Group consgrp-tst with generation 1588 is now empty (__consumer_offsets-5) (kafka.coordinator.group.GroupCoordinator)
      ```

      

## Configuration

[sfAgent](/docs/quick_start/getting_started#sfagent) section provides steps to install and automatically generate plugin configurations.  User can also manually add the configuration shown below to `config.yaml` under `/opt/sfagent/` directory

```yaml
key: <Profile_key>
tags:
  Name: <instance_name>
  appName: <app_name>
  projectName: <project_name>
metrics:
  plugins:
    - name: kafkajmx
      enabled: true
      interval: 60
      config:
        process: kafka.Kafka
    - name: kafkatopic
      enabled: true
      interval: 60
      config:
        documentsTypes:
          - kafkaStats
          - partitionStats
          - topicStats
          - consumerStats
        port: 9092
        process: kafka.Kafka
logging:
  plugins:
    - name: kafka-general
      enabled: true
      config:
        log_level:
          - error
          - info
          - notice
          - debug
        log_path: <log_path>
```

Kafka metrics monitoring on instances requires two separate plugins – `KafkaJMX` to collect JVM health metrics and `kafkaTopic` plugin to collect broker and topic metrics. 

`kafkaTopic` plugin requires the following parameters:

- `process`: Kafka process name (It should be part of java main class)
- `port`: Broker Port

## Viewing data and dashboards

Data collected by plugins can be viewed in SnappyFlow’s browse data section 

**Metrics**

`plugin`: `kafka`

`documentType`: `jmxStats`, `kafkaStats`, `partitionStats`, `topicStats`, `consumerStats`

`Dashboard template`: `Kafka`

**Logs**

`Plugin`: `kafka`

`documentType`: `kafkaGeneralLogs`

## Test Matrix

| OS                | JDK version                                                  |
| ----------------- | ------------------------------------------------------------ |
| **ubuntu 18.04**  | <p> **JDK 11**</p> openjdk version "11.0.11"  2021-04-20  OpenJDK Runtime Environment (build  11.0.11+9-Ubuntu-0ubuntu2.18.04)  OpenJDK 64-Bit Server VM (build  11.0.11+9-Ubuntu-0ubuntu2.18.04, mixed mode, sharing) |
| **ubuntu  18.04** | <p>**JDK 8**</p> openjdk version "1.8.0_292"  OpenJDK Runtime Environment (build  1.8.0_292-8u292-b10-0ubuntu1~18.04-b10)  OpenJDK 64-Bit Server VM (build 25.292-b10,  mixed mode) |
| **Centos 7**      | <p> **JDK 11**</p> openjdk version "11.0.12"  2021-07-20 LTS  OpenJDK Runtime Environment 18.9 (build  11.0.12+7-LTS)  OpenJDK 64-Bit Server VM 18.9 (build  11.0.12+7-LTS, mixed mode, sharing) |
| **Centos 7**      | <p>**JDK 8**</p> openjdk version "1.8.0_302"  OpenJDK Runtime Environment (build  1.8.0_302-b08)  OpenJDK 64-Bit Server VM (build 25.302-b08,  mixed mode) |

## See Also

[Zookeeper](/docs/integrations/zookeeper)

Elasticsearch

Kafka-REST

Kafka-Connect