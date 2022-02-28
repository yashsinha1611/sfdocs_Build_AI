# Getting Started
## Overview

### Alerts in SnappyFlow

<iframe width="560" height="315" src="https://www.youtube.com/embed/7BXeQze5lks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Defining the scope of alerts

<iframe width="560" height="315" src="https://www.youtube.com/embed/6AZid0XlB-w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Key Concepts

To use SnappyFlow alerts well, it will help you to understand the terms we use:

| Alert Terms  | Comment                                                      |
| :----------- | :----------------------------------------------------------- |
| Alert Metric | A monitored data source like CPU utilization or RAM utilization. |
| Condition    | An alert condition includes a) a monitored metric and b) a thresholds that define the behavior that is considered a violation. For instance, an NGINX alert condition could be defined as response time for an http request exceeding the 95th percentile of all response times. |
| Threshold    | When you create a condition, there is a required critical-level threshold. In the above example 95th percentile is the threshold. |
| Violation    | A violation occurs when the value of a data source crosses an alert condition’s threshold. This leads to the creation of a violation event. A violation does not automatically create a notification. Alerts history lists all the violations, with the most recent ones at the top. |
| Notification | At the alert policy level, you choose if a violation needs to be notified. SnappyFlow offers several notification channels such as email, Slack and webhooks. You can also include charts about the violation to provide context and share them with your team. |

## Basic Terminology

### Primary metric

This is the metric on which alerts are defined. Primary Metric is sampled at the defined “periodicity” and for the duration of “sampling period”. Users can define Primary Metric in following ways:

- Single real number variable: E.g. `CPUUtil` calculates average of the variable over the sampling period

- Expression: E.g. `DiskUtil= usage*100/capacity` calculates the expression using average values of the variables in the expression

- Aggregations: All variables implicitly use average aggregation. However, users can explicitly a specific aggregation using suffixes such as .min, .max, .sum, .count, .95P, .term(last value)

  

  ![](/img/alerts_screenshot_1.png)

### Periodicity

Periodicity at which the alert is fired. It can be defined as 5m (5 minutes) or 1h (1 hour) or 1d (1 day).

### Sampling Period

Sampling window in which primary metric is evaluated. It can be defined as 5m (5 minutes) or 1h (1 hour) or 1d (1 day).

### Secondary metric

Users can choose to collect additional metrics along with the primary metric. Users can add secondary metrics to alert text to provide additional diagnostics. For example, it is useful to accompany disk latency metric with read/write IOPS and throughput. Secondary Metric is also very useful to define multi-variable alert conditions.

### Alert Conditions

Defines alert conditions for severity (sev1/2/3) alerts. A condition compares present value($PV) of a primary metric with a threshold ($TH). Multiple ways to express thresholds are supported.

- **Absolute value**: E.g. `CPUUtil GT 90`
- **Time based thresholds**: E.g. `TCPReset GT (1h,avg)` which denotes “check if average of TCPReset calculated over the sampling period is GT average of TCPReset calculated over the last 1 hour preceding the sampling period”. Time period can be defined as Xm (e.g. 30m), Xh (e.g. 1h) or Xd(e.g. 2 d)
- **Time based threshold with limits**: E.g. `TCPReset GT max(200,(1h,avg))` which means enable the alert only when TCPReset > 200
- **Past reference time**: E.g. `Response_Time.95P > dod(1h,95P)` compares the 95 th percentile of response time over the sampling period with the 95 th percentile of response time over a 1 hour period exactly one day back. Expressions supported are `dod` for **Day on Day**, `wow` for **Week on Week** and `mom` for **Month on Month**

### Constructing an Alert text

Creating a meaningful alert message is important for diagnostics. Users can create effective alerts using parameterization. For e.g.,

- “CPU utilization is high. PV=$PV, TH=$TH”. $PV is the current value of the primary metric and $TH is the defined alert threshold
- “Read latency is high. PV=$PV, TH=$TH,read_IOPS=$read_IOPS, Write_IOPS= $write_IOPS”. In this example,read_IOPS and write_IOPS are secondary metrics collected to provide additional context for analysis

### Scope of an Alert

Alert can be executed in the following modes.

- **Apply check to all instances**: Enabling this option will cause the check to be operated on all the instances in the application. Condition `tag_Name == *` is inserted in the where clause of the alert
- **Apply check for all values of custom tag**: Enabling this option will cause the check to be operated on all unique values of the custom tag. E.g. If user wants to specify an alert to check the health of each index in Elasticsearch and raise a separate alert for each issue found, user will have to specify the condition `check index_health != green where index_name==*` . In this example, the custom tag is `index_name`
- **Apply check to a specific data point**: This option is used when the check is very specific to a single data point e.g. check if `Cluster_status != Green`. No automatic tags are inserted if this option is enabled
