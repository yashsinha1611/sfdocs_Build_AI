# Kubernetes Monitoring with sfPod 

## sfPod overview

sfPod is a collector that is installed on Kubernetes and runs as a DaemonSet on each worker node. It monitors the following elements of a Kubernetes environment: 

- Kubernetes metrics 
  - Cluster metrics 
  - Host metrics 
  - Pod metrics 
  - Container metrics 
  - Events 
  - Kubernetes services health– Kubelet, Kube-Proxy, API Server, Controller Manager, Core DNS 

- Kubernetes cluster logs 
- Poll Prometheus Exporters running on application pods 
- Pod Application Logs 

## sfPod installation

Below is short video explaining the sfPOD installation steps

<iframe title="sfPOD installation" src="https://www.youtube.com/embed/Q4BiVR2nOn4?rel=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" allowtransparency="true"></iframe>

### Step 1: Create a Cloud profile 

Create a cloud profile in SnappyFlow (or use an existing profile) and copy the profile key to use it while installing the sfPod in your cluster. 

### Step 2: Add Snappyflow helm chart 

Login to any node that has network connectivity to Kubernetes master node and run the following commands 

```shell
helm repo add snappyflow https://snappyflow.github.io/helm-charts 
helm repo list 
helm repo update 
```
### Step 3: Installing helm chart 



```shell
kubectl create namespace sfagent 
helm install  snappyflow/sfagent --set cluster_name=<my-cluster-name> --set config.key=<profile key> --name sfagent --namespace sfagent
```
:::note

`<my-cluster-name>` Replace with any name, Cluster is discovered by this name on the Snappyflow. 

`<profile key>` Replace with key copied from SnappyFlow. 

:::

### Restricted sfPod Configuration 

By default, sfPod is installed in a full configuration mode where it monitors all the elements. For a restricted configuration i.e. monitor only cluster logs or cluster metrics, user can use the flags outlined below: 

`--set config.cluster_monitoring=true/false`

If true monitoring of cluster metrics and cluster logs is enabled. If this field is made false, cluster monitoring is switched off and only Prometheus polling and Centralized Application Log Monitoring are enabled 

`--set config.node_agent.drop_cluster_logs=true =>`

If true, monitoring of Kubernetes cluster logs is disabled. 

`--set config.<doc_type>= false`

sfPod organizes data collected by plugin/documentType. Example of some of the document types that are collected by sfPod include – pod, node, container, cluster_stats etc. User can disable collection of a documentType using this configuration. The detailed list of document types can be reviewed in Browse Data page of a Kubernetes cluster

`--set config.app_view`

By default sfPod sends pod and container metrics of tagged pods (I,e pods that have projectName and appName tags) to both Cluster Index and Project Index leading to duplication of metric data. This feature is enabled to enhance correlation of Application and Infra data. This feature can be switched-off if the flag= true.
