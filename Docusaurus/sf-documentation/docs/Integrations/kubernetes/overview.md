# Overview

SnappyFlow provides various approaches to monitor Kubernetes applications. Choose one to continue

##### [sfPod](/docs/Integrations/kubernetes/kubernetes_monitoring_with_sfPod)

sfPod is a collector that is installed on Kubernetes and runs as a DaemonSet on each worker node.It monitors the following elements of a Kubernetes environment: 

- Host, Pod & Container metrics
- Resources such as deployments, Daemon Sets etc.
- Kubernetes core services metrics
- Cluster logs
- Monitor Prometheus exporters running on any of the application pods

##### [sfKubeAgent](/docs/Integrations/kubernetes/sfkubeagent_installation)

sfKubeAgent is sfAgent packaged as a container and run as a sidecar within a Kubernetes application pod. It can be configured to collect both application metrics and logs similar to the way sfAgent does.

##### [Prometheus Integration](/docs/Integrations/kubernetes/prometheus_exporter)



##### [Centralized Logging](/docs/Integrations/kubernetes/centralized_logging_of_application_pod_logs)

