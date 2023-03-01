# Synthetic Monitoring



Synthetic Monitoring helps you understand how your applications are performing using simulated requests. These requests can be configured to test individual APIs or a series of APIs (called collections), designed to simulate real world user transactions. 

Monitoring these APIs helps you gain insights into API response times and their status codes.



## Prerequisites

Synthetic Monitoring requires setting up [sfPoller](/docs/sfPoller/overview) Appliance. sfPoller is an agent that runs on a dedicated virtual machine and is used to monitor cloud services, databases and APIs. sfPoller is required for both SnappyFlow cloud (SaaS) and SnappyFlow Self Hosted variants



## How it works

[sfPoller](/docs/sfPoller/overview) monitors individual APIs and API collections and sends the performance data to SnappyFlow dashboard. sfPoller Appliance contains all the necessary information on the list of APIs and API collections and other configuration information.

<img src="/img/sf-poller-diagram.svg" />



## Setting up sfPoller Appliance

Detailed instructions to setup sfPoller can be found [here](/docs/sfPoller/overview).



## Adding APIs to Collections

APIs are grouped together in a `Collection`. Collections help in organizing monitored APIs and defining global parameters such as API urls, keys or tokens that may be common to these APIs.

### Creating a Collection

1. Login to sfPoller Appliance and proceed to Synthetics tab and click on `Add Collection`.

<img src="/img/synthetic/new_collection.png" />

2. Provide a meaningful name for this collection , Project Name , App Name , Interval and tags(optional).

<img src="/img/synthetic/new_collection.png" />



3. Project Name and App Name must correspond to the Project and App names configured in SnappyFlow.

4. Interval is the time interval in seconds between simulations.

5. Click Save to complete creating a Collection.

### Adding APIs to Collections

1. To add APIs to a collection, click on the add API icon below `Actions`.

<img src="/img/synthetic/add_synthetic.png" />

2. Provide API name, Method (Get or Post), URL, Headers and Body for the simulated API call.

   <img src="/img/synthetic/add_synthetic_parameters.png" />

3. The `#Retries before failure` defines the number of times an API will be called before reporting a failure.

4. Click on Save to complete adding API.

5. The newly added APIs should now appear under the respective collection.

<img src="/img/synthetic/add_collection.png" />

:::note Order of Execution of APIs

APIs will be executed in a sequential order

:::

### Global Variables for Collections

For a bunch of APIs in a collection, certain parameters like URLs may be constant. These constant values can be assigned to Global Variable a Collections level and it can be used in all APIs belonging to the Collection.

For example, in the scenario shown below, a part of the URL, `sfpoller.us-west-2.compute.amazonaws.com` ` is common for both the APIs. This url can be stored in a Global Variable and can be called as required for the APIs in the collection.

<img src="/img/synthetic/common_url.png" />

### Defining and Using Global Variables

1. Click on the settings icon under `Actions` .

   <img src="/img/synthetic/global_constants.png" />

2. Define the required Global Variables in the form of key value pairs and click on Save. In the below example, the variable `host` will now correspond to `sfpoller.us-west-2.compute.amazonaws.com` whenever called.

   <img src="/img/synthetic/global_constants_parameters.png" />

3. To use these Global Variables, use the below syntax

   ```
   ${key}
   ```

   `${key}` will be replaced by the corresponding value that was defined in the global variable.

   <img src="/img/synthetic/calling_global_constants.png" />

4. To change URLs for all the APIs in a collection, simply change the global value. 

   <img src="/img/synthetic/global_constants_example.png" />

## Creating API chains

In many cases, calling an APIs requires a response from a different API. Testing these APIs sequentially may not be possible using the methods described above. Creating API chains allows taking the response from an API and feeding it to the next API.

Consider the below example where a Login API provides a status and a login token as a repsonse. The token value can be stored in a variable and can then be used in various other APIs for authentication.

<img src="/img/synthetic/calling_login_api.png" />

:::note Login API response

{

  "status":"success",

  "token":"123456789"

}

:::

### Using and Storing API responses in variables

#### Using API responses

To use an API response from the login API example above, use the following syntax 

```
${sfpoller-login.response.body.json.token}
```

The general syntax is 

```
apiname<.> (response or request) <.> (body or header) <.>[ (json)<.>(json_key)]
```

Json key can also be be nested. For example, if Json is 

```
{
    "key":{
        "key1":"value"
    }
}
```


And, to capture key1, syntax will be `json.key.key1`

#### Storing API responses globally in Collections

API responses can be stored in variables and called as required at a Collections level. 

Go to settings under `Actions` in collections to define global variables. In the example below. the key `sfpoller-token` now stores the value `${sfpoller-login.response.body.json.token}`

<img src="/img/synthetic/global_variable_api_response.png" />

Now , this Global Variable `sfpoller-token` which holds the token value from the login API can be used in other API requests.

<img src="/img/synthetic/global_variable_chaining.png" />

:::note Add APIs in the right order

APIs need to be added in the right sequence for a successful simulation. In the example show above, the Login API is defined first and then the Version API is called

:::
