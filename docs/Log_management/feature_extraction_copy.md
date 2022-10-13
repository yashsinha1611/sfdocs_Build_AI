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

:::important

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

## Skip Functions ##
Skip function allows moving the imaginary cursor to the position of interest

### skipword(N) ###

This function is used to skip N number of words. This function assumes each word is separated by a single `space`. The pointer position is now immediately after the `space` at the end of Nth word.

#### Syntax and Usage ####
skipword(N), where N is an integer and denotes the number of words to skip.

#### Example ####

Consider the Log line "This is an example list."

Using `skipword(3)` moves the pointer 3 words to the right.

In this example, the pointer or imaginary cursor is denoted by `|`.

**Initial pointer position**

`|`This is an example list.

**Updated pointer position **

This is an `|`example list.

The remaining log line after skipping will be “example list.”

### skipchar(N) ###

This function is used to skip N number of characters. The pointer position is always after the Nth skipped character.

#### Syntax and Usage ####
skipchar(N), where N is an integer and denotes the number of characters to be skipped including spaces.
#### Example ####
Consider the Log line "This is an example list."

Using `skipchar(7)` moves the pointer 5 characters to the right.


In this example, the pointer or imaginary cursor is denoted by `|`.

**Initial pointer position**

`|`This is an example list.

**Updated pointer position **

This is`|` an example list.

The remaining log line after skipping will be “ example list.”

### skipuntil ###

This function is used to skip until the delimiter as specified by the user is found. It skips only until the first occurrence of the delimiter.

#### Syntax and Usage ####

skipuntil(wordToSkip, includeWord)
where,
-	wordToSkip is a string and denotes the delimiter until which skipping is done.
o	If wordToSkip is specified as $numeric$, everything until the first occurrence of a number is skipped.
o	If wordToSkip is specified as $special$, everything until the first occurrence of a special character is extracted.
-	includeWord (0-exclude/1-include) is an integer which denotes whether to include the delimiter in the skipping.
Here,
-	The pointer position is before the wordToSkip if includeWord is 0.
-	The pointer position is after the wordToSkip if includeWord is 1.

#### Example ####

Log line1: This is an example list.
Rule1: skipuntil(“an”, 0)
Updated pointer position (|): This is |an example list.
The remaining log line after skipping will be: “an example list.”

Rule2: skipuntil(“an”, 1)
Updated pointer position (|): This is an |example list.
The remaining log line after skipping will be: “example list.”

Log line2: 123 example log line 01/01/2022.

Rule1: skipuntil(“$numeric$”, 1)
Updated pointer position (|): 123 |example log line 01/01/2022.
The remaining log line after skipping will be: “example log line 01/01/2022.”

Rule2: res=extractuntil(“$special$”, 1)
Updated pointer position (|): 123 example log line 01/|01/2022.
The remaining log line after skipping will be: “01/2022.”

Log line3: Jan2022-Monday example log line.
Rule1: res=extractuntil(“$numeric$”, 0)
Updated pointer position (|): Jan|2022-Monday example log line.
The remaining log line after skipping will be: “2022-Monday example log line.”

Rule2: res=extractuntil(“$special$”, 0)
Updated pointer position (|): Jan2022|-Monday example log line.
The remaining log line after skipping will be: “-Monday example log line.”


## Extract Functions ##
Extract function allows retrieving particular information and this can be stored in a variable

<!-- New changes <Sourav> -->

