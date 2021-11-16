# Getting Started


SnappyFlow is offered in two modes - SaaS and On-Prem Saas 

<div class="panel_container row">
   <div class="innerText"> 
   <a href="#setup-saas-account">
        <h3>SaaS</h3>Monitored end-points send data securely to SnappyFlow SaaS.</a></div>
<div class="innerText"> 
  <a href="#setup-on-prem-saas">
  <h3>On-Prem SaaS </h3>SnappyFlow is deployed within user’s cloud account and all data is retained within the account. Features are identical to SaaS.</a></div>
</div>


##  Setup SaaS Account 

- Go to [www.snappyflow.io](https://www.snappyflow.io/) 
- Register for a free trial. A demo account will be created with a pre-configured sample application 
- Request an upgrade to Full Trial by clicking on the link provided in the top bar. You will get an  email stating “your trial environment is ready” once SnappyFlow team approves your trial request. 

##  Setup On-Prem SaaS 

-  On-Prem SaaS can be deployed within your public cloud accounts using scripts provided by SnappyFlow team 

- Please reach out to [support@snappyflow.io](mailto:support@snappyflow.io). A support engineer will understand your data ingest rates and provide an appropriately sized solution 

##  Important terminologies and concepts 

[sfAgent](#sfagent)

[sfPoller](#sfpoller)

[sfPod](#sfpod)

[sfKubeAgent](#sfkubeagent)

[Profile Key](#profile-key)

[Tagging Approach](#tagging-approach)

## sfAgent

Monitoring of applications running on VM or bare-metal requires installation of a lightweight agent called sfAgent. sfAgent provides following features: 

- Discovery of services
- Auto-recommendation of monitoring configuration based on discovered services
- Monitoring of various services based on specified configurations 
- Log parsing and collection
- Orchestration of tracing (check out [sfTracing](/docs/tracing/overview) for details)

**Installation procedures**

- For [sfAgent on Linux](/docs/integrations/os/linux/sfagent_linux) 
- For [sfAgent on Windows](/docs/integrations/os/windows/sfagent_windows)

## sfPoller

sfPoller is a poller appliance installed within user’s cloud account. It can be used to

- Monitor cloud services such as RDS, ELB, Lamba, ECS, Azure App Service etc. 

- Monitor Databases 
- Perform Synthetic Monitoring of APIs using postman like collections 
- Stream logs from applications to sfPoller, apply parsing rules and forward logs to SnappyFlow. 

[Procedure for sfPoller setup](/docs/quick_start/sfpoller_setup)

## sfPod

Daemon set installed on Kubernetes cluster and monitors the following elements: 

- Host, Pod & Container metrics 
- Resources such as deployments, Daemon Sets etc. 
- Kubernetes core services metrics 
- Cluster logs 
- Monitor Prometheus exporters running on any of the application pods 

[Procedure for sfPod setup](/docs/integrations/kubernetes/kubernetes_monitoring_with_sfPod)

## sfKubeAgent

sfAgent equivalent and installed as a side-car container within a Kubernetes  pod and can be configured to monitor metrics and logs of other  containers running on pods. 

[Procedure for setting up sfKubeAgent](/docs/integrations/kubernetes/sfkubeagent_installation)



## Profile Key

Every user account has a unique system generated profile key. Data sent by collectors to SnappyFlow need to have the correct profile key and tags to be allowed into SnappyFlow. This key has to be copied by the user and pasted into the configuration file of sfAgent or within sfPoller’s UI



## Tagging Approach

SnappyFlow mandates that all end-points should be assigned two tags - `_tag_projectName` and `_tag_appName`. These tags have to be added to configuration files of sfAgent or within sfPoller’s UI.  Pls see the video that explains how end-points should be organized hierarchically in SnappyFlow and how tags should be assigned





<iframe title="Key Concepts" src="https://www.snappyflow.io/assets/images/Key-Concepts-production.mp4" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" allowtransparency="true"  autoplay="0"  ></iframe>

## Let's Start Monitoring

Try out one of the simple exercises to familiarize yourself with the product 

##### [Monitor a Linux instance](/docs/integrations/os/linux/linux_os)

##### [Monitor a Kubernetes Cluster](/docs/integrations/kubernetes/kubernetes_monitoring_with_sfPod)

##### [Monitor a Windows instance](/docs/integrations/os/windows/sfagent_windows)

##### [Trace an application](/docs/Tracing/overview)



 

 

 

 

 

 