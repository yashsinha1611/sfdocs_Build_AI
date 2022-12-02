# Extract Functions

## Overview of Extract Functions

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

where, `WordToExtract` can be a string until which the extraction is to be done.

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

This function is used to extract predefined patterns like ip addresses, dns, urls etc. The function only identifies and extracts the first matching string and the pointer position updates to the end of the matching string.

:::info Syntax

`extractpattern(pattern)` where `pattern` specifies the patter to be identified and extracted.

**Supported patterns**

`"IPV4"` - This extracts IPV4 address in the format x.x.x.x

`"IPV6"` - This extracts IPV6 address in the format y:y:y:y:y:y:y:y or y:y:y:y:y:y:x.x.x.x

`"mac"` - This extracts mac address in the format x : x : x : x :x : x

`"url"`- This extracts url in the format http://abc.xyz.abc or https://abc.xyz.abc

`"hostname"` - This extracts hostnames from urls

:::

:::note Example



**Ipv4 address**

Consider the log line **127.0.0.1 is an example IPv4 address**

In this example, the pointer or imaginary cursor is denoted by `|`.

**Initial pointer position**

`|`127.0.0.1 is an example IPv4 address

Using `res=extractPattern(“IPv4”)`, the ip address `127.0.0.1` is extracted and stored in the variable `res`

**Updated pointer position**

127.0.0.1`|` is an example IPv4 address

<hr></hr>

**IPv6 address**

Consider the log line **2001:0db8:85a3:0000:0000:8a2e:0370:7334 is an example IPv6 address**

In this example, the pointer or imaginary cursor is denoted by `|`.

**Initial pointer position**

`|`2001:0db8:85a3:0000:0000:8a2e:0370:7334 is an example IPv6 address

Using `res=extractPattern(“IPv6”)`, the ip address `001:0db8:85a3:0000:0000:8a2e:0370:7334` is extracted and stored in the variable `res`

**Updated pointer position**

2001:0db8:85a3:0000:0000:8a2e:0370:7334`|` is an example IPv6 address

<hr></hr>

**MAC address**

Consider the log line  **00:00:5e:00:53:af is an example MAC address**

In this example, the pointer or imaginary cursor is denoted by `|`.

**Initial pointer position**

`|`00:00:5e:00:53:af is an example MAC address

Using `res=extractPattern(“MAC”)`, the MAC address `00:00:5e:00:53:af` is extracted and stored in the variable `res`



**Updated pointer position**

00:00:5e:00:53:af `|`is an example MAC address

<hr></hr>

**URL**

Consider the log line **https://www.google.com is an example URL address**

In this example, the pointer or imaginary cursor is denoted by `|`.

**Initial pointer position**

`|`https://www.google.com is an example URL address

Using `res=extractPattern(“URL”)`, the url `https://www.google.com` is extracted and stored in the variable `res`

**Updated pointer position**

`https://www.google.com| is an example URL address`

<hr></hr>

**Hostname**

Consider the log line **ec2-35-88-174-201.us-west-2.compute.amazonaws.com is an example hostname**

In this example, the pointer or imaginary cursor is denoted by `|`.



**Initial pointer position**

`|`ec2-35-88-174-201.us-west-2.compute.amazonaws.com is an example hostname

Using `res=extractPattern(“hostname”)`, the hostname `ec2-35-88-174-201.us-west-2.compute.amazonaws.com` is extracted and stored in the variable `res`

**Updated pointer position**

ec2-35-88-174-201.us-west-2.compute.amazonaws.com`|` is an example hostname.

:::

## extractjson

This function is used to extract JSON string from the log line. The extracted JSON string will be stored in a variable as specified by the user. The pointer position updates to the end of the extracted JSON. 

:::note Limitation

This function doesn’t work if there are 2 or more consecutive jsons.

:::

:::info Syntax

`var=extractJson()` where `var` denotes the variable to which the extracted JSON string is stored.

:::

:::note Example

Log line: *{“key1”: “value1”, “key2”: “value2”} is an example json.*

Rule: res=extractjson()

Updated pointer position (|): {“key1”: “value1”, “key2”: “value2”} **|**is an example json.

