---
sidebar_position: 3 
---
# Create an Email Notification Channel


## Prerequisites

You need an active SMTP compatible email server or email subscription. To get SMTP username, password and port details reach out to your email server admin. 

- SMTP username
- SMTP password
- SMTP port

For Gmail users, your account email and password will be the SMTP username and password respectively. The deault SMTP port is 465. For more information, check this [link](https://support.google.com/mail/answer/7126229?hl=en#zippy=%2Cstep-change-smtp-other-settings-in-your-email-client).

## Step by Step Guide

Follow the below steps to create an Email notification channel in SnappyFlow. Only SMTP is supported. 

<img src="/img/Notifications/Images/image_1.PNG" /><br />

   1. Go to the **Manage** (**1**) tab.

   2. Click the **`down arrow`**  (**2**) icon near your profile.

     <img src="/img/Notifications/Images/image_2.PNG" /><br /> 

   3. Go to the **Notification**s  (**1**) section.

   4. Enter the required details
      - **Type** - Select **`Email`**.

      - **Time Zone** - Choose your time zone.

      - **Name** - Provide a meaningful name to this channel.

      - **SMTP User** - Email account using which emails notifications will be sent.

      - **Password** -Type the Simple Mail Transfer Protocol (SMTP) user password.

      - **SMTP Server**- Type the SMTP server address (Eg: smtp.gmail.com).

      - **SMTP Port** -Type SMTP port number (Eg: For Gmail - 507).

      - **Sender's Email** - The email notification will display this email as sender. 

   5. Send a test Email to verify your SMPT server. Follow the  below steps:

​             a. Enter your Email address in the **`Test Email ID`** column.

​             b. Click the **`Send test email`**  (**2**) button.

​             c. You will receive a test email .

:::note Where's the receiver's email id?

Receriver email id is configured in Step 3: Map Alerts to Notification Channel. For each alert, a differnt receiver id can be configured if required.

:::

6. Click the **`Add`** (**3**) button to complete the creation.

   <img src="/img/Notifications/Images/image_3.PNG" /><br /> 

7. The table with user details will be auto-generated as shown in the above image. The table consists of the following details.

   - **Type** - Notification type
   - **Name** - Profile Name
   - **Status** - State of integration
   - **Info** - SMTP server address
   - **Action** - The action column has options to **Edit**, **Delete**, and **View** the profile

8. Click the **` Add new`**  (**1**) button to create multiple Email notification profiles.

   You have successfully created an Email notification channel. The next step is to map the notification channel to your project [Click here](/docs/Alerts_notifications/Notifications/Map_Notification_Alerts/map_projects_to_channels).

