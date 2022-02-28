# Forwarding AWS Lambda logs to SnappyFlow

## Overview

The **AWS Lambda Extension** is designed to forward logs from your AWS Lambda functions to SnappyFlow without requiring an external transport such as CloudWatch Logs.

This lightweight extension runs alongside your AWS Lambda functions. Submitting Lambda logs with the extension is supported in all Lambda runtimes.

<img src="/img/aws_lambda_1.svg" />

## Installation

### Enable Lambda extension in your function

- **As Lambda Layer**

  - Add the Lambda Layer for the SnappyFlow extension to your AWS Lambda function with the following ARN:

    ```
    arn:aws:lambda:<AWS_REGION>:106947364898:layer:sf-lambda-extension:3
    ```

    Replace <AWS_REGION> with the same AWS region as your Lambda Function, for example, us-west-2

    <img src="/img/aws_lambda_2.png" />

    <img src="/img/aws_lambda_3.png" />

    <img src="/img/aws_lambda_4.png" />

- **As Container Image**

  - Add the SnappyFlow Lambda extension to your container image by adding the following to your Dockerfile:

    ```
    COPY --from=snappyflowml/sf-lambda-extension:latest /opt/extensions/ /opt/extensions 
    ```

  - Add the environment variable `SF_PROFILE_KEY` and set the value to your profile key copied from SnappyFlow

  - Add environment variables `APP_NAME` and `PROJECT_NAME` with appropriate values

   