Output: “res”: “””{“key1”: “value1”, “key2”: “value2”}”””

:::

## extractregex

This function extracts the string from the log line which matches the regex pattern as specified. The pointer position updates to the end of the extracted match. The limitation here is that it does not work for more than one match.

To learn more about regex patterns, go to https://regex101.com/ . Select flavor as Java 8.

:::info Syntax

`var=extractregex(toMatch)`, where `toMatch` is the regex pattern of type string that is used to match a particular string in the log line. The regex pattern is to be enclosed within the double quotes and forward slashes `“/…/”` without leaving any spaces. `var` denotes the variable to which the extracted value is stored

:::

:::note Example

For example,

Consider the log line: **[a, b, c] is an example list**

Using `res=extractregex(“/^\[.*\]”/)`, `“[a, b, c]”` is extracted and stored in the variable `res`

:::

## extractregexgroup

This function extracts all the matched groups from the log line for a regex pattern as specified. The pointer position updates to the end of the last matched group.

:::info Syntax

`extractregexgroup(toMatch, extractToKey1.format1, extractToKey2.format2, …)`

where,

- ` toMatch` is the regex pattern of type string which is used to match all the groups from the log line. The regex pattern is to be enclosed within the double quotes and forward slashes `“/…/”` without leaving any spaces.
- `extractToKey` is the name of the key where the extracted matched group is to be stored.
- `format` specifies the conversion format for the extracted value (string, int, float).

:::

:::note Example

Consider the log line **root : TTY=unknown ; PWD=/home/centos ; USER=root ; COMMAND=/bin/rm –rf jmeter.log**

Using `extractregexgroup(“/TTY=\w+ ; PATH=([^\s]+) ; USER=(\w+) ; COMMAND=(.*)$/”, path.string, username.string, cmd.string)` extracts



 `/home/centos` to key `path`

`root` to key `username`

 `/bin/rm -rf jmeter.log` to key `cmd`

:::

## extractkeyvalue

This function is used to extract the key-value pairs from the log line. It scans the line from the current position till the end for all the possible key-value pairs. Every key-value pair should end with a delimiter. After extraction, the pointer position updates to the end of the last delimiter.

:::info Syntax

`extractkeyvalue(sep, del, numOfPairs)`

where,

- `sep` is a string and denotes the separator separating key from value.

- `de`l is a string and denotes the delimiter which separates the key-value pairs from each other.

- `numOfPairs` is an integer and denotes the number of pairs to be extracted.

:::

:::note Example

Consider the log line **key1:val1; key2:val2; key3:val3; are example key-value pairs**

Using `var = extractkeyvalue(“:”, “;”, 2)` extracts `key1 : val1, key2 : val2` and stores them in the variable `var`



:::

## extractjsonkeys

This function is used to extract the values for the keys in the JSON. The limitation here is that the JSON cannot have duplicate keys. The pointer position is moved to the position after the JSON. The values extracted are stored in the format as specified by the user.

:::info Syntax

`extractjsonkeys(key_name1.format1, key_name2.format2, …)` where `key_name` is the key to be extracted and `format` is the format for the extracted value. 

Acceptable `format` types are `string`, `int` and `float`

:::

:::note Example

Consider the log line **abc {“key1”: “val1”, “key2”: “val2”} is an example log line**

Using `skip(“abc”) extractjsonkeys(key1.string, key2.string)` extracts and stores the following data

`key1 : val1`,

`key2 : val2`

:::



## inextractkeyvalue

This function supports position-independent parsing. It extracts all the key-value pairs separated by a separator and delimited by a delimiter from the whole log line and stores them in a map. The limitation here is that every key-value pair must end with a delimiter.





:::info Syntax

`inextractkeyvalue(sep, del)`

where,





- `sep` is a string and denotes the separator separating key from value.
- `del` is a string and denotes the delimiter which separates the key-value pairs from each other.







:::

:::note Example

Consider the log line **key1:val1; key2:val2; are example key-value pairs key3:val3;**

Using `extractkeyvalue(“:”, “;”)`

extracts 

“key1” : “val1”,

“key2” : “val2”,

“key3” : “val3”

:::
