---
sidebar_position: 3 
---

## ECS
### [**Fargate**](java#deploying-the-snappyflow-trace-agent)  
#### Deploying the SnappyFlow trace agent
If you are using the fargate type, add the following information to the existing task definition where your application docker container is running
1.	Go to the task definitions in ECS page
2.	Select your task definition
3.	Click on create new revision

4.	Under container definitions select the container in which your application docker container is running and it will open edit container window.
5.	In edit container window under the environment section add the below details
	
    - In the entry point text box provided the sh,-c
	- In the command text box add the below command which is highlighted

  ```shell
  mkdir /sfagent && wget -O /sfagent/sftrace-agent.tar.gz https://github.com/snappyflow/apm-agent/releases/download/latest/sftrace-agent.tar.gz && cd /sfagent && tar -xvzf sftrace-agent.tar.gz && java -javaagent:/sfagent/sftrace/java/sftrace-java-agent.jar -jar applicationjarfile.jar  
  ```
     - Add the environmental variables which is required to send the trace data to snappyflow server
     
    |  Key | Value  |
    | --- | --- |
    | ELASTIC_APM_USE_PATH_AS_TRANSACTION_NAME  | true |
    | ELASTIC.APM.CAPTURE_BODY |  all |
    | SFTRACE_APP_NAME | APP_NAME |
    | SFTRACE_PROFILE_KEY | Profile_key |
    | SFTRACE_PROJECT_NAME | Project_Name |
    |  SFTRACE_SERVICE_NAME| Service_Name |
    
    :::note
    Snappyflow trace agent s should not discover the new project, the values which you are providing like app name and project name must and should already be available in the snappyflow APM.
    :::note
    
    -  Click on update, it will close the edit container pop up.

6. Click on create, it will create the new revision for your task definition
7. Once the new revision is completed, follow the below steps to update your service in the cluster.

    - Navigate to the cluster
    - Select the cluster
    - Select the service
    - Click on the update service, it will open the update service page
    - Under the configure service select the task definition with latest revision
    - Click on the force new deployment
    - Click on the next step and finally click on the update service.
    - Once the tasks are running under the service, trigger the request in your application and you will see the traces in SnappyFlow APM

    <img src="/img/java/Setup_snappyflow_trace_agent2.PNG" /><br/>
