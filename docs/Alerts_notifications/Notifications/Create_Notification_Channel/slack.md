---
sidebar_position: 3 
---
# Create Slack Notification Channel

## Generate Slack Token
### Create New App For Your Workspace

1. Visit https://api.slack.com/apps

   <img src="/img/Notifications/Slack/image_4.png" />

2. Click the `Create New App` button.

   <img src="/img/Notifications/Slack/image_7.png" />

3. In the **Create an App** window, Select **From scratch** option.

   <img src="/img/Notifications/Slack/image_8.png" />

4. In the **Name app & choose workspace** window,

   - Give a App Name
   - Select a workspace 
   - Click the `Create App` button.

### Provide Permission & Scope

​       <img src="/img/Notifications/Slack/image_10.png" />

1. Go to the **Features** section and select `OAuth & Permissions` (**1**).

   <img src="/img/Notifications/Slack/image_11.png" />

2. In the **OAuth & Permissions** window, scroll down to the **Scopes** and go to **Bot Token Scopes**.

3. Click the `Add an Oauth Scope` to add scopes.

4. Add the following scopes to the **Bot Token Scopes**.

   - chat:write

   - chat:write:public
   - im:read
   - mpim:read
   - groups:read
   - channels:read

   :::note

   Make sure that you select Bot Token Scope not the User Token Scope. 

   :::

### Install Slack App To Workspace & Generate Token

​       <img src="/img/Notifications/Slack/image_13.png" />

1. Scroll up in the **OAuth & Permissions** window and click the `Install to Workspace` button.

   <img src="/img/Notifications/Slack/image_14.png" />

2. Click `Allow` to Provide permission for the newly created App.

   <img src="/img/Notifications/Slack/image_15.png" />

3. Copy the `Bot User OAuth Token` and paste token in Slack notification settings in SnappyFlow.

## Set up a Slack Notification Channel

Follow the below steps to set up a slack notification channel in SnappyFlow.

​       <img src="/img/Notifications/Slack/image_21.png" />

1. Go to the **Manage** tab.

2. Navigate to your **Profile** > **Notifications** section.

   <img src="/img/Notifications/Slack/image_18.png" />

3. In the **Notification** section, enter the required details:

   - **Type** - Click the **`drop-down`** icon and select **`Slack`**
   - **Time**- Select a time zone
   - **Name** - Provide a meaningful name for this channel
   - **Token** - Enter the Token generated from the Slack app

   <img src="/img/Notifications/Slack/image_19.png" />

4. You can use the Standard template or Create new template using **JSON** format.

5. Click the **`Add`** button.

<img src="/img/Notifications/Slack/image_20.png" />

7. A table with the channel details will be generated as shown in the above image. The table has the following details:

- **Type** - Notification type
- **Name** - Name of the notification channel
- **Status** - Current state of integration
- **Action** - The action column has options to **Edit** and **Delete** the channel

8. Click the **` Add new`** button to create multiple Slack notification channels.

## Add the Channel to the Project
The next step is to add the notification channel to your project [Click here](/docs/Alerts_notifications/Notifications/Map_Notification_Alerts/map_projects_to_channels).

