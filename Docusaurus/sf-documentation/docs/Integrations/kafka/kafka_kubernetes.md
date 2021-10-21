# Monitoring Kafka Clusters running in Kubernetes

# Overview

Kafka on Kubernetes can be monitored in SnappyFlow using two approaches:

- [sfKubeAgent](/docs/Integrations/kubernetes/sfkubeagent_installation) as sidecar container.

- [Prometheus exporter](/docs/Integrations/kubernetes/prometheus_exporter)

   

## Kafka monitoring with sfKubeAgent

### Prerequisites

1. sfKubeAgent container is run as a side-car n Kafka Pod

2. Init-Container: sfKubeAgent plugin requires Jolokia to be run with the Kafka process. Jolokia exposes mbeans over default port 8778. Jolokia can be downloaded using init-container from the below url: 

   ```
   https://repo1.maven.org/maven2/org/jolokia/jolokia-jvm/1.6.2/jolokia-jvm-1.6.2-agent.jar
   ```

   Both Confluent and Apache distributions allow Java agents to be started along with Kafka process. To start Jolokia along with the Kafka broker , set environment variable KAFKA_JMX_OPTS along with Configured agent mount path in broker’s container.

3. The value of Kafka-JMX-OPTS must be as below:

   ```
   - name: KAFKA_JMX_OPTS
     value: "-javaagent:/agent/jolokia.jar=port=8778,host=127.0.0.1 
             -Djava.rmi.server.hostname=127.0.0.1 
             -Dcom.sun.management.jmxremote=true 
             -Dcom.sun.management.jmxremote.authenticate=false  
             -Dcom.sun.management.jmxremote.ssl=false"
   ```

   Sample Init Container Configuration for including Jolokia

   ```
   initContainers:
   - name: get-jolokia
     image: alpine
     command:
     - sh
     - -c
     - -x
     - apk add --no-cache curl && curl ${JOLOKIA_JAR_URL} -o /agent/jolokia.jar
     env:
     - name: JOLOKIA_JAR_URL
       value: https://repo1.maven.org/maven2/org/jolokia/jolokia-jvm/1.6.2/jolokia-jvm-1.6.2-agent.jar
     volumeMounts:
     - name: javaagentdir
       mountPath: /agent
   ```

**Kafka Pod yaml:**

Example of the Kafka Pod.yaml is below:

```yaml
apiVersion: v1
kind: Pod

metadata:  
  labels:
    snappyflow/appname: <application_name>
    snappyflow/projectname: <project_name>
    name: kafka-pod
spec:  
  containers:
  - command:
    - sh
    - -exc
    - |
      export KAFKA_BROKER_ID=${HOSTNAME##*-} && \
      export KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka-pod.kafka-sfagent-kafka-sfagent-headless.default:9092,EXTERNAL://${HOST_IP}:$((31090 + ${KAFKA_BROKER_ID})) && \
      exec /etc/confluent/docker/run

    env:    
    - name: KAFKA_JMX_OPTS
      value: -javaagent:/agent/jolokia.jar=port=8778,host=127.0.0.1 -Djava.rmi.server.hostname=127.0.0.1
        -Dcom.sun.management.jmxremote=true -Dcom.sun.management.jmxremote.authenticate=false  -Dcom.sun.management.jmxremote.ssl=false
    image: mahendra0939/kafka-auditable:latest
    imagePullPolicy: IfNotPresent

    name: kafka-broker
    ports:
    - containerPort: 9092
      name: kafka
      protocol: TCP
    - containerPort: 8778
      name: jolokia
      protocol: TCP

    volumeMounts:
    - mountPath: /opt/kafka/data
      name: datadir
    - mountPath: /etc/customlog4j
      name: connect-log4j-properties
    - mountPath: /var/log/kafka
      name: varlog
    - mountPath: /agent
      name: javaagentdir
      readOnly: true

  - command:
    - /app/sfagent
    - -enable-console-log
    env:
    - name: APP_NAME
      value: <application_name>
    - name: PROJECT_NAME
      value: <project_name>
    image: snappyflowml/sfagent:latest
    imagePullPolicy: Always

    name: sfagent
    volumeMounts:
    - mountPath: /var/log/kafka
      name: varlog
    - mountPath: /opt/sfagent/config.yaml
      name: sfagent-config-kafka
      subPath: config.yaml
      readOnly: true

  initContainers:
  - command:
    - sh
    - -c
    - -x
    - apk add --no-cache curl && curl ${JOLOKIA_JAR_URL} -o /agent/jolokia.jar

    env:
    - name: JOLOKIA_JAR_URL
      value: https://repo1.maven.org/maven2/org/jolokia/jolokia-jvm/1.6.2/jolokia-jvm-1.6.2-agent.jar
    image: alpine
    imagePullPolicy: Always

    name: get-jolokia 
    volumeMounts:
    - mountPath: /agent
      name: javaagentdir
      readOnly: true

  volumes:
  - emptyDir: {}
    name: datadir    
  - emptyDir: {}
    name: javaagentdir
  - emptyDir: {}
    name: varlog
  - configMap:
      defaultMode: 420
      name: kafka-sfkubeagent-configmap
    name: sfagent-config-kafka
  - configMap:
      defaultMode: 420
      name: kafka-configmap
    name: connect-log4j-properties

```

