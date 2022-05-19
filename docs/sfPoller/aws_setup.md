
# SnappyFlow SfPoller Setup In AWS
## Prerequisites

### Create IAM Role:

1. Sign in to the AWS Management Console and open the IAM console at https://console.aws.amazon.com/iam/

2. In the navigation pane of the IAM console, click Policies, and then click Create policy

3. In the JSON tab , add policy json:

   ```
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Action": [
           "cloudwatch:Describe*",
           "cloudwatch:Get*",
           "cloudwatch:List*",
           "cloudwatch:GetMetricStatistics*",
           "elasticloadbalancing:Describe*",
           "s3:Get*",
           "s3:List*",
           "rds:Describe*",
           "rds:ListTagsForResource",
           "logs:Get*",
           "logs:Describe*",
           "ecs:Describe*",
           "ecs:List*",
           "pi:*"
         ],
         "Effect": "Allow",
         "Resource": "*"
       }
     ]
   }
   ```

    - Click Review Policy

    - Add a Policy name (must be unique)

    (Optional) For description, type a description for the new policy

    - Click Create Policy

4.  In the navigation pane of the IAM console, click Roles, and then click Create role

5. For Select type of trusted entity, click AWS service

6. For click the use case for your service, click EC2

7. Click Next: Permissions

    Search for the policy created in step 3. Select the check box next to that policy.

8. Click Next: Review

    - Add a Role name (must be unique)
    - (Optional) For Role description, type a description for the new role
    - Review the role and then click Create role

    Refrences: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html

### Create AWS Security Group:

  1. Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/

  2. In the navigation pane, click Security Groups

  3. Click Create security group

  4. In the Basic details section, do the following:

    Enter a descriptive name and brief description for the security group.

  5. For VPC, click the VPC in which to create the security group. The security group can only be used in the VPC in which it is created

  6. Add security group rules now

    Add inbound rules:

    | Type  | Protocol | Port | Source       | Description    |
    | :---- | :------- | :--- | :----------- | :------------- |
    | HTTP  | TCP      | 80   | 0.0.0.0,::/0 | sfPoller http  |
    | HTTPS | TCP      | 443  | 0.0.0.0,::/0 | sfPoller https |
    | SSH   | TCP      | 22   | 0.0.0.0,::/0 | sfPoller ssh   |

    Note:

    Define Source as per user's requirements. Use anywhere if sfPoller has to be accessed from multiple locations. Use Custom if sfPoller will be used from Office/VPN (also provide IP address). Click Create.

    Refrences: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/working-with-security-groups.html#creating-security-group

    Be ready with SSH keypair to be used for launching instance.

### Launching SfPoller Instance

  1. Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/

  2. In the navigation pane, click Instances

  3. Click Launch Instance

  4. Click on AWS Marketplace and search for SnappyFlow Poller Appliance

  5. Select SnappyFlow sfPoller Appliance AMI

  6. Read SnappyFlow sfPoller Appliance usage policy and detail. Click continue to proceed

  7. Select the instance type (Min Recommended: t2.medium )

  8. Configure instance:

     Provide network, subnet and IAM role (IAM role created in prerequisite)

  9. (Optional) Add tags for sfpoller instance

  10. Configure security group:

      - Click the security group created in the prerequisite step
      - Review changes before clicking launch

  11. Click the SSH key pair and launch

  12. Wait till the instance state goes to ready and then open the launched instance on EC2 panel. Copy Public DNS (IPv4) from instance description in AWS console

      Paste Public DNS (IPv4) of the launched instance to the browser and open the sfPoller Launcher.

  13. Enter username: admin and password: instanceID of launched instance and login to sfPoller

      Note: Instance ID can be copied from instance description (as used in step 7).

      sfPoller installation is complete now

### Configure sfPoller

1. Add Profile Key:

  Copy profile key from "Profiles" section under "Manage" tab of your SnappyFlow SaaS account or SnappyFlow server and save.

2. Add Cloud Account:

  Click cloud type and enter its details.

  (Optional) Add cloud metric plugins under "Plugins" tab if it is required to monitor account as well.

3. Create Project:

    - Go to Application tab
    - Click "Create project" and provide project name

4. Add Applications:

    - Add application by clicking add application button under "Actions" column (icon with + sign)
    - Users can either discover applications from cloud using resource tags or manually add application and endpoints
    - Click discover and provide tag keys for the account (If resources are tagged properly on the cloud, then Discovery feature discovers all end points)
    - Add endpoints after selection (by default all endpoints are visible)

5. After adding endpoint click the save button

6. Go to SnappyFlow dashboard (from where profile key was copied) and wait for sometime to get your applications discovered
 

##### sfPoller Installation      [![Watch the video](images/video-icon.png)](images/sfPoller-Production.mp4) 


 