# Dashboards

## A quick introduction

<iframe width="560" height="315" src="https://www.youtube.com/embed/yiqGdhKWAaY" title="Introduction to SnappyFlow dashboards" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Create your first dashboard in SnappyFlow

<iframe width="560" height="315" src="https://www.youtube.com/embed/wAA9Vo_noQ4" title="Create your first dashboard in SnappyFlow" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Create a Summary Box

<iframe width="560" height="315" src="https://www.youtube.com/embed/v7vij77v3hQ" title="Create a Summary Box" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Basic Dashboard Concepts

<iframe width="560" height="315" src="https://www.youtube.com/embed/AMF2TnQCYkU" title="SnappyFlow dashboard concepts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



## Types of Aggregation

Use the following extensions to achieve the required aggregation on a metric

| Aggregation | Extension            | Comments                                                     |
| :---------- | :------------------- | :----------------------------------------------------------- |
| Average     | .avg or no extension | Not allowed for text fields                                  |
| Percentile  | .95P, .99P etc       | Not allowed for text fields                                  |
| Max         | .max                 | Not allowed for text fields                                  |
| Min         | .min                 | Not allowed for text fields                                  |
| Count       | .count               |                                                              |
| Terminal    | .term                | Retrieves the last value of the metric from DBDocument type has to be specified in the query |
| Current     | .curr                | Retrieves the last value of the metric in the last 8 mins. If no value is available, the result is displayed as NADocument type has to be specified in the query |

## Global vs Custom timeline

