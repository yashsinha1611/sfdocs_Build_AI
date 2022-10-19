# Skip Functions

## Overview

Skip functions are used in [Feature Extractions](/docs/Log_management/feature_extraction) and allow moving the pointer/imaginary cursor to a position of interest in the log line.

## skip

This function is used to skip a particular word in the log line. 

:::info Syntax

skip("wordtoskip") where `wordtoskip` is the word to be skipped. Note that double quotes are required.

:::

:::note Example

Consider the Log line **Update-mapping for Metric-7kjdgp3g hosted from master-2**

Using skip(“for”), the pointer will look for the word `for` and move the imaginary cursor after the word `for`

**<u>Initial pointer position</u>**

`|`Update-mapping for Metric-7kjdgp3g hosted from master-2

**<u>Final pointer position</u>**

Update-mapping for `|` Metric-7kjdgp3g hosted from master-2

:::



## skipword ##

This function is used to skip a given number of words. This function assumes each word is separated by a single `space`. The pointer position moves to the end of the `space` after the Nth word.

:::info Syntax

skip("N") where `N` is the number of words to be skipped.

::: 

:::note  Example

Consider the Log line **Update-mapping for Metric-7kjdgp3g hosted from master-2**. Using skip(“5”), the pointer will skip five words. In this example, the pointer or imaginary cursor is denoted by `|`.

**<u>Initial pointer position</u>**

`|`Update-mapping for Metric-7kjdgp3g hosted from master-2

**<u>Final pointer position</u>**

Update-mapping for Metric-7kjdgp3g hosted from `|`master-2



:::



## skipchar ##

This function is used to skip N number of characters. The pointer position is always after the Nth skipped character.

:::info Syntax


skipchar(N) where `N` is the number of characters to skip.

:::

:::note Example

Consider the Log line <b>"This is an example list." </b>

Using `skipchar(7)` moves the pointer 5 characters to the right. 

In this example, the pointer or imaginary cursor is denoted by `|`.

**<u>Initial pointer position</u>**

`|`This is an example list.

**<u>Final pointer position</u>**

This is`|` an example list.

:::






## skipuntil ##



This function is used to skip until the string as specified is found. It skips only until the first occurrence of the string.

:::info Syntax
 skipuntil("wordtoskip",includeword)

`wordToSkip` is a string and denotes the word until which the cursor skips.

- If wordToSkip is specified as `$numeric$`, everything until the first occurrence of a number is skipped.
- If wordToSkip is specified as `$special$`, everything until the first occurrence of a special character is skipped.

`includeWord`  is an integer which denotes whether to include the `wordtoskip`

Use `0` to exclude and `1` to include the `wordtoskip`

- The pointer position is before the `wordToSkip` if `includeWord` is `0`.
- The pointer position is after the `wordToSkip` if `includeWord` is `1`.

:::

:::note Example

Consider the Log line **Running full sweep for node-116**

Using skipuntil(“for”, 0) skips the pointer position to the beginning of the the first occurrence of the word `for`

In this example, the pointer or imaginary cursor is denoted by `|`.

**<u>Initial pointer position</u>**

`|`Running full sweep for node-116

**<u>Final pointer position</u>**

Running full sweep `|` for node-116

The remaining log line after skipping will be **for node-116**

:::