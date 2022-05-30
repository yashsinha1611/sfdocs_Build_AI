
# SnappyFlow sfPoller Setup In Azure 

## Launching sfPoller Instance 


1. Login to Azure portal. Goto marketplace and select SnappyFlow sfPoller at <a href="https://portal.azure.com/#create/maplelabsinc1623932715330.sfpollersfpoller"><u>azure portal</u></a>.
    <img src="/img/azure_1.png" alt="" />
2. Click create.
3. Create a new resource group.
4. Provide Virtual Machine name and select region.
5. Select the deployment size of the VM. (Recommended standard_B2s- 2 vcpu and 4GiB RAM).
6. Select generate new key pair option for SSH public key resource or use existing public key.
7. If you select generate new key pair option provide key pair names. 
8. Select all three ports (HTTP 80, HTTPS 443, SSH 22) in inbound ports which are mentioned in the image below. 
    <img src="/img/azure_2.png" alt="" />
9. Click on next and select OS disk type.
10. Click on next and in the Management tab enable the identity check box.
    <img src="/img/azure_3.png" alt="" />
11. (Optional) Add tags for sfpoller instance 
12. Click on review+create and click create. 
13. After successfully deploying of server follow the below steps. 
    - Navigate to the virtual machines and select the VM. 
    - Search for Identity and click on it.
    - Click on add role assignments.
    - Select scope as subscription and role as an owner. 
    <img src="/img/azure_4.png" alt="" />  
    - Click on save.
14. After completing the above steps, to access the sfPoller UI copy the public IP of VM and to login the username is admin, the password is a private IP address of the VM. 

### Configure sfPoller

1. Add Profile Key:

  Copy profile key from "Profiles" section under "Manage" tab of your SnappyFlow SaaS account or SnappyFlow server and save.

2. Add Cloud Account:

  Click cloud type and enter its details.

  (Optional) Add cloud metric plugins under "Plugins" tab if it is required to monitor account as well.

3. Create Project:

    - Go to Application tab
    - Click "Create project" and provide project name

4. Add Applications:

    - Add application by clicking add application button under "Actions" column (icon with + sign)
    - Users can either discover applications from cloud using resource tags or manually add application and endpoints
    - Click discover and provide tag keys for the account (If resources are tagged properly on the cloud, then Discovery feature discovers all end points)
    - Add endpoints after selection (by default all endpoints are visible)

5. After adding endpoint click the save button

6. Go to SnappyFlow dashboard (from where profile key was copied) and wait for sometime to get your applications discovered