- A component by default uses the timeline selected in the global component

  ![img](https://www.snappyflow.io/assets/images/display-by-time.png)

- However, a user can evaluate a component for a specific custom using the following steps

  - Edit the component and go to the advanced section

  - Select “Custom Time”

  - Go to the JSON Editor and edit the time fields as shown below. In this example, we evaluate the component for last 1 hour. User can specify 30m for 30 minutes, 1d for 1day etc.

    ![img](https://www.snappyflow.io/assets/images/edit-component.png)

## Constructing Queries

SnappyFlow provides SQL like query language to create components through a JSON editor provided. Features in JSON editor are selectively exposed based on options selected in advanced section

- Every document that is collected in SnappyFlow will have these tags: `_plugin`, `_documentType`, `_tag_projectName`, `_tag_appName`

- Whenever you create a new component, it will always have `_tag_appName == $value` by default, which is automatically substituted with current application name. This ensures that data is being queried for the current application only

- Examples

   | Example Use Case                                    | Query                                                        |
   | :-------------------------------------------------- | :----------------------------------------------------------- |
   | Collect a metric for a specific instance            | `select CPUUtil where _tag_Name == instance1`                |
   | Collect metrics for all instances in an application | `select CPUUtil where _tag_Name == *`                        |
   | Collect metric based on a dropdown condition        | `select CPUUtil where _tag_Name == DropDownXX.$value`        |
   |                                                     | **Note**: `DropDownXX` is the name of the dropdown.                                  `DropDown.$value` is the value selected in the dropdown |
   | Collect a terminal value of a metric                | `Select clusterStatus.term where _plugin == elasticsearch and _documentType == clusterStats` |
   |                                                     | **Note**: Whenever you query a terminal value, a `_documentType` has to be specified |
   | Create a logic expression                           | `Select path.count where code >= 400 and code < 600`         |
   |                                                     | **Equal**: `==`                                              |
   |                                                     | **Not Equal**: `!==`                                         |
   |                                                     | **Greater or Less**: `>`, `>=`, `<`, `<=`                    |
   |                                                     | **Variable belongs to a list**: `X ==(A,B,C..)`              |
   | String operations                                   | `query_string == message:"Index to be deleted"`              |
   |                                                     | **Query_string**: Directive or operator for search by keyword |
   |                                                     | **Message**: Field name in which the pattern has to be searched |
   |                                                     | **Search Text**: Specify exact text in quotes To see all supported options, refer to [Log Overview Search](/docs/Log_management/log_overview) |
   | Building queries for nested data                    | ![img](https://www.snappyflow.io/assets/images/building-queries-for-nested-data.png) |
   |                                                     | **Note**: When using a nested field, enclose metric within square brackets. |
   |                                                     | Enable `Add Nested Fields` option in the advanced section. This will add the section `nestedFields` in JSON editor. |
   |                                                     | Specify the nested fields used in the query under `nestedFields` section. |

  

- **Combined query:** SnappyFlow allows upto 2 queries for SummaryBox and Tables and can be enabled from the advanced section. This is useful when querying terminal values from two different documentTypes

- **Render:** This feature is useful when using combined query for tables and summary charts

  It has 2 uses:

  - change the order of rendering metrics when combined query is used
  - collect a number of metrics, transform the metrics and render only a subset of the collected metrics. Enable the feature from advanced section

## Histogram Intervals

Histogram interval is relevant for a Line chart and Bar chart histogram. It is a sub interval in which a metric is evaluated or aggregated. Every histogram interval will correspond to a point in the chart.

By default, histogram interval is calculated based on time range represented in the graph. If user deselects ‘Adaptive Interval’ option from the advanced section, the histogram interval is fixed at 60s.

| Time Range represented in the chart | Line Chart Interval | Bar Chart Interval |
| :---------------------------------- | :------------------ | :----------------- |
| <= 1 minute                         | 1s                  | 1s                 |
| <= 5 minutes                        | 2s                  | 4s                 |
| <= 10 minutes                       | 4s                  | 10s                |
| <= 20 minutes                       | 10s                 | 10s                |
| <= 30 minutes                       | 30s                 | 30s                |
| <= 1 hr                             | 30s                 | 60s                |
| <= 3 hrs                            | 30s                 | 5m                 |
| <= 6 hrs                            | 60s                 | 5m                 |
| <= 8 hrs                            | 5m                  | 5m                 |
| <= 12 hrs                           | 5m                  | 10m                |
| <= 1 day                            | 5m                  | 30m                |
| <= 7 days                           | 30m                 | 3h                 |
| <= 30 days                          | 2h                  | 12h                |
| <= 60 days                          | 4h                  | 1d                 |
| <= 90 days                          | 8h                  | 1d                 |
| <= 120 days                         | 8h                  | 1d                 |
| <= 240 days                         | 16h                 | 1d                 |
| > 240 days                          | 1d                  | 1d                 |

## Metric Properties

User can enable the metric properties from advanced section for:

- Formatting the data rendered in the component
- Applying text/box color properties

| Property      | Description                                                  | Example Use Case                                             | Comments                                                     |
| :------------ | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| metricsFilter | Used to display specified portions of the string in the component or to shorten the displayed string | Consider a table component displaying pod details with `_tag_podName` as the table key. If the pod names have the form `apmmanager-apm-sfapm-apm`, we can shorten the displayed name using `metricsFilter` | Applicable for Table, Tabbed table, Line chart, Bar chart components |
|               |                                                              | For Example: ![img](https://www.snappyflow.io/assets/images/metrics-filter-img.png)This will display `apmmanager-apm-sfapm-apm-5cd8946d64-2smb9` as `apm-5cd8946d64-2smb9` |                                                              |
| decimal       | By default, data is shown upto 1 decimal placeUser can override this setting by using this option | ![img](https://www.snappyflow.io/assets/images/metrics-table-img1.png) | Applicable for Table, Tabbed table, Summary box, Line chart and Bar chart histogram components |
|               |                                                              | If we have a table component with a header CPU (%), data under this column will be rounded to 3 decimal places. |                                                              |
|               |                                                              | **Note**: To change the number of decimals for all metrics in the component, use `default: <num_of_decimals>` |                                                              |
| format        | Format time field from epoch milliseconds/epoch seconds format to DateTime format | ![img](https://www.snappyflow.io/assets/images/metrics-table-img2.png)![img](https://www.snappyflow.io/assets/images/metrics-table-img3.png) | Applicable for Table, Tabbed table, Bar charts, Key based line chart componentsAvailable options are DateTime, DateTime(ms) and DateTime(us) |
|               |                                                              | In the above example, the time displayed under `Last Seen` column of table is formatted to DateTime format |                                                              |
| color         | Display table cell with colors based on conditions           | Refer the section “Display table cell with colors based on conditions” in the [Table Component](#table-component) section below | Applicable for Table, Tabbed table and Excel Table components |
| rate          | Used to display the urate/unit rate of the metric in Table and Summary Box components | **Usage**: `<var_name>: urate`                               | Applicable for Summary Box and Table components              |
|               |                                                              | urate is calculated as value of the `metric/(time range used in query in seconds)` |                                                              |
| nullValues    | Null Values are displayed as NA by defaultUse this option to override the default setting | ![img](https://www.snappyflow.io/assets/images/metrics-table-nullvalues.png)The null values will be displayed as `--` instead of NA | Applicable for Table component                               |
| boxColor      | Display box color for Summary box based on condition         | ![img](https://www.snappyflow.io/assets/images/metrics-table-boxcolor.png)The condition should be specified in the same way as the table cell color. Refer [Table Component](#table-component) section below. | Applicable for Summary Box                                   |
| textColor     | Display text color for Summary box based on condition        | ![img](https://www.snappyflow.io/assets/images/metrics-table-img-textcolor.png)The condition should be specified in the same way as the table cell color.Refer [Table Component](#table-component) section below. | Applicable for Summary Box                                   |

## Table Component

### Aggregation Table

- All tables by default have aggregated option selected

- In this option, metrics are computed for a bucket that corresponds to a unique value of the key

  **Example**:

  If we need documents such as (Group: A, Name: x, Age: 10, Weight: 20) , (Group B, Name: y, Age: 12, Weight: 22), (Group A, Name: xx, Age: 25, Weight: 100), (Group B, Name: yy, Age: 15, Weight: 70), a table for `Select Age.avg, Weight.avg where Group == *` provides an output as shown below.

  | Group | Age  | Weight |
  | :---- | :--- | :----- |
  | A     | 17.5 | 60     |
  | B     | 13.5 | 46     |

​		***Group is the table key\*** in the above example

### Non Aggregation Table:

- User can choose this option by disabling “Aggregation” in advanced option or by leaving the “Table Key” field as empty

- This option is used to represent values from a sequence of JSON in a tabular format, without performing any aggregations

  Example: For the same example above, a query “Select Name, Group, Age, Weight” would provide the result as shown below that merely represents the data in a tabular form. The ordering by default will be in descending order of time

  | Group | Name | Age  | Weight |
  | :---- | :--- | :--- | :----- |
  | A     | x    | 10   | 20     |
  | B     | y    | 12   | 22     |
  | C     | xx   | 25   | 100    |
  | D     | yy   | 15   | 70     |

### Change Sort Field

- Data for Aggregation tables by default is sorted in ascending order of table key

- In order to change the sorting field, enable “Change Sort Field” in advanced section

- Go to JSON editor and enter the raw metric (not a transformed field) that should be used for sorting

- Please note that a metric that has a .term/.count aggregation cannot be specified as a sort field

- By choosing “Change Sort Order” in advanced section, user can change the option to descending or ascending for the sort key. Please see in the example below

  ![img](https://www.snappyflow.io/assets/images/change-sort-field.png)

### Filter

- In many cases, a query may return a large number of results and we would want to filter the results from the database based on a certain values of a column

- Enable filter by selecting “Add Filter” option in advanced options

- Click on the filter icon

  ![img](https://www.snappyflow.io/assets/images/transction-by-api-filter.png)

- Define filters for specific columns. We can specify one or more filters at a time. In the example below we are asking to filter all API path values in databases that contain the key “snappyflow” and number of 4xx errors is GT 5

  ![img](https://www.snappyflow.io/assets/images/filter-popup.png)

- Please note the following limitations and rules to follow

  - If combined query is used, filters can be applied only to table key
  - Filter cannot be applied to a variable that is a transformation of more than one metric

### Display table cell with colors based on conditions

- Example- we are computing the total number of 4XX and 5XX errors in the query below and we would like color the cell containing #Errors in red if the number of errors are GT 0

  ![img](https://www.snappyflow.io/assets/images/display-table-cell-with-colors.png)

- Go to the advanced section and enable metric properties. This will bring up a section called metric properties under which add the condition as shown below for color

  ![img](https://www.snappyflow.io/assets/images/metricpoperties.png)

- This will cause the color to rendered for the cell if #Errors is GT 0

  ![img](https://www.snappyflow.io/assets/images/browser-stats.png)

### Hyperlink

- Hyperlink allows you to navigate from a table to another pane. The value of the hyperlink are propagated to a dropdown of the pane

- Go to Edit Component’s advanced section and enable Hyperlink checkbox, which can be found under General category

- A hyperlink section is enabled in the JSON editor. You will need to define the redirection target which comprises of Group (Group is a collection of panes. If the target pane does not belong a group, leave this field empty), Pane (dashboard pane name), Component (dropdown in the pane where the value of the hyperlink has to be propagated)

  ![img](https://www.snappyflow.io/assets/images/hyperlink.png)

- Hyperlinks are enabled for the table. Click on the value “200” will redirect to the pane “Transaction Analysis” which belongs to group “Nginx Access” and render this pane with DropDown11 value = 200

  ![img](https://www.snappyflow.io/assets/images/tx-by-rest-code.png)
