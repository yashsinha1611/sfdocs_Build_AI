---
sidebar_position: 3 
---
# Create PagerDuty Notification Channel 
## Prerequisites

1. Login into your PagerDuty account.

   <img src="/img/Notifications/pagerduty/image_1.png" />

   <img src="/img/Notifications/pagerduty/image_2.png" />

2. Go to the **Services** tab and select a service. (**Example**: SnappyFlow).

   <img src="/img/Notifications/pagerduty/image_4.png" />

3. In the **Services** window, go to the **Integration** tab.

4. Select the `+ Add another integration` (1) button.

   <img src="/img/Notifications/pagerduty/image_6.png" />

5. In the **Add Integration** window, select SnappyFlow as the integration type and Click the `Add` button.

   :::note

     You can add SnappyFlow as an integration type while creating a service.

   :::

   <img src="/img/Notifications/pagerduty/image_5.png" />

6. In the **Integration** tab, click the `drop-down` of the SnappyFlow integration.

7. Copy the integration key and use the same while setting up the notification channel in SnappyFlow UI.

   

## Set up PagerDuty Notification Channel

​       <img src="/img/Notifications/pagerduty/image_7.png" />

1. Go to the **Manage** tab.

2. Navigate to your **Profile** > **Notification** section.

   <img src="/img/Notifications/pagerduty/image_8.png" />

3. In the **Notification** section, enter the required details: 

   - **Type** - Click the **`drop-down`** icon and select **`PagerDuty`**
   - **Name** - Provide a meaningful name for this channel
   - **Integration Key** - Enter the Integration key generated in your PageDuty account

4. Click the **`Add`** button. 

   <img src="/img/Notifications/pagerduty/image_9.png" />

5. A table with channel details will be generated as shown in the above image. The table has the following information:

- **Type** - Notification type
- **Name** - Name of the notification channel
- **Status** - Current state of integration
- **Actions** - The actions column has options to **Edit** and **Delete** the profile

9. Click the **` Add new`** button to create multiple PagerDuty notification profiles.

## Add the Channel to the Project

The next step is to add the notification channel to your project [Click here](/docs/Alerts_notifications/Notifications/Map_Notification_Alerts/map_projects_to_channels).
