---
sidebar_position: 3 
---
 # Custom Parser

## What is Custom Parser?

A custom parser enables you to customize the input format of the logs which are used monitoring. This is useful for handling unique data formats or specialized parsing needs in certain scenarios.

The SnappyFlow parser plugin is built using Fluent Bit constructs and  SnappyFlow support representation of these components in  YAML. To learn more about the representations of core components, please refer to the link provided below.

[Fluentbit Component Representation in SnappyFlow](https://docs.google.com/document/d/1YyRuqISYqYMqvoV80-a2ka9ouExDvgHGociLXEeubiE/edit?usp=sharing)

## Create a Custom Parser

#### Prerequisites

- Parser plugin should emit records with **time** field. The time representation should be associated with **Epoch Millisecond** value. 

- If the data is destined to log index, set  `type=logs`  and add a `message` field. The message field should not be empty.

#### Parser Plugin Format  

To create a custom parser, utilize the format specified below.

```
<-pluginName->
	documentType: <-docType->
	type: <-metrics/logs->
	pluginDisplayName: <-displayNameInUI->
	pluginGroupName: <-groupNameRenderedinUI->
	inputs:
	- List of Snappyflow Represented Input components
	parsers:
	- List of Snappyflow Represented Parser components
	filters:
	- List of Snappyflow Represented Filter components
```

#### Lua Filter Function

Create a Lua filter Function as shown below:

```
function <-function-name-> (tag, timestamp, record)
// business logic to modify record table
 return 1, timestamp, record
end
```

#### sfAgent Plugin Configuration

Utilize the format specified below to configure a plugin for logs.

```
logging:
  plugins:
    - name: user-input
      enabled: true
      config:
        log_path: log path seperated by comma
```



## Configure the sfAgent 

<img src="/img/log_management/custom_parser/image-1.png" />

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application**.

<img src="/img/log_management/custom_parser/image-2.png" />

2. Click the application, it will take you to the inventory page.

   <img src="/img/log_management/custom_parser/image-3.png" />

3. Select the **Configuration** tab and click the **Download configurations** option to download the existing configuration.

4. Downloaded collection will contain the below given files with pre-configured data.
    - `config.yaml` file
    - `custom_logging_plugins.yaml` file
    - `custom_script.lua` file

5. Updated the pre-configured files a give below:

   - Add **sfagent Plugin Configuration** to the `config.yaml` file.
   - Add **Parser Plugin Format** to the `custom_logging_plugins.yaml` file.
   - Add **Lua Filter Function** to the `custom_scripts.lua` file.

:::note

Do not modify any existing contents. Add the parser configuration to the existing data.

:::



6. To upload the updated agent configuration files, go to the **Application** tab in SnappyFlow and navigate to your **Project**.

7. Click the `...` Project menu icon.

  <img src="/img/log_management/custom_parser/image-5.png" /> 
  <br/>

8. Select the `Agent Configuration` option.

​       <img src="/img/log_management/custom_parser/image-6.png" /> 

​      <br/>

9. In the **Agent Configuration** window, click the `+ Add New Bundle` button.

<img src="/img/log_management/custom_parser/image-7.png" /> 

<br/>

10. Use the `Drag and drop` or `Browse` option the add the updated agent configuration files.
11. Give a Name to the bundle and add a description.
12. Click the ` Upload` button.

## Apply the Custom Parser

Follow the below steps to apply the custom parser configuration to an application.

1. Go to the **Application** tab in SnappyFlow and navigate to your **Project** > **Application**.
2. Click the application, it will take you to the inventory page.
3. Go to the **Configurations** tab.
4. Select the new sfagent configuration bundle and click the `Apply` option.
5. In the **Configuration Operation** pop-up window, select `Plugin Config Update` and click `Ok`.





