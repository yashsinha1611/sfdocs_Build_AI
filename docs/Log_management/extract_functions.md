## Extract Functions

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

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractword(N), where N is an integer which denotes the number of words to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

user=extractword(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Error404 received due to Authentication token failure**





**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using test=extractword(2), the variable `test` will now hold `Error404 received`.

**Updated pointer position**

Error404 received `|` due to Authentication token failure

</TabItem>

</Tabs>

## extractchar

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>

## extractnum

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>

## extractuntil

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>

## extractpattern

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>



## extractjson

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>



## extractregex

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>



## extractregexgroup

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>

## extractkeyvalue

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>

## extractjsonkeys

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>

## extracttime

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>

## extracttillend

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>

## inextractkeyvalue

This function, extractchar(N), extracts N number of characters, including spaces and stores the result in a variable. Pointer position moves to the end of N characters.

<Tabs groupId="examples">
  <TabItem value="Syntax" label="Syntax" default>

var=extractchar(N), where N is an integer which denotes the number of characters to extract and var is the variable name.

  </TabItem>
  <TabItem value="Usage" label="Usage" default>

ips=extractchar(1)



  </TabItem>
  <TabItem value="Example" label="Example">

In this example, the pointer or imaginary cursor is denoted by `|`.

Consider the Log line **Running full sweep for node-116**

**Initial pointer position**

`|`Error404 received due to Authentication token failure

Using new-word=extractchar(7), seven characters will be extracted and stored in `new-word`

**Updated pointer position**

Running `|` full sweep for node-116

</TabItem>

</Tabs>