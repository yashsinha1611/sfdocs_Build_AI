---
sidebar_position: 3 
---
# Monitor Java Application in Kubernetes

## Standard Deployment

### Prerequisite

1. Install [Sftrace-agent](https://github.com/snappyflow/apm-agent/releases/download/latest/sftrace-agent.tar.gz) to start tracing for an application running in Kubernetes.
2. Make sure that the project and application are created in the SnappyFlow server. [Click here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to create a project and an application in SnappyFlow. 
3. `sfTrace` agent has to run as `initContainer` in the application pod. 

### Configuration

1. Add the below configuration to add the `sfTrace` agent as `initContainer` in the application container.  

   ```yaml
   # deployment.yaml
     initContainers: 
     - name: sftrace-java-agent 
       image: busybox 
       command: 
       - sh 
       - -c 
       - -x 
       - wget -O /sfagent/sftrace-agent.tar.gz https://github.com/snappyflow/apm-agent/releases/download/latest/sftrace-agent.tar.gz && cd /sfagent && tar -xvzf sftrace-agent.tar.gz && rm sftrace-agent.tar.gz 
       volumeMounts: 
       - mountPath: /sfagent 
         name: sftrace-agent 
   ```

2. Provide the `SFTRACE_PROFILE_KEY`, `SFTRACE_PROFILE_KEY`, `SFTRACE_PROJECT_NAME` , `SFTRACE_APP_NAME` and the `SFTRACE_AGENT` path.

   ```yaml
   env: 
   - name: SFTRACE_PROFILE_KEY 
      value: <profile-key> 
   - name: SFTRACE_SERVICE_NAME 
      value: <service-name>
   - name: SFTRACE_PROJECT_NAME 
      value: <project-name> 
   - name: SFTRACE_APP_NAME 
     value: <app-name> 
   - name: SFTRACE_AGENT 
     value: -javaagent:/sfagent/sftrace/java/sftrace-java-agent.jar 
   - name: ELASTIC_APM_DISABLE_INSTRUMENTATIONS 
     value: spring-mvc 
   - name: ELASTIC_APM_USE_PATH_AS_TRANSACTION_NAME 
     value: "true" 
   ```

3. Add the below-given `command` section to your application container.

   ```yaml
   containers: 
     - name: sample-java-app 
       image: imagename:tag 
       command: 
       - sh 
       -c 
       - java $(SFTRACE_AGENT) -jar jarname 
   ```

4. In the `volumeMounts` section of your application container add the `mount path: /sfagent` and `name: sftrace-agent`. In the volumes section, add the `sftrace-agent` volume mounts.

   ```yaml
   containers: 
     - name: sample-java-app 
       image: imagename:tag 
       volumeMounts: 
         - mountPath: /sfagent 
           name: sftrace-agent 
   volumes: 
     - name: sftrace-agent 
       emptyDir: {} 
   ```

### Sample Deployment file

[Click here](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/java_k8s_standalone_deployment.yaml)  to view the sample application `deployment yaml` file for which the configuration mentioned in the above sections enables the tracing feature.

### View Trace Data

Follow the below steps to view the trace data.

1. Go to the **Application** tab in SnappyFlow and navigate  to your **Project** > **Application** > **Dashboard**.
2. In the dashboard window, navigate to the **Tracing** section and click the `View Transactions` button.

<img src="/img/tracing/image_2.png" />

3. You can view the traces in the **Aggregate** and the **Real Time** tabs.

<img src="/img/tracing/image_1.png" />

<img src="/img/tracing/image_3.png" />

## Helm Chart Deployment 

### Prerequisite

1. Install [Sftrace-agent](https://github.com/snappyflow/apm-agent/releases/download/latest/sftrace-agent.tar.gz) o start tracing for an application running in Kubernetes using helm chart deployment.
2. Make sure that the project and application are created in the SnappyFlow server. [Click here](https://stage-docs.snappyflow.io/docs/RUM/agent_installation/others#create-a-project-in-snappyflow-portal) to create a project and an application in SnappyFlow. 
3. `sfTrace` agent has to run as `initContainer` in the application pod.

### Configuration

1. Add the `SF_APP_NAME`, `SF_PROJECT_NAME`, and `SF_PROFILE_KEY`  in the `values.yaml` file of the helm chart.

     ```yaml
   #values.yaml
   global:
   # update the sfappname, sfprojectname and key with the proper values
     sfappname: <app-name>
     sfprojectname: <project-name>
     key: <profile-key>
   
   replicaCount: 1
   image:
     repository: spring-app
     pullPolicy: IfNotPresent
     tag: "latest"
   ```

2. Add the below configuration in the `deployment .yaml` file to add the `sfTrace` agent as an `initContainers` in the application container.  

   ```yaml
   # deployment.yaml
     initContainers: 
     - name: sftrace-java-agent 
       image: busybox 
       command: 
       - sh 
       - -c 
       - -x 
       - wget -O /sfagent/sftrace-agent.tar.gz https://github.com/snappyflow/apm-agent/releases/download/latest/sftrace-agent.tar.gz && cd /sfagent && tar -xvzf sftrace-agent.tar.gz && rm sftrace-agent.tar.gz 
        volumeMounts: 
        - mountPath: /sfagent 
          name: sftrace-agent 
   ```

3. Provide the `SFTRACE_PROFILE_KEY`, `SFTRACE_PROFILE_KEY`,      `SFTRACE_PROJECT_NAME` , `SFTRACE_APP_NAME` and the `SFTRACE_AGENT` path.

   ```yaml
   env: 
   - name: SFTRACE_PROFILE_KEY 
     value: {{ .Values.global.key }} 
   - name: SFTRACE_SERVICE_NAME 
     value: <service-name>
   - name: SFTRACE_PROJECT_NAME 
     value: {{ .Values.global.sfprojectname }} 
   - name: SFTRACE_APP_NAME 
     value: {{ .Values.global.sfappname }} 
   - name: SFTRACE_AGENT 
     value: -javaagent:/sfagent/sftrace/java/sftrace-java-agent.jar 
   - name: ELASTIC_APM_DISABLE_INSTRUMENTATIONS 
     value: spring-mvc 
   - name: ELASTIC_APM_USE_PATH_AS_TRANSACTION_NAME 
     value: "true" 
   ```

4. Add the below-given `command` section to your application container.

   ```yaml
   containers: 
     - name: sample-java-app 
       image: imagename:tag 
       command: 
       - sh 
       - -c 
       - java $(SFTRACE_AGENT) -jar jarname 
   ```

5. In the `volumeMounts` section of your application container add the `mountPath: /sfagent` and `name: sftrace-agent`.  In the volumes section, add the `sftrace-agent` volume mounts.

   ```yaml
   containers: 
     - name: sample-java-app 
       image: imagename:tag 
       volumeMounts: 
         - mountPath: /sfagent 
           name: sftrace-agent 
   volumes: 
     - name: sftrace-agent 
       emptyDir: {} 
   ```

### Sample Helm chart deployment

**Update values.yaml**: 

Refer to  the `SFTRACE-CONFIG` section in the [java_k8s_with_helm_chart_values.yaml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/java_k8s_with_helm_chart_values.yaml)  file to configure agent-specific properties.

**Update deployment.yam**l: 

Refer to the `SFTRACE-CONFIG` section in the  [java_k8s_with_helm_chart_deployment.yaml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/java_k8s_with_helm_chart_deployment.yaml)  file and copy the trace agent to the container and start the container by attaching the agent.

### View Trace Data

Follow the below steps to view the trace data.

1. Go to the **Application** tab in SnappyFlow and navigate  to your **Project** > **Application** > **Dashboard**.

<img src="/img/tracing/image_2.png" />

2. In the dashboard window, navigate to the **Tracing** section and click the `View Transactions` button.

3. You can view the traces in the **Aggregate** and the **Real Time** tabs.

<img src="/img/tracing/image_1.png" />

<img src="/img/tracing/image_3.png" />

