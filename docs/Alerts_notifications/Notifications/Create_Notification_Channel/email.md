---
sidebar_position: 3 
---
# Send Notifications to Email
Follow the below steps to create an Email notification channel in SnappyFlow.

<img src="/img/Notifications/Images/Image_1.PNG" /><br />

   1. Go to the **Manage** (**1**) tab.

   2. Click the **`down arrow`**  (**2**) icon near your profile.

     <img src="/img/Notifications/Images/Image_2.PNG" /><br /> 

   3. Go to the **Notification**  (**1**) section.

   4. Enter the required details as shown below:
      - **Type** - Click the **drop-down** icon and select **`Email`**

      - **Time Zone** - Click the **drop-down** icon and choose your time zone

      - **Name** - Type a UserName

      - **SMTP User** - Type your Email address

      - **Password** -Type the Simple Mail Transfer Protocol (SMTP) user password

      - **SMTP Server**- Type the SMTP server address (Eg: smtp.gmail.com)

      - **SMTP Port** -Type SMTP port number (Eg: For Gmail - 507)

      - **Sender's Email** - Type the Email id from which the alerts need to be notified

   5. Send a test Email to verify your SMPT server. Follow the  below steps:

​             a. Enter your Email address in the **`Test Email ID`** column

​             b. Click the **`Send test email`**  (**2**) button

​             c. You will receive a test email notification

:::note

 If you did not receive a test email notification, check that the parameters are correct.

:::

6. Click the **`Add`** (**3**) button to complete the creation.

   <img src="/img/Notifications/Images/Image_3.PNG" /><br /> 

7. The table with user details will be auto-generated as shown in the above image. The table consists of the following details.

   - **Type** - Notification type
   - **Name** - Profile Name
   - **Status** - State of integration
   - **Info** - SMTP server address
   - **Action** - The action column has options to **Edit**, **Delete**, and **View** the profile

8. Click the **` Add new`**  (**1**) button to create multiple Email notification profiles.

   You have successfully created an Email notification channel. The next step is to map the notification channel to your project [Click here](/docs/Alerts_notifications/Notifications/Map_Notification_Alerts/map_projects_to_channels).

