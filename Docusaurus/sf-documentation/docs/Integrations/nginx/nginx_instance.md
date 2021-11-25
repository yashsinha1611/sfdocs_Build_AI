# Monitoring Nginx on Instances

## Overview

Nginx monitoring involves monitoring of the following elements: 

- Nginx Access Logs
- Nginx Error Logs 

- Nginx Server Health 

## Pre-requisites 

### Access Log Format
Ensure Nginx access logs are in format expected by sfAgent parser. Edit nginx conf file `/etc/nginx/nginx.conf` and set log format as follows: 	

```
'$remote_addr $remote_user [$time_local] '  
'"$request" $status $body_bytes_sent ' 
'"$http_referer" "$http_user_agent" ua="$upstream_addr" ' 
'rt=$request_time uct=$upstream_connect_time uht=$upstream_header_time urt=$upstream_response_time'; 
```

Sample: 

```
log_format snappyflow '$remote_addr $remote_user [$time_local] '
                      '"$request" $status $body_bytes_sent '
                      '"$http_referer" "$http_user_agent" ua="$upstream_addr" '
                      'rt=$request_time uct=$upstream_connect_time uht=$upstream_header_time urt=$upstream_response_time';

access_log  /var/log/nginx/access.log snappyflow buffer=16k flush=5s;
```

After configuring log format, the expected log entry would be: 

```
172.31.72.81 - [01/Jul/2020:03:36:04 +0000] "POST /owners/6/edit HTTP/1.1" 504 167 "-" "Apache-HttpClient/4.5.7 (Java/1.8.0_252)" ua="-" rt=60.004 uct=- uht=- urt=60.004 
```

Description of log fields is as follows: 

<ol class="order_list">
    <li>remote_addr:  Client address.</li>
    <li>remote_user:  User name supplied with the Basic authentication.</li>
    <li>time_local:  Time when the log entry is written.</li>
    <li>request:  Full original request line.</li>
    <li>status:  Response status code.</li>
    <li>body_bytes_sent:  Number of bytes sent to a client (not counting the response header).</li>
    <li>http_referer:   Client request header field 'Referer'.</li>
    <li>http_user_agent:  Client request header field 'User-agent'. Useful to get the client host details like OS, browser, Device.</li>
    <li>upstream_addr:  Keeps the IP address and port, or the path to the UNIX-domain socket of the upstream server.</li>
    <li>request_time:  Request processing time in seconds with a milliseconds resolution; time elapsed between the first bytes were read from the client and the log write after the last bytes were sent to the client.</li>
    <li>upstream_connect_time:  Keeps time spent on establishing a connection with the upstream server, in seconds with millisecond resolution.</li>
    <li>upstream_header_time: Keeps time spent on receiving the response header from the upstream server, in seconds with millisecond resolution. </li>
    <li>upstream_response_time:  Keeps time spent on receiving the response from the upstream server, in seconds with millisecond resolution.</li>
</ol>

 Optional fields supported:

 1. remote_port:  Client port. Add after the remote_addr field as follows:

```
log_format snappyflow '$remote_addr:$remote_port $remote_user [$time_local] '
                      '"$request" $status $body_bytes_sent '
                      '"$http_referer" "$http_user_agent" ua="$upstream_addr" '
                      'rt=$request_time uct=$upstream_connect_time uht=$upstream_header_time urt=$upstream_response_time';
                                            
access_log  /var/log/nginx/access.log snappyflow buffer=16k flush=5s;
```
 2. request_length:  Request length including request line, header, and request body. Add it in the end after $upstream_response_time as follows:

```
log_format snappyflow  '$remote_addr $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent" ua="$upstream_addr" '
                    'rt=$request_time uct=$upstream_connect_time uht=$upstream_header_time urt=$upstream_response_time rs=$request_length';
                                          
access_log  /var/log/nginx/access.log snappyflow buffer=16k flush=5s;
```

### Nginx Status Module
**Enable Nginx status module:** This is required to monitor Nginx server health 

   Open source Nginx exposes several basic metrics about server activity on a simple status page, provided that you have HTTP Stub Status Module enabled. To check if the module is already enabled, run: 

   ```shell
   nginx -V 2>&1 | grep -o with-http_stub_status_module 
   ```

   The status module is enabled if you see **with-http_stub_status_module** as output in the terminal. 

   In order to enable mod_status , you will need to enable the status module. You can use the --with-http_stub_status_module configuration parameter when building Nginx from source: 

   ```shell
     ./configure \ 
      … \ 
      --with-http_stub_status_module 
      make 
      sudo make install
   ```

   After verifying the module is enabled, you will also need to modify your Nginx configuration to set up a locally accessible URL (e.g., /stats) for the status page: 

   ```
    server { 
        location /stats { 
          stub_status; 
          access_log off; 
          allow 127.0.0.1; 
          deny all; 
        } 
      } 
   ```

   

:::note
 The server blocks of Nginx config are usually found not in the master configuration file (e.g., /etc/nginx/nginx.conf) but in supplemental configuration files that are referenced by the master config. To find the relevant configuration files, first locate the master config by running: 

`nginx -t` 

Open the master configuration file listed, and look for lines that begin with “include” near the end of the http block, e.g.: 

 

`include /etc/nginx/conf.d/*.conf;`

In one of the referenced config files you should find the main server block, which you can modify as above to configure Nginx metrics reporting. After changing any configurations, reload the configs by executing: 

`nginx -s reload`

Now you can view the status page to see your metrics: 
[http://127.0.0.1/stats](http://127.0.0.1/stats)

:::



## Configuration 

 

[sfAgent](/docs/Quick_Start/getting_started#sfagent) section provides steps to install and automatically generate plugin configurations. User can also manually add the configuration shown below to config.yaml under /opt/sfagent/ directory 

```yaml
key: <profile key> 
generate_name: true 
tags: 
  Name: <unique instance name or will be generated from IP> 
  appName: <add application name> 
  projectName: <add project name> 
metrics: 
  plugins: 
    - name: nginx 
      enabled: true 
      interval: 300 
      config: 
        port: 80 
        secure: false 
        location: stats 
logging: 
  plugins: 
    - name: nginx-access 
      enabled: true 
      config: 
        geo_info: true  
        log_path: /var/log/nginx/access.log, /var/log/nginx/access_log 
        ua_parser: true 
    - name: nginx-error 
      enabled: true 
      config: 
        log_level: 
          - emerg 
          - alert 
          - error 
        log_path: /var/log/nginx/error.log, /var/log/nginx/error_log 
```



## Viewing data and dashboards 

 

- Data generated by plugin can be viewed in “browse data” page inside the respective application under `plugin=nginx` with `documentType=` `serverDetails`, `serverStats` and `plugin=nginx-access` with `documentType=nginxAccessLogs`.
- Dashboard for this data can be instantiated by Importing dashboard template `Nginx_Server`, `Nginx_Access` to the application dashboard. 

 

