---
sidebar_position: 3 
---
# Create Teams Notification Channel

## Prerequisites

The incoming Webhook URL from your Teams account is required to integrate the SnappyFlow with Teams.

## Generate Incoming Webhook URL

1. Log in to your **Teams** account.

   <img src="/img/Notifications/image_3.png" />

2. Navigate to **Apps** > **Incoming Webhook**.

   <img src="/img/Notifications/image_4.png" />

3. Click the **`Add to a team`** button.

   <img src="/img/Notifications/image_6.png" />

4. Select a team and click the **`Set up a connector`** button.

   <img src="/img/Notifications/image_23.png" />

5. Click the **`Configure`** button of the Incoming Webhook.

   <img src="/img/Notifications/image_28.png" />

6. Give a profile name to the **`Incoming Webhook`** and click the **`Create`** button.

   <img src="/img/Notifications/image_25.png" />

7. Copy the **Incoming Webhook URL** and use the same while setting up the notification channel in SnappyFlow.

8. Click the **`Done`** button.

## Set up Teams Notification Channel

Follow the below steps to set up a Teams notification channel in SnappyFlow.

<img src="/img/Notifications/teams/image_1.png" />

1. Go to the **Manage** tab.

2. Navigate to your **Profile** > **Notifications** section.

   <img src="/img/Notifications/image_12.png" />

3. In the **Notifications** section, enter the required details:

   - **Type** - Click the **`drop-down`** icon and select **`Teams`**
   - **Name** - Provide a meaningful name for this channel
   - **URL** - Enter the Webhook URL generated in your Teams account

4. Click the **`Verify`** button.

   <img src="/img/Notifications/image_17.png" />

5. **`Verification successful` **message will be generated if the URL is valid.

6. Click the **`Add`** button.

   <img src="/img/Notifications/image_19.png" /> 

7. The table with user details will be auto-generated as shown in the above image. The table has the following details:

   - **Type** - Notification type
   - **Name** - Name of the notification channel
   - **Status** - Current state of integration
   - **Info**- The incoming webhook URL
   - **Action** - The action column has options to **Edit** and **Delete** the channel

8. Click the **` Add new`** button to create multiple Teams notification profiles.

## Add the Channel to the Project

The next step is to add the notification channel to your project [Click here](/docs/Alerts_notifications/Notifications/Map_Notification_Alerts/map_projects_to_channels).

