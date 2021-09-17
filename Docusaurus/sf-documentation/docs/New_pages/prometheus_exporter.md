# Prometheus Exporter 

## Overview

- sfPod scans all pods in the namespaces that it has access to for specific labels **snappyflow/projectname** and **snappyflow/appname** 

- If a pod is tagged with SnappyFlow labels, sfPod then looks for standard Prometheus annotations 

  | Label                | Default  | Required                                                     |
  | -------------------- | -------- | ------------------------------------------------------------ |
  | prometheus.io/scrape | true     | true - the pod is considered for Prometheus scraping else it is excluded. |
  | prometheus.io/port   | empty    | Define a list of ports that sfPod will scan. sfPod will also apply the appropriate parser. If this label is empty, sfPod will scan all exposed container ports. |
  | prometheus.io/path   | /metrics | /metrics                                                     |

- If sfPod finds data on these ports, the data is scanned, parsed and sent to SnappyFlow 

## Monitoring pods using Prometheus exporter

1. Pre-requisites 
   1. Ensure sfPod is running and has access privileges to namespace in which application pod is running  
   2. Ensure sfPod has access to ports exposing Prometheus exporters  

2. Add Prometheus exporter container as a sidecar in the application pod. Pls see example below for Prometheus exporter pod. sfPod needs to access the Prometheus exporter on the exported port, which should be exposed in pod’s service 

   [PostgreSQL Statefulset YAML](https://github.com/snappyflow/website-artefacts/blob/master/yaml_deployments/prometheus/postgresql/statefullset.yaml) 

   [PostgreSQL Service YAML](https://github.com/snappyflow/website-artefacts/blob/master/yaml_deployments/prometheus/postgresql/service.yaml) 

   After setup of Prometheus exporter container, please verify connectivity using:

   ```properties
   curl service_ip: 9187 
   curl service_ip: 5432 
   ```

3. Add labels snappyflow/projectName and snappyflow/appName which are mandatory labels for SnappyFlow monitoring. The monitored endpoint is organized in the hierarchy project/ application inside SnappyFlow

   1. if the application pods are already running, use the following kubectl commands to tag your application pods with the appropriate tags:

      ```properties
      kubectl label pods <pod_name> snappyflow/projectname=<project_name> --namespace<appnamespace>
      kubectl label pods <pod_name> snappyflow/appname=<app_name> --namespace<appnamespace>
      ```

   2. To automatically apply the right labels for the new pods which get created due to various reasons such as upgrades, restarts etc, apply labels to pod templates. If you are using helm chart, a best practice is to define labels in values.yaml and use the label parameters in pod template section of Deployment, StatefulSet, DaemonSet or other Kubernetes controller.

   

 ## List of Prometheus exporters supported by sfPod

| Plugins          | Exporter Links                                               | service_discovery_regex                                      | Docker image                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| apache           | [apache_exporter/README.md at master · Lusitaniae/apache_exporter (github.com)](https://github.com/Lusitaniae/apache_exporter/blob/master/README.md) | `["apache_accesses_total","apache_+"]`                       | https://hub.docker.com/r/lusotycoon/apache-exporter/         |
| elasticsearch    | [https://hub.docker.com/r/justwatch/elasticsearch_exporter](https://github.com/prometheus-community/elasticsearch_exporter/blob/master/README.md) | `["elasticsearch_+"]`                                        | https://hub.docker.com/r/justwatch/elasticsearch_exporter    |
| haproxy          | [https://hub.docker.com/r/bitnami/jmx-exporter/](https://bitnami.com/stack/jmx-exporter) | `["haproxy_+"]`                                              | https://hub.docker.com/r/bitnami/jmx-exporter/               |
| jmx              | [https://hub.docker.com/r/bitnami/jmx-exporter/](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["jmx_exporter_build_info","jmx_+","java_lang_+"]`          | https://hub.docker.com/r/bitnami/jmx-exporter/               |
| kafka-connect-j9 | [https://hub.docker.com/r/bitnami/jmx-exporter/](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["kafka_connect+","java_lang_+","java_lang_memorymanager_valid_j9+"]` | [https://hub.docker.com/r/bitnami/jmx-exporter//](https://hub.docker.com/r/bitnami/jmx-exporter/) |
| kafka-connect    | [https://hub.docker.com/r/bitnami/jmx-exporter/](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["kafka_connect+","java_lang_+","java_lang_garbagecollector_collectiontime_g1_young_generation"]` | https://hub.docker.com/r/bitnami/jmx-exporter/               |
| kafka-jmx        | [https://hub.docker.com/r/bitnami/jmx-exporter/](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["kafka_server_+","kafka_network_+","java_lang_+"]`         | https://hub.docker.com/r/bitnami/jmx-exporter/               |
| kafka-rest-j9    | [https://hub.docker.com/r/bitnami/jmx-exporter/](https://github.com/prometheus/jmx_exporter/blob/master/README.md) | `["kafka_rest+","java_lang_+","java_lang_memorymanager_valid_j9+"]` | https://hub.docker.com/r/bitnami/jmx-exporter/               |
| kafka-rest       | https://hub.docker.com/r/bitnami/jmx-exporter/               | `["kafka_rest+","java_lang_+","java_lang_garbagecollector_collectiontime_g1_young_generation"]` | https://hub.docker.com/r/bitnami/jmx-exporter/               |
| kafka            | [https://hub.docker.com/r/bitnami/jmx-exporter/](https://hub.docker.com/r/danielqsj/kafka-exporter/dockerfile) | `["kafka_topic_+"]`                                          | https://hub.docker.com/r/bitnami/jmx-exporter/               |
| linux            | https://github.com/prometheus/node_exporter                  | `["node_cpu_+","node_disk_+","node_procs_+"]`                | https://hub.docker.com/r/prom/node-exporter/                 |
| mongod           | https://github.com/dcu/mongodb_exporter                      | `["mongodb_+"]`                                              |                                                              |
| mysql            | https://github.com/prometheus/mysqld_exporter/blob/master/README.md | `["mysql_global_+","mysql_version_+"]`                       | https://hub.docker.com/r/prom/mysqld-exporter/               |
| nginx            | https://github.com/nginxinc/nginx-prometheus-exporter/blob/master/README.md | `["nginx_+"]`                                                | https://hub.docker.com/r/nginx/nginx-prometheus-exporter     |
| nodejs           | No exporter. Using code instrumentation                      | `["nodejs_+"]`                                               |                                                              |
| postgres         | https://github.com/prometheus-community/postgres_exporter/blob/master/README.md | `"pg_stat_+"`                                                | [https://hub.docker.com/r/prometheuscommunity/postgres-exporter](https://hub.docker.com/r/prometheuscommunity/postgres-exporter/tags?page=1&ordering=last_updated) |
| zookeeper-jmx    | https://github.com/prometheus/jmx_exporter/blob/master/README.md | `["zookeeper_+","java_lang_"]`                               | https://hub.docker.com/r/bitnami/jmx-exporter/               |