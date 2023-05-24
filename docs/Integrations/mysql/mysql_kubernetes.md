# Monitor MySQL DB in Kubernetes

MySQL database  running in Kubernetes can be monitored using two approaches:

- [sfKubeAgent](/docs/Integrations/kubernetes/sfkubeagent_installation) as a sidecar container
- [Prometheus exporter](/docs/Integrations/kubernetes/prometheus_exporter)

## Get Started

### Create a new user

For MySQL versions 5.6 and 5.7, create username and password using the following command:

```sql
 create user 'username'@'%' identified by 'uniquepassword';
```

For MySQL versions 8.0 and greater, create username and password with the following command:

```sql
create user 'username'@'%' identified with mysql_native_password by 'uniquepassword';
```

:::note

Use the username and password created in this section while setting access permission and configuration.

:::

### Set Access Permissions

Use the following command to set access permission. 

```sql
  grant select on performance_schema.* to 'username';
```

:::note

By default, the root user has the above mentioned permission.

:::

## Monitor MySQL with sfKubeAgent

### Configurations

In this approach, sfKubeAgent runs as a side-car inside the MySQL pod. 

The example given below shows the config map of the `sfKubeAgent` container.

#### Configuration Map for MySQL

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

#### Configuration Map for MySQL sfKubeAgent

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



#### Configure MySQL Pod Using YAML

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

### View Database Metrics and Logs

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.

:::note

Once the MySQL configuration settings are done, the MySQL plugin will be automatically detected within the Metrics section. However, if the plugin is not detected, you can import **template** = `MySQL` to view the corresponding metrics.

:::<br/>

2. MySQL database **Metrics** and **Slow Query Logs** are displayed in the **Metrics** section of the dashboard.

   

3. MySQL database **General Logs** are displayed in the **Log Management** section of the dashboard.

   

4. To access the unprocessed data gathered from the plugins, navigate to the **Browse data** section and select the following data: `Index`, `Instance`, `Plugin`, and `Document Type`.

#### Template Details

| **Template** | **Plugin**      | **Document Type**                                |
| ------------ | --------------- | ------------------------------------------------ |
| MySQL        | mysql           | databaseDetails, serverDetails, and tableDetails |
| MySQL        | mysql-slowquery | SlowQueryLogs, serverDetails, and tableDetails   |

## Monitor MySQL with Prometheus

### Prerequisites

Prometheus exporter has to be deployed as a side-car in the application container and the exporter port has to be accessible to the sfPod. Refer to [Prometheus Exporter](/docs/Integrations/kubernetes/prometheus_exporter) overview to understand how SnappyFlow monitors using Prometheus exporters.

### Configurations

#### Configure MySQL Service Using YAML

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

#### Configure MySQL Pod Using YAML

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

### View Database Metrics and Logs

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application** > **Dashboard**.

:::note

Once the MySQL configuration settings are done, the MySQL plugin will be automatically detected within the Metrics section. However, if the plugin is not detected, you can import **template** = `MySQL` or  to view the corresponding metrics.

::: <br/>

2. MySQL database **Metrics** and **Slow Query Logs** are displayed in the **Metrics** section of the dashboard.

   

3. MySQL database **General Logs** are displayed in the **Log Management** section of the dashboard.

   

4. To access the unprocessed data gathered from the plugins, navigate to the **Browse data** section and select the following data: `Index`, `Instance`, `Plugin`, and `Document Type`.

#### Template Details

| **Template**         | **Plugin**      | **Document Type**                                |
| -------------------- | --------------- | ------------------------------------------------ |
| MySQL_Kube_Prom | kube-prom-mysql | databaseDetails, serverDetails, and tableDetails |
| MySQL | mysql-slowquery | SlowQueryLogs, serverDetails, and tableDetails |

