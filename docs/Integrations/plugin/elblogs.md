# ELB Logs

## Description :

This plugin captures the logs for all 3 kind of ELB's (Application, Network, Classic) based on predefined logs format. 

ELBLogs plugin captures logs for Application, Network, Classic: 

* **Application ELB :** [Refer the Description here](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html) 
* **Network ELB :** [Refer the Description here](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-access-logs.html) 
* **Classic ELB :** [Refer the Description here](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/access-log-collection.html) 

Above all respective logs can be visualized in SnappyFlow Dashboard and can be observed.

#### Pre-requisites :

* User should have a API Access Key and API Secret Key for AWS Account.
* User should have ELB with enabled access logs in some s3 bucket. 

### Configuration Settings

Select the *ELBLogs* plugin from the dropdown under Plugins tab and find following elb logs type as document(any one):

- cloudwatch-network
- cloudwatch-classic
- cloudwatch-application

### Documents

All Test metrics are collected and tagged based on their document type (application, network or classic).

**List of Document Types :** 

* For Application ELB : 

  * **Description :** type(htttp/https/ws/h2/wss) time elb client:port target:port request_processing_time target_processing_time response_processing_time elb_status_code target_status_code received_bytes sent_bytes "request" "user_agent" ssl_cipher ssl_protocol target_group_arn "trace_id" "domain_name" "chosen_cert_arn" matched_rule_priority request_creation_time "actions_executed" "redirect_url" "redirect_url" "target:port_list" "target_status_code_list" "classification" "classification_reason"
  * **Example :** https 2020-10-09T04:41:37.394713Z app/apm-demo/5ce576ca9784a513 207.47.39.34:62937 172.31.4.4:80 0.000 0.006 0.000 200 200 818 333 "POST https://demoinput.snappyflow.io:443/sfmetrics/topics/metric-grqqwwi7 HTTP/1.1" "Go-http-client/1.1" ECDHE-RSA-AES128-GCM-SHA256 TLSv1.2 arn:aws:elasticloadbalancing:us-west-2:159750416379:targetgroup/apm-demo/379f70084715403e "Root=1-5f7fea01-6b7fdf585250ebde5b26b2ab" "demoinput.snappyflow.io" "arn:aws:iam::159750416379:server-certificate/apm-demo" 0 2020-10-09T04:41:37.388000Z "forward" "-" "-" "172.31.4.4:80" "200" "-" "-" 

* For Classic ELB : 

  * **Description :** timestamp elb client:port backend:port request_processing_time backend_processing_time response_processing_time elb_status_code backend_status_code received_bytes sent_bytes "request" "user_agent" ssl_cipher ssl_protocol
  * **Example :** 2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 57 "GET https://www.example.com:443/ HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2 

* For Network ELB :  

  * **Description :** type(tls) version time elb listener client:port destination:port connection_time(ms) tls_handshake_time received_bytes sent_bytes incoming_tls_alert chosen_cert_arn chosen_cert_serial tls_cipher tls_protocol_version tls_named_group domain_name alpn_fe_protocol alpn_be_protocol alpn_client_preference_list 
  * **Example :** tls 2.0 2018-12-20T02:59:40 net/my-network-loadbalancer/c6e77e28c25b2234 g3d4b5e8bb8464cd 72.21.218.154:51341 172.100.100.185:443 5 2 98 246 -arn:aws:acm:us-east-2:671290407336:certificate/2a108f19-aded-46b0-8493-c63eb1ef4a99 - ECDHE-RSA-AES128-SHA tlsv12 - my-network-loadbalancer-c6e77e28c25b2234.elb.us-east-2.amazonaws.com

For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io).