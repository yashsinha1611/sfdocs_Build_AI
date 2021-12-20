# Monitoring MySQL databases running on Windows

## Overview

The MYSQL Metric plugin collects metrics for number of user connections and more.

## Prerequisites

- MySQL 5.6 or above

## Configuration Settings

Add the plugin configuration in `config.yaml` file under `C:\Program Files (x86)\Sfagent\` directory as follows to enable this plugin

```
- name: mysql
  enabled: true
  interval: 300
  config:
     port: 3306
     host: 127.0.0.1
     user: xxxx
     password: xxxx
```

For help with plugins, please reach out to [support@snappyflow.io](mailto:support@snappyflow.io)

