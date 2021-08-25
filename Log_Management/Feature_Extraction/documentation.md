# Feature Extraction

Feature Extraction allows processing of  unstructured logs and enhances it by adding metadata extracted from the  log. Users can provide extractions rules for specific logs using REGEX  patterns. Search patterns as explained in the Log Overview Search  section, are used to uniquely identify the logs, to which a specific  extraction rule is applied.

For example consider the following log message:

```
Invalid user dsp from 221.12.107.26 port 32041
```

The above log has the following metadata embedded in it, <username>, <hostaddress> and the <sourceport> as highlighted below:

```
Invalid user dsp from 221.12.107.26 port 32041
```

To identify this log message, a search *string invalid && from && port* can be used. To extract the <username> from this log, extraction operators, EV or EP or EG can be used.

EV – extract values, extract values identified by a REGEX pattern from a field and save it in new user defined fields

EG – extract a group of values from a field identified by REGEX pattern groups and save it in new user defined fields

EP –  extract key value pairs from a field, user specifies REGEX to identify  the separator between key and value and also the separator between  key-value pairs

These will be explained in more details in the following sections.

General syntax for feature extraction is:

```
[<field>:<search string> with] EV(…..)
[<field>:<search string> with] EG(…..)
[<field>:<search string> with] EP(…..)
```

Note that if the extraction is qualified by a search, “*with EV*” or “with EG” or “*with EP*” should be used to define the extraction operation. If there is no search string, “*EV*” or “*EG*” or “*EP*” can be used to define the extraction operation.

SnappyFlow provides a list of buit-in regex patterns, commonly used for  extraction. These built-in pattern names can be used in place of REGEX.  Built-in patterns and their usage is explained in later sections.

**Extract Values**

In the above example, to extract <username>, the following can be done:

```
Invalid && user && port with EV(message,/(?<=user )\w+/,string,username)
```

The Extract-Value (EV) construct, uses 4 parameters, *field, pattern, type, name(s)*.

| Parameter | Use                                                          |
| --------- | ------------------------------------------------------------ |
| field     | field name to which the extraction is applied, in this case message field of the log |
| pattern   | REGEX pattern which identifies the extraction, in this case a REGEX string enclosed within “/”; /(?<=user )\w+/. This pattern means, a word – string of alpha-numeric characters – which appears immediately after the string “user “ |
| type      | once the value is extracted, the type to be associated with the extracted value. The field/value pair created in the JSON, will use this information. |
| name(s)   | field names coma separated; extraction pattern may match multiple positions in the log message. Each matched value is extracted and stored in the same order as they are matched. If a specific value should be skipped, then use “-“ as the field name. |

### Examples

**Example 1**

*EV(message, /\d+\.\d+\.\d+\.\d+/, string, ip_addr)*

Extract IP address from field message.

1. {"message": "DHCPACK from 172.31.32.1 (xid=0x381e913e)",“ip_addr”: “172.31.32.1”}
2. {"message": "DHCPREQUEST on eth0 to 172.31.32.1 port 67 (xid=0x381e913e)", “ip_addr”:“172.31.32.1”}
3. {"message": "Received disconnect from 167.114.226.137 port 47545:11: [preauth]", “ip_addr”:“167.114.226.137”}
4. {"message": "Disconnected from 167.71.217.175 port 46180 [preauth]",“ip_addr”: “167.71.217.175”}
5. {"message": "Received disconnect from 51.91.159.46 port 33914:11: [preauth]",“ip_addr”:“51.91.159.46”}



**Example 2**

EV(log_msg, /\d+(.\d+)*(?=ms)/, float, delay)

Extract delay values from the field “log_msg”. Delay value is identified by the pattern (a) one digit string, immediately followed by string “ms” OR (b) two digit strings, each separated by “.” and second digit string is immediately followed by string “ms”. Save extracted value in field named delay.

- {" log_msg": "Received request from 10.11.100.29 and re-directed to 33.229.79.17 in 10.34ms", “delay”: 10.34}
- {"log_msg": "Latency time is 5ms",“delay”: 5}
- {"log_msg": "Process 2131 completed in 50s"} – *nothing is extracted from this message*



**Example 3**

*("received request from" && "re-directed") with EV(log_msg, /\d+\.\d+\.\d+\.\d+/, string, -,rd_ip_addr)*

Extract IP addresses from log_msg field. Skip the first extraction and save the second extraction to field named *rd_ip_addr*.

- {"log_msg": "Received request from 10.11.100.29 and re-directed to 33.229.79.17 in 10.34ms",“rd_ip_addr”: "33.229.79.17”}

### Extract Group

Extract Group (EG) construct allow users to specify a pattern with multiple groups and extract the value of each group into a separate field. In Extract Value a single pattern contained a single group, but this single group could match multiple values in the field. This concept will be better understood through examples.

EG construct uses, following parameters:

| Parameter   | Use                                                          |
| ----------- | ------------------------------------------------------------ |
| field       | field name to which the extraction is applied, in this case message field of the log |
| pattern     | REGEX pattern which identifies the extraction groups. Pattern is enclosed in a pair of “/”. In the REGEX pattern the group to be extracted is enclosed in parenthesis “()”. |
| name:<type> | a comma separated list of name:type tuples which specify name of the extracted group and its type. Type can be int, float or string. If no type is specified, it is assumed to be string. |



Examples - coming soon

### Extract Pair

Applications often use logs to dump their internal statistics for debugging purposes. Most often, such logs will contain expressions like:

**<name1>:<value1>, <name2>:<value2>, …..** 

OR

**<name1>=<value1>; <name2>=<value2>;…..**

In such logs, the field-value pairs can be identified with a value *separator* and a pair *delimiter*. In the first example value separator is “:” and pair delimiter is “,”; whereas in the second example, value separator is “=” and pair delimiter is “;”.

General syntax used in Extract Pairs is:

*EP(field, /pair_delimiter/, /value_separator/, convert=[..], include=[..], exclude=[..])*

| Parameter       | Use                                                          |
| --------------- | ------------------------------------------------------------ |
| field           | field name to which the extraction is applied, example: ***message\*** field of the log |
| pair_delimiter  | REGEX pattern which identifies the field-value pair delimiter. Pattern is enclosed in a pair of “/”. |
| value_separator | REGEX pattern which identifies the separator between field and value. Pattern is enclosed in a pair of “/”. |
| convert=[]      | a list of field:type tuples, which specify how to convert the field values. If nothing is specified, all fields are considered have a string type value. **Note:** the field names are the names extracted from the log message itself. Example is *convert=(field1:int,field2:float)*. This is an optional field, all values are converted to string type, if not specified. |
| include=[]      | if only selected fields from the extraction are to be added to the log document, list those field names. **Note:** include and exclude lists can not both be present at the same time. An optional field and can be omitted. |
| exclude=[]      | if selected fields from the extraction are not to be added to the log document, list those field names. **Note:** include and exclude lists can not both be present at the same time. An optional field and can be omitted. |

### Tools and Tips