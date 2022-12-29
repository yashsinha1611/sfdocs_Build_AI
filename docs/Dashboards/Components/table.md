# Table
![img](/img/components/table/table1.png)

### Aggregation Table

- All tables by default have aggregated option selected

- In this option, metrics are computed for a bucket that corresponds to a unique value of the key
  
  **Example**:
  
  If we need documents such as (Group: A, Name: x, Age: 10, Weight: 20) , (Group B, Name: y, Age: 12, Weight: 22), (Group A, Name: xx, Age: 25, Weight: 100), (Group B, Name: yy, Age: 15, Weight: 70), a table for `Select Age.avg, Weight.avg where Group == *` provides an output as shown below
  
  | Group | Age  | Weight |
  |:----- |:---- |:------ |
  | A     | 17.5 | 60     |
  | B     | 13.5 | 46     |

​        ***Group is the table key\*** in the above example

### Non Aggregation Table

- User can choose this option by disabling “Aggregation” in advanced option or by leaving the “Table Key” field as empty

- This option is used to represent values from a sequence of JSON in a tabular format, without performing any aggregations
  
  Example: For the same example above, a query “Select Name, Group, Age, Weight” would provide the result as shown below that merely represents the data in a tabular form. The ordering by default will be in descending order of time
  
  | Group | Name | Age | Weight |
  |:----- |:---- |:--- |:------ |
  | A     | x    | 10  | 20     |
  | B     | y    | 12  | 22     |
  | C     | xx   | 25  | 100    |
  | D     | yy   | 15  | 70     |

### Table Options

#### Main:
- **Title:** 
  - User can use this property to provide title for the table

- **Index:** 
  - User can select the index from which data to be fetched for the table

  **Example**: Metrics, Log, Tracing 

- **Plugin Name:** 
  - Use can select appropriate plugin name for the table
	
  **Example**: Apache-access, linux, postgres

- **Metrics** 
  
  ![img](/img/components/table/table2_add_metric.png)

  User can add any number of metrics using '+Add Metric' option provided as shown in the above image with appropriate aggregations

