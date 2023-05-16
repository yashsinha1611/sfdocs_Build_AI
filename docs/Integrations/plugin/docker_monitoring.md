# Monitor Docker Platform

Docker is an open platform for developing, shipping, and running applications. Docker provides the ability to package and run an application in a loosely isolated environment called a container. The container becomes the unit for distributing and testing your application.

## Docker monitoring

Docker running on linux can be monitored using Snappyflow sfagent. Refer the link for installation of sfagent https://docs.snappyflow.io/docs/Integrations/os/linux/sfagent_linux.

## Configuration 

Add the following configuration to the *config.yaml* file: 


```yaml 
key: <profile key> 
tags: 
  Name: <unique instance name or will be generated from IP> 
  appName: <add application name> 
  projectName: <add project name> 
metrics: 
  plugins: 
    - name: docker
      enabled: true 
      interval: 30
```



 ## Metrics list

##### CPU Statistics

| **Metric**            | **Description**                                              | **Unit**    |
| --------------------- | ------------------------------------------------------------ | :---------- |
| **systemUsage**       | Total System time consumed                                   | **Seconds** |
| **totalUsage**        | Total CPU time consumed                                      | **Seconds** |
| **usagePercent**      | CPU Usage in percentage                                      | **Percent** |
| **usageInKernelMode** | Time spent by tasks of the cgroup in kernel mode             | **Seconds** |
| **usageinUserMode**   | Time spent by tasks of the cgroup in user mode               | **Seconds** |
| **throttledPeriods**  | Number of periods when the container hits its throttling limit | **Count**   |
| **periods**           | Number  of periods with throttling active                    | **Count**   |
| **throttledTime**     | Aggregate time the container was throttled for in seconds    | **Seconds** |
| **systemTime**        | The CPU system time metric represents the percentage of time that CPU is executing system calls on behalf of processes. | **Seconds** |



  ##### Block IO Statistics

| **Metric**                       | **Description**           | **Unit**               |
| -------------------------------- | ------------------------- | ---------------------- |
| **ioServicedRecursiveSync**      | Count  of sync performed  | **Regardless of size** |
| **ioServicedRecursiveAsync**     | Count  of async performed | **Regardless of size** |
| **ioServicedRecursiveRead**      | Count  of read performed  | **Regardless of size** |
| **ioServicedRecursiveWrite**     | Count  of write performed | **Regardless of size** |
| **ioServiceBytesRecursiveSync**  | Count  of sync performed  | **Bytes**              |
| **ioServiceBytesRecursiveAsync** | Count  of sync performed  | **Bytes**              |
| **ioServiceBytesRecursiveRead**  | Count  of sync performed  | **Bytes**              |



  ##### Network Statistics

| **Metric**    | **Description**                 | **Unit**  |
| ------------- | ------------------------------- | --------- |
| **rxPackets** | Network packet count received   | **Count** |
| **txPackets** | Network packet count sent       | **count** |
| **rxErrors**  | Packets received with errors    | **Error** |
| **txError**   | Errors in packet transmission   | **Error** |
| **rxBytes**   | Network traffic volume received | **Bytes** |
| **txBytes**   | Network traffic volume sent     | **Bytes** |
| **rxDropped** | Packets dropped received        | **Error** |
| **txDropped** | Packets dropped sent            | **Error** |



##### Swarm Statistics

| **Metric**       | **Description**             | **Unit**   |
| ---------------- | --------------------------- | ---------- |
| **tasksDesired** | No of task desired          | **Count**  |
| **serviceName**  | Swarm service  service Name | **String** |
| **serviceMode**  | Swarm service  service Mode | **String** |
| **Serviced**     | Swarm service  service Id   | **String** |
| **tasksRunning** | No of task Running          | **Count**  |



##### Memory Statistics

