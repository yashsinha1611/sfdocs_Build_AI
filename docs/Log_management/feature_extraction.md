---
sidebar_label: Feature Extraction
---
# Feature Extraction

Feature Extraction allows processing of  unstructured logs and enhances it by adding metadata extracted from the  log. Users can provide extractions rules for specific logs using REGEX  patterns. Search patterns as explained in the Log Overview Search  section, are used to uniquely identify the logs, to which a specific  extraction rule is applied.

For example consider the following log message:

```
Invalid user dsp from 221.12.107.26 port 32041
```
The above log has the following metadata embedded in it, &lt;username&gt;, &lt;hostaddress&gt; and the &lt;sourceport&gt; as highlighted below:

```
Invalid user dsp from 221.12.107.26 port 32041
```

To identify this log message, a search *string invalid && from && port* can be used. To extract the &lt;username&gt; from this log, extraction operators, EV or EP or EG can be used.

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

In the above example, to extract &lt;username&gt;, the following can be done:

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

```javascript
EV(message, /\d+\.\d+\.\d+\.\d+/, string, ip_addr)
```

Extract IP address from field message.

```json
{"message": "DHCPACK from 172.31.32.1 (xid=0x381e913e)",“ip_addr”: “172.31.32.1”}
{"message": "DHCPREQUEST on eth0 to 172.31.32.1 port 67 (xid=0x381e913e)", “ip_addr”:“172.31.32.1”}
{"message": "Received disconnect from 167.114.226.137 port 47545:11: [preauth]", “ip_addr”:“167.114.226.137”}
{"message": "Disconnected from 167.71.217.175 port 46180 [preauth]",“ip_addr”: “167.71.217.175”}
{"message": "Received disconnect from 51.91.159.46 port 33914:11: [preauth]",“ip_addr”:“51.91.159.46”}
```

**Example 2**

```javascript
EV(log_msg, /\d+(.\d+)*(?=ms)/, float, delay)
```

Extract delay values from the field “log_msg”. Delay value is identified by the pattern (a) one digit string, immediately followed by string “ms” OR (b) two digit strings, each separated by “.” and second digit string is immediately followed by string “ms”. Save extracted value in field named delay.

```json
{" log_msg": "Received request from 10.11.100.29 and re-directed to 33.229.79.17 in 10.34ms", “delay”: 10.34}
{"log_msg": "Latency time is 5ms",“delay”: 5}
{"log_msg": "Process 2131 completed in 50s"} – *nothing is extracted from this message*
```

**Example 3**

*("received request from" && "re-directed") with EV(log_msg, /\d+\.\d+\.\d+\.\d+/, string, -,rd_ip_addr)*

Extract IP addresses from log_msg field. Skip the first extraction and save the second extraction to field named *rd_ip_addr*.

```json
{"log_msg": "Received request from 10.11.100.29 and re-directed to 33.229.79.17 in 10.34ms",“rd_ip_addr”: "33.229.79.17”}
```



### Extract Group

Extract Group (EG) construct allow users to specify a pattern with multiple groups and extract the value of each group into a separate field. In Extract Value a single pattern contained a single group, but this single group could match multiple values in the field. This concept will be better understood through examples.

EG construct uses, following parameters:

| Parameter | Use                                                          |
| --------- | ------------------------------------------------------------ |
| field     | field name to which the extraction is applied, in this case message field of the log |
| pattern   | REGEX pattern which identifies the extraction groups. Pattern is enclosed in a pair of “/”. In the REGEX pattern the group to be extracted is enclosed in parenthesis “()”. |
| name:type | a comma separated list of name:type tuples which specify name of the extracted group and its type. Type can be int, float or string. If no type is specified, it is assumed to be string. |

**Example 1**

```
EG(message, /(\d+.\d+.\d+.\d+) - \[(.*)\] "(\w+) ([^\s]+) ([^\s"]+)" (\d+) (\d+) "-" "(.*)" "-"/, host, httpd_timestamp, method, path, header, code:int, size:int, agent)
```

The example illustrates extracting information from an nginx access log, which contains the host sending the request, time at which the request was received, HTTP method, request Path, header version, response code, size and the agent making request. The response code, and size are integer values, whereas the other extractions are string type values. Patterns corresponding to these groups are highlighted in the above EG construct.

