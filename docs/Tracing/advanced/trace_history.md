# Tracing History

Trace collection generates large amount of data. All these historical trace data is not required. This is why the retention period of trace data is very low, compared to metrics or logs retention. The default configuration of trace retention is one hour. Trace data is automatically removed once it ages.

Though there is a trace retention configuration, SnappyFlow preserves important traces for a longer duration. These are called historical traces and are retained along with metrics. These remain in the system as long as metrics are preserved and are controlled through metric retention configuration.

These important traces or selection of traces to be preserved as histroical traces is controlled by trace filter rules. The default rule is defined as,

- **HTTP 4xx, HTTP 5XX** error codes requests.

- Http request where duration is greater than 90th percentile of duration of the URL (For each URL present in the application).
- Max. 5 records per URL, every half an hour:

Users can define custom rule to collect specific traces into historical traces. These rules are executed every 30 minutes and all matching traces will be stored. These rules are available under, **History Pipeline Rules,**

Steps to create a **History Pipeline Rule**

1. Select  appropriate filters in Aggregate/ Realtime page. View the result. Click **Save Filter As History Pipeline Rule** link in the top right corner.
<img src="/img/filters.PNG" />

2.  Provide the configuration details for the **History Pipeline Rule** and click save.
<p><b>Note:</b> To avoid overhead of data we are limiting the #Max Records to 50. </p>
<img src="/img/rule_popup.PNG" /> &nbsp;

To Manage the list of History Pipeline Rules, Click **History Pipeline Rules** link in Aggregate/ Realtime page
<img src="/img/view_rules.PNG" />
 
