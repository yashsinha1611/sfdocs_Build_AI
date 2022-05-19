
# SnappyFlow sfPoller Setup In Azure 

## Launching sfPoller Instance 


1. Login to Azure portal. Goto market place and select SnappyFlow sfPoller<a href="https://portal.azure.com/#create/maplelabsinc1623932715330.sfpollersfpoller">click here</a>.
    <img src="/img/azure_1.png" alt="" />
2. Click create.
3. Create a new resource group.
4. Provide Virtual Machine name and select region.
5. Select deployment size of the VM. (Recommended configuration: 2 vCPU and 4GiB RAM).
6. Select generate new key pair option for SSH public key resource or use existing public key.
7. If you select generate new key pair option provide key pair names.
8. Select all three ports in inbound ports.
    <img src="/img/azure_2.png" alt="" />
9. Click on next and select OS disk type.
10. Click on next and in the Management tab enable identity check box.
    <img src="/img/azure_3.png" alt="" />
11. Click on review+create and click create.
12. After successfully deploying server follow the below steps.  
  a. Navigate to the virtual machines and select the VM. 
  b. Search for Identity and click on it.
  c. Click on add role assignments.
  d. Select scope as subscription and role as a owner. 
    <img src="/img/azure_4.png" alt="" />  
  e. Click on save.
13. After completing all the steps, access UI using public IP/private IP address of instance. Username is admin and the password is a private IP address. 
