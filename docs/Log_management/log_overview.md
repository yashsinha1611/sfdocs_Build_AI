---
sidebar_label: Log Overview Search
---

# Log Onboarding

SnappyFlow uses Elasticsearch as its datastore for logs, metrics and traces.  SnappyFlow has built a search language which is simple and easy to use  for analyzing logs , extracting metadata from unstructured logs and enhancing the logs with extracted metadata.

## Document format in SnappyFlow

SnappyFlow stores all information in JSON format to the datastore. A sample log document is shown below:

```json
"node": "ip-172-31-14-187",
"_plugin": "linux-syslog",
"ident": "sshd",
"_tag_Name": "demo-presto-worker-0",
"level": "info",
"@timestamp": "2020-10-15T18:35:13.000000000Z",
"time": "1602786913000",
"pid": "14153",
"_documentType": "syslog",
"host": "ip-172-31-14-187",
"_tag_uuid": "0aa46894f321",
"_tag_projectName": "presto",
"file": "/var/log/auth.log",
"signatureKey": "8276318930445510094",
"_tag_appName": "presto",
"message": "Invalid user ofandino from 152.32.180.15 port 56712"
```

## Types of search 

- Searching across all fields and values
- Range queries for numeric data
- Wildcard search
- Regular expression search
- Logical operations like AND, OR, NOT to build complex searches

SnappyFlow datastore, processes fields which contain string values  differently. The string is stored as a list of tokens. Each token is a  unique word in the string. For example if the field “message” has a  value

```json
“user:admin CMD=rm –rf temp PWD=/home/admin PATH=var.log.secure”.
```

This string is converted as a list of tokens as follows:

```json
“user:admin CMD rm rf temp PWD home admin PATH var.log.secure”.
```

Note that in the above tokenization, character  “:” and character “.” Are treated differently. They are considered as  alpha-numeric, for the purpose of tokenization and are retained, if they are preceded and succeeded by alpha-numeric characters between the “:”.

 A search of string user\:admin will be successful in the above document. Note that “:” was escaped using “\” in the search string, as “:” is considered a reserved character. See below for more on reserved characters.

 Also note, that a search string temp home will also match the above string, as the words temp and home are present in the above string, even though they do not appear in consecutive positions. A phrase search “temp home” (the search string is encapsulated between “), will match only if temp and home appear together in the string and are in the same order.

## SnappyFlow Query language operator support

| Operator  | Description                       | Example                                                  | Explanation                                                  |
| --------- | --------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| :         | Search for a value within a field | level:info                                               | Get all documents where field “level” has value “info”       |
| &&        | AND operation                     | info && ident:sshd                                       | Get all documents where value “info” is present in any of the fields AND “ident” field has value “sshd” |
| \|\|      | OR operation                      | level:warn \|\| level:error                              | Get all documents where “level” field has value “warn” or “level” field has value “error” |
| ""        | Phrase searches                   | message: "Invalid                                        | Get all documents where “message” field has a phrase “Invalid user”. Note: searches are case insensitive. “Invalid user” will match only if token “Invalid” and token “user” are present in the string in the same order. |
| >         | Greater than                      | pid:>14153                                               | Get all documents where field “pid” has values greater than 14153 |
| <         | Lesser than                       | pid:<14153                                               | Get all documents where field “pid” has values less than 14153 |
| >=        | Greater than or equal             | pid:>=14153                                              | Get all documents where field “pid” has values greater than or equal to 14153 |
| <=        | Lesser than or equal              | pid:<14153                                               | Get all documents where field “pid” has values less than or equal to 14153 |
| ()        | Grouping                          | (pid:(>14000 && <=15000) \|\| level:error) && ident:sshd | Get all documents where field “pid” is in the range 14000 – 14999 OR field “level” has value “error”. From the above search get only those documents where field “ident” has value “sshd” |
| -         | NOT operation                     | level:-(info \|\| warn)                                  | Get all documents where field “level” does not contain value “info” or “warn” |
| ?         | Single character wildcard         | _plugin: sys???                                          | Get all documents where the field plugin has a word sys followed by 3 characters. |
| *         | Zero or more characters wildcard  | message: *var*                                           | Get all documents where “message” field contains a string var preceded by any characters and succeeded by any characters. For example in the message “user:admin CMD=rm –rf temp PWD=/home/admin PATH=var.log.secure”, *var* matches var.log.secure |
| //        | Pattern searches                  | message: /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/                | Get all documents which contain an IP address pattern. In the sample log  document with the message field containing "Invalid user ofandino from  152.32.180.15 port 56712" , the regex pattern will match 152.32.180.15. |
| \         | Escape sequence                   | message: sudo\:linux                                     | Some of the special characters need to be escaped if they are part of a search string. Special characters to be escaped are: & \| " = : ( ) [ ] - ? * / \ |
| _exists_: | Field name search                 | _exists_:pid                                             | Get all logs                                                 |

**Note:**

- Field names are case sensitive i.e. latency: 20 and LATENCY: 20 will give different results.

- Field values are case insensitive i.e. name: KEVIN and name: kevin will give the same results.

- Applying range queries i.e. key: >=200 etc. to text fields give  unpredictable results. Make sure to apply such queries on numeric fields only. Range queries cannot be used without specifying the field name  i.e. >=20 is not a valid query.

- Wildcards cannot be used in phrase searches i.e. "*error" or "er??r" is not allowed.

- Using a wildcard at the beginning of a word e.g. *ing is particularly  heavy, because all terms in the index need to be examined, just in case  they match.