In addition to the pod.yaml below config-map for sfkubeAgent container and Kafka container.

Example for the config-map are below:

**Kafka config map:**

```
apiVersion: v1
kind: ConfigMap
metadata:  
  name: kafka-configmap
data:
  connect-log4j.properties: "log4j.rootLogger=INFO, kafkaAppender\nlog4j.appender.kafkaAppender.File=/var/log/kafka/server.log\nlog4j.appender.kafkaAppender.layout=org.apache.log4j.PatternLayout\nlog4j.appender.kafkaAppender.layout.ConversionPattern=[%d]
    %p %m (%c)%n\nlog4j.appender.kafkaAppender=org.apache.log4j.RollingFileAppender\nlog4j.appender.kafkaAppender.MaxFileSize=5MB\nlog4j.appender.kafkaAppender.MaxBackupIndex=5\nlog4j.appender.stateChangeAppender.File=/var/log/kafka/state-change.log\nlog4j.appender.stateChangeAppender.layout=org.apache.log4j.PatternLayout
    \   \nlog4j.appender.stateChangeAppender.layout.ConversionPattern=[%d] %p %m (%c)%n\nlog4j.appender.stateChangeAppender=org.apache.log4j.RollingFileAppender\nlog4j.appender.stateChangeAppender.MaxFileSize=5MB\nlog4j.appender.stateChangeAppender.MaxBackupIndex=5\ng4j.appender.requestAppender=org.apache.log4j.DailyRollingFileAppender\nlog4j.appender.requestAppender.File=/var/log/kafka/kafka-request.log\nlog4j.appender.requestAppender.layout=org.apache.log4j.PatternLayout\nlog4j.appender.requestAppender.layout.ConversionPattern=[%d]
    %p %m (%c)%n\nlog4j.appender.requestAppender=org.apache.log4j.RollingFileAppender\nlog4j.appender.requestAppender.MaxFileSize=5MB\nlog4j.appender.requestAppender.MaxBackupIndex=5\nlog4j.appender.cleanerAppender.File=/logs/log-cleaner.log\nlog4j.appender.cleanerAppender.layout=org.apache.log4j.PatternLayout\nlog4j.appender.cleanerAppender.layout.ConversionPattern=[%d]
    %p %m (%c)%n\nlog4j.appender.cleanerAppender=org.apache.log4j.RollingFileAppender\nlog4j.appender.cleanerAppender.MaxFileSize=5MB\nlog4j.appender.cleanerAppender.MaxBackupIndex=5\nlog4j.appender.controllerAppender.File=/var/log/kafka/controller.log\nlog4j.appender.controllerAppender.layout=org.apache.log4j.PatternLayout\nlog4j.appender.controllerAppender.layout.ConversionPattern=[%d]
    %p %m (%c)%n\nlog4j.appender.controllerAppender=org.apache.log4j.RollingFileAppender\nlog4j.appender.controllerAppender.MaxFileSize=5MB\nlog4j.appender.controllerAppender.MaxBackupIndex=5\nlog4j.appender.authorizerAppender.File=/var/log/kafka/kafka-authorizer.log\nlog4j.appender.authorizerAppender.layout=org.apache.log4j.PatternLayout\nlog4j.appender.authorizerAppender.layout.ConversionPattern=[%d]
    %p %m (%c)%n\nlog4j.appender.authorizerAppender=org.apache.log4j.RollingFileAppender\nlog4j.appender.authorizerAppender.MaxFileSize=5MB\nlog4j.appender.authorizerAppender.MaxBackupIndex=5\n
log4j.logger.kafka=INFO\nlog4j.logger.org.apache.kafka=INFO\n
log4j.logger.kafka.request.logger=WARN,
    requestAppender\nlog4j.additivity.kafka.request.logger=false\n 
log4j.logger.kafka.network.RequestChannel$=WARN,
    requestAppender\nlog4j.additivity.kafka.network.RequestChannel$=false\nlog4j.logger.kafka.controller=TRACE,
    controllerAppender\nlog4j.additivity.kafka.controller=false\nlog4j.logger.kafka.log.LogCleaner=INFO,
    cleanerAppender\nlog4j.additivity.kafka.log.LogCleaner=false\nlog4j.logger.state.change.logger=TRACE,
    stateChangeAppender\nlog4j.additivity.state.change.logger=false\n 
\nlog4j.logger.kafka.authorizer.logger=DEBUG,
    authorizerAppender\nlog4j.additivity.kafka.authorizer.logger=false\n"

```

