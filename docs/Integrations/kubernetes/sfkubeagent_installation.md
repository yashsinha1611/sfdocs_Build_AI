# Monitoring Application Pods with sfKubeAgent

## Overview

sfKubeAgent is sfAgent packaged as a container and run as a sidecar within a Kubernetes application pod. It can be configured to collect both application metrics and logs similar to the way sfAgent does.

## Integrating sfKubeAgent to application pods 



- Instantiate sfKubeAgent docker image in the pod

- Mount sfKubeAgent config map to the container. `Config.yaml` file used here is similar to the one used for sfAgent. Configurations for specific applications or log types can be found in Integrations section

- Pass parameters `projectName` and `appName` through container’s yaml file.  These are mandatory tags and SnappyFlow uses these tags to organize the end-points in a project/ application hierarchy

- Mount log paths that need to be monitored to sfKubeAgent container in the correct path


## Example: 

Below is an example of sfKubeAgent yaml that monitors JVM and Syslog in an application pod.

### Pod description YAML

```yaml
kind: Pod
apiVersion: v1
metadata:
 name: jvm-pod
 labels:
  snappyflow/appname: test
  snappyflow/projectname: test-new-1
spec:
 containers:
 - name: java-container
   image: ruchira27/jolokia:latest
   ports:
   - name: jolokiaport
     containerPort: 8778
   # Snappyflow's sfkubeagent container
 - name: java-sfagent
   image: snappyflowml/sfagent:latest
   imagePullPolicy: Always
   command:
     - /app/sfagent
     - -enable-console-log
   env:
     - name: APP_NAME
       value: test
     - name: PROJECT_NAME
       value: test-new-1
   volumeMounts:
     - name: configmap-jmx
       mountPath: /opt/sfagent/config.yaml
       subPath: config.yaml
     - name: varlog
       mountPath: /var/log
 volumes:
 - name: configmap-jmx
   configMap:
     name: jmx-configmap
 - name: varlog
   hostPath:
     path: /var/log

```

### Config Map 

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: jmx-configmap
data:
  config.yaml: |-
    key: Hc0cioeml0Sv7b7MbC+N56DKjygUlcvtP3wLtoUQitk3hw3/SevFv5loicDL9cCJDz3fImeLCuR1MrM/un4z+G2gELVeapNVCh96RhqSDvrV4MV9jMiuGi8RCa8MEj6KzAsvxnBPotbYKiM+11cm0xWOZ7K5G0C6J6T+SLX2/xk9us3BN2MhnBCH1N3xGhlDrNAy7j+KLSKsroiZcDw87iFjSaUzt0ADhCEwEJV3JBLZc2xpSM+n1hm3e4HHnVhaXcOi3Fcb9qD280Ya15t7eTsJywHyhKPcNKXpqF0OGVolLEUDc2vwklHGHIZXHF9hY/+/anS9+VSfhVpBNKVsDb+hDCLJbB8uBivJ9idRcnMvGkhir4kAUcsryCgvpay0ghqKZkjQ7zuhzKYW4/szHoXv+8g/Gn+nnxu3yFAa4aTOq6/AMNCA49S9EmU9Tn2yr+dUhiheWhKWFCTc8jd7vowehcPstNW1t8+SMfERkTqSKo1I/PSG0MGm3vrAa2yfU2GwnsyJnROSF/ylSY5JjTBlmfp7ZozKO8XPc7q+vaMwKEQzcDSqpSE26gOVMxrkYD2ksE/BQPbO2X1YTwlOqHSbr9Z0E5XOJXBSmgT7it7BgBCNro0/YcpALdoyEsJr4FBzM0K4ZwZNpnbDrbs0UIKLISaSGkYGAGBtuEXrusQ=
    metrics:
      plugins:
      - name: jvmjolokia
        enabled: true
        interval: 300
        config:
          ip: 127.0.0.1
          protocol: http
          port: 8778
          context: jolokia
          monitorDeadlocks: false
          deadLockMonitoringInterval: 300
    logging:
      plugins:
      - name: linux-syslog
        enabled: true
        config:
          log_level:
            - error
            - warning
            - info
          log_path: /var/log/auth.log,/var/log/messages,/var/log/secure
```

