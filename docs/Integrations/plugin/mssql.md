# Monitor MSSQL DB in Kubernetes

## Description

Plugin collects MSSQL stats in different category as serverDetails , databaseDetails and tableDetails .

### Prerequisites

MSSQL service should be running and it should be reachable from controller VM. To check it is reachable from controller VM run this command 


   ```sql
 sqlcmd -S <hostIP> -U <username> -P <password>
   ```



### Configuration Settings

Select *MSSQL* Endpoint Type in *Add Endpoints* and add the following parameters:
- IP: DB Instance IP

Select the plugin from the dropdown under Plugins tab and config the following parameters:
- Username: DB login username
- Password: DB login password
- Port: Connecting port
- Document Types: Select the required document types. Available options are serverDetails, databaseDetails, tableDetails, queryDetails.
- Interval: Polling interval


### Documents

All MSSQL metrics are collected and tagged based on their document type to be displayed in MSSQL dashboard.

### Further Reading

For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).