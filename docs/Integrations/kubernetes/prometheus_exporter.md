# Prometheus Exporter 

## Overview

- sfPod scans all pods in the namespaces that it has access to for specific labels **snappyflow/projectname** and **snappyflow/appname** 

- If a pod is tagged with SnappyFlow labels, sfPod then looks for standard Prometheus annotations 

  | Label                | Value                                                        |
  | -------------------- | ------------------------------------------------------------ |
  | prometheus.io/scrape | If true, the pod is considered for Prometheus scraping, else it is excluded. |
  | prometheus.io/port   | This label defines a list of ports that sfPod will scan. sfPod will also apply the appropriate parser. If this label is empty, sfPod scans all exposed container ports. Default value is empty. |
  | prometheus.io/path   | Define the path as /metrics. Empty by default.               |

- If sfPod finds data on these ports, the data is scanned, parsed and sent to SnappyFlow 

## Monitoring pods using Prometheus exporter

### Pre-requisites

1. Ensure sfPod is running and has access privileges to namespace in which application pod is running  
2. Ensure sfPod has access to ports exposing Prometheus exporters  

### Enable access to Prometheus exporter 

Add Prometheus exporter container as a sidecar in the application pod. Pls see example below for Prometheus exporter pod. sfPod needs to access the Prometheus exporter on the exported port, which should be exposed in pod’s service 

[PostgreSQL Statefulset YAML](https://github.com/snappyflow/website-artefacts/blob/master/yaml_deployments/prometheus/postgresql/statefullset.yaml) 

[PostgreSQL Service YAML](https://github.com/snappyflow/website-artefacts/blob/master/yaml_deployments/prometheus/postgresql/service.yaml) 

After setup of Prometheus exporter container, please verify connectivity using:

```properties
curl service_ip: 9187 
curl service_ip: 5432 
```

### Tag applications with Labels

:::note

Applying labels are key to monitoring in SnappyFLow. Endpoints are organized in a hierarchy as per the labels defined.

:::

1. Add labels snappyflow/projectName and snappyflow/appName 

   1. if the application pods are already running, use the following kubectl commands to tag your application pods with the appropriate tags:

      ```
      kubectl label pods <pod_name> snappyflow/projectname=<project_name> --namespace<appnamespace>
      kubectl label pods <pod_name> snappyflow/appname=<app_name> --namespace<appnamespace>
      ```

   2. To automatically apply the right labels for the new pods which get created due to various reasons such as upgrades, restarts etc, apply labels to pod templates. If you are using helm chart, a best practice is to define labels in values.yaml and use the label parameters in pod template section of Deployment, StatefulSet, DaemonSet or other Kubernetes controller.

   

 ## List of Prometheus exporters supported by sfPod

| Plugins          | Exporter Links                                               | service_discovery_regex                                      | Docker image                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| apache           | [Exporter Link](https://github.com/Lusitaniae/apache_exporter/blob/master/README.md) | `["apache_accesses_total","apache_+"]`                       | [Docker image](https://hub.docker.com/r/lusotycoon/apache-exporter/) |
| elasticsearch    | [Exporter Link](https://github.com/prometheus-community/elasticsearch_exporter/blob/master/README.md) | `["elasticsearch_+"]`                                        | [Docker image](https://hub.docker.com/r/justwatch/elasticsearch_exporter) |
| haproxy          | [Exporter Link](https://bitnami.com/stack/jmx-exporter)      | `["haproxy_+"]`                                              | [Docker image](https://hub.docker.com/r/bitnami/jmx-exporter/) |
| jmx              | [Exporter Link](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["jmx_exporter_build_info","jmx_+","java_lang_+"]`          | [Docker image](https://hub.docker.com/r/bitnami/jmx-exporter/) |
| kafka-connect-j9 | [Exporter Link](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["kafka_connect+","java_lang_+","java_lang_memorymanager_valid_j9+"]` | [Docker image](https://hub.docker.com/r/bitnami/jmx-exporter/) |
| kafka-connect    | [Exporter Link](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["kafka_connect+","java_lang_+","java_lang_garbagecollector_collectiontime_g1_young_generation"]` | [Docker image](https://hub.docker.com/r/bitnami/jmx-exporter/) |
| kafka-jmx        | [Exporter Link](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["kafka_server_+","kafka_network_+","java_lang_+"]`         | [Docker image](https://hub.docker.com/r/bitnami/jmx-exporter/) |
| kafka-rest-j9    | [Exporter Link](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["kafka_rest+","java_lang_+","java_lang_memorymanager_valid_j9+"]` | [Docker image](https://hub.docker.com/r/bitnami/jmx-exporter/) |
| kafka-rest       | [Exporter Link](https://hub.docker.com/r/bitnami/jmx-exporter) | `["kafka_rest+","java_lang_+","java_lang_garbagecollector_collectiontime_g1_young_generation"]` | [Docker image](https://hub.docker.com/r/bitnami/jmx-exporter/) |
| kafka            | [Exporter Link](https://hub.docker.com/r/danielqsj/kafka-exporter/dockerfile) | `["kafka_topic_+"]`                                          | [Docker image](https://hub.docker.com/r/bitnami/jmx-exporter/) |
| linux            | [Exporter Link](https://github.com/prometheus/node_exporter) | `["node_cpu_+","node_disk_+","node_procs_+"]`                | [Docker image](https://hub.docker.com/r/prom/node-exporter/) |
| mongod           | [Exporter Link](https://github.com/dcu/mongodb_exporter)     | `["mongodb_+"]`                                              | Docker image                                                 |
| mysql            | [Exporter Link](https://github.com/prometheus/mysqld_exporter/blob/master/README.md) | `["mysql_global_+","mysql_version_+"]`                       | [Docker image](https://hub.docker.com/r/prom/mysqld-exporter/) |
| nginx            | [Exporter Link](https://github.com/nginxinc/nginx-prometheus-exporter/blob/master/README.md) | `["nginx_+"]`                                                | [Docker image](https://hub.docker.com/r/nginx/nginx-prometheus-exporter) |
| nodejs           | No exporter. Using code instrumentation                      | `["nodejs_+"]`                                               |                                                              |
| postgres         | [Exporter Link](https://github.com/prometheus-community/postgres_exporter/blob/master/README.md) | `"pg_stat_+"`                                                | [Docker image](https://hub.docker.com/r/prometheuscommunity/postgres-exporter) |
| zookeeper-jmx    | [Exporter Link](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["zookeeper_+","java_lang_"]`                               | [Docker image](https://hub.docker.com/r/bitnami/jmx-exporter/) |