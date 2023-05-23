---
sidebar_position: 3 
---
# Create Webhook Notification Channel

## Set up a Webhook Notification Channel

Follow the below steps to set up a Webhook notification channel in SnappyFlow.

<img src="/img/Notifications/Webhook/image_4.png" />

1. Go to the **Manage** tab.

2. Navigate to your **Profile** > **Notifications** section.

3. In the **Notification** section, click the `Add New` button.

   <img src="/img/Notifications/Webhook/image_5.png" />

4. In the **Add New Notification** window, enter the required details:

   - **Type** - Click the **`drop-down`** icon and select **`Webhook`**
   - **Time Zone** - Select your time zone
   - **Name** - Provide a meaningful name for this channel
   - **URL** - Webhook URL
   - **Response Field** - Give an attribute to identify the notification from this channel
   - **Authorization** - Choose an authorization (**None**, **Token**, **OAuth 2.0**). Based on the authorization provide the details from Webhook.

   <br/>

   | **Authorization** | **Details Required** |
   | ----------------- | ---------------------- |
   | Token         | Security Key    |
   |OAuth 2.0| Client ID, Client Secret (secret key), Token URL, Scope|

   <br/>

   <img src="/img/Notifications/Webhook/image_5.png" />

5. Click the `Verify`  button to verify the Webhook URL.

6. Click the `Add` button.

   <img src="/img/Notifications/Webhook/image_7.png" />

7. A table with the channel details will be generated as shown in the above image. The table has the following details:

   - **Type** - Notification type
   - **Name** - Name of the notification channel
   - **Status** - Current state of integration
   - **Action** - The action column has options to **Edit** and **Delete** the channel

8. Click the **`Add new`** button to create multiple Webhook notification channels.

## Add the Channel to the Project

The next step is to add the notification channel to your project [Click here](/docs/Alerts_notifications/Notifications/Map_Notification_Alerts/map_projects_to_channels).