**Config map for Kafka sfKubeAgent:**

```
apiVersion: v1
kind: ConfigMap
metadata:  
  labels:
    app.kubernetes.io/managed-by: Helm
    snappyflow/appname: <application_name>
    snappyflow/projectname: <project_name>
  name: kafka-sfkubeagent-configmap
data:
  config.yaml: |
    ---
    key: "<Profile_key>”
    logging:
      plugins:
      - name: kafka-general
        enabled: true
        config:
          log_level:
            - error
            - info
            - debug
            - warn
            - notice
          log_path: /var/log/kafka/server.log,/var/log/kafka/state-change.log,/var/log/kafka/kafka-request.log,/var/log/kafka/controller.log,/var/log/kafka/kafka-authorizer.log

    metrics:
      plugins:
      - name: kube-sfagent-kafkatopic
        enabled: true
        interval: 300
        config:
          documentsTypes:
            - kafkaStats
            - partitionStats
            - topicStats
            - consumerStats
          jolokiaPort: 8778
          RMIPort: 8778
          jolokiaContext: jolokia
          jolokiaProtocol: http
          jolokiaProxy: false
          port: 9092
          process: kafka.Kafka,io.confluent.support.metrics.SupportedKafka 
 
      - name: kube-sfagent-kafkajmx
        enabled: true
        interval: 300
        config:
          process: kafka.Kafka,io.confluent.support.metrics.SupportedKafka
          jolokiaPort: 8778
          RMIPort: 8778
          jolokiaContext: jolokia
          jolokiaProtocol: http
          jolokiaProxy: false

```

Plugin Type `kafkatopic` consists of documents organized into following types

- `Kafka stats`: contain transactional data and metrics related to broker state
- `Topic stats`:  provide metrics for analyzing internal transactions associated with each     topic
- `Partition stats`: provide log size and segment information for each partition
- `Consumer stats`: provide consumer lag and offset information

 Plugin Type `kafkajmx` contains single type of document

- `JVM stats`: contain all JVM related metrics like garbage collection details, memory     pools, loaded/unloaded classes etc.

### Configuration Parameters Breakdown 

`jolokiaPort`: port on which jolokia based requests are served

`jolokiaContext`: context makes jolokia endpoint. Default value is string

`jolokiaProtocol`: request/response protocol

`jolokiaProxy`: jolokia proxy mode, if enabled for Jolokia agent

`RMIPort`: RMI port. if enabled

### Viewing data and dashboards

- Metric data generated by plugin can be viewed in `browse data` page inside the respective application under metrics section with plugin= `kube-sfagent-kafkajmx` and documentType= `jmxStats`. Data from topics can be found in metrics section with plugin= `kube-sfagent-kafkatopic` and documentType= `consumerStats` , `kafkaStats`, `partitionStats` , `topicStats`.
- Dashboard for this data can be instantiated by Importing dashboard template `Kafka_Kube_SF` to the application dashboard

 For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).

## **Kafka monitoring with** Prometheus:

Refer to [Prometheus Exporter Overview](/docs/Integrations/kubernetes/prometheus_exporter) to understand how SnappyFlow monitors using Prometheus exporters. 

