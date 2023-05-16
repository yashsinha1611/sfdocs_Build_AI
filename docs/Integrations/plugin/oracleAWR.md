# Monitor Oracle AWR

## Description

OracleAWR plugin fetch and parse the oracle Automatic Workload Repository (AWR) report from AWS-RDS.

### Prerequisites

- Mention the RDS Database instance name while adding the RDS Endpoint in 'Instance Name' field.
- DB Host address must be specified in the 'IP' field of the RDS Endpoint configuration.

### Configuration Settings

Add plugin through the Plugins tab under RDS Endpoint.

Optional Parameters:

- AWR Report File Prefix: By default RDS generates the ASH report file name in the format "awrrpt_beginSnapId_endSnapId". Specify the file name prefix, if changed. Default value is "awrrpt".
- Service Name(SID): Oracle service name.
- Username: Database login username.
- Password: Database login password.
- Port: Database port.

### Documents

Following sections from the AWR report are captured by Snappyflow with respective document types:

- SQL ordered by Elapsed Time
- SQL ordered by CPU Time
- SQL ordered by User I/O Wait Time
- SQL ordered by Gets 
- SQL ordered by Reads
- SQL ordered by Executions

To add support for more sections, please reach out to snappyflow team.

Use the dashboard template 'Oracle_AWR' for visualization.



For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).