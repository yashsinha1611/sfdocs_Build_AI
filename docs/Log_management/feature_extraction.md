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

:::note <h3>Read me</h3>

Read the below passage to use Feature Extraction effectively

**Imagine a cursor at the beginning of the log line. This cursor can be moved along the log line from left to right to reach a particular position that is of interest. The character/word that immediately follows the cursor is processed based on the query provided. **

:::




**The general syntax for creating a query is**

`parse(field_name): command`

`field_name` is the name of the field whose content is to be parsed. 

`command` comprises multiple functions which are executed ony by one on the parsed content. It is possible to extract specific information and store in a variable.

The contents of `field_name` are parsed character by character 



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


## Skip Functions ##
Skip function allows moving the imaginary cursor to the position of interest

### skipword ###

This function is used to skip a given number of words. This function assumes each word is separated by a single `space`. The pointer position moves to the end of the `space` after the Nth word.

#### Syntax and Usage ####
skipword(N), where N is an integer and denotes the number of words to skip.



<hr></hr>

### skipchar ###

This function is used to skip N number of characters. The pointer position is always after the Nth skipped character.

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>
    skipchar(N)
  </TabItem>
  <TabItem value="Usage" label="Usage" default>
  skipchar(5)

  skipchar(4)
  </TabItem>
  <TabItem value="Example" label="Example">
Consider the Log line <b>"This is an example list." </b>

Using `skipchar(7)` moves the pointer 5 characters to the right. 

In this example, the pointer or imaginary cursor is denoted by `|`.

**<u>Initial pointer position</u>**

`|`This is an example list.

**<u>Final pointer position</u>**

This is`|` an example list.

</TabItem>

</Tabs>


<hr></hr>

### skipuntil ###

This function is used to skip until the string as specified by the user is found. It skips only until the first occurrence of the delimiter.


<details>
  <summary><b>Example</b></summary>
  <div>
Consider the Log line "Running full sweep for node-116"

Using `skipuntil(“for”, 0)` moves the cursor to the first occurence of the word `for` and using `0` moves the cursor to the beginning of the word.

In this example, the pointer or imaginary cursor is denoted by `|`.

**Initial pointer position**

`|`Running full sweep for node-116

**Updated pointer position **

Running full sweep `|` for node-116

The remaining log line after skipping will be: “for node-116”
</div>
</details>


#### Syntax and Usage ####

skipuntil(wordToSkip, includeWord)


`wordToSkip` is a string and denotes the word until which the cursor skips.

o	If wordToSkip is specified as $numeric$, everything until the first occurrence of a number is skipped.
o	If wordToSkip is specified as $special$, everything until the first occurrence of a special character is extracted.
-	includeWord (0-exclude/1-include) is an integer which denotes whether to include the delimiter in the skipping.
Here,
-	The pointer position is before the wordToSkip if includeWord is 0.
-	The pointer position is after the wordToSkip if includeWord is 1.

