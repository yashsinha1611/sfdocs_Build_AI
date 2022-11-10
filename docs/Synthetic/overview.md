# Synthetic Documentation
 
sfPoller synthetic consists of collections. A collection(or group) is a list of APIs. Every collection is executed at regular interval defined by the user.
 
## Steps to add a synthetic

<img src="/img/synthetic_img/step.png" />
<br/>
<br/>
1. Add Collection : Provide name , project name , app name , interval and tags(optional)

<img src="/img/synthetic_img/step1.png" />
<br/>
<br/>
2. In order to add API to a collection , click on add API icon (highlighted in image above)
Add API: Provide name , method , headers , body .

<img src="/img/synthetic_img/step2.png" />

<img src="/img/synthetic_img/step3.png" />
<br/>
<br/>
3. Save your configuration in sfPoller and basic synthetic monitoring is setup. 
<br/>
<br/>

:::note

All the APIs added in the collection will be executed in sequential order.

:::


## Global Setting in Collection

Sometimes , User may want to define some constant values for key or tokens etc . This can be done using global setting option in collection.


<img src="/img/synthetic_img/global_setting.png" />

As shown in above image , highlighted host httpbin.org is common in 2 APIs . This can be set as a constant in global settings. 

<img src="/img/synthetic_img/global_setting1.png" />

<img src="/img/synthetic_img/global_setting2.png" />

Here , we have defined a global variable host : httpbin.org 


Now , in order to use this global variable in API , we need to call it using syntax **`${host}`**

<img src="/img/synthetic_img/global_setting3.png" />

<img src="/img/synthetic_img/global_setting4.png" />

This way user can define constants in global setting and use them in API’s config .

## Chaining in sfPoller Synthetic

Sometimes , APIs are dependent on some headers/body of other APIs . These use cases  may be not possible in basic synthetic setup shown above. In order to do this , chaining is required. 

Example:<br/>
	Lets add a sample login API 


<img src="/img/synthetic_img/chaining.png" />
<img src="/img/synthetic_img/chaining2.png" />


This API gives response as :

```json
{
    "status":"success",
    "token":"123456789"
}
```

Now , in order to call other API lets say, /users token is required in headers. 
So, user can define a global variable to save login api response key token.


Here , in order to capture response of login api we use syntax <br/> 
**`${api1.response.body.json.token}`**

Format : **`apiname <.> (response or request) <.> (body or header) <.>[ (json)<.>(json_key)]`**

Json key can be nested also . <br/>
for example:

```json
{
    "key":{
        "key1":"value"
    }
}
```

Then if we have to capture key1 , syntax will be **`json.key.key1`**

Lets define a global variable login_token to use in /users API.

<img src="/img/synthetic_img/user_api.png" />

Now , we can use the global variable defined in the /users api.

<img src="/img/synthetic_img/user_api2.png" />

After this , we have successfully defined our simple chained API request .

:::note

Please do remember to add API in the required order based on dependency.

:::

login -> users (as shown in above example)
 