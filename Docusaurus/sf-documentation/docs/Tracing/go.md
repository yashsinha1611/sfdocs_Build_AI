# Go Tracing

## Available Platforms

**[Instances](go#instances)**

**[Kubernetes](go#kubernetes)**

**[Docker](go#docker)**

**[ECS](go#ecs)**

**For Log Correlation, scroll to the bottom of this page or [click here](#log-correlation)**


## Instances

### **Goji**

**Pre-requisite**

Install the Elastic APM Go Agent.

```bash
go get go.elastic.co/apm/v2
```

**Handling the environment variables for Elastic APM Go Agent**

1. Import the `github.com/snappyflow/go-sf-apm-lib` package as blank import in your project.

    ```go
    import _ "github.com/snappyflow/go-sf-apm-lib"
    ```

2. Set the `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` environment variables with project name, app name, and profile key respectively.

    If environment variables are not provided, the values are alternatively taken from sfagent's config.yaml file instead if it exists.

3. Always import this package before any elastic instrumentation packages.

    Also import this package in all the files wherever any elastic instrumentation package is imported to avoid re-initialisation of environment variables.

    Example:

    ```go
    import (
        _ "github.com/snappyflow/go-sf-apm-lib"
        "go.elastic.co/apm/module/apmhttp/v2"
	    "go.elastic.co/apm/v2"
        ...
    )
    ```


**Adding instrumentation for Goji application**

1. Import the apmgoji package in your current project.

    ```
    github.com/snappyflow/sf-elastic-apm-go/module/apmgoji
    ```

2. Add the middleware provided by the ampgoji instrumentation module to the middleware stack.

    ```go
    import (
        _ "github.com/snappyflow/go-sf-apm-lib"
        "github.com/snappyflow/sf-elastic-apm-go/module/apmgoji"
    )

    func main() {
        goji.Use(goji.DefaultMux.Router)
        goji.Use(apmgoji.Middleware())
        ...
    }
    ```

    By default, the service name is taken as the executable name. If you want to provide a different service name, set the `ELASTIC_APM_SERVICE_NAME` environment variable before running your Goji application.

3. Once your application is up and running you can check the trace data on Snappyflow Server.

    For viewing trace in snappyflow server make sure project and app are created or discovered with the project name and app name specified in the environment variables `SF_PROJECT_NAME` and `SF_APP_NAME`.

    Once project and app are created, go to View Dashboard -> Click on Tracing on left side bar -> Click on View Transaction -> Go to Real Time tab.

For complete code, refer sample Goji app at: https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-goji


## Kubernetes

### **Goji**

**Pre-requisite**

Install the Elastic APM Go Agent.

```bash
go get go.elastic.co/apm/v2
```

**Handling the environment variables for Elastic APM Go Agent**

1. Import the `github.com/snappyflow/go-sf-apm-lib` package as blank import in your project.

    ```go
    import _ "github.com/snappyflow/go-sf-apm-lib"
    ```

2. The values for `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` must be provided as environment variables in Kubernetes deployment file.

    You can refer: https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/

    If deploying with helm provide above variables in values.yaml and use them in deployment file of charts.

    You can refer: https://phoenixnap.com/kb/helm-environment-variables

3. Always import this package before any elastic instrumentation packages.

    Also import this package in all the files wherever any elastic instrumentation package is imported to avoid re-initialisation of environment variables.

    Example:

    ```go
    import (
        _ "github.com/snappyflow/go-sf-apm-lib"
        "go.elastic.co/apm/module/apmhttp/v2"
	    "go.elastic.co/apm/v2"
        ...
    )
    ```


**Adding instrumentation for Goji application**

1. Import the apmgoji package in your current project.

    ```
    github.com/snappyflow/sf-elastic-apm-go/module/apmgoji
    ```

2. Add the middleware provided by the ampgoji instrumentation module to the middleware stack.

    ```go
    import (
        _ "github.com/snappyflow/go-sf-apm-lib"
        "github.com/snappyflow/sf-elastic-apm-go/module/apmgoji"
    )

    func main() {
        goji.Use(goji.DefaultMux.Router)
        goji.Use(apmgoji.Middleware())
        ...
    }
    ```

    By default, the service name is taken as the executable name. If you want to provide a different service name, set the `ELASTIC_APM_SERVICE_NAME` environment variable before running your Goji application.

3. Once your application is up and running you can check the trace data on Snappyflow Server.

    For viewing trace in snappyflow server make sure project and app are created or discovered with the project name and app name specified in the environment variables `SF_PROJECT_NAME` and `SF_APP_NAME`.

    Once project and app are created, go to View Dashboard -> Click on Tracing on left side bar -> Click on View Transaction -> Go to Real Time tab.

For complete code, refer sample Goji app at: https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-goji


## Docker

### **Goji**

**Pre-requisite**

Install the Elastic APM Go Agent.

```bash
go get go.elastic.co/apm/v2
```

**Handling the environment variables for Elastic APM Go Agent**

1. Import the `github.com/snappyflow/go-sf-apm-lib` package as blank import in your project.

    ```go
    import _ "github.com/snappyflow/go-sf-apm-lib"
    ```

2. The values for `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` must be provided as environment variables in `docker-compose.yml` or at command line when using docker run command for deployment.

    Docker run command example:
    
    ```docker
   docker run -d -t -i -e SF_PROJECT_NAME='' \  
   -e SF_APP_NAME='' \ 
   -e SF_PROFILE_KEY='' \ 
   -p 80:80 \   
   --name <container_name> <image_name> 
   ```

3. Always import this package before any elastic instrumentation packages.

    Also import this package in all the files wherever any elastic instrumentation package is imported to avoid re-initialisation of environment variables.

    Example:

    ```go
    import (
        _ "github.com/snappyflow/go-sf-apm-lib"
        "go.elastic.co/apm/module/apmhttp/v2"
	    "go.elastic.co/apm/v2"
        ...
    )
    ```


**Adding instrumentation for Goji application**

1. Import the apmgoji package in your current project.

    ```
    github.com/snappyflow/sf-elastic-apm-go/module/apmgoji
    ```

2. Add the middleware provided by the ampgoji instrumentation module to the middleware stack.

    ```go
    import (
        _ "github.com/snappyflow/go-sf-apm-lib"
        "github.com/snappyflow/sf-elastic-apm-go/module/apmgoji"
    )

    func main() {
        goji.Use(goji.DefaultMux.Router)
        goji.Use(apmgoji.Middleware())
        ...
    }
    ```

    By default, the service name is taken as the executable name. If you want to provide a different service name, set the `ELASTIC_APM_SERVICE_NAME` environment variable before running your Goji application.

3. Once your application is up and running you can check the trace data on Snappyflow Server.

    For viewing trace in snappyflow server make sure project and app are created or discovered with the project name and app name specified in the environment variables `SF_PROJECT_NAME` and `SF_APP_NAME`.

    Once project and app are created, go to View Dashboard -> Click on Tracing on left side bar -> Click on View Transaction -> Go to Real Time tab.

For complete code, refer sample Goji app at: https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-goji


## ECS

### **Goji**

**Pre-requisite**

Install the Elastic APM Go Agent.

```bash
go get go.elastic.co/apm/v2
```

**Handling the environment variables for Elastic APM Go Agent**

1. Import the `github.com/snappyflow/go-sf-apm-lib` package as blank import in your project.

    ```go
    import _ "github.com/snappyflow/go-sf-apm-lib"
    ```

2. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, and `SF_PROFILE_KEY` as environment variables in add container section of task definitions.

3. Always import this package before any elastic instrumentation packages.

    Also import this package in all the files wherever any elastic instrumentation package is imported to avoid re-initialisation of environment variables.

    Example:

    ```go
    import (
        _ "github.com/snappyflow/go-sf-apm-lib"
        "go.elastic.co/apm/module/apmhttp/v2"
	    "go.elastic.co/apm/v2"
        ...
    )
    ```


**Adding instrumentation for Goji application**

1. Import the apmgoji package in your current project.

    ```
    github.com/snappyflow/sf-elastic-apm-go/module/apmgoji
    ```

2. Add the middleware provided by the ampgoji instrumentation module to the middleware stack.

    ```go
    import (
        _ "github.com/snappyflow/go-sf-apm-lib"
        "github.com/snappyflow/sf-elastic-apm-go/module/apmgoji"
    )

    func main() {
        goji.Use(goji.DefaultMux.Router)
        goji.Use(apmgoji.Middleware())
        ...
    }
    ```

    By default, the service name is taken as the executable name. If you want to provide a different service name, set the `ELASTIC_APM_SERVICE_NAME` environment variable before running your Goji application.

3. Once your application is up and running you can check the trace data on Snappyflow Server.

    For viewing trace in snappyflow server make sure project and app are created or discovered with the project name and app name specified in the environment variables `SF_PROJECT_NAME` and `SF_APP_NAME`.

    Once project and app are created, go to View Dashboard -> Click on Tracing on left side bar -> Click on View Transaction -> Go to Real Time tab.

For complete code, refer sample Goji app at: https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-goji




## Outgoing HTTP requests and DB transactions

**Tracing outgoing HTTP requests**

1. Import the following packages.

    ```
    go.elastic.co/apm/module/apmhttp/v2
    go.elastic.co/apm/v2
    ```

2. Instrument the HTTP client using `apmhttp.WrapClient` function.

    ```go
    client := apmhttp.WrapClient(http.DefaultClient)
    ```

3. Start a span with the current request context.

    ```go
    span, ctx := apm.StartSpan(req.Context(), "newSpan", "custom")
    defer span.End()
    ```

4. Propagate this context to the outgoing request.

    ```go
    resp, err := client.Do(req.WithContext(ctx))
    ```

These lines have to be added in the handler functions wherever outgoing HTTP requests are being made.

You can refer the following handler function from the Goji reference app: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-goji/main.go#L72

**Tracing DB transactions**

1. Import the required database instrumentation module, say postgres for example.

    ```
    go.elastic.co/apm/module/apmsql/v2/pq
    ```

2. Open a database connection using the apmsql.Open function.

    ```go
    import (
        "go.elastic.co/apm/module/apmsql/v2"
        _ "go.elastic.co/apm/module/apmsql/v2/pq"
    )

    func main() {
        db, err := apmsql.Open("postgres", "postgres://...")
        ...
    }
    ```

apmsql provides support for the following popular drivers.

- module/apmsql/pq (github.com/lib/pq)
- module/apmsql/pgxv4 (github.com/jackc/pgx/v4/stdlib)
- module/apmsql/mysql (github.com/go-sql-driver/mysql)
- module/apmsql/sqlite3 (github.com/mattn/go-sqlite3)

**Tracing ElasticSearch DB transactions**

1. Import the following instrumentation module.

    ```
    go.elastic.co/apm/module/apmelasticsearch/v2
    ```

2. Wrap the client’s HTTP transport using the `apmelasticsearch.WrapRoundTripper` function.

3. Associate the elasticsearch request with the current transaction context.

    ```go
    import (
        "net/http"

        "github.com/olivere/elastic"
        "go.elastic.co/apm/module/apmelasticsearch/v2"
    )

    var client, _ = elastic.NewClient(elastic.SetHttpClient(&http.Client{
        Transport: apmelasticsearch.WrapRoundTripper(http.DefaultTransport),
    }))

    func handleRequest(w http.ResponseWriter, req *http.Request) {
        result, err := client.Search("index").Query(elastic.NewMatchAllQuery()).Do(req.Context())
        ...
    }
    ```

**Tracing errors**

1. Import the following package.

    ```
    go.elastic.co/apm/v2
    ```

2. Use `apm.CaptureError` function and pass the current request context to report errors to APM server.

    ```go
    if err != nil {
        e := apm.CaptureError(req.Context(), err)
        e.Send()
    }
    ```




## Log Correlation

For enabling log correlation, follow below instructions.

### For Go's standard log package

1. Import the following package to get the trace IDs.

    ```
    go.elastic.co/apm/v2
    ```

2. The following fields must be added in the logs:

- trace.id
- transaction.id

    These values are available from the current transaction context. You can use a middleware function to get the current transaction context and trace IDs.

    Example middleware function in Goji:

    ```go
    // GetContext is a middleware that gets the current request context and trace IDs
    func GetContext(h http.Handler) http.Handler {
        fn := func(w http.ResponseWriter, r *http.Request) {
            labels := make(map[string]string)
            tx := apm.TransactionFromContext(r.Context())
            if tx != nil {
                traceContext := tx.TraceContext()
                labels["trace.id"] = traceContext.Trace.String()
                labels["transaction.id"] = traceContext.Span.String()
                if span := apm.SpanFromContext(ctx); span != nil {
                    labels["span.id"] = span.TraceContext().Span
                }  else {
                    labels["span.id"] = "None"
                }
            }
            h.ServeHTTP(w, r)
        }
        return http.HandlerFunc(fn)
    }
    ```

    Here `apm.TransactionFromContext` and `apm.SpanFromContext` functions are called to get the current trace ID, transaction ID, and span ID.

    You can then add these trace IDs obtained from the current transaction context to your log lines.

    Middleware structure may differ for other web frameworks, but only the current transaction context is needed in all the cases.

    You can refer this middleware function from reference Goji app: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-goji/middleware.go#L8

    If you do not want to use a middleware function, you will have to call the `apm.TransactionFromContext` function with the current request context everytime in all the handler functions to get the trace IDs.

You can refer code at: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-goji/logger.go


### For Logrus logging framework

1. Import the apmlogrus module.

    ```
    go.elastic.co/apm/module/apmlogrus/v2
    ```

2. Add the following trace context fields to the logs.

- trace.id
- transaction.id

    These values are available from the current transaction context. You can use a middleware function to get the current transaction context and trace IDs.

    Example middleware function in Goji:

    ```go
    // GetContext is a middleware that gets the current request context and trace IDs
    func GetContext(h http.Handler) http.Handler {
        fn := func(w http.ResponseWriter, r *http.Request) {
            labels := make(map[string]string)
            traceContextFields := apmlogrus.TraceContext(r.Context())
            labels["trace.id"] = traceContextFields["trace.id"].String()
            labels["transaction.id"] = traceContextFields["transaction.id"].String()
            if _, ok := traceContextFields["span.id"]; ok {
                labels["span.id"] = traceContextFields["span.id"].String()
            }  else {
                labels["span.id"] = "None"
            }
            h.ServeHTTP(w, r)
        }
        return http.HandlerFunc(fn)
    }
    ```

    Here `apmlogrus.TraceContext` function is called to get the current trace ID, transaction ID, and span ID.

    You can then add these trace IDs obtained from the current transaction context to your log lines.

    Middleware structure may differ for other web frameworks, but only the current transaction context is needed in all the cases.

    You can refer to this middleware function from reference Goji app: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-goji/middleware.go#L17

    If you do not want to use a middleware, you will have to call the `apm.TransactionFromContext` function with the current request context everytime in all the handler functions to get the trace IDs.

    Example:

    ```go
    import (
        "github.com/sirupsen/logrus"
        "go.elastic.co/apm/module/apmlogrus/v2"
    )

    func handleRequest(w http.ResponseWriter, req *http.Request) {
        traceContextFields := apmlogrus.TraceContext(req.Context())
        logrus.WithFields(traceContextFields).Debug("handling request")
    }
    ```

You can refer the code at: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-goji/logrus.go


## Send log correlation data to snappyflow server

### For Appliance

1. Install sfagent and create config file.

    Refer: https://docs.snappyflow.io/docs/Integrations/os/linux/sfagent_linux

2. Enable the `elasticApmTraceLog` plugin and restart sfagent service.

    Example config.yaml:
    ```yaml
    key: <SF_PROFILE_KEY>
    tags:
    Name: <any-name>
    appName: <SF_APP_NAME>
    projectName: <SF_PROJECT_NAME>
    logging:
    plugins:
        - name: elasticApmTraceLog
        enabled: true
        config:
            log_level:
                - error
                - warning
                - info
            log_path: /var/log/trace/goji.log  # Your app log file path
    ```


### For Kubernetes

1. Specify following values in metadata labels section of deployment file.

    ```
    snappyflow/appname: <SF_APP_NAME>
    snappyflow/projectname: <SF_PROJECT_NAME>
    snappyflow/component: gen-elastic-apm-log # This is must for tracing log correlation
    snappyflow/component: aks-gen-elastic-apm-log # Set this value if deploying app in Azure Kubernetes
    ```

    Sample deployment file:

    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    labels:
        io.kompose.service: python-app
        snappyflow/appname: '<sf_app_name>'
        snappyflow/projectname: '<sf_project_name>'
        snappyflow/component: gen-elastic-apm-log
    name: python-app
    spec:
    replicas: 1
    selector:
        matchLabels:
        io.kompose.service: python-app
    strategy: {}
    template:
        metadata:
        labels:
            io.kompose.service: python-app
            snappyflow/appname: '<sf_app_name>'
            snappyflow/projectname: '<sf_project_name>'
            snappyflow/component: gen-elastic-apm-log
        spec:
        containers:
            - env:
                - name: SF_APP_NAME
                value: '<sf_app_name>'
                - name: SF_PROFILE_KEY
                value: '<sf_profile_key>'
                - name: SF_PROJECT_NAME
                value: '<sf_project_name>'
            image: refapp-node:latest
            imagePullPolicy: Always
            name: python-app
            ports:
                - containerPort: 3000
            resources:
                requests:
                cpu: 10m
                memory: 10Mi
                limits:
                cpu: 50m
                memory: 50Mi
        restartPolicy: Always
      ```

    **Note: For kubernetes mode we need sfagent pods to be running inside kubernetes cluster where your application pods are deployed.**


For viewing the logs in Snappyflow server make sure project and app are created or discovered with the same names as `SF_PROJECT_NAME` and `SF_APP_NAME`.

Once project and app name is created,

Go to: View App Dashboard -> Click on Tracing on left side bar -> Click on view Transaction -> Go to Real Time tab.

Then click on any trace and go to `Logs` tab to see the correlated logs to trace.


**NOTE:**

**To get trace logs in snappyflow server we need log entries to have the following log format:**

```
<date in following format and in UTC>
[10/Aug/2021 10:51:16] [<log_level>] [<message>] | elasticapm transaction.id=<transaction_id> trace.id=<trace_id> span.id=<span_id>
```