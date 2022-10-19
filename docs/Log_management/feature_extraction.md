import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Feature Extraction - Extract data from raw logs

## Overview

Feature Extraction allows processing of unstructured logs and enhances it by adding metadata extracted from the log. Using simple queries, search for specific information and store them in different variables that can then be used in dashboards and log search. 

This is especially useful in cases where required data is not part of a structured key:value pair and instead the data is part of a message or any log line. Multiple Feature Extraction operations can be setup and run in parallel on various types of logs. These



## Setting up & Viewing Feature Extractions

Feature Extraction can be setup only for any logs and this is applicable at an Application level. Once setup, all ingested logs for that application are processed at ingest time based on the specific rules provided.

:::note

Feature Extraction only works for logs ingested post setting up the operation. 

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

:::danger <h3>Read below passage to use Feature Extraction effectively</h3>



Imagine a cursor or pointer at the beginning of a log line. This cursor can be moved along the log line from left to right to reach a particular position of interest. This is called **skipping**. The character/word that immediately follows the cursor is processed based on the query provided. This is called **extracting**.

:::




**The general syntax for creating a query is**

`parse(field_name): command`

`field_name` is the name of the field in the log whose content is to be parsed. The contents of `field_name` are parsed character by character from left to right based on `command`.

`command` comprises of single or multiple functions which are executed ony by one on the contents of `field_name`. It is possible to extract specific information and store it in a variable.





### Feature Extraction Example ###

    parse(message): skipword(1) skip(“word1 word2”) test=extractword(1) decimal=extractnum().format(“float”)

In the above query, the `message` field is parsed.

The command comprises of multiple functions such as `skipword()`, `skip()`, `extractword()` and `extractnum()`. The extracted content from the function `extractnum().format("float")` is stored in a variable called `decimal` in floating point.


## Functions used in Feature Extraction Queries ##

There are mainly two type of functions - Skip and Extract.

| Skip Functions | Extract Functions |
|--|--|
| [skip](#skip) | [extractword](#extractword) |
| [skipchar](#skipchar) | [extractchar](#extractchar) |
| [skipword](#skipword) | [extractnum](#extractnum) |
| [skipuntil](#skipuntil) | [extractuntil](#extractuntil) |
|  | [extractpattern](#extractpattern) |
|  | [extractjson](#extractjson) |
|  | [extractregex](#extractregex) |
|  | [extractregexgroup](#extractregexgroup) |
|  | [extractkeyvalue](#extractkeyvalue) |
|  | [extractjsonkeys](#extractjsonkeys) |
|  | [extracttime](#extracttime) |
|  | [extracttillend](#extracttillend) |
|  | [inextractkeyvalue](#inextractkeyvalue) |







