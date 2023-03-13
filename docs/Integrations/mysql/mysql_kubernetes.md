# Monitor MySQL in Kubernetes

MySQL running in Kubernetes can be monitored in SnappyFlow using two approaches:

- [sfKubeAgent](/docs/Integrations/kubernetes/sfkubeagent_installation) as a sidecar container.
- [Prometheus exporter](/docs/Integrations/kubernetes/prometheus_exporter)

## Get Started

### Create a new user

For MySQL 5.6 or MySQL 5.7, create a user with the following command:

```sql
 create user 'username'@'%' identified by 'uniquepassword';
```

For MySQL 8.0 or greater, create a user with the following command:

```sql
create user 'username'@'%' identified with mysql_native_password by 'uniquepassword';
```

:::note

Use the username and password created in this section while setting access permission and configuration.

:::

### Set Access Permissions

Use the below code to set access permission. 

```sql
  grant select on performance_schema.* to 'username';
```

:::note

The root user has these permissions by default 

:::

## Monitor MySQL with sfKubeAgent

In this approach, sfKubeAgent runs as a side-car inside MySQL pod. The example below shows the config map for the sfKubeAgent container.

### Configuration Map for MySQL

```yaml
apiVersion: v1  
kind: ConfigMap  
metadata:  
  name: mysql-configmap  
data:  
  mysql.cnf: |  
    [mysqld]  
    show_compatibility_56 = On  
    query_cache_type = 1  
    query_cache_size = 16M  
    query_cache_limit = 1M  
    general_log_file = /var/log/mysql/mysql.log  
    general_log = 1  
    slow_query_log = 1  
    slow_query_log_file = /var/log/mysql/mysql-slow.log  
```

### Configuration Map for MySQL sfKubeAgent

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-sfkubeagent-configmap
data:
  config.yaml: |-
    key: <enter profile key> 
    metrics: 
        plugins: 
        - name: mysql 
          enabled: true 
          interval: 30 
          config: 
            host: "127.0.0.1" 
            password: "<enter password>" 
            user: "root" 
            documentsTypes: 
            - databaseDetails 
            - serverDetails 
            - tableDetails 
    logging: 
        plugins: 
        - name: mysql-general 
          enabled: true 
          config: 
            log_path: "/var/log/mysql/mysql.log, /var/log/mysql.log, /var/log/mysqld.log" 
        - name: mysql-error 
          enabled: true 
          config: 
            log_level: 
            - error 
            - warn 
            - note 
            log_path: "/var/log/mysql/error.log, /var/log/mysql/mysql-error.log, /var/log/mysqld.err" 
        - name: mysql-slowquery 
          enabled: true 
          config: 
            log_path: "/var/lib/mysql/ip-*slow.log, /var/log/mysql/mysql-slow.log"
```



### Configure MySQL Pod  Using YAML

```yaml
kind: Pod
apiVersion: v1
metadata:
  name: mysql-pod
  labels:
    snappyflow/appname: <app_name>
    snappyflow/projectname: <project_name>
spec:
  containers:
    - name: mysql-container
      image: "mysql:5.7.14"
      imagePullPolicy: IfNotPresent
      ports:
        - name: tcp
          containerPort: 3306
      env:
        - name: MYSQL_ROOT_PASSWORD
          value: <enter password>
        - name: MYSQL_ROOT_USER
          value: root
      volumeMounts:
        - name: varlog
          mountPath: /var/log/mysql
        - name: configmap-mysql
          mountPath: /etc/mysql/conf.d
    # Snappyflow's sfkubeagent container
    - name: sfagent-container
      image: snappyflowml/sfagent:latest
      imagePullPolicy: Always
      command:
        - /app/sfagent
        - -enable-console-log
      env:
        - name: APP_NAME
          value: <app_name>
        - name: PROJECT_NAME
          value: <project_name>
      volumeMounts:
        - name: configmap-sfkubeagent-mysql
          mountPath: /opt/sfagent/config.yaml
          subPath: config.yaml
        - name: varlog
          mountPath: /var/log/mysql
  volumes:
    - name: configmap-mysql
      configMap:
        name: mysql-configmap
    - name: configmap-sfkubeagent-mysql
      configMap:
        name: mysql-sfkubeagent-configmap
    - name: varlog
      emptyDir: {}
