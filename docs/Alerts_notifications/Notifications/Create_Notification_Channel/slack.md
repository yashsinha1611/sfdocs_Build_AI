---
sidebar_position: 3 
---
# Create Slack Notification Channel

## Step 1: Generate Slack Token
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

## Step 2: Create a Slack Notification Channel in SnappyFlow

​       <img src="/img/Notifications/Slack/image_18.png" />

1. Go to the **Manage** tab.

2. Click the **`down arrow`**  icon near your profile.

3. Go to the **Notification** section.

4. Enter the required details.

   - **Type** - Click the **drop-down** icon and select **`Slack`**
   - **Name** - Type a UserName
   - **Token** - Enter the Token generated from the Slack app

   <img src="/img/Notifications/Slack/image_19.png" />

5. You can use the Standard template or Create new template using **JSON** format.

6. Click the **`Add`** button.

<img src="/img/Notifications/Slack/image_20.png" />

7. The table with user details will be generated as shown in the above image. The table has the following details:

- **Type** - Notification type
- **Name** - Profile Name
- **Status** - State of integration
- **Action** - The action column has options to **Edit** and **Delete** the profile

8. Click the **` Add new`**  button to create multiple Slack notification profiles.

You have successfully created a Slack notification channel. The next step is to map the notification to your project [Click here](/docs/Alerts_notifications/Notifications/Map_Notification_Alerts/map_projects_to_channels).

