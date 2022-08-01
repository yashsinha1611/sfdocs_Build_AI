# Steps to install SnappyFlow RUM agent - Angular

:::note Prerequisites

Any web application developed using javascript based frameworks like Angular.
:::

## **Step 1: Install the sf-apm-rum agent**

cd to the project directory and run the below command
```bash
$ npm install --save sf-apm-rum 
```


## **Step 2: Import the sf-apm-rum package**

Add following path in angular.json under scripts
```js
'node_modules/sf-apm-rum/dist/sf-apm-rum.js'
```
Eg:
```scripts: ['node_modules/sf-apm-rum/dist/sf-apm-rum.js']```


## **Step 3: Configure the error handler**


Create a new file  `apm-error.handler.ts` in the add following code

```js
import { ErrorHandler } from "@angular/core";
declare const sfApm: any;

export class ApmErrorHandler extends ErrorHandler {

	constructor() {
		super()
	}

	handleError(error) {
		sfApm.apm.captureError(error.originalError || error)
		super.handleError(error)
	}

}
```

Then in `app.module.ts` add,
```js
import { ErrorHandler, NgModule } from '@angular/core';
import { ApmErrorHandler } from './apm.error-handler';
```

under imports add,
```js
providers: [
	{provide: ErrorHandler, useClass: ApmErrorHandler}
]
```

## **Step 4: Configure the sf-apm-rum agent**

Add the following code in the applications root component,
usually in app.component.ts

```js
declare const sfApm: any; // add it outside class

let apmRum = new sfApm.ApmRum(); // initialize the library

const apmData = {
	baseUrl: '<add-snappyflow-server-url-here>', // provide the URL of the snappyflow APM server that you are using to view the data
	profileKey: '<add-profile-key-here>', // paste the profile key copied from SF profile
	serviceName: '<your-apm-service-name>', // specify service name for RUM
	projectName: '<add-project-name-here>', // provide the snappyflow project name
	appName: '<add-application-name-here>', // provide the snappyflow application name
};
apmRum.init(apmData);
```

## **Step 5: Verify the setup**

Once the above mentioned steps are completed, restart the application and check for the RUM data in the Snappyflow APM server. For viewing RUM data in snappyflow server, make sure  the project and application is created or discovered with project name and app name specified in the [Step 3](#step3-configure-the-sf-apm-rum-agent).

Once application is available in the Snappyflow Server, Click on View dashboard -> Click on Real User Monitoring Tab on left side bar -> Go to Real Time Pane


## **Step 6: Debugging (In case of No Data in RUM Dashboard)**

##### i. **Check if data is available on the Snappyflow server**  
Navigate to the application dashboard -> Click on Browse Data -> Change the Index to "Real User Monitoring". Check if the data is available. If the data is available, it will be visible on the RUM Dashboard within few seconds.  

##### ii. **Check if the RUM data is sent from the configured application**  
Open the Developer tools for the configured web application on the browser -> Click on the Network Tab -> Trigger some actions in the application. Check if there is a `intake/v2/rum/events` call fired from the configured application side. If this call is made, it means that the data is being sent to the snappyflow server.   

##### iii. **Check if the configurations are correct**  
Check if the projectName and appName provided in the [Step 4](#step-4-configure-the-sf-apm-rum-agent) are matching the project name and application name in the snappyflow server.  
  