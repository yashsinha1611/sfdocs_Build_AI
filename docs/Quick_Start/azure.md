# Azure

## Setting up SnappyFlow in your own environment

SnappyFlow can be consumed via SnappyFlow Cloud or it can be setup in your own environment such as on-prem data center or it can be setup in your cloud account in AWS and Azure.

:::caution

The below guide is applicable for setups with an **ingest rate below 500 GB/day**. For higher ingest rates, reach out to support@snappyflow.io

:::

## What you need to get started

- A SnappyFlow account. An account can be created [here](https://accounts.snappyflow.io).

- An approximate idea of your monthly ingest rates. The more accurate your data is, the better. This data is useful to ensure right sizing of your infrastructure

## Size your infrastructure using the sizing tool

SnappyFlow providesHead to accounts.snappyflow.io and use your SnappyFlow credentials to login. Once logged in, click on Pricing Calculator.

Choose your cloud platform and select the region where you want to deploy SnappyFlow. The region can be changed at a later stage too.<br/>
[https://accounts.snappyflow.io/myaccount/platform](https://accounts.snappyflow.io/myaccount/platform).

<img src="/img/snappyflow_self_hosted/azure_select.png" />

### Total ingest rate ###
In the configuration page, enter the total ingest rate for your stack. This ingest rate is the daily average sum of all logs, metrics and traces. The tool automatically assumes a breakup between logs, metrics and traces and you can also manually adjust this breakup to match your stack needs or leave it at its default value.

<img src="/img/snappyflow_self_hosted/ingest_configuration.png" />

### Data retention ###
The next input on data retention defines how long the ingested data is retained in a high-performance storage. A very high data retention can significantly increase storage requirements and costs. 

<img src="/img/snappyflow_self_hosted/data_retention.png" />

### Extended backup ###
Using extended backup is one way to reduce infrastructure costs. All metrics and logs stored in the backup can easily be retrieved for easy visualizations. This backup is available only for metrics and logs. Any ingested log or metric that ages beyond the primary data retention period defined in the previous section is backed up in a low cost storage service.
<img src="/img/snappyflow_self_hosted/extended_backup.png" />

### Backup for SnappyFlow account data ###
It is recommended to create a backup for SnappyFlow account data. This account data is stored in a dedicated database. This helps in quick recovery in case of cloud infrastructure failures. This database stores all account and configuration information. 

<img src="/img/snappyflow_self_hosted/azure_advanced.png" />

Click on Calculate Price button to continue.

### Cost summary ###

A summary of the infrastructure required and their cost is provided on the right. By default, a 1 year reserved instance pricing is taken. The tool also provides a list of alternate servers that can be choose either for better performance or for optimizing costs.

Based on the User requirement can change the OpenSearch instances type depends on the CPU and RAM usage

<img src="/img/snappyflow_self_hosted/azure_summary.png" />

## Download template to create SnappyFlow stack ##

Click on the Download button at the end of the infrastructure summary to get a template depending on the choice of cloud platform selected.

<img src="/img/snappyflow_self_hosted/azure_download.png" />

These templates are pre-loaded with the required stack information such as server types, quantities and help you quickly launch a SnappyFlow stack.

## Create SnappyFlow stack on Azure

:::caution

Before downloading the template for Azure, make sure your region has enough quotas for the server types provided in the sizing tool summary. If not, change server type in the sizing tool using drop down option.
:::

### Pre-Requisites ###

- Azure account
- **[Azure Virtual Network](azure#steps-for-creating-the-virtual-network)**
     - For local db deployment two subnets are required
     - For external db deployment two subnets and service endpoint SQL is required.
- **[Azure Storage Account](azure#steps-for-creating-the-storage-account)**

### Deployment Steps

##### Step1: Uploading the template

Log into Azure portal and Search for `Deploy a Custom template ` using the search bar on top and select Deploy a custom template.


<img src="/img/snappyflow_self_hosted/azure_upload.png" />

##### Step2: Click on build your own template in the editor

<img src="/img/snappyflow_self_hosted/azure_deploy.png" />


##### Step3: You will now see an editor and here you can click on the Load file to upload the template provided by SnappyFlow sizing tool

<img src="/img/snappyflow_self_hosted/azure_tool.png" />


##### Step4:  Click on Save to continue

 

### Configuration ###


1. Choose subscription, resource group, region, deployment, virtual network name, subnet name, GatewaysubnetName, database type, allowedIpAddr, System Assigned Identity, Admin username, Authentication type, admin key, storage accountName, Storage Account keys.
  - **Resource Group** – Select the existing resource Group which we created during Virtual network creation. 
  -	**Region** – Select the same region as of Virtual network.  
 -	**Virtual Network Name** – Provide the same name of the virtual network name / Instance name of the virtual network created on pre-requisites.
 -	**Subnet Name** – Provide the same name of the subnet name (default or newly created subnet name) created on pre-requisites.  
 -	**Gatewaysubnet name:** provide the same as the subnet which was created newly. 
 -	**Public Ipaddr** – Select public Ip address as true if need public Ip address for snappyflow VM
 -	**Allowed Ip Cidr** – Provide IP address range to allow to access snappyflow or keep as default (0.0.0.0/0) which gives provision to all to access snappyflow. 
 -	**System Assigned identity** – Select **True** which will assign owner role assignment
 -	**Admin Username** – Admin username for SSH Snappyflow server VM (Virtual Machine)
 -	**Admin Key**  – Key for SSH Snappyflow server VM 
Use `"ssh-keygen -t rsa -b 2048"` to generate your SSH key pairs, provide a public key here, and use the private key to ssh to VM or use the azure portal itself to create the public keys.
 -	**Storage Accounts Name** – Provide the same name of Azure Blob name created on pre-requisites. 
 -	**Storage Accounts Key** - Provide the same key of Azure Blob copied on pre-requisites.

  

<img src="/img/snappyflow_self_hosted/azure_key.png" />

2. Click review+create option and after successful validation click create button and wait until successful deployment. 

3. Once deployment gets completed, access the Snappyflow server VM and click on the outputs in the deployment page

<img src="/img/snappyflow_self_hosted/azure_ms_template.png" />

4. Copy the snappyflow server url and open in browser to access the UI.

<img src="/img/snappyflow_self_hosted/azure_access_UI.png" /> 

5. Provide the Snappyflow UI username/password: admin/admin and wait for OpenSearch initialization to get complete. 

<img src="/img/snappyflow_self_hosted/azure_install.png" />

6. Once installation gets complete, you can access all features available in SnappyFlow. 

<img src="/img/snappyflow_self_hosted/azure_login.png" />

### Steps for creating the virtual network

 1.	Search the virtual network in the azure account

 <img src="/img/snappyflow_self_hosted/azure_account.png" />

 2.	Click on create and provide the existing resource group or create a resource group name, virtual network name/instance name, and Region. Click Next. 
 3.	Provide IP address range and select the checkbox **Add IPV6 address space** if required. 

 <img src="/img/snappyflow_self_hosted/azure_address.png" />

 4.	In same window on below, we can either use default subnet or we can add new subnet (Click **add subnet** and provide IP address range alone) if required and click **Review + create**. 
 5.	Create the one more which subnet which will acts as the gateway.
 <img src="/img/snappyflow_self_hosted/azure_subnet.png" />
 <img src="/img/snappyflow_self_hosted/azure_address_2.png" />

 If you are using the database type as external db, required to add the server endpoints as sql in virtual network.

  <img src="/img/snappyflow_self_hosted/azure_service_endpoint.png" />
 

 ### Steps for creating the Storage Account

1.	[Click on the link](https://portal.azure.com/#create/Microsoft.StorageAccount) navigate to storage account. 
2.	Provide Resource group (same as virtual network resource group) details and storage account name. 
3.	Click the `“Review”` button and on successful validation, complete the creation. 

<img src="/img/snappyflow_self_hosted/azure_review.png" />

4. Once created go to created Azure blob and on the left side click the `“Access key”` option as below which is required during the deployment of snappyflow. Click show and copy the Access key and storage account for further usage.


<img src="/img/snappyflow_self_hosted/azure_accesskey.png" />