Note: the group REGEX patterns are enclosed in “()”, strings matching each of those patterns are extracted and placed in the field name provided in the same order they appear.

```json
{
"message": "172.31.31.45 - [06/May/2020:11:44:41] \"GET /owners/2 HTTP/1.1\" 200 4964
\"-\" \"Apache-HttpClient/4.5.7 (Java/1.8.0_242)\" \"-\" rt=14.717 uct=0.000 uht=14.716
urt=14.716",
"host": “172.31.31.45”,
"httpd_timestamp": "06/May/2020:11:44:41",
"method": "GET",
"path": "/owners/2",
"header": "HTTP/1.1",
"code": 302,
"size": 4964,
"agent": "Apache-HttpClient/4.5.7 (Java/1.8.0_242)"
}
{
"message": "172.31.81.81 - [06/May/2020:11:44:41] \"POST /owners/new HTTP/1.1\" 201
24 \"-\" \"Mozilla/5.0 (Windows NT 10.0; WOW64)\" \"-\" rt=1.088 uct=0.000 uht=1.088
urt=1.088",
"host": “172.31.81.81”, 
"httpd_timestamp": "06/May/2020:11:44:41",
"method": "POST",
"path": "/owners/new",
"header": "HTTP/1.1",
"code": 201,
"size": 24,
"agent": "Mozilla/5.0 (Windows NT 10.0; WOW64)"
}
```

**Example 2**

```
EG(message, /TTY=\w+ ; PWD=([^\s]+) ; USER=(\w+) ; COMMAND=(.*)$/, path, username, cmd)
```

```json
{
"message": "root : TTY=unknown ; PWD=/home/centos ; USER=root ; COMMAND=/bin/rm –rf
jmeter.log",
"pwd": "/home/centos",
"username": "root",
"cmd": "/bin/rm -rf jmeter.log"
}
{
"message": "centos : TTY=unknown ; PWD=/home/kevin ; USER=adam ; COMMAND=/bin/rm -
rf jmeter.log ",
"pwd": "/home/kevin",
"username": "adam",
"cmd": "/bin/rm -rf jmeter.log"
}
```

### Extract Pair

Applications often use logs to dump their internal statistics for debugging purposes. Most often, such logs will contain expressions like:

```swift
<name1>:<value1>, <name2>:<value2>, …..
```

OR

```swift
<name1>=<value1>; <name2>=<value2>;….
```

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



**Example 1**

```javascript
EP(message, /,/, /=/, convert=[price:int])
```

From the field message, extract field-value pairs where pair_delimiter is “,” and value separator is “=”. Convert the value for field “price” to integer.

```json
{
"message": "name=Kevin,user_id=3212,order_id=234,price=240.56",
"name": "Kevin", 
"user_id": "3212", 
"order_id": "234", 
"price": 241
}
{
"message": "name=larry,user_id=1111,order_id=100,price=123",
"name": "larry",
"user_id": "1111",
"order_id": "100",
"price": 123
}
{
"message": "process completed in 20s, and details=HEXA3413",
"and details": "HEXA3413"
}
```

**Note:** in the above example

- Field “price”, if present is converted to Integer. In the 3 rd message field, “price” is not present
- In the 3 rd message, notice that the field name is taken as “and details”. This is because the pair delimiter was specified as “,” and anything between “,” (pair delimiter) and “=” (value separator) is taken as a field name

**Example 2**

```javascript
EP(message, /,|(.*,\s+and)/, /=/, exclude=[name], convert=[price:float, order_id])
```

```
From the field message, extract field-value pairs delimited by text matching the pattern /,|(.*,\s+and)/ and has a value separator “=”. Note that the pair delimiter has a REGEX pattern which defines multiple delimiters. Each delimiter is separated by “|”.

Options specified here are:
“,” – comma

OR

“.*,\s+and’ - a string with any number of characters(.*), followed by a “,” followed by any number of white space characters(\s+) and followed by the string “and”.
```

Following log messages will illustrate the use of this extraction