- Regex patterns must be  enclosed in forward slashes. Any string present between a pair of  forward slashes will be treated as a Java regex pattern. Search Regex  does not support all regex meta-characters. 

  For details, 

  https://www.elastic.co/guide/en/elasticsearch/reference/current/regexp-syntax.html
   Patterns are anchored by default i.e. they must match an entire Elasticsearch token.

## Examples

### Basic Search

**Datastore has following documents**

```json
{ "pid": 3245, "upstream_response_time": 10, "URL": "https://www.elastic.co/guide/en/elasticsearch/reference"}
{"pid": 2445, "upstream_response_time": 4, "URL": "https://www.elastic.co/guide/en/machine-learning" }
{"pid": 3246, "upstream_response_time": 2, "URL": "https://docker-hub/pricing"}
{"message": "docker image built", "pid": 1000}
```



| Search Query & Logic                       | Result                     | Results explained                                            |
| :----------------------------------------- | -------------------------- | ------------------------------------------------------------ |
| pid: 3?4?                                  | Matches documents 1, 3.    | Get all documents with pid field value matching the pattern 3?4? (? matches any character) |
| upstream_response_time:>5 && elasticsearch | Matches document 1         | Get all documents where field upstream_response_time key has a value  greater than 5 AND the string elasticsearch is present in any of the  fields. |
| elastic && machine\-learning               | No documents are matched.  | Get all documents where strings elastic AND machine-learning are present in any of the fields.  Though string elastic is present in documents 1, 2; it does not appear as a  standalone term. This is because, special character “.” is handled  differently in tokenization and is tokenized as www.elastic.co. If the search query is modified as www.elastic.co && machine-learning, document 2 will match the search. Alternatively, search elasstic && machine-learning, will also return the same result |
| https docker hub pricing                   | Matches documents 3 and 4. | Get all documents which contain the words https OR docker OR hub or pricing in any order. Matches documents 3 and 4. Document 3 has all the terms and Document 4  has the term docker. If the intent is to search for a document with all  the terms in the same order, then the search should be modified to  “https docker hub pricing”. Note the phrase is enclosed in double  quotes. This search will match only document 3. Also note the words http docker hub pricing are connected with special characters in document 3. But the search is on the tokenized version of the document and hence  all special characters are removed. |

### Logical Operations and wild card usage

**Datastore contains following documents**

```json
{"message": "Disconnected from 118.24.197.243 port 35662 [preauth]"}
{"message": "Unregistered Authentication Agent for unix-session:7  (system bus name :1.89, object path  /org/freedesktop/PolicyKit1/AuthenticationAgent, locale en_IN)  (disconnected from bus)"}
{"responseCode": "400", "responseMessage": Null}
{"message": "request received from IP1 and redirected to IP2", "responseCode": "200"}
{"message": "ValueError(…)"}
{"message": "ArithmeticException(…)"}
```

**Examples**

**Search Query:**
"disconnected from"
Get all documents that contain the terms disconnected and from. The terms should appear together in the same order in the document.

**Results and explanation:**
Matches documents 1 and 2.

Notice that in document 1, the word disconnected appears as Disconnected. Since search is always case-insensitive, document 1 is also matched.

**Search Query:**
message: (disconnected && from && port)
Get all documents that contain the words disconnected and from and port

**Results and explanation:**
Matches document 1

Note: words need not appear together and they may appear in any order.

**Search Query:**
message: (disconnect* port)
Get all documents that contain word starting with disconnect or a word port.

**Results and explanation:**
Matches documents 1 and 2.

This is interpreted asmessage: (disconnect* || port)
disconnect* matches all terms which start with the word disconnect and have zero or more characters after it i.e. disconnecting, disconnected and disconnect

**Search Query:**
message: (disconnected && -port)
Get all documents that has term disconnected and does not have the term port

**Results and explanation:**
Matches document 2

-(responseCode: 400 ||
message: (*exception* || *error*))
2 This is a complete negation of the above search i.e. NOT operator is applied to above search

**Search Query:**
responseCode: 400 || message: (*exception* || *error*)

**Results and explanation:**
Matches 3, 5 and 6

*exception* matches any word that contains the string exception and similarly *error*.
The term ArithmeticException(...) matches *exception* and ValueError(...) matches *error*

**Search Query:**
-(responseCode: 400 || message: (*exception* || *error*))
This search is a total negation of the previous search.

**Results and explanation:**
Matches document 4

### Regex Patterns

**Datastore contains following documents**

```json
{"message": "No identification string for 118.24.197.243"}
{"message": "No identification string for 119:25.200.255"}
{"message": "Received bad request from 119:25.200.255"}
{"message": "pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=203.195.182.3"}
{"message": "Authentication failure for user admin"}
```

**Examples**

**Search Query:**

```
message: /[0-9]+.[0-9]+.[0-9]+.[0-9]+/
```

Get all documents where message field contains an IP address pattern.
**Results and explanation:**

Matches documents 1,2,3,4

**Search Query:**

```
(message: /119.25.[0-9]+.[0-9]+/)
```

Get all documents where message field contains an IP Address pattern with a network address 119.25

**Results and explanation:**

```
Matches document 2 and 3
auth* && failure &&-/[0-9]+.[0-9]+.[0-9]+.[0-9]+/ 5
Any key’s value needs to consist of auth*, failure but not an IP i.e. [0-9]+.[0-9]+.[0-9]+.[0- 9]+
```

**Search Query:**

```
auth* && failure && -/[0-9]+.[0-9]+.[0-9]+.[0-9]+/
```

Get all documents where an IP address pattern is NOT present in any of the fields and contains a word starting with auth in any of the fields AND contains the word failure in any of the fields.

**Results and explanation:**

Matches documents 5

