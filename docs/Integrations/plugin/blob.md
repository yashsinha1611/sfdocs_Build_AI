# Blob

## Description

Azure blob storage is to store large amount of unstructured data on data storage platform. Plugin collects insights data from Azure Monitor to monitor the performance.

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

Plugin need to be added through Plugins tab.

General Parameters

- Resource Group
- Region
- Instance Name ( Storage account name)


### Documents

All Blob Storage metrics are collected and tagged based on their document type to be displayed in **Blob** dashboard. Predefined alert rules can be imported from **Blob** template.



For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).