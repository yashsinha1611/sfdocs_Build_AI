## Trace history download

By default, live tracing data is retained for 1 hour or defined retention period. Data is automatically deleted once retention cycle limit is reached; hence user can no longer access those data.

There might be a case where some traces are important to users, to accommodate the loss we are providing trace history feature where we store crucial trace records in metric index.

We have default internal logic for collecting below conditional records (Max. 5 records per URL) every half an hour:

- There might be a case where some traces are important to users, to accommodate the loss we are providing trace history feature where we store crucial trace records in metric index.

- We have default internal logic for collecting below conditional records (Max. 5 records per URL) every half an hour:

Now we are also providing the feature where the user can provide custom filters to store the traces. we need to create **History Pipeline Rules,** where the user can define the custom filters. Based on the filters defined in the rules, every 30 mins, the matching traces will be collected and stored

Steps to create a **History Pipeline Rule**

1. Select the appropriate filters in Aggregate/ Realtime page and click on **Save Filters As History Pipeline Rule** link in the top right corner.
<img src="/img/filters.png" />

2.  Provide the configuration details for the **History Pipeline Rule** and click save.
<p><b>Note:</b> To avoid overhead of data we are limiting the #Max Records to 50. </p>
<img src="/img/rule_popup.png" />

3. To Manage the list of History Pipeline Rules, Click History Pipeline Rules link in Aggregate/ Realtime page
<img src="/img/view_rules.png" />
 