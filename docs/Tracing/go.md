# Go Tracing

## Available Platforms

**[Instances](go#instances)**

**[Kubernetes](go#kubernetes)**

**[Docker](go#docker)**

**[ECS](go#ecs)**

**For Log Correlation, scroll to the bottom of this page or [click here](#log-correlation)**


## Instances

### Supported web frameworks

| **Framework** | **Supported versions**       |
| ------------- | ---------------------------- |
| Goji          | v1.0.1                       |

### **Goji**

**Pre-requisite**

1. Go of version >= 1.15.0 installed.

2. Install the Elastic APM Go Agent.

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
        // rest of the packages
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

    Use the Router middleware to let the tracer determine the routes.

    By default, the service name is taken as the executable name. If you want to provide a different service name, set the `ELASTIC_APM_SERVICE_NAME` environment variable before running your Goji application.

3. Once your application is up and running you can check the trace data on Snappyflow Server.

    For viewing trace in snappyflow server make sure project and app are created or discovered with the project name and app name specified in the environment variables `SF_PROJECT_NAME` and `SF_APP_NAME`.

    Once project and app are created, go to View Dashboard -> Click on Tracing on left side bar -> Click on View Transaction -> Go to Real Time tab.

**To know how to trace outgoing HTTP requests and DB transactions, [click here](#outgoing-http-requests-and-db-transactions)**

**To know how to trace internal function calls or code blocks in your application code, [click here](#custom-instrumentation)**

**To know how to capture and trace errors, [click here](#tracing-errors)**

**To know about context propagation, [click here](#context-propagation)**

For complete code, refer sample Goji app at: https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-goji


## Kubernetes

### Supported web frameworks

| **Framework** | **Supported versions**       |
| ------------- | ---------------------------- |
| Goji          | v1.0.1                       |

### **Goji**

**Pre-requisite**

1. Go of version >= 1.15.0 installed.

2. Install the Elastic APM Go Agent.

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
        // rest of the packages
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

    Use the Router middleware to let the tracer determine the routes.

    By default, the service name is taken as the executable name. If you want to provide a different service name, set the `ELASTIC_APM_SERVICE_NAME` environment variable before running your Goji application.

3. Once your application is up and running you can check the trace data on Snappyflow Server.

    For viewing trace in snappyflow server make sure project and app are created or discovered with the project name and app name specified in the environment variables `SF_PROJECT_NAME` and `SF_APP_NAME`.

    Once project and app are created, go to View Dashboard -> Click on Tracing on left side bar -> Click on View Transaction -> Go to Real Time tab.

**To know how to trace outgoing HTTP requests and DB transactions, [click here](#outgoing-http-requests-and-db-transactions)**

**To know how to trace internal function calls or code blocks in your application code, [click here](#custom-instrumentation)**

**To know how to capture and trace errors, [click here](#tracing-errors)**

**To know about context propagation, [click here](#context-propagation)**

For complete code, refer sample Goji app at: https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-goji


## Docker

### Supported web frameworks

| **Framework** | **Supported versions**       |
| ------------- | ---------------------------- |
| Goji          | v1.0.1                       |

### **Goji**

**Pre-requisite**

1. Go of version >= 1.15.0 installed.

2. Install the Elastic APM Go Agent.

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
        // rest of the packages
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

    Use the Router middleware to let the tracer determine the routes.

    By default, the service name is taken as the executable name. If you want to provide a different service name, set the `ELASTIC_APM_SERVICE_NAME` environment variable before running your Goji application.

3. Once your application is up and running you can check the trace data on Snappyflow Server.

    For viewing trace in snappyflow server make sure project and app are created or discovered with the project name and app name specified in the environment variables `SF_PROJECT_NAME` and `SF_APP_NAME`.

    Once project and app are created, go to View Dashboard -> Click on Tracing on left side bar -> Click on View Transaction -> Go to Real Time tab.

**To know how to trace outgoing HTTP requests and DB transactions, [click here](#outgoing-http-requests-and-db-transactions)**

**To know how to trace internal function calls or code blocks in your application code, [click here](#custom-instrumentation)**

**To know how to capture and trace errors, [click here](#tracing-errors)**

**To know about context propagation, [click here](#context-propagation)**

For complete code, refer sample Goji app at: https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-goji


## ECS

### Supported web frameworks

| **Framework** | **Supported versions**       |
| ------------- | ---------------------------- |
| Goji          | v1.0.1                       |

### **Goji**

**Pre-requisite**

1. Go of version >= 1.15.0 installed.

2. Install the Elastic APM Go Agent.

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
        // rest of the packages
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

    Use the Router middleware to let the tracer determine the routes.

    By default, the service name is taken as the executable name. If you want to provide a different service name, set the `ELASTIC_APM_SERVICE_NAME` environment variable before running your Goji application.

3. Once your application is up and running you can check the trace data on Snappyflow Server.

    For viewing trace in snappyflow server make sure project and app are created or discovered with the project name and app name specified in the environment variables `SF_PROJECT_NAME` and `SF_APP_NAME`.

    Once project and app are created, go to View Dashboard -> Click on Tracing on left side bar -> Click on View Transaction -> Go to Real Time tab.

**To know how to trace outgoing HTTP requests and DB transactions, [click here](#outgoing-http-requests-and-db-transactions)**

**To know how to trace internal function calls or code blocks in your application code, [click here](#custom-instrumentation)**

**To know how to capture and trace errors, [click here](#tracing-errors)**

**To know about context propagation, [click here](#context-propagation)**

For complete code, refer sample Goji app at: https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-goji




## Outgoing HTTP requests and DB transactions

You can follow these steps only if you are making outgoing HTTP requsts and DB transactions in your application and want to trace them.

This is independent of the web framework used.

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

You can refer the following handler function from the Goji reference app: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-goji/handlers.go#L48

**Tracing SQL DB transactions**

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

3. Create spans

    Spans will be created for queries and other statement executions if the context methods are used, and the context includes a transaction.

    ```go
    func handleRequest(w http.ResponseWriter, r *http.Request) {
        tx, err := db.BeginTx(r.Context(), nil)
        if err != nil {
            // handle error
        }
        result, err := tx.QueryContext(r.Context(), "SELECT * FROM customers")
        ...
    }
    ```

apmsql provides support for the following popular drivers.

- module/apmsql/pq (github.com/lib/pq)
- module/apmsql/pgxv4 (github.com/jackc/pgx/v4/stdlib)
- module/apmsql/mysql (github.com/go-sql-driver/mysql)
- module/apmsql/sqlite3 (github.com/mattn/go-sqlite3)

**Tracing MongoDB transactions**

1. Import the following instrumentation module.

    ```
    github.com/snappyflow/sf-elastic-apm-go/module/apmmongo
    ```

    This package provides the means of instrumenting the `mongodb/mongo-go-driver`, so that MongoDB commands are reported as spans within the current transaction.

2. To create spans for MongoDB commands, pass in a `CommandMonitor` created with `apmmongo.CommandMonitor` as an option when constructing a client.

    ```go
    var client, _ = mongo.Connect(
        context.Background(),
        options.Client().SetMonitor(apmmongo.CommandMonitor()).ApplyURI("mongodb://localhost:27017"),
    )
    ```

3. When executing the commands, pass in a context containing the current transaction to capture spans within this transaction.

    ```go
    import (
        "context"
        "net/http"

        "go.mongodb.org/mongo-driver/bson"
        "go.mongodb.org/mongo-driver/mongo"
        "go.mongodb.org/mongo-driver/mongo/options"

        "go.elastic.co/apm/v2"
        "go.elastic.co/apm/module/apmmongo/v2"
    )

    var client, _ = mongo.Connect(
        context.Background(),
        options.Client().SetMonitor(apmmongo.CommandMonitor()).ApplyURI("mongodb://localhost:27017"),
    )

    func handleRequest(w http.ResponseWriter, req *http.Request) {
        collection := client.Database("db").Collection("coll")
        cur, err := collection.Find(req.Context(), bson.D{})
        ...
    }
    ```

**Tracing Redis transactions**

1. Import the following instrumentation module.

    ```
    github.com/snappyflow/sf-elastic-apm-go/module/apmgoredisv8
    ```

    This package provides a means of instrumenting `go-redis/redis for v8` so that Redis commands are reported as spans within the current transaction.

2. To report Redis commands as spans, call AddHook(apmgoredis.NewHook()) from instance of the Redis client to use the hook provided by apmgoredisv8 module.

    ```go
    redisClient.AddHook(apmgoredisv8.NewHook())
    ```

3. When executing the commands, pass in a context containing the current transaction to capture spans within this transaction.

    ```go
    import (
        "github.com/go-redis/redis/v8"
	    "github.com/snappyflow/sf-elastic-apm-go/module/apmgoredisv8"
    )

    var redisClient = redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "",
        DB:       0,
    })

    func main() {
        redisClient.AddHook(apmgoredisv8.NewHook())
        ...
    }

    func handleRequest(w http.ResponseWriter, req *http.Request) {
        val, err := redisClient.Get(req.Context(), "key").Result()
        ...
    }
    ```

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

For other instrumentation modules, refer https://www.elastic.co/guide/en/apm/agent/go/2.x/builtin-modules.html


## Tracing Errors

Follow these steps only if you want to trace errors in your application.

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


## Custom Instrumentation

Spans can be created to trace a function call or operation/activity within a transaction.

1. `apm.StartSpan` starts and returns a new span within the transaction, with the specified name and type.

    ```go
    span, ctx := apm.StartSpan(req.Context, "myFunc", "custom.internal.functionCall")
    // Here, "muFunc" is the span name, "custom" is the span type, "internal" is the subtype, and "functionCall" is the action.
    // If the span type contains two dots, they are assumed to separate the span type, subtype, and action
    // A single dot separates span type and subtype, and the action will not be set.
    // span type can also be set to just a string with no dots. In this case subtype and action are set to null.
    ```

    So you can use the following pattern to trace internal operations or a block of code.

    ```go
    span, ctx := apm.StartSpan(req.Context(), "internal operation", "custom")
	// ... code or operation you want to trace here ...
    // It is important to end the span to mark it as complete.
	span.End()
    ```

    The span’s duration will be calculated as the amount of time elapsed since the span was started until this call.

2. You can also add nested spans by passing the parent span's context in the child span creation. The span being ended must be the most recently started span.

    ```go
    parentSpan, ctx := apm.StartSpan(req.Context(), "myFunc", "custom")
    // ... code or operation you want to trace here ...
	childSpan, _ := apm.StartSpan(ctx, "internal operation", "custom")
	// ... code or operation you want to trace here ...
    // childSpan must end before parentSpan
	childSpan.End()
    parentSpan.End()
    ```

    If the context contains neither a transaction nor a span, then the span will be dropped (i.e. will not be reported to the SnappyFlow server).

3. You can also trace the function calls and there duration within a transaction using the same steps.

    ```go
    import (
        "go.elastic.co/apm/v2"
    )

    func handleTest(w http.ResponseWriter, req *http.Request) {
        myFunc(req.Context())
        ...
    }

    func myFunc(ctx context.Context) {
        span, _ := apm.StartSpan(ctx, "myFunc", "custom.internal.functionCall")
        defer span.End()
        ...
    }
    ```

You can refer the reference Goji app for an example: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-goji/handlers.go#L39


## Context Propagation

In Go, for each incoming request, a transaction will be started and added to the request context automatically. So, the http.Request object will contain the current transaction context.

This context needs to be passed into method calls within the handler manually in order to create spans within that transaction, e.g. to trace DB queries.

**Note:** If the context contains neither a transaction nor a span, then the span will be dropped (i.e. will not be reported to the SnappyFlow server.)

For example,

```go
import (
	"context"
	"net/http"

    _ "github.com/snappyflow/go-sf-apm-lib"

	"github.com/snappyflow/sf-elastic-apm-go/module/apmgoji"
	"github.com/zenazn/goji"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/snappyflow/sf-elastic-apm-go/module/apmmongo"
)

var mongoClient, _ = mongo.Connect(
	context.Background(),
	options.Client().SetMonitor(apmmongo.CommandMonitor()).ApplyURI("mongodb://localhost:27017"),
)

func main() {
    goji.Use(goji.DefaultMux.Router)
	goji.Use(apmgoji.Middleware())

    goji.Get("/mongo", handleMongoDB)
    goji.Serve()
}

func handleMongoDB(w http.ResponseWriter, req *http.Request) {
	// By passing the request context down to getDocs, getDocs can make DB queries which will be traced within this context.
	ctx := req.Context()
	getDocs(ctx)
	...
}

func getDocs(ctx context.Context) {
    collection := mongoClient.Database("db").Collection("coll")
	cur, err := collection.Find(ctx, bson.D{})
    ...
    cur.Close(ctx)
}
```

For more details refer the documentation at: https://www.elastic.co/guide/en/apm/agent/go/2.x/custom-instrumentation-propagation.html 


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

**Note: sfagent is required only to send log correlation data to the snappyflow server. It is not needed to trace transactions.**


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