```json
{
"message": "name=Kevin,user_id=3212,order_id=234,price=240.56",
"user_id": "3212",
"order_id": 234,
"price": 240.56
}
{
"message": "name=larry,user_id=1111,order_id=100,price=123",
"user_id": "1111", 
"order_id": 100,
"price": 123
}
{
"message": "process completed in 20s, and details=HEXA3413",
"details": "HEXA3413"
}
```

- In the 1 st and 2 nd example messages, pair delimiter used was “,”.
- In the 3 rd example message, the pair delimiter is “process completed in 20s, and”
- Also note, in messages 1 and 2, the field “name” was extracted, but was not added to the output document, because of the “exclude” option.

**Example 3**

```javascript
message: (user_id && price) with EP(message, /,/, /=/, include=[price])
```

```json
{
"message": "name=Kevin,user_id=3212,order_id=234,price=240.56",
"price": “240.56”
}
{
"message": "name=larry,user_id=1111,order_id=100,price=123",
"price": “123”
}
{
"message": "process completed in 20s, and details=HEXA3413"
}
```

Since **include** option had the field “price”, only those documents where field “price” was found were updated. 3 rd document though matched the delimiter and separator, did not have the field “price”.

**Example 4**

```javascript
EP(message, /(.*PID.*?(?=\w+=))|(\})|(\{)|(\s(?=\w+=))/, /=/, exclude=[ startTime, endTime], convert=[count, minimum: float, mean: float, maximum: float])
```

Another example using a complex delimiter, with exclude option and convert options.
Multiple pair delimiters are used.

```json
{
"message": "StatisticsLogTask - PID1 - context=Execution Fill {subContext=Order Update section=Top Level startTime=2019-12-17 23:59 endTime=2019-12-20 00:00} count=3
minimum=1.0 mean=5.0 maximum=21.0",
"context": "Execution Fill", 
"subContext": "Order Update",
"section": "Top Level", 
"count": 3,
"minimum": 1,
"maximum": 21,
"mean": 5
}
{
"message": "StatisticsLogTask - PID2 - context=Execution Fill {subContext=Order Placed section=Mid Level startTime=2019-12-17 23:59 endTime=2019-12-20 00:00 count=6
minimum=0.813 mean=7.9 maximum=13.0}",
"context": "Execution Fill", "subContext": "Order Placed",
"section": "Mid Level", "count": 6,
"minimum": 0.813, "maximum": 13, "mean": 7.9
}
```

In the extraction, multiple pair delimiters were specified

```javascript
/(.*PID.*?(?=\w+=))|(\})|(\{)|(\s(?=\w+=))/
```

StatisticsLogTask - PID1 - context=Execution Fill (subContext=Order Update section=Top Level startTime=2019-12-17 23:59 endTime=2019-12-20 00:00} count=3 minimum=1.0 mean=5.0 maximum=21.0 

StatisticsLogTask - PID2 - context=Execution Fill (subContext=Order Place section=Mid Level startTime=2019-12-17 23:59 endTime=2019-12-20 00:00} count=6 minimum=0.813 mean=7.3 maximum=13.0 

Value pairs identified by the pair delimiter pattern is shown in the above picture.

Though startTime and endTime are extracted, but they are excluded.

### Tools and Tips

Java REGEX testing tools can be used to validate the REGEX patterns used for extractions. A web tool like https://www.freeformatter.com/java-regex-tester.html can be used for this.

Pattern used in extract values (EV) should match the sub-strings you intend to extract. For example, to extract the timestamps from the following message, a pattern like below can be used

```javascript
/\d+-\d+- \d+\s+\d+:\d+/
```

**Extract Value Pattern**

```javascript
\d+-\d+-\d+\s+\d+:\d+
```

```javascript
String: StatisticsLogTask - PID1 - context=Execution Fill {subContext=Order Update section=Top Level startTime=2019-12-17 23:59 endTime=2019-12-20 00:00} count=3 minimum=1.0 mean=5.0 maximum=21.0
```

```javascript
StatisticsLogTask - PID2 - Context = Execution Fill (subContext=Order Place section=Mid Level startTime=2019-12-17 23:59 endTime=2019-12-20 00:00 count=6 minimum=0.813 mean=7.9 maximum=13.0
```

| Match # | Group index | Start index | End index | Group content    |
| ------- | ----------- | ----------- | --------- | ---------------- |
| 1       | 0           | 103         | 119       | 2019-12-17 23:59 |
| 2       | 0           | 128         | 144       | 2019-12-20 00:00 |