```

### View Metrics and Logs

1. Login into SnappyFlow.

2. Navigate to the **Application** tab > **Project** > **Application** and click the **Dashboard** icon.

3. Click the **tab menu** `...` icon on the **Metric** tab.

4. Select the **Import from template** option.

   <img src="/img/integration/mysql/image_5.png" />

5. In the **Import to Metrics Panes** window, select **Filter By**: *`Standard`*, **Template Name**: *`MySQL`*

6. Click the `Save` button.

#### General logs 

<img src="/img/integration/mysql/image_2.png" />

To view general logs, navigate to your ***Application's dashboard*** > ***Log management*** > ***Primary storage***. In the **Primary Storage** window, set the **Log Type** to a general log as per the requirement.

#### Slow query logs

<img src="/img/integration/mysql/image_3.png" />

To view slow query logs, navigate to ***Application's dashboard*** > ***Metrics*** > ***Slow Queries***.

#### Metrics

1. To view database metrics, navigate to ***Application's dashboard*** > ***Browse Data***.
2. In the **Browse Data** window, set the following filters:
   - **Index**: Metrics
   - **Instance**: Select your instance
   - **Plugin**: MySQL, mysql-slowquery (For slow query logs)
   - **Document type**: serverDetails, databaseDetails, tableDetails, SlowQueryLogs (For slow query logs)

## MySQL monitoring with Prometheus

Refer to [Prometheus Exporter](/docs/Integrations/kubernetes/prometheus_exporter) overview to understand how SnappyFlow monitors using Prometheus exporters.

### Prerequisites

Prometheus exporter is deployed as a side-car in the application container and the exporter port will be accessible to the sfPod.

### Configure MySQL Service Using YAML

```yaml
apiVersion: v1 
kind: Service 
metadata: 
  labels: 
   snappyflow/appname: <app_name> 
   snappyflow/projectname: <project_name> 
   snappyflow/component: mysql 
  name: mysql-prom-service 
spec: 
  ports: 
  - name: mysql 
    port: 3306 
    protocol: TCP 
    targetPort: mysql 
  - name: mysql-exporter 
    port: 9104 
    protocol: TCP 
    targetPort: mysql-exporter 
  selector: 
    app: <app_name> 
  sessionAffinity: None 
  type: ClusterIP 
```

### Configure MySQL Pod Using YAML

```yaml
kind: Pod 
apiVersion: v1 
metadata: 
 name: mysql-prometheus-pod 
 labels: 
  snappyflow/appname: <app-name> 
  snappyflow/projectname: <project-name> 
  snappyflow/component: mysql 
spec: 
 containers: 
 - name: mysql-container 
   image: "mysql:5.7.14" 
   imagePullPolicy: IfNotPresent 
   ports: 
   - name: tcp 
     containerPort: 3306 
   env: 
   - name: MYSQL_ROOT_PASSWORD 
     value: <password> 
   - name: MYSQL_ROOT_USER 
     value: root 
   volumeMounts: 
     - name: varlog 
       mountPath: /var/log/mysql 
     - name: configmap-mysql 
       mountPath: /etc/mysql/conf.d 
 # Prometheus exporter 
 - name: mysql-exporter 
   image: prom/mysqld-exporter:v0.10.0 
   imagePullPolicy: Always 
   ports: 
   - name: mysql-exporter 
     containerPort: 9104 
   command: 
     - sh 
     - -c 
     - DATA_SOURCE_NAME="root:$MYSQL_ROOT_PASSWORD@(localhost:3306)/" /bin/mysqld_exporter 
   env: 
     - name: MYSQL_ROOT_PASSWORD 
       value: <password> 
 volumes: 
 - name: configmap-mysql 
   configMap: 
     name: mysql-configmap 
 - name: varlog 
   emptyDir: {} 
```

### View Metrics and Logs

1. Navigate to the **Application** tab > **Project** > **Application** and click the **Dashboard** icon.

2. Click the **tab menu** `...` icon on the **Metric** tab.

3. Select the **Import from template** option.

   <img src="/img/integration/mysql/image_6.png" />

4. In the **Import to Metrics Panes** window, select **Filter By**: *`Standard`*, **Template Name**: *`MySQL_Kube_Prom`*.

5. Click the `Save` button.

#### General logs 

<img src="/img/integration/mysql/image_2.png" />

To view general logs, navigate to your ***Application's dashboard*** > ***Log management*** > ***Primary storage***. In the **Primary Storage** window, set the **Log Type** to a general log as per the requirement.

#### Slow query logs

<img src="/img/integration/mysql/image_3.png" />

To view slow query logs, navigate to ***Application's dashboard*** > ***Metrics*** > ***Slow Queries***.

#### Metrics

1. To view database metrics, navigate to ***Application's dashboard*** > ***Browse Data***.
2. In the **Browse Data** window, set the following filters:
   - **Index**: Metrics
   - **Instance**: Select your instance
   - **Plugin**: kube-prom-mysql, mysql-slowquery (For slow query logs)
   - **Document type**: serverDetails, tableDetails, SlowQueryLogs (For slow query logs)
