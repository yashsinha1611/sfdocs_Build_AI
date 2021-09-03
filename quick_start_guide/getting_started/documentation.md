# **Initial Setup** 

######  SnappyFlow is offered in 2 modes: 


<ul class="icon_list lang">
<li><a href="#header0"><img src="images/saas.png" > <div>Monitoring end-points send data securely to SnappyFlow SaaS</div></a></li>
<li><a href="#header1"><img src="images/onpremsaas.png"> <div>SnappyFlow is deployed within user’s account and all data is retained within the account itself. Features are identical to SaaS</div></a></li>
</ul>  


##  Setup SaaS Account 

- Go to [www.snappyflow.io](https://www.snappyflow.io/) 
- Register for free trial. A demo account will be created with pre-configured sample application 

- Request an upgrade to full trial by clicking on link provided in top bar. You will get an  email stating “your trial environment is ready” after the SnappyFlow  team approves your full trial request 
- Try out one of the simple exercises to familiarize yourself with the product 

- Monitor a Linux instance or an application on Linux instance 
- Monitor a Kubernetes cluster 
- Monitor a Windows instance 

- Trace an application 

##  Setup On-Prem SaaS 

-  On-Prem SaaS can be deployed within your public cloud accounts using scripts provided by SnappyFlow team 

- Please reach out to [support@snappyflow.io](mailto:support@snappyflow.io). A support engineer will understand your data ingest rates and provide an appropriately sized solution 

##  Important terminologies and concepts 

 

| Terminology      |                                                              |
| ---------------- | ------------------------------------------------------------ |
| sfAgent          | Lightweight agent installed on VMs to collect metrics, logs and tracing data.  Procedure for sfAgent on Linux  Procedure for sfAgent on Windows |
| sfPoller         | Poller appliance installed within user’s account and can used for the following functions: Monitor cloud services such as RDS, ELB, Lamba, ECS, Azure App Service etc. Monitor Databases Perform Synthetic Monitoring of APIs using postman like collections Stream logs from applications to sfPoller, apply parsing rules and forward logs to SnappyFlow Procedure for sfPoller setup |
| sfPod            | Daemon set installed on Kubernetes cluster and monitors the following elements: Host, Pod & Container metrics Resources such as deployments, Daemon Sets etc. Kubernetes core services metrics Cluster logs Monitor Prometheus exporters running on any of the application pods |
| sfKubeAgent      | sfAgent equivalent and installed as a side-car container within a Kubernetes  pod and can be configured to monitor metrics and logs of other  containers running on pods. Procedure for setting up sfKubeAgent |
| Profile Key      | Data sent by collectors to SnappyFlow need to have the correct profile key and tags to be allowed into SnappyFlow. Every user account has a unique system generated profile key. This key has to be copied by the user and pasted into the configuration file of sfAgent or within sfPoller’s UI |
| Tagging Approach | SnappyFlow mandates that all end-points should be assigned two tags - _tag_projectName and _tag_appName. These tags have to be added to configuration files of sfAgent or within sfPoller’s UI.  Pls see the video that explains how end-points should be organized hierarchically in SnappyFlow and how tags should be assigned |

## Start Monitoring

Try out one of the simple exercises to familiarize yourself with the product 

- Monitor a Linux instance or an application on Linux instance 

- Monitor a Kubernetes cluster 
- Monitor a Windows instance 
- Trace an application 

 

 

 

 

 

 

 

 

 