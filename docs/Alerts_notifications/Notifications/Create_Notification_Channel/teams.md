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

7. Copy the **Incoming Webhook URL**.

8. Click the **`Done`** button.

## Create a Teams Notification Channel in SnappyFlow
<img src="/img/Notifications/image_1.png" />

1. Go to the **Manage** (**1**) tab.

2. Click the **`down arrow`**  (**2**) icon near your profile.

   <img src="/img/Notifications/image_12.png" />

3. Go to the **Notification** section.

4. Enter the required details.
   - **Type** - Click the **drop-down** icon and select **`Teams`**
   - **Name** - Type a UserName
   - **URL** - Enter the Webhook URL generated in your Teams account

5. Click the **`Verify`** button.

   <img src="/img/Notifications/image_17.png" />

6.   **`Verification successful` **message will be generated if the URL is valid.

7. Click the **`Add`** button.

   <img src="/img/Notifications/image_19.png" /> 

8. The table with user details will be auto-generated as shown in the above image. The table has the following details:

   - **Type** - Notification type
   - **Name** - Profile Name
   - **Status** - State of integration
   - **Info**- The incoming webhook URL
   - **Action** - The action column has options to **Edit** and **Delete** the profile

9. Click the **` Add new`** button to create multiple Teams notification profiles.

   You have successfully created a Teams notification channel. The next step is to map the notification to your project [Click here](/docs/Alerts_notifications/Notifications/Map_Notification_Alerts/map_projects_to_channels).

