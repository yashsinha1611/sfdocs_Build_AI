# Monitor Azure Log

## Description

Plugin relays the log events stored in event hub to snappyflow APM.

### Prerequisites

Plugin supports two modes of basic authorization

1. Managed Service Identity (MSI)

   Register sfpoller with Managed identity enabled. Refer [Enable Managed Identity](https://docs.microsoft.com/en-us/azure/event-hubs/authenticate-managed-identity?tabs=latest#use-event-hubs-with-managed-identities)
   
   Assign *Azure Event Hubs Data receiver* role to  the sfpoller machine using following steps,
   - In azure portal, Open Access control (IAM) pane shown in sfpoller VM inventory page.
   - Click the Role assignments tab to view the role assignments at this scope
   - Click *Add > Add role assignment*. If you don't have permissions to assign roles, the Add role assignment option will be disabled.
   - Configure *role* option to *Azure Event Hubs Data receiver*, *Assign access to* option to *Virtual Machine* and choose respective subscription and the vm name 

   For more detailed information please refer [Assign Role to resource](https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal?tabs=current#step-2-open-the-add-role-assignment-pane)
2. Service Principal Token

   Token based Authentication is required if MSI is not available
   Steps to obtain Service Principal Token,

   - Register an Application in Azure Active Directory and create a service principal 
   - Create a secret by which application uses to prove its identity.
   - In registered application, select *API permissions > Add a permission > APIs my organization uses > Microsoft.EventHubs > Add permissions*

   Collect ClientID, ClientSecret, TenantId, SubscriptionId from registered app
   For more detailed information please refer [Azure Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal) .

*EventHub Access Claim*

Configure any of the *Shared access policies*  across both EventHub and its respective EventHubNamespace (available in settings section of respective resources in azure portal) should have *Mange* claim 



### Plugin  Configuration

Plugin to be configured through sfpoller

- Select *Manage > Cloud Account > Add > Azure (AccountType)*. If *Service Principal Token* in *Prerequisites* section is adopted, add the client credentials generated  , else configure only Subscription Id, Region, Resource Group where the eventhub belongs
- Create desired Project and Application. Select *Add Endpoint > Azure > Account Name > Azure-LogEvents*. Configure a custom instance name, desired eventhub, and its namespace. 
- Log Specification:  If all the logs updated in eventhub needs to be collected,
  leave the field empty. 
  Unique identifier for each log kind is its *category*. Refer [Available Categories](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories).
  Each log category has its own schema of metrics [Schema Per Category](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-schema#service-specific-schemas).

  A log Specification includes a *category* and following set of defined *options* which applies to that category,
  *Resources*: Comma Separated azure resources those are intended to be monitored
  *Target*: Specify whether data to be rendered in metric or log dashboard. Available values to be set, metric and log
  *Message Field*: The field will be identified as desired log message to be shown in snappyflow APM (applicable only if Target is set to log)


For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).