# AzureDB

## Description

Azuredb Metric plugin collects metrics related  to relational database services like Azure SQL, Azure database for MySQL  and Azure database for PostgreSQL using insights data from Azure Monitor.

### Prerequisites

Plugin supports two modes of authentication and authorization

1. Managed Service Identity (MSI)

   Registered APM controller with Managed identity enabled will auto-authenticate and authorize the plugin client without any credentials being passed as input parameter.

2. Service Principal Token

   Token based Authentication is required if MSI is not available
   Steps to obtain Service Principal Token,

   - Register an Application in Azure Active Directory and create a service principal 
   - Assign a role as **Application Insights Component Contributor** which has read access to Insight component.
   - Create a secret by which application uses to prove its identity.

   Collect ClientID, ClientSecret, TenantId, SubscriptionId from registered app

For more detailed information please refer [Azure Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal) .

### Configuration Settings

Plugin can be set to monitor intended service by setting respective configuration.  It needs to be configured to work along  with either of the snappyflow database plugins - MySQL,PostgreSQL, SQLDB ,based on endpoint service type. Inbound traffic setting should be set to allow traffic from controller instance.

General Parameters

- Resource Group
- Region
- DB Server

### Documents

Metrics are collected and relevant tags are added to the metric document	

Dashboards and alerts templated are chosen based on monitored database service type

- For Azure MySQL relational service,  *Azure MySQL* dashboard and *Azure MySQL* alert template needs to be applied
- For Azure SQL service,  *Azure SQL* dashboard and  *Azure SQ*L alert template needs to be applied
- For Azure PostgreSQL service, *Azure PostgreSQL* dashboard and *Azure PostgreSQL* alert template needs to be applied



For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).