Extract Group allows to apply a REGEX to the field and extract only the groups identified (i.e. patterns enclosed in parentheses). As an example the following group REGEX when applied to the string below will result in the following groups.

**Extract group pattern**

```javascript
(\d+\.\d+\.\d+\.\d+) - - \[[^\]]* \+\d+\] \\\\\\\"POST \/topics\/(\w+)-(\w+) HTTP/1.0\\\\\\\"(\d+) (\d+) (\d+)
```

```javascript
String: 10.233.117.0 - - [26/Oct/2020:22:30:00 +0000] \\\"POST /topics/metric-grqqwwi7 HTTP/1.0\\\"200 12602 12 (io.confluent.rest-utils.requests)
```

Copy the pattern and string to the java-regex-tester. Observe the resultant matches and groups. In Extract Group, the values extracted in non-zero group index are used.

```
10.233.177.0 - - [26/Oct/2020:22:30:00 +0000]  \\\"Post  /topica/metric-grqqwwi7  HTTP/1.0\\\"  200  12602  12(io.confluent.reat-utile.requests)
```

| Match # | Group index | Start index | End index | Group content                                                |
| ------- | ----------- | ----------- | --------- | ------------------------------------------------------------ |
| 1       | 0           | 0           | 106       | 10.233.117.0--[26/Oct/2000:22:30:00 +0000] \\\"POST /topics/metric-grqqwwi7 HTTP/1.0\\\\* 200 1260212 |
| 1       | 1           | 0           | 12        | 10.233.117.0                                                 |
| 1       | 2           | 63          | 69        | metric                                                       |
| 1       | 3           | 70          | 78        | grqqwwi7                                                     |
| 1       | 4           | 92          | 95        | 200                                                          |
| 1       | 5           | 96          | 101       | 12602                                                        |
| 1       | 6           | 103         | 106       | 12                                                           |

- To extract value pairs, pair-delimiter should match the boundaries and all other symbols which are needed to split the string into an array of pairs. Each pair is again split, based on value- separator pattern

- SnappyFlow provides following built-in regex patterns, these built-in patterns can be used in place of a REGEX required in EV, EP or EG feature extraction constructs. Built-in pattern names are encapsulated in “$” 

  ```
$hostname$ - hostname string, e.g.apmmanager.snappyflow.io
$url$ - URL, e.g. https://apmmanager.snappyflow.io
$file_path$ - UNIX file path, e.g. /usr/share/nginx/html/theme-chrome.js
$float$ - floating point number, e.g.31.45
$integer$ - integer number, e.g. 19345
$alphanumeric$ - alpha-numeric characters, e.g. admin1
$alphanumericspecial$ - alpha-numeric with hyphen and underscore, e.g. date_time
$string$ - a string encapsulated in ‘ (single quote) or “ (double quote)
$date$ - date string, e.g. 02-04-2020
$datetime$ - date with time string, e.g. 02-04-20 21:41:59
$time$ - time string, e.g. 21:41:59
$ipv4addr$ - IPv4 Address, e.g. 172.31.22.98
  ```

- Example extraction with built-in regex patterns

  ```json
  message: "*72281 open() "/usr/share/nginx/html/theme-chrome.js" failed (2: No such file or directory), client: 172.31.22.98, server: _, request: "GET /theme-chrome.js HTTP/1.1", host: "apmmanager.snappyflow.io", referrer: “https://apmmanager.snappyflow.io/”
  
  Extraction
  message:"No such file or directory" with EG(message,/($integer$) open\(\) \"($file_path$)\" failed \(2: No such file or directory\), client: ($ipv4addr$), server: ([^,]*), request: \"([^\"]*)\", host: \"($hostname$)\", referrer: \"($url$)\"/,m_size:int, m_file, m_client, m_server, m_request, m_host, m_referrer)
  
  The extraction operation above will extract the fields m_size: 72281, m_file: /usr/share/nginx/html/theme-chrome.js, m_client: 172.31.22.98, m_server: _, m_request: GET /theme-chrome.js HTTP/1.1, m_host: apmmanager.snappyflow.io and m_referrer: https://apmmanager.snappyflow.io/
  ```