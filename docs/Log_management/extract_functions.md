# Extract Functions

## Overview

Extract functions allow extracting specific information from the log line.

[extractword](#extractword)

[extractchar](#extractchar)

[extractnum](#extractnum)

[extractuntil](#extractuntil)

[extractpattern](#extractpattern) 

[extractjson](#extractjson) 

[extractregex](#extractregex) 

[extractregexgroup](#extractregexgroup) 

[extractkeyvalue](#extractkeyvalue) 

[extractjsonkeys](#extractjsonkeys) 

[extracttime](#extracttime) 

[extracttillend](#extracttillend) 

[inextractkeyvalue](#inextractkeyvalue) 

## extractword

This function, extractword(N), extracts N number words and stores the result as a value in a key. A word is a continuous set of characters and two words are separated by a `space`. After extraction, the pointer position moves to the end of the  is always after the Nth word.

:::info Syntax

var=extractword(N), where N is an integer which denotes the number of words to extract and var is the variable name.

:::

:::note Example

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Error404 received due to Authentication token failure**





**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using `test=extractword(2)`, the variable `test` will now hold `Error404 received`.

**Updated pointer position**

Error404 received `|` due to Authentication token failure

:::

## extractchar

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::

:::note Example

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using `new-word=extractchar(7)`, seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::

## extractnum

This function extracts a number at the pointer position, and stores it in a specified format, integer or floating point. Default is integer. After extraction, the pointer position moves to the end of the number.

:::info Syntax



var=extractnum().format(type), where `var` is the variable name and `type` can be either `"int"` or `"float"`

:::

:::note Example

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **96.5 is the percentage usage of RAM**

**Initial pointer position**

`|`96.5 is the percentage usage of RAM

Using `RAM-util=extractnum()` or `RAM-util=extractnum().format(“int”)` extracts the value 96 and stores it in the variable `RAM-util`. 

Using `RAM-util=extractnum().format(“float”)`extracts the value 96.5 and stores it in the variable `RAM-util`

**Updated pointer position**

Note that the pointer position skips the whole number in both the use of integer and float 

96.5`|` is the percentage usage of RAM

:::

## extractuntil

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax


var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::

:::note Example


In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::

## extractpattern

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::

:::note Example

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::



## extractjson

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax


var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::

:::note Example


In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::



## extractregex

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax


var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::
:::note Example

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::



## extractregexgroup

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax


var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::
:::note Example

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::

## extractkeyvalue

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax


var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::

:::note Example


In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::

## extractjsonkeys

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax


var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::

:::note Example


In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::

## extracttime

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax


var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::

:::note Example


In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::

## extracttillend

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax


var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::

:::note Example


In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::

## inextractkeyvalue

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

:::info Syntax


var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

:::

:::note Example


In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

:::