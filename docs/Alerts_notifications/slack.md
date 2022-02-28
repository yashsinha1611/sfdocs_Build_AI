# Sending notifications to Slack

## Overview

SnappyFlow sends alerts/notifications to Slack and alerts can be configured to fit your existing business processes

## Step 1: Create Slack Token

### Create New App For Your Workspace

- Visit https://api.slack.com/apps
- Click on create new app
- Enter your Slack app name
- Select the workspace from the drop-down
- Click `Create App`

### Provide Permission Scope

- Select `OAuth & Permissions` under `Features` section from left side menu.

- Scroll down to Scope section and find Bot Token Scope.

- Click `Add an Oauth Scope` and select chat:write:public, im:read, mpim:read, groups:read, channels:read

- scope from drop-down

- It automatically adds chat:write scope along with it.

- :::note

  There is another scope below the Bot Token Scope called as user Token Scope. 
  Select bot token scope and not the user token scope.

  :::

### Install Slack App To Workspace & Generate Token

- scroll-up and Click `Install App to Workspace`.
- Click `Allow` to Provide permission for newly created App.
- Copy the `Bot User OAuth Access Token` and paste token in APM Slack settings.

### Features and Functionality(optional)

- Select "App Home" under `Features` section from left side menu.
- Scroll down to `Your App’s Presence in Slack` section
- Enable `Always show My Bot as Online` in App Home

## Step 2: Add Slack Token to SnappyFLow

- Under the `Manage` tab in SnappyFlow portal, select your profile and click on notifications.
- Select notification type as `Slack` and give a name of your choice and add the token generated in step 1 in the `Token` field

![slack_1](/img/slack_1.png)

## Step 3:  Add Slack notification to the Project 

![slack_2](/img/slack_2.png)

![slack_2a](/img/slack_2a.png)

## Step 4: Setup Alerts

From the Application Dashboard, In the Alert Definition page , Edit the Alerts and check the “Notify” option

![slack_3](/img/slack_3.png)

