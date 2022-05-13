#  Configuration Update Feature (Linux & Windows) 

## Overview

Agent Configuration update feature is used to update the configuration in multiple instances at a time without login into each instance. From UI, users can update the config file. 

### Prerequisite

1. sfAgent version should be more than v.0.11.21 in Linux
2. sfAgent version should be more than v.0.0.170 in Windows


### To upgrade the Linux agent to the latest version  

   ```json
    wget https://raw.githubusercontent.com/snappyflow/apm-agent/master/install.sh -O install.sh  
    chmod +x install.sh   
    sudo ./install.sh --upgrade 
   ```
### To upgrade the windows agent to the latest version  
Refer the following link
https://docs.snappyflow.io/docs/Integrations/os/windows/sfagent_windows

### Using the Configuration update feature user can update the below files 

1. config.yaml file 
2. custom_logging_plugins.yaml 
3. custom_scripts.lua

### Below are the options available to update the above files 

1. Plugin config update  
   To add/remove or update the plugins and logs configuration 

2. Profile key update   
   To update the profile key  

3. Tag Update   
   To update the tags (Name, appName, projectName) 

In Tag update again contain three options. 

1. Replace all tags  

    This option will replace all instance tags with applied bundle config tags (Name, appName, tagName are mandatory tags).    
2. Insert/Update tags 

    - If a tag is already present in instance config and in bundle config, the bundle config file overrides the existing tags. 
    - If a tag is present in bundle config and not present in instance config, the tag which is present in bundle config will be added as a new tag. 
    - If a tag is present in instance config and not present in bundle config, the tag is retained from instance config. 
    - If the user wants to update only appName and projectName,  the user must remove the Name tag from the config file and upload it. The name field will be retained from the existing config file. 
    - Users can also add custom tags. 

3. Delete Tags: 

    This will remove the custom tags from the configuration file, but the tags that which user wants to delete should be present in both bundle config and instance config. 
    <img src="/img/delete_tag.png" />

### Steps to apply agent configuration bundle 

1. **Collect Agent configuration bundle from UI.** 

    - Navigate to the inventory page. 
    - Click on the configuration tab 
    - Click on collect agent configuration and it will show the downloaded collection. 
    - Download the configuration from UI by clicking the download icon under the action tab 
    <img src="/img/configuration_tab.png" />

 2. **To edit the download bundle, follow the steps below.**

    - It is preferred to use third-party software 7zip to edit the bundle. 
    - Open the tar file using 7zip software and click on tar file.  
      <img src="/img/7zip.png" /> 

    - It will show the list of files available and edit the file that you want and save. 
    - After saving close the editor, it will show the prompt dialog box to update, and click on ok. 
      <img src="/img/saving_close.png" /> 

3. **To Add the downloaded configuration file, follow the below steps.** 

    - Click on three dots under the action tab on the Application Page. 
    - Select agent configuration option 
      <img src="/img/agent_configuration.png" /> 
    - Click on add new bundle option. 
    - Upload the bundle which you downloaded from the inventory page and provide the name and description. 
    - Click on apply. 
 
4. **To Apply the added bundle**

    Config bundle apply can be done in two ways 

    **a. From inventory page** 

    Using this user can apply a bundle for a single instance only at a time. 
    
     **Steps:**
     - Navigate to the inventory page 
     - Click on the configuration tab and select apply configuration. 
     - The user must select what changes are needed to apply to the existing config. 
       <img src="/img/existing_config.png" /> 
     - After applying the bundle if it is a success status shows the applied, its fail status shows Error along with reason. 
       <img src="/img/fail_status.png" /> 

    **b. From agent configuration dialogue box.**
      
      &nbsp;&nbsp;&nbsp;&nbsp;Using this user can apply a bundle for multiple instances under a single application.

    **Steps:** 
    - Click on three dots under the action tab on the Application page. 
    -  Click on apply. 
    -  Users must select what changes need to apply to the existing config. 
    -  After applying the bundle if it is a success status shows the applied, its fail status shows Error along with reason. 



### Troubleshoot Documentation 


 | **Error Message/Status** | **What does it mean? When this occurs**       | **What user actions take next**       |
| ------------- | ---------------------------- |---------------------------- |
|  Mapping values are not allowed in this context  |  Might be the wrong indentation added in the config file  | Check the config file for proper indentation.  |
| Execution time out try again   |  It might be the command server not sending the response to APM.  | Check whether the agent is running or not  |
|  Invalid config file, expected Tag(s) are not provided: Name, appName, projectName  |  Occurred because any one of the tags is missing in the tag section in the config file.  | To update the profile key    |