| **Metric**                  | **Description**                                              | **Unit**  |
| --------------------------- | ------------------------------------------------------------ | --------- |
| **cache**                   | Cache memory reflects data stored on disk  that is currently cached | **Bytes** |
| **totalCache**              | Total cache memory reflects data stored on disk  that is currently cached | **Bytes** |
| **activeAnon**              | RSS itself can be  further decomposed into active            | **Bytes** |
| **totalActiveAnon**         | Total active anon                                            | **Bytes** |
| **inactiveAnon**            | RSS itself can be  further decomposed into inactive          | **Bytes** |
| **totalInactiveFile**       | Total inactive anon                                          | **Bytes** |
| **activeFile**              | Cache can be further  decomposed into active file            | **Bytes** |
| **totalActiveFile**         | Total active file                                            | **Bytes** |
| **inactiveFile**            | Cache can be further  decomposed into inactivefile           | **Bytes** |
| **totalInactiveFile**       | Total Inactive file                                          | **Bytes** |
| **unevictable**             | Unreclaimable memory  consumed by  userspace                 | **Bytes** |
| **totalUnevictable**        | Total unreclaimable memory consumed by userspace             | **Bytes** |
| **pgFault**                 | Segmentation fault                                           | **Bytes** |
| **pgpgOut**                 | Page out                                                     | **Bytes** |
| **pgpgIn**                  | Page in                                                      | **Bytes** |
| **totalPgpgout**            | Total page out                                               | **Bytes** |
| **totalPgfault**            | Total segmentation fault                                     | **Bytes** |
| **pgmajFault**              | segmentation faults                                          | **Bytes** |
| **totalPgmajFault**         | Fetching data from disk  instead of memory                   | **Bytes** |
| **writeback**               | Memory  usage of a container for write back                  | **Bytes** |
| **mappedFile**              | No of mapped files                                           | **Bytes** |
| **totalMappedFile**         | Total no of mapped files                                     | **Bytes** |
| **hierarchicalMemswLimit**  | Hierarchical Memory sw Limit                                 | **Bytes** |
| **hierarchicalMemoryLimit** | Hierarchical Memory Limit                                    | **Bytes** |
| **totalWriteback**          | Total no of writeback                                        | **Bytes** |
| **rss**                     | Non-cache  memory for a process                              | **Bytes** |
| **totalRss**                | Total  Non-cache memory for a process                        | **Bytes** |
| **rssHuge**                 | Resident set size huge                                       | **Bytes** |
| **totalRssHuge**            | Total resident set size huge                                 | **Bytes** |

:::note

Health status of docker is displayed as "unknown" if no healthcheck is added to the Docker file.

Enabling swarm will display the swarm statistics on the dashboard, else an empty box is displayed.
:::

**Follow the steps below to know how to enable:**

1. Add health check
2. Add swarm to the docker container

### Health Check 

A HEATHCHECK instruction determines the state of a Docker Container. It determines whether the Container is running in a normal state or not. It performs health checks at regular intervals. The initial state is starting and after a successful checkup, the state becomes healthy. If the test remains unsuccessful, it turns into an unhealthy state.

**Some options provided by the HEALTHCHECK instruction are:**

- --interval=: It determines the interval between 2 health check-ups. The default interval is the 30s.
- --timeout=: If the HEALTHCHECK command exceeds the specified duration, it is categorized as a failure. The default duration is the 30s.
- --retries=: If it reaches the specified number of retries, the state is unhealthy. The default number of retries is 3. 

Add the health check instruction with options and a command or a blank health check in the **Docker File** , refer the given example.

   ```
   HEALTHCHECK --interval=35s --timeout=4s CMD curl -f <protocol>://<IP>/ || exit 1
   EXPOSE <port>
   #Replace the protocol, IP and port as per requirements
   #Ex:  HEALTHCHECK --interval=35s --timeout=4s CMD curl -f https://localhost/ || exit 1
   	  EXPOSE 80
   ```


   OR 

 ```
   HEALTHCHECK NONE
 ```

   Re-build of docker is **required** after adding healthcheck in the docker file. Use the following command to build the docker.

   ```
   docker build
   ```

   

  ### Docker Swarm 

   Docker Swarm is an orchestration management tool that runs on Docker applications. It helps end-users in creating and deploying a cluster of Docker nodes. Each node of a Docker Swarm is a Docker daemon, and all Docker daemons interact using the Docker API. Docker Swarm can reschedule containers on node failures. Swarm node has a backup folder which we can use to restore the data onto a new Swarm. 

   **There are two types of nodes in Docker Swarm:**

   1. Manager node-Maintains cluster management tasks 
   
   2. Worker node-Receives and executes tasks from the manager node

**Steps to be followed to add swarm**

   1. Run the command 
   
      ```
      docker swarm init
      ```
   
   2. Follow the instruction from the docker swarm init
   
      ```
      docker swarm join –token “token”
      docker swarm join -token manager
      ```
   
      Docker swarm info details are shown only when a service is running.
      
      To add services, run the following command
      
      ```
      docker service create --name <service name> -p 80:80 httpd
      ```

​    


## Viewing data and dashboards

Data collected by plugins can be viewed in SnappyFlow’s browse data section      

-  Plugin = `docker` 
- documentType= `docker, containerStatic, containerUtils, containerNetwork, dockerSwarm ` 
- Dashboard template: `Docker`

#### Tested on Docker versions:

| **Docker version**                  | **Client API version**                                              | **Server API Version**  |
| --------------------------- | ------------------------------------------------------------ | --------- |
| 20.10.9                 | 1.41 | 1.41 |
| 19.03.9                 | 1.40 | 1.40 |
| 218.09.9                | 1.39 | 1.39 |