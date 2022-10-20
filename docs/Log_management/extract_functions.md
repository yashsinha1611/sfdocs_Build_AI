# Extract Functions

## Overview

Extract functions allow extracting specific information from the log line.

[extractword](#extractword)

[extractchar](#extractchar)

[extractnum](#extractnum)

[extracttime](#extracttime) 

[extractuntil](#extractuntil)

[extractpattern](#extractpattern) 

[extractjson](#extractjson) 

[extractregex](#extractregex) 

[extractregexgroup](#extractregexgroup) 

[extractkeyvalue](#extractkeyvalue) 

[extractjsonkeys](#extractjsonkeys) 

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

## extracttime

This function extracts timestamps from the log line in any format and converts to UTC format (yyyy-mm-ddThh.mm.ss.msmsms) if required. 

```
UTC Time format
      YYYY-MM-DDThh:mm:ss.sTZD (eg 1997-07-16T19:20:30.45+01:00)

where

	 YYYY = four-digit year
     MM   = two-digit month (01=January, etc.)
     DD   = two-digit day of month (01 through 31)
     hh   = two digits of hour (00 through 23) (am/pm NOT allowed)
     mm   = two digits of minute (00 through 59)
     ss   = two digits of second (00 through 59)
     s    = one or more digits representing a decimal fraction of a second
     TZD  = time zone designator (Z or +hh:mm or -hh:mm)
```

An offset can also be added to the time data. Offsets are useful when incoming logs have timestamps corresponding to a different timezone other than UTC. Post extraction, the pointer position moves to the end of the time data.

:::info Syntax


extracttime(offset), where `offset` specifies the offset in hours and minutes in the format +hhmm. For example, `+0530` means the log time is ahead of UTC time by 5 hours and 30 minutes.

If log time is the same as UTC time, offset will be `+0000`.

Usage: var=extracttime(offset), where ‘var’ denotes the variable to which the extracted value is assigned.

:::

:::note Example

For example,

Consider the log line **Log index copied to Master-node-1 at 2022-10-20T12:45:35.865960748Z**

**Initial pointer position**

Log index copied to Master-node-1 at `|`2022-10-20T12:45:35.865960748Z

Using `res=extracttime(“+0000”)`, extracts the time `2022-01-05T17:38:46.606Z` without any offset and stores it in the variable `res`

Using `res=extracttime(“+0530”)`, extracts the time and offsets it by 5 hours and 30 minutes i.e. `2022-01-05T17:38:46.606Z` and stores it in the variable `res`



**Updated pointer position**

In both the above examples, the pointer position moves to the end of the timestamp

Log index copied to Master-node-1 at 2022-10-20T12:45:35.865960748Z`|`

:::

## extractuntil

This function extracts all characters until 

- **A specified** string 

  (or) 

- **ANY** number or

  (or) 

- **ANY** special character 

is found. It extracts only until the first occurrence of the given input. 

:::info Syntax


extractuntil(wordToExtract, includeWord)

where, `WordToExtract` can be

a string until which the extraction is to be done.

(or)

`$numeric$` In this case, everything until the first occurrence of any number is extracted.

(or)

 `$special$` In this case, everything until the first occurrence of any special character is extracted.

`includeWord` is an integer and denotes whether to include the `WordToExtract`

- Use `0` to include the `WordToExtract`
- Use `1` to exclude the `WordToExtact`



**Pointer position**

The pointer position is always after the `WordToExtract` irrespective of whether `includeWord` is `0` or `1`



:::

:::note Example


In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **3675 errors in backend $audit-log**

**Initial pointer position**

`|`3675 errors in backend $audit-log

Using `test-word=extractuntil(“errors”,1)`, stores all characters in the log  until the first occurrence of `errors` i.e. `3675 errors`in the variable `test-word` and pointer moves to the end of the string error.

Using `test-word=extractuntil(“errors”,0)`, stores all characters in the log  until the first occurrence of `errors` but excludes the string `errors`i.e. `3675`in the variable `test-word` and pointer moves to the end of the string error.

In both the above examples the pointer position moves to end of the string `errors`.

3675 errors`|` in backend $audit-log

:::

## extracttillend

This function is used to extract all characters till the end of the log line and store the extracted string as a value of a key as specified by the user.

:::info Syntax



`var=extracttillend()` where `var` is the variable that will store the extracted string

:::

:::note Example

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Error404 received due to Authentication token failure**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using `final-word=extracttillend()` stores all characters until the end of the log line in the variable `final-word`

**Updated pointer position**

Error404 received due to Authentication token failure`|`

:::

## extractpattern





## extractjson





## extractregex





## extractregexgroup



## extractkeyvalue



## extractjsonkeys







## inextractkeyvalue