### Prerequisites

- **Enabling JMX Monitoring**

  JMX monitoring needs to be enabled for the kafka process. Following properties need to be set for the process.

  ```
  -Dcom.sun.management.jmxremote
  -Djava.rmi.server.hostname=0.0.0.0 
  -Dcom.sun.management.jmxremote.local.only=false 
  -Dcom.sun.management.jmxremote.port= userDefinedJMXPort 
  -Dcom.sun.management.jmxremote.rmi.port= userDefinedJMXPort 
  -Dcom.sun.management.jmxremote.authenticate=false 
  -Dcom.sun.management.jmxremote.ssl=false
  ```

- Prometheus JMX exporter Integration

  ```
  Docker Image: solsson/kafka-prometheus-jmx-exporter@sha256
  Image Tag: a23062396cd5af1acdf76512632c20ea6be76885dfc20cd9ff40fb23846557e8
  ```

  *Configuration:* Exporter needs to be deployed as one of the containers in broker pods and following command needs to be executed as the actual container process

  ```
  java -jar jmx_prometheus_httpserver.jar userDefinedPrometheusPort configurationFile
  ```

  *Instrumentation*: Prometheus instrumentation is based on the exporter rules specified in exporterConfigurationFile. Config File needs to be mounted with following contents

  ```
  jmxUrl: service:jmx:rmi:///jndi/rmi://127.0.0.1:userDefinedJMXPort/jmxrmi
  lowercaseOutputName: true
  lowercaseOutputLabelNames: true
  ssl: false
  
  whitelistObjectNames: ["kafka.controller:*","kafka.server:*","java.lang:*","kafka.network:*","kafka.log:*"]
  
  rules:
  - pattern: kafka.controller<type=(ControllerChannelManager), name=(QueueSize), broker-id=(\d+)><>(Value)
    name: kafka_controller_$1_$2_$4
    labels:
    broker_id: "$3"
  - pattern: kafka.controller<type=(ControllerChannelManager), name=(TotalQueueSize)><>(Value)
    name: kafka_controller_$1_$2_$3
  - pattern: kafka.controller<type=(KafkaController), name=(.+)><>(Value)
    name: kafka_controller_$1_$2_$3
  - pattern: kafka.controller<type=(ControllerStats), name=(.+)><>(Count|OneMinuteRate)
    name: kafka_controller_$1_$2_$3
  - pattern: kafka.server<type=(ReplicaFetcherManager), name=(.+), clientId=(.+)><>(Value)
    name: kafka_server_$1_$2_$4
    labels:
      client_id: "$3"
  - pattern : kafka.network<type=(Processor), name=(IdlePercent), networkProcessor=(.+)><>(Value)
    name: kafka_network_$1_$2_$4
    labels:
      network_processor: $3
  - pattern : kafka.network<type=(RequestMetrics), name=(.+), request=([^,]+).*><>(Count|OneMinuteRate|Mean)
    name: kafka_network_$1_$2_$4
    labels:
      request: $3
  - pattern: kafka.server<type=(.+), name=(.+), topic=(.+)><>(Count|OneMinuteRate)
    name: kafka_server_$1_$2_$4
    labels:
      topic: $3
  - pattern: kafka.server<type=(DelayedOperationPurgatory), name=(.+), delayedOperation=(.+)><>(Value)
    name: kafka_server_$1_$2_$3_$4
  - pattern: kafka.server<type=(.+), name=(.+)><>(Count|Value|OneMinuteRate)
    name: kafka_server_$1_total_$2_$3
  - pattern: kafka.server<type=(.+)><>(queue-size)
    name: kafka_server_$1_$2
  - pattern: java.lang<type=(.+), name=(.+)><(.+)>(\w+)
    name: java_lang_$1_$4_$3_$2
  - pattern: java.lang<type=(.+), name=(.+)><>(\w+)
    name: java_lang_$1_$3_$2
  - pattern : java.lang<type=(.*)>
  - pattern: kafka.log<type=(.+), name=(.+), topic=(.+), partition=(.+)><>Value
    name: kafka_log_$1_$2
    labels:
      topic: $3
      partition: $4
  ```

  :::note

  By default, confluent and apache kafka helm charts ships with the JMX exporter. In these charts , JMX port will be set to 5555 by default .Exporter rules and whitelisted objects only needs to be updated with the above specified Instrumentation in the configuration file.

  :::

  Kubernetes service needs to be created for exposing *userDefinedPrometheusPort*

  *Reference:* [Prometheus JMX exporter](https://github.com/prometheus/jmx_exporter/blob/master/README.md)

- Danielqs Exporter

  ```
  Docker Image: danielqsj/kafka-exporter
  Image Tag: v1.0.1
  ```

  *Configuration:* Exporter is installed as a container in separate pod. Kafka broker details and prometheus listener port needs to be configured in following way

  ```
  - args:
    - --kafka.server= brokerhost:brokerPort
    - --web.listen-address=:userDefinedPrometheusListenerPort
  ```

  Kubernetes service needs to be created for exposing *userDefinedPrometheusListenerPort*

  *Reference:* [Danielqs Exporter](https://github.com/danielqsj/kafka_exporter/blob/master/README.md)

### Documents

Plugin Type `kube-prom-kafka-jmx` contains the metrics organized into following document types

- `Kafka stats`: contain transactional data and metrics related to broker state
- `Topic stats`: provide metrics for analyzing internal transactions associated with each     topic
- `Partition stats`: provide log size information for each partition
- `jmx stats`: contain all JVM related metrics like garbage collection details,     memory pools, loaded/unloaded classes etc.

Plugin Type `kube-prom-kafka` contains the metrics organized into following document types

- `Consumer stats`: Contains consumers related information and the total partiton count.

**Configmap for kafka Prometheus**

```
apiVersion: v1
kind: ConfigMap
metadata:  
  name: kafka-prom-configmap
data:
  jmx-kafka-prometheus.yml: |
    jmxUrl: service:jmx:rmi:///jndi/rmi://127.0.0.1:5555/jmxrmi
    lowercaseOutputName: true
    lowercaseOutputLabelNames: true
    ssl: false

    whitelistObjectNames: ["kafka.controller:*","kafka.server:*","java.lang:*","kafka.network:*","kafka.log:*"]

    rules:
    - pattern: kafka.controller<type=(ControllerChannelManager), name=(QueueSize), broker-id=(\d+)><>(Value)
      name: kafka_controller_$1_$2_$4
      labels:
        broker_id: "$3"
    - pattern: kafka.controller<type=(ControllerChannelManager), name=(TotalQueueSize)><>(Value)
      name: kafka_controller_$1_$2_$3
    - pattern: kafka.controller<type=(KafkaController), name=(.+)><>(Value)
      name: kafka_controller_$1_$2_$3
    - pattern: kafka.controller<type=(ControllerStats), name=(.+)><>(Count|OneMinuteRate)
      name: kafka_controller_$1_$2_$3
    - pattern: kafka.server<type=(ReplicaFetcherManager), name=(.+), clientId=(.+)><>(Value)
      name: kafka_server_$1_$2_$4
      labels:
        client_id: "$3"
    - pattern : kafka.network<type=(Processor), name=(IdlePercent), networkProcessor=(.+)><>(Value)
      name: kafka_network_$1_$2_$4
      labels:
        network_processor: $3
    - pattern : kafka.network<type=(RequestMetrics), name=(.+), request=([^,]+).*><>(Count|OneMinuteRate|Mean)
      name: kafka_network_$1_$2_$4
      labels:
        request: $3
    - pattern: kafka.server<type=(.+), name=(.+), topic=(.+)><>(Count|OneMinuteRate)
      name: kafka_server_$1_$2_$4
      labels:
        topic: $3
    - pattern: kafka.server<type=(DelayedOperationPurgatory), name=(.+), delayedOperation=(.+)><>(Value)
      name: kafka_server_$1_$2_$3_$4
    - pattern: kafka.server<type=(.+), name=(.+)><>(Count|Value|OneMinuteRate)
      name: kafka_server_$1_total_$2_$3
    - pattern: kafka.server<type=(.+)><>(queue-size)
      name: kafka_server_$1_$2
    - pattern: java.lang<type=(.+), name=(.+)><(.+)>(\w+)
      name: java_lang_$1_$4_$3_$2
    - pattern: java.lang<type=(.+), name=(.+)><>(\w+)
      name: java_lang_$1_$3_$2
    - pattern : java.lang<type=(.*)>
    - pattern: kafka.log<type=(.+), name=(.+), topic=(.+), partition=(.+)><>Value
      name: kafka_log_$1_$2
      labels:
        topic: $3
        partition: $4
```

**Kafka Service YAML**

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    snappyflow/appname: <application_name>
    snappyflow/plugin: kafka-jmx
    snappyflow/projectname: <project_name>
  name: kafka-prom-service
  ports:
  - name: broker
    port: 9092
    protocol: TCP
    targetPort: 9092
  - name: jmx-exporter
    port: 5555
    protocol: TCP
    targetPort: 5556
  - name: kafka-exporter
    port: 9308
    protocol: TCP
    targetPort: 9308
  type: ClusterIP
```

**Kafka Pod YAML**

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:   
    snappyflow/appname: <application_name>
    snappyflow/component: kafka
    snappyflow/projectname: <project_name>    
  name: kafka-prom-pod
spec:
  containers:
  - command:
    - java
    - -XX:+UnlockExperimentalVMOptions
    - -XX:+UseCGroupMemoryLimitForHeap
    - -XX:MaxRAMFraction=1
    - -XshowSettings:vm
    - -jar
    - jmx_prometheus_httpserver.jar
    - "5556"
    - /etc/jmx-kafka/jmx-kafka-prometheus.yml
    image: solsson/kafka-prometheus-jmx-exporter@sha256:a23062396cd5af1acdf76512632c20ea6be76885dfc20cd9ff40fb23846557e8
    imagePullPolicy: IfNotPresent
    name: metrics
    ports:
    - containerPort: 5556
      protocol: TCP
    volumeMounts:
    - mountPath: /etc/jmx-kafka
      name: jmx-config
      readOnly: true

  - command:
    - sh
    - -exc
    - |
      export KAFKA_BROKER_ID=${HOSTNAME##*-} && \
      export KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://${POD_NAME}.kafka-prom-kafka-headless.${POD_NAMESPACE}:9092,EXTERNAL://${HOST_IP}:$((31090 + ${KAFKA_BROKER_ID})) && \
      exec /etc/confluent/docker/run
    env:
    - name: JMX_PORT
      value: "5555"
    - name: KAFKA_JMX_OPTS
      value: -Dcom.sun.management.jmxremote=true -Dcom.sun.management.jmxremote.authenticate=false  -Dcom.sun.management.jmxremote.ssl=false
    image: mahendra0939/kafka-auditable:latest
    imagePullPolicy: IfNotPresent
    livenessProbe:
      exec:
        command:
        - sh
        - -ec
        - /usr/bin/jps | /bin/grep -q SupportedKafka
    name: kafka-broker
    ports:
    - containerPort: 9092
      name: kafka
      protocol: TCP
    - containerPort: 8778
      name: jolokia
      protocol: TCP
    - containerPort: 5555
      name: jmx
      protocol: TCP
    volumeMounts:
    - mountPath: /opt/kafka/data
      name: datadir
    - mountPath: /var/log/kafka
      name: varlog
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: kafka-prom-token-s8fmp
      readOnly: true

  - args:
    - --kafka.server=kafka-prom-service:9092
    - --web.listen-address=:9308
    image: danielqsj/kafka-exporter:v1.0.1
    imagePullPolicy: IfNotPresent
    name: kafka-exporter
    ports:
    - containerPort: 9308
      protocol: TCP
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: default-token-lv29f
      readOnly: true  

  volumes:
  - name: datadir
    persistentVolumeClaim:
      claimName: datadir-kafka-prom-kafka-0
  - emptyDir: {}
    name: varlog
  - configMap:
      defaultMode: 420
      name: kafka-prom-configmap
    name: jmx-config
  - name: default-token-lv29f
    secret:
      defaultMode: 420
      secretName: default-token-lv29f
```

### Viewing data and dashboards

- Data generated by plugin can be viewed in `browse data` page inside the respective application under plugin= `kube-prom-kafka` and documentType= `consumerStats` . JMX Data can be found in metrics section with plugin= kube-prom-kafka-jmx and documentType= `jmxStats` , `kafkaStats`, `partitionStats` , `topicStats`.
- Dashboard for this data can be instantiated by Importing dashboard template `Kafka_Kube_Prom` to the application dashboard

 

For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).

 