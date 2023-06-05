---
sidebar_position: 3 
---
# Content Check 

**Content Check** is a part of Synthetic Monitoring that allows you to define specific checks that look for particular content or elements on a webpage. This feature is designed to verify that a website is functioning perfectly or that a specific feature is available on the website.

## Enable Content Check

The Content Check feature can be enabled while adding an API to the collection or enable it for an API already present in the collection. [Click here](/docs/Synthetic/overview#adding-apis-to-collections) to learn how to create an collection within sfPoller and to add an API to the collection.

**Follow the below steps to enable the Content Check feature while adding an API to the collection.**

  <img src="/img/synthetic/content_check/image_3.png"/ >

1. In the **Add API** window, select the `Content Check` option.

   <img src="/img/synthetic/content_check/image_4.png"/ >

2. Select a  `Search type`: **Regex** or **Exact Match**.

   <img src="/img/synthetic/content_check/image_5.png"/ >

3. Select a `Condition`: **Contains** or **Does not contain**.

   <img src="/img/synthetic/content_check/image_6.png"/ >

4. In the `Search String` option, enter the string that need to be checked.

5. In the `#Retries before failure` option, specify the number of  checks that need to performed before it results as false.

6. Click the `Save` button.

**Follow the below steps to enable the Content Check feature for an API already present in the collection.**

   <img src="/img/synthetic/content_check/image_8.png"/ >

1. To enable the Content Check feature for an API already present in the collection, navigate to the **Collection** > **API**.

2. Click the `Edit` option in the **Action** column of the API.

   <img src="/img/synthetic/content_check/image_7.png"/ >

3. In the **Edit API** window, select the `Content Check` option and add the following details: `Search type `, `Condition`, `Search String`, and `#Retries before failure`.

4. Click the `Save` button.

## View API Metrics

Follow the below steps to view API metrics. 

<img src="/img/synthetic/content_check/image_1.png"/ >

1. Navigate to the Application's dashboard within the SnappyFlow UI.

2. In the **Metrics section**, you can view the metrics collected from the API. **Search Content** summary box is one among these metrics.

3. **Search Content** summary box will display the result of the Content Check.

:::note
If the result is **False**, then an alert will be generated to notify the result.
:::

Refer to the [Alerts Document](/docs/Alerts_notifications/getting_started) to learn about Alerts feature.

   