- **Table Key**

  - User need to add table key if they want to create [aggregation table](#Aggregation-Table)

#### Advanced options:
- **Size**
	  
    - **Width**
    
      User can change table width using this option according to the dashboad, Below options are provided for table width.

      ![img](/img/components/table/table3_width.png)

    - **Height**
    
      User can change table height using this option according to the dashboad, Below options provided for table height.

      ![img](/img/components/table/table4_height.png)
- **General**
	
    - **Pagination**

      By default, pagination will be true user can disable it by unchecking the option provided.

      ![img](/img/components/table/table5_page.png)

    - **Metric Properties**
    
      - Formatting the data rendered in the component
      
      -  Applying text/box color properties

      | Property      | Description                                                                                          | Example Use Case                                                                                                                                                                                           |                                                                                                                                      |
      |:------------- |:---------------------------------------------------------------------------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
      | metricsFilter | Used to display specified portions of the string in the component or to shorten the displayed string | Consider a table component displaying pod details with `_tag_podName` as the table key. If the pod names have the form `apmmanager-apm-sfapm-apm`, we can shorten the displayed name using `metricsFilter` | 
      |               |                                                                                                      | For Example: ![img](/img/metrics-filter-img.png)This will display `apmmanager-apm-sfapm-apm-5cd8946d64-2smb9` as `apm-5cd8946d64-2smb9`                                                                    |                                                                                                                                              |
      | decimal       | By default, data is shown upto 1 decimal placeUser can override this setting by using this option    | ![img](/img/metrics-table-img1.png)                                                                                                                                                                        | 
      |               |                                                                                                      | If we have a table component with a header CPU (%), data under this column will be rounded to 3 decimal places.                                                                                            |                                                                                                                                              |
      |               |                                                                                                      | **Note**: To change the number of decimals for all metrics in the component, use `default: <num_of_decimals>`                                                                                              |                                                                                                                                              |
      | format        | Format time field from epoch milliseconds/epoch seconds format to DateTime format                    | ![img](/img/metrics-table-img2.png)![img](/img/metrics-table-img3.png)                                                                                                                                     | 
      |               |                                                                                                      | In the above example, the time displayed under `Last Seen` column of table is formatted to DateTime format                                                                                                 |                                                                                                                                              |
      | color         | Display table cell with colors based on conditions                                                   | Refer the section [Display table cell with colors based on conditions](#display-table-cell-with-colors-based-on-conditions) section below                                                                            | 
      | rate          | Used to display the urate/unit rate of the metric in Table and Summary Box components                | **Usage**: `<var_name>: urate`                                                                                                                                                                             | 
      |               |                                                                                                      | urate is calculated as value of the `metric/(time range used in query in seconds)`                                                                                                                         |                                                                                                                                              |
      | nullValues    | Null Values are displayed as NA by defaultUse this option to override the default setting            | ![img](/img/metrics-table-nullvalues.png)The null values will be displayed as `--` instead of NA                                                                                                           |
      | alignment          | Used to change the alignment of the column values.                 | **Usage**: `<var_name>: right`                                                                                                                                                                             | 
    - **Hyperlink**

      - Hyperlink allows you to navigate from a table to another pane. The value of the hyperlink are propagated to a dropdown of the pane

      - Go to Edit Component’s advanced section and enable Hyperlink checkbox, which can be found under General category

      - A hyperlink section is enabled in the JSON editor. You will need to define the redirection target which comprises of Group (Group is a collection of panes. If the target pane does not belong a group, leave this field empty), Pane (dashboard pane name), Component (dropdown in the pane where the value of the hyperlink has to be propagated)
        
        ![img](/img/hyperlink.png)

      - Hyperlinks are enabled for the table. Click on the value “200” will redirect to the pane “Transaction Analysis” which belongs to group “Nginx Access” and render this pane with DropDown11 value = 200
        
        ![img](/img/tx-by-rest-code.png)
    
- **Sort and Filter**

    - **Sorting**
      - Data for Aggregation tables by default is sorted in ascending order of table key
      
      - When user change sort field using Change Sort Field option values will be sorted on selected field
	  
    - **Change Sort Order**
      - This option is used to change the defult sorting order of results from ES based on sort key
      
      - In JSON editor and enter the order as asc or desc in given field as shown below
      
      ![img](/img/components/table/table12_sort.png)
    
    - **Change Sort Field**
      - Data for Aggregation tables by default is sorted in ascending order of table key

      - In order to change the sorting field, enable “Change Sort Field” in advanced section

      - Go to JSON editor and enter the raw metric (not a transformed field) that should be used for sorting

      - Please note that a metric that has a .term/.count aggregation cannot be specified as a sort field

      - By choosing “Change Sort Order” in advanced section, user can change the option to descending or ascending for the sort key. Please see in the example below
          
      ![img](/img/change-sort-field.png)
    
    - **Backend Filter**
      - In many cases, a query may return a large number of results and we would want to filter the results from the database based on a certain values of a column

      - By default Backend Filter will be enabled for table

      - Click on the filter icon
        
        ![img](/img/transction-by-api-filter.png)

      - Define filters for specific columns. We can specify one or more filters at a time. In the example below we are asking to filter all API path values in databases that contain the key “snappyflow” and number of 4xx errors is GT 5
        
        ![img](/img/filter-popup.png)

      - Please note the following limitations and rules to follow
        
        - If combined query is used, filters can be applied only to table key
        - Filter cannot be applied to a variable that is a transformation of more than one metric
    
    - **Column Filter**

      - When user enable column filter the filter icon will be added to column headers which helps to filter the values at the table level
      
        ![img](/img/components/table/table8_column_filter1.png)

      - User can click on filter icon and select the values they want to filter then apply filter to filter the values as shown below

        ![img](/img/components/table/table9_column_filter2.png)

- **Query**
    
    - **Combined Query**
      - This option allows user to add more than one queries for the component as shown below.
        
        ![img](/img/components/table/table15_combined_query.png)

        - When combined query is enabled by default 'Full Outer Join' will be selected for that query, user can select one of the below given join if they want to change the default selection

          - Full Outer Join: Returns all records when there is a match in all the queries (union of all queries)

          - Full Inner Join : Returns only matching records from all queries (intersection of all queries)

          - Left Join : Returns records for the keys present in the first query

          - Right Join : Returns records for the keys present in the last query

          - A-B : Returns records for the keys present only in the first query

          - B-A : Returns records for the keys present only in the last query

    - **Aggregation**
      - This option allows you to get results after aggregating the data in ES 

      - Whe we uncheck this option the results will be the raw data present in ES

    - **Render**
      - This feature is useful when using combined query for tables
      
      - It has 2 uses:
        - change the order of rendering metrics when combined query is used

        - collect a number of metrics, transform the metrics and render only a subset of the collected metrics

    - **Change Max Items**
      - This option allows you to modify max items you want to get for the query you created

      - When you enable this option section maxItems will be added in JSON editor and we can edit the number of max items as shown below
      
      ![img](/img/components/table/table11_max.png)

    
    - **Sub Bucket Aggregation**
      - This option can be enabled when second level of aggregation is required

      - Example- For a each plugin there can be multiple _documentType, when user want to view all the documentTypes under each plugin, then In JSON editor where clause user should mention _plugin == * and in subBuket user need to add _documentType

      - Consider the below example in where clause host == * and subBucket : code
       ![img](/img/components/table/table16_subbucket.png)
      
      - So in the result table below for each host all the response codes are listed so combination of host + code will form one row in the table
       ![img](/img/components/table/table16_subbucket1.png)
    
    - **Add Nested Fields**
      - When we use a nested field in a metric it should be enclose within square brackets

      **Example**: [Psutil.User].term
      
      - We need to enable Add Nested Fields option when we use nested fields in metrics. This will add the section nestedFields in JSON editor, In this section we have to specify the nested fields used in the query as shown below

      ![img](/img/components/table/table10_nested_field.png)

    - **Nested List**
      - When there is a nested field in metric this option alows us to fetch the latest list of items from nested list from ES data 

      - This is allowed only when aggregation option is disabled and Add Nested Fields option is enabled ie metric should be a nested field
	
- **Time**
    
    - **Time Based**
      - This allows user to include time filter in the query, this option will enabled by default and time will be considered from dashboard time

    - **Static**
      - When we enable this option component will not fetch new data for each refresh cycle

    - **Custom Time**
      - This allows user to add custom time value in the query in JSON editor we can add custom time as shown below
      
      ![img](/img/components/table/table14_cust_time.png)

    - **Change Time Field**
      - This allows user to change the time field in the query while fetching the ES data.

      **Example**: Tracing data has '@timestamp' as time field so for tracing query we can change the time field in JSON editor as shown below

      ![img](/img/components/table/table13_time_field.png)


### Display table cell with colors based on conditions

- Example- we are computing the total number of 4XX and 5XX errors in the query below and we would like color the cell containing #Errors in red if the number of errors are GT 0
  
  ![img](/img/display-table-cell-with-colors.png)

- Go to the advanced section and enable metric properties. This will bring up a section called metric properties under which add the condition as shown below for color
  
  ![img](/img/metricpoperties.png)

- This will cause the color to rendered for the cell if #Errors is GT 0
  
  ![img](/img/browser-stats.png)


