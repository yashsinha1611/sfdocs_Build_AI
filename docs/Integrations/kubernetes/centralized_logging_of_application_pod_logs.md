# Centralized Logging of Application Pod Logs



## Overview

SnappyFlow can collect & parse application logs from pods in 2 ways: 

- Collect logs locally by running sfKubeAgent as a sidecar container inside application pod 
- Collect logs centrally through sfPod, which is explained in this page 

 

## Procedure for Centralized Logging 

- User runs a busybox sidecar container in the application pod with log files mounted to the container. Busybox tails & streams the application logs to stdout 

- Add SnappyFlow labels: 
  - `snappyflow/projectName` and `snappyflow/appName`: These are mandatory labels for SnappyFlow monitoring. sfPod collects logs only from pods that have these labels and collected logs are organized under projectName/appName hierarchy in SnappyFlow 
  - `snappyflow/component`: This label is used to signal to sfPod on which parser to apply to parse the logs. List of standard parsers packaged with sfPod. If no label is present, sfPod will apply SnappyFlow’s generic parser which collects the whole log line as a message. 

- sfPod runs as daemon-set in all the Kubernetes data nodes. It picks up logs from stdout of tagged pods, parses the logs based on component tag and ships parsed logs to SnappyFlow under projectName/appName hierarchy. 

  

## How to tag application Pods with project and application name labels

### Running Pods

Use the following kubectl commands to tag your application pods with the appropriate tags:

```
kubectl label pods <pod_name> snappyflow/projectname=<project_name> --namespace <appnamespace>
kubectl label pods <pod_name> snappyflow/appname=<app_name> --namespace <appnamespace>
```

### Automatically apply labels to new Pods

To automatically apply right labels for new pods which get created due to various reasons such as upgrade, restarts etc. apply labels to pod templates. If you are using helm chart, best practice is to define labels in values.yaml and use these labels parameter in pod template section of Deployment, StatefulSet, Daemonset or other Kubernetes controller.

Below is one example values.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sfapm-ui
  labels:
    app: sfapm
    role: ui
spec:
  replicas: 1
  selector:
    matchLabels:
      app: sfapm
      role: ui
  template:
    metadata:
      labels:
        app: sfapm
        role: ui
        snappyflow/appname: demo-application
        snappyflow/projectname: demo-project
```



## Example

### Centralized logging for nginx-access logs

 

- Configure Nginx to drop logs in the required format in /var/log/nginx folder using config map 

- Add busy box container to tail logs from access logs and stream to stdout 
- Signal to sfPod to use “nginx” parser using label “component” 

**Nginx Pod YAML** 

```yaml
kind: Pod 
apiVersion: v1 
metadata: 
 name: my-first-pod 
 labels: 
  snappyflow/appname: <app_name> 
  snappyflow/projectname: <project_name> 
  snappyflow/component: nginx 
spec: 
 containers: 
 - name: nginx-container 
   image: nginx:latest 
   imagePullPolicy: IfNotPresent 
   ports: 
   - name: http 
     containerPort: 80 
     protocol: TCP 
   volumeMounts: 
   - name: varlog 
     mountPath: /var/log/nginx 
   - name: nginx-config 
     mountPath: /etc/nginx/nginx.conf 
     subPath: nginx.conf 
 - name: busybox-container 
   image: busybox 
   command: ["/bin/sh", "-c"] 
   args: ["tail -n+1 -f /var/log/nginx/access1.log"] 
   volumeMounts: 
   - name: varlog 
     mountPath: /var/log/nginx 
 volumes: 
 - name: nginx-config 
   configMap: 
     name: nginx-config 
 - name: varlog 
   emptyDir: {} 
```

**Config map for Nginx configuration**

```yaml
apiVersion: v1 
kind: ConfigMap 
metadata: 
  name: nginx-configmap 
  labels: 
    snappyflow/appname: <app_name> 
    snappyflow/projectname: <project_name> 
data: 
  nginx.conf: | 
    worker_processes  5; 
    events { 
        worker_connections  4096; 
    } 
    http { 
        default_type application/octet-stream; 
        log_format upstream_time  '$remote_addr:$remote_port $remote_user [$time_local] ' 
                       '"$request" $status $body_bytes_sent ' 
                       '"$http_referer" "$http_user_agent" "$http_referer" ' 
                       'rt=$request_time uct=$upstream_connect_time uht=$upstream_header_time urt=$upstream_response_time'; 
        server { 
            listen          80; 
            error_log /var/log/nginx/error1.log; 
            access_log /var/log/nginx/access1.log upstream_time; 
            location /nginx_status { 
                stub_status; 
            } 
        } 
    } 
```

