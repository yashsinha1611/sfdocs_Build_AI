# RabbitMQ in Kubernetes

## Monitoring RabbitMQ Message Broker running on Kubernetes

RabbitMQ running in Kubernetes can be monitored in SnappyFlow using:

- [sfKubeAgent](/docs/Integrations/kubernetes/sfkubeagent_installation) as sidecar container.

### MySQL monitoring with sfKubeAgent

In this approach, [sfKubeAgent](/docs/Integrations/kubernetes/sfkubeagent_installation) is run as a side-car inside RabbitMQ pod. The example below shows the config-map for sfKubeAgent container, config-map for RabbitMQ container and pod yaml.

 ### ConfigMap for RabbitMQ sfKubeAgent:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: rabbitmq-sfagent-config
data:
  config.yaml: |-
    key: "<profile key>"
    metrics:
      plugins:
        - name: rabbitmq
          enabled: true
          interval: 60
          config:
            documentsTypes:
              - clusterDetails
              - nodeStats
              - connectionStats
              - channelStats
              - exchangeStats
              - queueStats
              - consumerStats
            host: localhost
            password: <password>
            secure: false
            port: 15672
            username: <username>
    agent:
      loglevel: debug

```

### RabbitMQ YAML(Statefulset)
 
 ```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: rabbitmqcluster
spec:
  replicas: 3
  serviceName: rabbitmqcluster-headless
  template:
    spec:
      containers:
      - command:
        - /app/sfagent
        - -config-file
        - /opt/sfagent/config.yaml
        - -enable-console-log
        env:
        - name: APP_NAME
          value: rabbitmq
        - name: PROJECT_NAME
          value: rabbitmq-kube
        image: snappyflowml/sfagent:latest
        imagePullPolicy: Always
        name: rabbitmq-sfagent
        resources:
          limits:
            cpu: 500m
            memory: 500Mi
          requests:
            cpu: 100m
            memory: 128Mi
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /opt/sfagent/config.yaml
          name: sfagent
          subPath: config.yaml
      securityContext:
        fsGroup: 1001
      volumes:
      - configMap:
          defaultMode: 420
          name: rabbitmq-sfagent-config
        name: sfagent

```

### Parameters required in metrics plugin

- Username: username of the RabbitMQ user
- password: password for RabbitMQ
- port: Broker Port
- secure: http(false) or https(true)
- documentTypes: User can either leave this empty to collect all documentTypes or mention specific documentTypes to collect. Available options for plugin type RabbitMQ are clusterDetails, nodeStats, connectionStats, exchangeStats, queueStats, consumerStats

  
### Viewing data and dashboards

Data collected by plugins can be viewed in SnappyFlow’s browse data section

- plugin: rabbitmq
- documentType: clusterDetails, nodeStats, connectionStats, exchangeStats, queueStats, consumerStats
- Dashboard template: RabbitMQ

