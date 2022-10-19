import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Feature Extraction - Extract data from raw logs

## Overview

Feature Extraction allows processing of unstructured logs and enhances it by adding metadata extracted from the log. Using simple queries, search for specific information and store them in different variables that can then be used in dashboards and log search. 

This is especially useful in cases where required data is not part of a structured key:value pair and instead the data is part of a message or any log line. Multiple Feature Extraction operations can be setup and run in parallel on various types of logs. These



## Setting up & Viewing Feature Extractions

Feature Extraction can be setup only for any logs and this is applicable at an Application level. Once setup, all ingested logs for that application are processed at ingest time based on the specific rules provided.

:::note

Feature Extraction only works on logs ingested post setting up the operation. 

:::

Feature Extraction is available under the Logs dropdown in all application homepages.


<img src="/img/feature_extraction/feature_extraction_tab.png" />



Under Feature Extraction, there are two tabs `Data View` and `Operations`

<img src="/img/feature_extraction/ui.png" />


### Data View Tab

The Data View tab shows all the logs ingested for the respective application. Using the Filters and Feature Extraction query, target information can be searched. To create a new Feature Extraction query, type in the query in the search box and hit Search. Only for successful search operations, save button will be activated. All saved queries can be found in the Operations tab.

<img src="/img/feature_extraction/data_view.png" />


### Operations Tab

The Operations View tab lists all the Feature Extraction operations that have been saved and their current status. 

<img src="/img/feature_extraction/operations_view.png" />

## How it works ##

:::danger Read below passage to use Feature Extraction effectively



Imagine a cursor or pointer at the beginning of a log line. This cursor can be moved along the log line from left to right to reach a particular position of interest. This is called **skipping**. The character/word that immediately follows the cursor is processed based on the query provided. This is called **extracting**.

Using a combination of skipping and extracting, useful information can be retrieved from any kind of unstructured logs.

:::




:::note **General syntax for creating a Feature Extraction**

`parse(field_name): command`

where, 

`field_name` is the name of the field in the log whose content is to be parsed. The contents of `field_name` are parsed character by character from left to right based on `command`.

`command` comprises of single or multiple functions which are executed ony by one, on the contents of `field_name`. The function can either be a skip or an extract function.

:::



### Feature Extraction Example ###

    parse(message): skipword(1) skip(“word1 word2”) test=extractword(1) decimal=extractnum().format(“float”)

In the above query, the `message` field is parsed.

The command comprises of two skip functions  `skipword()`, `skip()` and two extract functions`extractword()` and `extractnum()`.  The variables `test` and `decimal` store the extracted data from the log line. 


## Functions used in Feature Extraction Queries ##

There are mainly two type of functions - Skip and Extract.

| Skip Functions | Extract Functions |
|--|--|
| [skip](/docs/Log_management/skip_functions#skip) | [extractword](/docs/Log_management/extract_functions#extractword) |
| [skipchar](/docs/Log_management/skip_functions#skipchar) | [extractchar](/docs/Log_management/extract_functions#extractchar) |
| [skipword](/docs/Log_management/skip_functions#skipword) | [extractnum](/docs/Log_management/extract_functions#extractnum) |
| [skipuntil](/docs/Log_management/skip_functions#skipuntil) | [extractuntil](/docs/Log_management/extract_functions#extractuntil) |
|  | [extractpattern](/docs/Log_management/extract_functions#extractpattern) |
|  | [extractjson](/docs/Log_management/extract_functions#extractjson) |
|  | [extractregex](/docs/Log_management/extract_functions#extractregex) |
|  | [extractregexgroup](/docs/Log_management/extract_functions#extractregexgroup) |
|  | [extractkeyvalue](/docs/Log_management/extract_functions#extractkeyvalue) |
|  | [extractjsonkeys](/docs/Log_management/extract_functions#extractjsonkeys) |
|  | [extracttime](/docs/Log_management/extract_functions#extracttime) |
|  | [extracttillend](/docs/Log_management/extract_functions#extracttillend) |
|  | [inextractkeyvalue](/docs/Log_management/extract_functions#inextractkeyvalue) |







