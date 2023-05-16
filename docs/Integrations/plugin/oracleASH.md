# Monitor Oracle ASH Database

## Description

OracleASH plugin fetch and parse the oracle ASH report from AWS-RDS.

### Prerequisites

- Mention the RDS Database instance name while adding the RDS Endpoint in 'Instance Name' field.
- DB Host address must be specified in the 'IP' field of the RDS Endpoint configuration.

### Configuration Settings

Add plugin through the Plugins tab under RDS Endpoint.

Optional Parameters:

- ASH Report File Prefix: By default RDS generates the ASH report file name in the format "ashrpt_beginTime_endTime". Specify the file name prefix, if changed. Default value is "ashrpt".
- Service Name(SID): Oracle service name.
- Username: Database login username.
- Password: Database login password.
- Port: Database port.
- Report Duration in Minutes: Total time of the report in minutes. 
Example: If the `Report Duration in Minutes` is set to 5 minutes, then it will generate an ASH report for the last 5 mintues in each poll.
This value should be lesser than the plugin interval.


### Documents

Following sections from the ASH report are captured by snappyflow with respective document types:

- Top Service/Module
- Top SQL Command Types
- Top Phases of Execution
- Top SQL with Top Events
- Top Sessions
- Top Blocking Sessions.

To add support for more sections, please reach out to snappyflow team.


Use the dashboard template 'Oracle_ASH' for visualization.



For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).