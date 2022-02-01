

# Tracing node.js applications

#### Available Platforms

**[Instances](nodejs#instances)**

**[Docker](nodejs#docker)**

**[Kubernetes](nodejs#kubernetes)**

**[ECS](nodejs#ecs)**

**[AWS Lambda](nodejs#aws-lambda)**

**For Log Correlation, scroll to the bottom of this page or [click here](#log-correlation)**


## Instances

### Node.JS Express

1. Install nodejs dependencies and save it in `package.json` using

   ```javascript
   npm install --save elastic-apm-node@^3.20.0
   npm install --save sf-apm-lib@^1.0.2
   ```

   or update `package.json` file with following entries

   ```javascript
   "elastic-apm-node": "^3.20.0"
   "sf-apm-lib": "^1.0.2" 
   ```

   and run `npm install` to install dependencies


2. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variable in `.env` file and load it using `require('dotenv').config()` and access it in code using `process.env.<ENV_VAR>`

3. Add initilization code at start of the file 

   1. Get Snappyflow trace config using

      ```javascript
      const Snappyflow = require('sf-apm-lib');
      var sfObj = new Snappyflow(); // Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml. 
      
      // Add below part to manually configure the initialization 
      let projectName = process.env.SF_PROJECT_NAME; 
      let appName = process.env.SF_APP_NAME; 
      let profileKey = process.env.SF_PROFILE_KEY; 
      sfObj.init(profileKey, projectName, appName); // Manual override

      let sfTraceConfig = sfObj.getTraceConfig();

      // Start Trace to log feature section
      // Add below line of code to enable Trace to log feature:
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      // Option Configs for trace to log
      // Add below line to provide custom documentType (Default:"user-input"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      // Add below line to provide destination index (Default:"log"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' // Applicable values(log, metric)
      // End trace to log section

      ```

   2. Initialize apm object using

      ```javascript
      var apm; 
      try { 
         apm = require('elastic-apm-node').start({ 
               serviceName: '<SERVICE_NAME>', // Specify your service name for tracing 
               serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
               globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
               verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
               active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
               stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
               captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
               metricsInterval: '0s',
               usePathAsTransactionName: true
          }) 
      } catch (e) { 
         console.log(e); 
      } 
      ```

   3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in add container section of task definitions. 

      https://docs.aws.amazon.com/AmazonECS/latest/developerguide/taskdef-envfiles.html 

   4. Once your server is up and running you can check trace in Snappyflow Server. 

      For viewing trace in Snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

      Once project and app name is created go to:

      View dashboard -> Click on Tracing on left side bar   -> Click on view transaction -> Go to real time tab 

   5. For complete code refer sample app refer at:

      https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-express
   
   6. <b>Note</b>: <i> 'captureBody':'all' config should be present in apm agent code instrumentation for Trace to Log feature. </i>

### Node.JS Script

1. Install nodejs dependencies and save it in `package.json` using

   ```javascript
   npm install --save elastic-apm-node@^3.20.0  
   npm install --save sf-apm-lib@^1.0.2 
   ```

   or update `package.json` file with following entries: 

   ```javascript
   "elastic-apm-node": "^3.20.0" 
   "sf-apm-lib": "^1.0.2" 
   ```

   And run `npm install` to install dependencies

2. Add initilization code at start of the file

   1. Get Snappyflow trace config using

      ```javascript
      const Snappyflow = require('sf-apm-lib'); 
      let projectName = <SF_PROJECT_NAME>; //replace with appropriate project name 
      let appName = <SF_APP_NAME>; //replace with appropriate application name 
      let profileKey = <SF_PROFILE_KEY>; //replace with key copied from SF profile

      var sfObj = new Snappyflow(); 
      sfObj.init(profileKey, projectName, appName); 
      let sfTraceConfig = sfObj.getTraceConfig(); 
      ```

   2. Initialize apm object using

      ```javascript
      var apm;
      try { 
         apm = require('elastic-apm-node').start({ 
            	serviceName: '<SERVICE_NAME>', // Specify service name for tracing 
            	serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
            	globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
            	verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
               active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
            	stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
            	captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
               metricsInterval: '0s',
               usePathAsTransactionName: true
               
          }) 
      } catch (e) { 
          console.log(e); 
      } 
      ```

   3. Create a custom transaction and span within transaction using following code

      ```javascript
      var trans = apm.startTransaction('json transaction', 'reference-app'); 
      var span = apm.startSpan('parse json'); 
      try { 
         JSON.parse('{"app": "test"}') 
      } catch (e) { 
         apm.captureError(e); // Capture the error using apm.captureError(e) method.
      } 
       
      // when we've processed, stop the custom span 
      if (span) span.end() 
         trans.result = err ? 'error' : 'success'; 
      // end the transaction 
      trans.end(); 
      ```

      For more info refer  

      https://www.elastic.co/guide/en/apm/agent/nodejs/current/custom-transactions.html 

      https://www.elastic.co/guide/en/apm/agent/nodejs/current/custom-spans.html 

   4. Run you script using node `file_name.js` you should see trace data in Snappyflow server. 

      For viewing trace in Snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

      Once project and app name is created go to: View dashboard -> Click on Tracing on left side bar   -> Click on view transaction -> Go to real time tab 

   5. Refer sample script file at: 

      [https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-		express/node_trace_script.js](https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-		express/node_trace_script.js ) 


### Node.JS Sails

1. Install nodejs dependencies and save it in `package.json` using

   ```javascript
   npm install --save elastic-apm-node@^3.20.0  
   npm install --save sf-apm-lib@^1.0.2 
   ```

   or update `package.json` file with following entries

   ```javascript
   "elastic-apm-node": "^3.20.0" 
   "sf-apm-lib": "^1.0.2" 
   ```

   And run `npm install` to install dependencies 

2. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variable in .env file and load it using `require('dotenv').config()` and access it in code using `process.env.<ENV_VAR>`

3. Add initilization code at start of the file in `globals.js` present in config folder.

   1. Get Snappyflow trace config using:  

      ```javascript
      const Snappyflow = require('sf-apm-lib');

      var sfObj = new Snappyflow(); // Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml.

      // Add below part to manually configure the initialization 
      let projectName = process.env.SF_PROJECT_NAME; 
      let appName = process.env.SF_APP_NAME; 
      let profileKey = process.env.SF_PROFILE_KEY; 
      sfObj.init(profileKey, projectName, appName); // Manual override

      let sfTraceConfig = sfObj.getTraceConfig();

      // Start Trace to log feature section
      // Add below line of code to enable Trace to log feature:
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      // Option Configs for trace to log
      // Add below line to provide custom documentType (Default:"user-input"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      // Add below line to provide destination index (Default:"log"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' // Applicable values(log, metric)
      // End trace to log section 
      ```

   2. Initialize apm object using:

      ```javascript
      var apm; 
      try { 
         apm = require('elastic-apm-node').start({ 
            	serviceName: '<SERVICE_NAME>', // Specify your service name for tracing 
            	serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
            	globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
            	verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
               active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
            	stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
            	captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
               metricsInterval: '0s',
               usePathAsTransactionName: true
          }) 
      } catch (e) { 
         console.log(e); 
      } 
      ```

   3. Attach apm object to globals – This is required so we can use apm variable in other files as part of global sails object. 

      ```javascript
      module.exports.globals = { 
         _: require('@sailshq/lodash'), 
         async: false, 
         models: true, 
         sails: true, 
         apm : apm, 
         logger: logger 
      }; 
      ```

   4. Also add middleware in `http.js` file present in config folder. Which allows to instrument our code. 

      ```javascript
      module.exports.http = { 
         middleware: { 
            order: [ 
               'elasticAPM' 
            ], 
            elasticAPM: (function () { 
               return function (err, req, res, next) { 
                  apm.middleware.connect(); 
                  if (typeof err !== 'undefined') 
                     apm.captureError(err); 
                  return next(); 
               }; 
            })()
         }    
      }; 
      ```

4. Once your server is up and running you can check trace in Snappyflow Server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created go to  

   View dashboard -> Click on Tracing on lef side bar -> Click on view transaction -> Go to real time tab 

5. For complete code refer sample app refer at: 

   https://github.com/snappyflow/tracing-reference-apps/tree/master/RefappNodeSail

6. <b>Note</b>: <i> 'captureBody':'all' config should be present in apm agent code instrumentation for Trace to Log feature. </i>

## Kubernetes

### Node.JS Express

1. Install nodejs dependencies and save it in `package.json` using

   ```javascript
   npm install --save elastic-apm-node@^3.20.0  
   npm install --save sf-apm-lib@^1.0.2 
   ```

   or update `package.json` file with following entries: 

   ```javascript
   "elastic-apm-node": "^3.20.0"  
   "sf-apm-lib": "^1.0.2" 
   ```

     and run `npm install` to install dependencies

2. Add initilization code at start of the file in `app.js`

   1. Get Snappyflow trace config using

      ```javascript
      const Snappyflow = require('sf-apm-lib'); 
      var sfObj = new Snappyflow(); // Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml.

      // Add below part to manually configure the initialization 
      let projectName = process.env.SF_PROJECT_NAME; 
      let appName = process.env.SF_APP_NAME; 
      let profileKey = process.env.SF_PROFILE_KEY; 
      sfObj.init(profileKey, projectName, appName); // Manual override

      let sfTraceConfig = sfObj.getTraceConfig();

      // Start Trace to log feature section
      // Add below line of code to enable Trace to log feature:
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      // Option Configs for trace to log
      // Add below line to provide custom documentType (Default:"user-input"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      // Add below line to provide destination index (Default:"log"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' // Applicable values(log, metric)
      // End trace to log section 
      ```

   2. Initialize apm object using

      ```javascript
      var apm; 
      try { 
         apm = require('elastic-apm-node').start({ 
            serviceName: '<SERVICE_NAME>', // Specify your service name for tracing 
            serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
            globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
            verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
            active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
            stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
            captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
            metricsInterval: '0s',
            usePathAsTransactionName: true
         }) 
      } catch (e) { 
         console.log(e); 
      } 
      ```

   3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in Kubernetes deployment file. 

      https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/ 

   4. Once your server is up and running you can check trace in Snappyflow Server. 

      For viewing trace in Snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

      Once project and app name is created go to: View dashboard -> Click on Tracing on left side bar   -> Click on view transaction -> Go to real time tab 

   5. For complete code refer sample app refer at: 

      https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-express

   6. <b>Note</b>: <i> 'captureBody':'all' config should be present in apm agent code instrumentation for Trace to Log feature. </i>

### Node.JS Sails

1. Install nodejs dependencies and save it in `package.json` using

   ```javascript
   npm install --save elastic-apm-node@^3.20.0  
   npm install --save sf-apm-lib@^1.0.2 
   ```

   or update `package.json` file with following entries: 

   ```javascript
   "elastic-apm-node": "^3.20.0" 
   "sf-apm-lib": "^1.0.2" 
   ```

   And run `npm install` to install dependencies

2. Add initilization code at start of the file in `globals.js` present in config folder. 

   1. Get Snappyflow trace config using

      ```javascript
      const Snappyflow = require('sf-apm-lib'); 
      var sfObj = new Snappyflow(); // Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml.

      // Add below part to manually configure the initialization 
      let projectName = process.env.SF_PROJECT_NAME; 
      let appName = process.env.SF_APP_NAME; 
      let profileKey = process.env.SF_PROFILE_KEY; 
      sfObj.init(profileKey, projectName, appName); // Manual override

      let sfTraceConfig = sfObj.getTraceConfig();

      // Start Trace to log feature section
      // Add below line of code to enable Trace to log feature:
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      // Option Configs for trace to log
      // Add below line to provide custom documentType (Default:"user-input"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      // Add below line to provide destination index (Default:"log"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' // Applicable values(log, metric)
      // End trace to log section
      ```

   2. Initialize apm object using

      ```javascript
      var apm; 
      try { 
         apm = require('elastic-apm-node').start({ 
            serviceName: '<SERVICE_NAME>', // Specify your service name for tracing 
            serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
            globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
            verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
            active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
            stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
            captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
            metricsInterval: '0s',
            usePathAsTransactionName: true
         }) 
      } catch (e) { 
         console.log(e); 
      } 
      ```

   3. Attach apm object to globals – This is required so we can use apm variable in other files as part of global sails object

      ```javascript
      module.exports.globals = { 
         _: require('@sailshq/lodash'), 
         async: false, 
         models: true, 
         sails: true, 
         apm : apm, 
         logger: logger 
      }; 
      ```

   4. Also add middleware in `http.js` file present in config folder. Which allows to instrument our code

      ```javascript
      module.exports.http = {
         middleware: { 
            order: [ 
               'elasticAPM' 
            ], 
            elasticAPM: (function () { 
               return function (err, req, res, next) { 
               apm.middleware.connect(); 
               if (typeof err !== 'undefined') 
                  apm.captureError(err); 
               return next(); 
               }; 
            })() 
         }
      }; 
      ```

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in Kubernetes deployment file. 

   https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/ 

   If deploying with helm provide above variables in values.yaml and use them in deployment file of charts. 

   https://phoenixnap.com/kb/helm-environment-variables 

4. Once your server is up and running you can check trace in Snappyflow Server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created go to  

   View dashboard -> Click on Tracing on lef side bar -> Click on view transaction -> Go to real time tab 

5. For complete code refer sample app refer at: 

   https://github.com/snappyflow/tracing-reference-apps/tree/master/RefappNodeSail 

6. <b>Note</b>: <i> 'captureBody':'all' config should be present in apm agent code instrumentation for Trace to Log feature. </i>

## Docker

### Node.JS Express

1. Install nodejs dependencies and save it in `package.json` using

   ```docker
   RUN npm install --save elastic-apm-node@^3.20.0 
   RUN npm install --save sf-apm-lib@^1.0.2 
   ```

   or update `package.json` file with following entries: 

   ```javascript
   "elastic-apm-node": "^3.20.0" 
   "sf-apm-lib": "^1.0.2" 
   ```

    And run `npm install` to install dependencies

2. Add initilization code at start of the file in `app.js`

   1. Get Snappyflow trace config using

      ```javascript
      const Snappyflow = require('sf-apm-lib'); 
      var sfObj = new Snappyflow(); // Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml.

      // Add below part to manually configure the initialization 
      let projectName = process.env.SF_PROJECT_NAME; 
      let appName = process.env.SF_APP_NAME; 
      let profileKey = process.env.SF_PROFILE_KEY; 
      sfObj.init(profileKey, projectName, appName); // Manual override

      let sfTraceConfig = sfObj.getTraceConfig();

      // Start Trace to log feature section
      // Add below line of code to enable Trace to log feature:
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      // Option Configs for trace to log
      // Add below line to provide custom documentType (Default:"user-input"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      // Add below line to provide destination index (Default:"log"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' // Applicable values(log, metric)
      // End trace to log section

      ```

   2. Initialize apm object using

      ```javascript
      var apm; 
      try { 
         apm = require('elastic-apm-node').start({ 
            serviceName: '<SERVICE_NAME>', // Specify your service name for tracing 
            serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
            globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
            verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
            active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
            stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
            captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
            metricsInterval: '0s',
            usePathAsTransactionName: true
         }) 
      } catch (e) { 
         console.log(e); 
      } 
      ```

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in `docker-compose.yml` or docker stack deployment file or at command line when using docker run command for deployment. 

   Eg: 

   Docker-compose and stack: https://docs.docker.com/compose/environment-variables/ 

   Docker run cli command: 

   ```docker
   docker run -d -t -i -e SF_PROJECT_NAME='<Project name>' \  
   -e SF_APP_NAME='<SF_APP_NAME>' \ 
   -e SF_PROFILE_KEY='<snappyflow profile key>' \ 
   --name <container_name>  <dockerhub_id/image_name> 
   ```

4. Once your server is up and running you can check trace in Snappyflow Server. 

   // Project related info 

   For viewing trace in Snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created go to  

   View dashboard -> Click on Tracing on lef side bar -> Click on view transaction -> Go to real time tab 

5. For complete code refer sample app refer at: 

   https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-express 

6. <b>Note</b>: <i> 'captureBody':'all' config should be present in apm agent code instrumentation for Trace to Log feature. </i>
### Node.JS Sails

1. Install nodejs dependencies and save it in `package.json` using 

   ```docker
   RUN npm install --save elastic-apm-node@^3.20.0 
   RUN npm install --save sf-apm-lib@^1.0.2 
   ```

   or update `package.json` file with following entries:

   ```javascript
   "elastic-apm-node": "^3.20.0" 
   "sf-apm-lib": "^1.0.2" 
   ```

    And run ‘npm install’ to install dependencies

2. Add initilization code at start of the file in `globals.js` present in config folder. 

   1. Get Snappyflow trace config using

      ```javascript
      const Snappyflow = require('sf-apm-lib'); 
      var sfObj = new Snappyflow(); // Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml.

      // Add below part to manually configure the initialization 
      let projectName = process.env.SF_PROJECT_NAME; 
      let appName = process.env.SF_APP_NAME; 
      let profileKey = process.env.SF_PROFILE_KEY; 
      sfObj.init(profileKey, projectName, appName); // Manual override

      let sfTraceConfig = sfObj.getTraceConfig();

      // Start Trace to log feature section
      // Add below line of code to enable Trace to log feature:
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      // Option Configs for trace to log
      // Add below line to provide custom documentType (Default:"user-input"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      // Add below line to provide destination index (Default:"log"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' // Applicable values(log, metric)
      // End trace to log section
      ```

   2.  Initialize apm object using

      ```javascript
      var apm; 
      try { 
         apm = require('elastic-apm-node').start({ 
            serviceName: '<SERVICE_NAME>', // Specify your service name for tracing 
            serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
            globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
            verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
            active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
            stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
            captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
            metricsInterval: '0s',
            usePathAsTransactionName: true 
         }) 
      } catch (e) { 
         console.log(e); 
      } 
      ```

   3. Attach apm object to globals – This is required so we can use apm variable in other files as part of global sails object. 

      ```javascript
      module.exports.globals = { 
         _: require('@sailshq/lodash'), 
         async: false, 
         models: true, 
         sails: true, 
         apm : apm, 
         logger: logger 
      }; 
      ```

   4. Also add middleware in `http.js` file present in config folder. Which allows to instrument our code. 

      ```javascript
      module.exports.http = { 
         middleware: { 
            order: [ 
               'elasticAPM' 
            ], 
            elasticAPM: (function () {  
               return function (err, req, res, next) { 
               apm.middleware.connect(); 
               if (typeof err !== 'undefined') 
                  apm.captureError(err); 
               return next(); 
               }; 
            })() 
         } 
      }; 
      ```

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in `docker-compose.yml` or docker stack deployment file or at command line when using docker run command for deployment. 

   Eg: 

   Docker-compose and stack: https://docs.docker.com/compose/environment-variables/ 

   Docker run cli command: 

   ```docker
   docker run -d -t -i -e SF_PROJECT_NAME='<SF_PROJECT_NAME>' \  
   -e SF_APP_NAME='<SF_APP_NAME>' \ 
   -e SF_PROFILE_KEY='<snappyflow profile key>' \ 
   --name <container_name>  <dockerhub_id/image_name> 
   ```

4. Once your server is up and running you can check trace in Snappyflow Server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created go to 

   View dashboard -> Click on Tracing on lef side bar -> Click on view transaction -> Go to real time tab 

5. For complete code refer sample app refer at: 

   https://github.com/snappyflow/tracing-reference-apps/tree/master/RefappNodeSail 

6. <b>Note</b>: <i> 'captureBody':'all' config should be present in apm agent code instrumentation for Trace to Log feature. </i>

## ECS

### Node.JS Express

1. Install nodejs dependencies and save it in `package.json` using

   ```javascript
   npm install --save elastic-apm-node@^3.20.0 
   npm install --save sf-apm-lib@^1.0.2 
   ```

   or update `package.json` file with following entries

   ```javascript
   "elastic-apm-node": "^3.20.0" 
   "sf-apm-lib": "^1.0.2" 
   ```

   And run `npm install` to install dependencies 

2. Add initilization code at start of the file in `app.js`

   1. Get Snappyflow trace config using:

      ```javascript
      const Snappyflow = require('sf-apm-lib'); 
      var sfObj = new Snappyflow(); // Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml.

      // Add below part to manually configure the initialization 
      let projectName = process.env.SF_PROJECT_NAME; 
      let appName = process.env.SF_APP_NAME; 
      let profileKey = process.env.SF_PROFILE_KEY; 
      sfObj.init(profileKey, projectName, appName); // Manual override

      let sfTraceConfig = sfObj.getTraceConfig();

      // Start Trace to log feature section
      // Add below line of code to enable Trace to log feature:
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      // Option Configs for trace to log
      // Add below line to provide custom documentType (Default:"user-input"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      // Add below line to provide destination index (Default:"log"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' // Applicable values(log, metric)
      // End trace to log section

      ```

   2. Initialize apm object using

      ```javascript
      var apm; 
      try { 
         apm = require('elastic-apm-node').start({ 
            serviceName: '<SERVICE_NAME>', // Specify your service name for tracing 
            serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
            globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
            verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
            active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
            stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
            captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
            metricsInterval: '0s',
            usePathAsTransactionName: true
         }) 
      } catch (e) { 
         console.log(e); 
      } 
      ```

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in add container section of task definitions. 

   https://docs.aws.amazon.com/AmazonECS/latest/developerguide/taskdef-envfiles.html 

4. Once your server is up and running you can check trace in Snappyflow Server. 

   For viewing trace in Snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created go to: View dashboard -> Click on Tracing on left side bar   -> Click on view transaction -> Go to real time tab 

5. For complete code refer sample app refer at: 

   https://github.com/snappyflow/tracing-reference-apps/tree/master/refapp-express 

6. <b>Note</b>: <i> 'captureBody':'all' config should be present in apm agent code instrumentation for Trace to Log feature. </i>

### Node.JS Sails

1. Install nodejs dependencies and save it in `package.json` using

   ```javascript
   npm install --save elastic-apm-node@^3.20.0  
   npm install --save sf-apm-lib@^1.0.2 
   ```

   or update `package.json` file with following entries

   ```javascript
   "elastic-apm-node": "^3.20.0" 
   "sf-apm-lib": "^1.0.2" 
   ```

   And run `npm install` to install dependencies 

2. Add initialization code at start of the file in `globals.js` present in config folder. 

   1. Get Snappyflow trace config using

      ```javascript
      const Snappyflow = require('sf-apm-lib'); 
      var sfObj = new Snappyflow(); // Initialize Snappyflow. By default intialization will take profileKey, projectName and appName from sfagent config.yaml.

      // Add below part to manually configure the initialization 
      let projectName = process.env.SF_PROJECT_NAME; 
      let appName = process.env.SF_APP_NAME; 
      let profileKey = process.env.SF_PROFILE_KEY; 
      sfObj.init(profileKey, projectName, appName); // Manual override

      let sfTraceConfig = sfObj.getTraceConfig();

      // Start Trace to log feature section
      // Add below line of code to enable Trace to log feature:
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_redact_body=true'
      // Option Configs for trace to log
      // Add below line to provide custom documentType (Default:"user-input"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_documentType=<document-type>'
      // Add below line to provide destination index (Default:"log"):
      sfTraceConfig['SFTRACE_GLOBAL_LABELS'] += ',_tag_IndexType=<index-type>' // Applicable values(log, metric)
      // End trace to log section

      ```

   2. Initialize apm object using

      ```javascript
      var apm; 
      try { 
         apm = require('elastic-apm-node').start({ 
            serviceName: '<SERVICE_NAME>', // Specify your service name for tracing 
            serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
            globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
            verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
            active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
            stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
            captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
            metricsInterval: '0s',
            usePathAsTransactionName: true
         }) 
      } catch (e) { 
         console.log(e); 
      } 
      ```

   3. Attach apm object to globals – This is required so we can use apm variable in other files as part of global sails object

      ```javascript
      module.exports.globals = { 
         _: require('@sailshq/lodash'), 
         async: false, 
         models: true, 
         sails: true, 
         apm : apm, 
         logger: logger 
      }; 
      ```

   4. Also add middleware in `http.js` file present in config folder. Which allows to instrument our code

      ```javascript
      module.exports.http = { 
         middleware: { 
            order: [ 
               'elasticAPM' 
            ], 
            elasticAPM: (function () { 
               return function (err, req, res, next) { 
                  apm.middleware.connect(); 
                  if (typeof err !== 'undefined') 
                     apm.captureError(err); 
                  return next(); 
               }; 
            })() 
         } 
      }; 
      ```

3. Provide `SF_PROJECT_NAME`, `SF_APP_NAME`, `SF_PROFILE_KEY` as an environment variables in add container section of task definitions. 

   https://docs.aws.amazon.com/AmazonECS/latest/developerguide/taskdef-envfiles.html 

4. Once your server is up and running you can check trace in Snappyflow Server. 

   For viewing trace in snappyflow server make sure project and app name is created or discovered with project name and app name specified in point no.2 

   Once project and app name is created go to  

   View dashboard -> Click on Tracing on lef side bar -> Click on view transaction -> Go to real time tab 

5. For complete code refer sample app refer at: 

    https://github.com/snappyflow/tracing-reference-apps/tree/master/RefappNodeSail 

6. <b>Note</b>: <i> 'captureBody':'all' config should be present in apm agent code instrumentation for Trace to Log feature. </i>

## AWS Lambda

1. Install dependency libraries in the node_modules directory using the npm install command

   ```javascript
   npm install sf-apm-lib@^1.0.2 
   npm install elastic-apm-node@^3.20.0 
   ```

   Ref: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html 

2. Instrument lambda function to enable tracing 

   1. Add code outside lambda handler method to get tracing config and create trace client 

      ```javascript
      // SnappyFlow Tracing config 
      const Snappyflow = require('sf-apm-lib');

      let projectName = process.env.SF_PROJECT_NAME; 
      let appName = process.env.SF_APP_NAME; 
      let profileKey = process.env.SF_PROFILE_KEY; 

      var sfObj = new Snappyflow(); 
      sfObj.init(profileKey, projectName, appName); 

      var apm; 
      try { 
         var sfTraceConfig = sfObj.getTraceConfig(); 
         apm = require('elastic-apm-node').start({ 
            serviceName: '<SERVICE_NAME_CHANGEME>', 
            serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'], 
            globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'], 
            verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'], 
            active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true, 
            stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'], 
            captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES'],
            captureBody: 'all' ,
            metricsInterval: '0s',
            usePathAsTransactionName: true
        }) 
      } catch (e) { 
         console.log(e) 
      } 
      ```

   2. Add custom instrumentation inside lambda handler method 

      Ref: https://www.elastic.co/guide/en/apm/agent/nodejs/current/custom-transactions.html 

      https://www.elastic.co/guide/en/apm/agent/nodejs/current/custom-spans.html 

      ```javascript
      // Create custom transaction 
      var trans = apm.startTransaction('lambda handler', 'lambda');  
      //Create custom span is needed 
      var span = apm.startSpan('parse json'); 
      // your CODE here 
      // End of span 
      if (span) span.end() 
      //Some more code part of the transaction or add more spans here. Don’t RETURN/EXIT  //end custom transaction 
      trans.result = 'success'; 
      trans.end();	 
      // RETURN code 
      ```

   3. Deploy the lambda app. Follow README to test sample app 

      Reference app: 

      https://github.com/upendrasahu/aws-lambda-nodejs-tracing-sample

   4. Configure Lambda function before trigger/invoke. 

      1. Add the environment variable `SF_PROFILE_KEY` and set the value to your profile key copied from SnappyFlow. 

      2. Add environment variables `SF_APP_NAME` and `SF_PROJECT_NAME` with appropriate values. Create this Project and Application in SnappyFlow if not already present. 

        <img src="images\nodejs_lambda_1.png" />

   5. At this point you can trigger lambda function and get tracing data in SnappyFlow.

   
## Log Correlation

If you are using existing logger in your application then embed transaction id, trace id and span id using elastic apm node client object which was created at the start of the application. For more info refer apm initialization code.

Eg.
```javascript
   var traceId = 'None';
   var transactionId = 'None';
   var spanId = 'None';
   if (typeof(apm) !== 'undefined') {

      var apmTraceObj = apm.currentTraceIds; // Apm object having current trace ids
      transactionId = apmTraceObj['transaction.id'] || 'None';
      traceId = apmTraceObj['trace.id'] || 'None';
      spanId = apmTraceObj['span.id'] || 'None';
   }
   var msg = `[${moment().format('DD/MMM/YYYY hh:mm:ss')}] [${level}] [${msg}] | elasticapm transaction.id=${transactionId} trace.id=${traceId} span.id=${spanId}\n`
```

For using Log correlation in application log file refer:
https://www.elastic.co/guide/en/apm/agent/nodejs/current/log-correlation.html

### Adding custom Snappyflow logger for log correlation

```javascript
   //Copy logger file from snappyflow reference app to location where you want to put. Initialize logger in your app using following code:

   const logger = require("./logger").Logger;

   logger.attachAPM(apm);
   logger.setLogFilePath('/var/log/trace/ntrace.log');  //Put log file in /var/log/trace folder
   logger.init();

   //Write log 
   logger.debug('Hello world get api called')
   logger.info('Hello world get api called')
   logger.error('Some error ocurred')
```
For code reference refer: https://github.com/snappyflow/tracing-reference-apps/blob/master/refapp-express/logger.js

---

## Send log correlation data to snappyflow server

Below are the modes for sending log correlated data to snappyflow server

### <b> For Appliance </b>

Install sfagent and create config file.

Refer: https://docs.snappyflow.io/docs/Integrations/os/linux/sfagent_linux

Add elasticApmLog plugin to sfagent config.yaml and restart sfagent service.
Eg. Config.yaml
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
         log_path: /var/log/trace/ntrace.log  # Your app log file path
```

### <b> For Kubernetes </b>

Specify following values in metadata labels section of deployment file.
```yaml
snappyflow/appname: <SF_APP_NAME>
snappyflow/projectname: <SF_PROJECT_NAME>
snappyflow/component: gen-elastic-apm-log # This is must for tracing log correlation
```
### Sample deployment file
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    io.kompose.service: express-node
    snappyflow/appname: '<sf_app_name>'
    snappyflow/projectname: '<sf_project_name>'
    snappyflow/component: gen-elastic-apm-log
  name: express-node
spec:
  replicas: 1
  selector:
    matchLabels:
      io.kompose.service: express-node
  strategy: {}
  template:
    metadata:
      labels:
        io.kompose.service: express-node
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
          name: express-node
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

<b><i>Note: For kubernetes mode we need sfagent pods to be running inside kubernetes cluster where your application pods are deployed.</i></b> 

For viewing trace and logs in Snappyflow server make sure project and app name is created or discovered.
Once project and app name is created.

Go to: View App dashboard -> Click on Tracing on left side bar   -> Click on view transaction -> Go to real time tab
Then click on any trace and go to logs tab to see the correlated logs to trace.

```javascript
// Note: To get trace in snappyflow server we need log entries to adhere following log format:
<date in following format>
[10/Aug/2021 10:51:16] [<log_level>] [<message>] | elasticapm transaction.id=<transaction_id> trace.id=<trace_id> span.id=<span_id>
```