---
sidebar_position: 3 
---

## Docker

- Refer to [java_Dockerfile](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/java/java_Dockerfile). Look at sections with `SFTRACE-CONFIG` description. 

- Installation steps are provided. Copy the trace agent to the container and start the container by attaching the agent to the application. 
- Additionally, user has to add SnappyFlow configurations for `profile_key`, `projectName`, `appName` to the docker file 
- Once updated, build and start the container.