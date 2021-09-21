# Getting Started
SnappyFlow is offered in two modes - SaaS and On-Prem Saas 


<div class="panel_container row">
   <div class="innerText"> 
   <a href="#setup-saas-account">
        <img src="/img/saas.png" /> 
        <div>Monitored end-points send data securely to SnappyFlow SaaS.</div>
        </a>
   </div>
  <div class="innerText"> 
  <a href="#setup-on-prem-saas">
    <img src="/img/onpremsaas.png"/> 
    <div>SnappyFlow is deployed within user’s cloud account and all data is retained within the account. Features are identical to SaaS.</div>
    </a>
  </div> 
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

It is a lightweight agent installed on VMs to collect metrics, logs and tracing data.  

**Installation procedures**

- For [sfAgent on Linux](/docs/sfAgent_Linux/sfAgent_installation_in_Linux) 
- For [sfAgent on Windows](/docs/New_pages/monitoring_windows_instances)

## sfPoller

Poller appliance is installed within user’s cloud account and can be used to

- Monitor cloud services such as RDS, ELB, Lamba, ECS, Azure App Service etc. 
- Monitor Databases 
- Perform Synthetic Monitoring of APIs using postman like collections 
- Stream logs from applications to sfPoller, apply parsing rules and forward logs to SnappyFlow. 

[Procedure for sfPoller setup](/docs/New_pages/sfpoller_setup)

## sfPod

Daemon set installed on Kubernetes cluster and monitors the following elements: 

- Host, Pod & Container metrics 
- Resources such as deployments, Daemon Sets etc. 
- Kubernetes core services metrics 
- Cluster logs 
- Monitor Prometheus exporters running on any of the application pods 

[Procedure for sfPod setup](http://localhost:3000/docs/New_pages/kubernetes_monitoring_with_sfPod)

## sfKubeAgent

sfAgent equivalent and installed as a side-car container within a Kubernetes  pod and can be configured to monitor metrics and logs of other  containers running on pods. 

[Procedure for setting up sfKubeAgent](http://localhost:3000/docs/New_pages/sfkubeagent_installation)



## Profile Key

Every user account has a unique system generated profile key. Data sent by collectors to SnappyFlow need to have the correct profile key and tags to be allowed into SnappyFlow. This key has to be copied by the user and pasted into the configuration file of sfAgent or within sfPoller’s UI



## Tagging Approach

SnappyFlow mandates that all end-points should be assigned two tags - _tag_projectName and _tag_appName. These tags have to be added to configuration files of sfAgent or within sfPoller’s UI.  Pls see the video that explains how end-points should be organized hierarchically in SnappyFlow and how tags should be assigned





<iframe src="https://www.snappyflow.io/assets/images/Key-Concepts-production.mp4" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" allowtransparency="true" ></iframe>

## Let's Start Monitoring

Try out one of the simple exercises to familiarize yourself with the product 

<h2 class="show_toc_h2"><a href="http://localhost:3000/docs/sfAgent_Linux/sfAgent_installation_in_Linux">Monitor a Linux instance</a></h2>

<h2 class="show_toc_h2"><a href="http://localhost:3000/docs/New_pages/kubernetes_monitoring_with_sfPod">Monitor a Kubernetes Cluster</a></h2>

<h2 class="show_toc_h2"><a href="http://localhost:3000/docs/New_pages/monitoring_windows_instances">Monitor a Windows instance</a></h2>

<h2 class="show_toc_h2"><a href="http://localhost:3000/docs/Tracing/overview">Trace an application</a></h2>



 

 

 

 

 

 