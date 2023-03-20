---
sidebar_position: 3 
---
# Create an Email Notification Channel


## Prerequisites

You need an active Simple Mail Transfer Protocol (SMTP) compatible email server or email subscription. To get SMTP username, password, and port details reach out to your email server admin. 

- SMTP username
- SMTP password
- SMTP port

For Gmail users, your account email and password will be the SMTP username and password respectively. The default SMTP port is 465. For more information, check this [link](https://support.google.com/mail/answer/7126229?hl=en#zippy=%2Cstep-change-smtp-other-settings-in-your-email-client).

## Set up Email Notification Channel

Follow the below steps to create an Email notification channel in SnappyFlow. Only SMTP is supported. 

<img src="/img/Notifications/email/image_1.png" />

   1. Go to the **Manage** tab.

   2. Navigate to your **Profile** > **Notifications** section.

      <img src="/img/Notifications/Images/image_2.PNG" />

   3. In the **Notification**s  (**1**) section, enter the required details:

      - **Type** - Select **`Email`**

      - **Time Zone** - Choose your time zone

      - **Name** - Provide a meaningful name for this channel

      - **SMTP User** - Email account using which email notifications will be sent

      - **Password** -Type the SMTP user password

      - **SMTP Server**- Type the SMTP server address (Eg: smtp.gmail.com)

      - **SMTP Port** -Type SMTP port number (Eg: For Gmail - 507)

      - **Sender's Email** - The email notification will display this email as sender

   5. Send a test Email to verify your SMPT server. Follow the  below steps:

​             a. Enter your Email address in the **`Test Email ID`** column

​             b. Click the **`Send test email`**  (**2**) button

​             c. You will receive a test email 

:::note 

Where's the receiver's email id?

The receiver email id is configured in Step 3: Map Alerts to Notification Channel. For each alert, a different receiver id can be configured if required.

:::

6. Click the **`Add`** (**3**) button to complete the creation.

   <img src="/img/Notifications/Images/image_3.PNG" /><br /> 

7.  A table with the channel details will be generated as shown in the above image. The table consists of the following details:

   - **Type** - Notification type
   - **Name** - Name of the notification channel
   - **Status** - Current state of integration
   - **Info** - SMTP server address
   - **Action** - The action column has options to **Edit**, **Delete**, and **View** the channel

8. Click the **` Add new`**  (**1**) button to create multiple Email notification channels.

## Add the Channel to the Project

The next step is to add the notification channel to your project [Click here](/docs/Alerts_notifications/Notifications/Map_Notification_Alerts/map_projects_to_channels).

