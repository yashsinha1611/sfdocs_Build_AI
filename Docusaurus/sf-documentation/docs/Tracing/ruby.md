# Tracing Ruby Applications
#### Available Platforms

[**Instances**](ruby#instances)

[**Kubernetes**](ruby#kubernetes)


## Instances

sfTrace Ruby Agent automatically instruments applications, based on web frameworks Ruby on Rails and other Rack-compatible applications. It uses the hooks and signals provided by these frameworks to trace the application.

##### Installation steps

1. Install [sfAgent](/docs/Quick_Start/getting_started#sfagent) (if not already installed)
2. Confirm that `/opt/sfagent/config.yaml` is configured with correct profile key and tags.

##### Trace setup for Ruby on Rails Applications

1. Install sftrace agent by either adding the gem to Gemfile gem `sftrace-agent` and then execute the command `bundle install` or install the agent yourself using the command `gem install sftrace-agent`.
2. Add the agent configuration file in application’s config folder. Refer to `application.rb` for tracing specific configuration. Search for `SFTRACE-CONFIG` in sample `application.rb` 

## Kubernetes

 Follow the steps below to enable tracing in Ruby on Rails applications running as a Kubernetes pod

1. Follow the first 2 steps in **[Trace setup for Ruby on Rails Applications](#instances)** to update the application with agent specific configuration.

2. sfTrace ruby agent configuration can be set to the application running in Kubernetes pod. This can be done in 2 ways:

##### **Option 1:  manifest deployment**

Refer to ruby[_k8s_manifest_deployment.yaml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/nodejs/nodejs_k8s_standalone_deployment.yaml)  to copy trace agent configuration to the application container and start the container with trace agent configurations. Search for `SFTRACE-CONFIG` in sample `deployment.yaml` file

Once updated, deploy the pod.

##### **Option 2: Deploy using helm chart**

Step 1: Update `values.yaml`

Refer to [k8s_with_helm_chart_values.yaml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/nodejs/k8s_with_helm_chart_values.yaml) to configure agent specific properties. Search for `SFTRACE-CONFIG` in sample values.yaml file

Step 2: Update `deployment.yaml`

Refer to ruby[_k8s_with_helm_chart_deployment.yaml](https://github.com/snappyflow/website-artefacts/blob/master/sfTracing/nodejs/nodejs_k8s_with_helm_chart_deployment.yaml) to copy trace agent to the application container and start the container using the trace agent configurations. Search for `SFTRACE-CONFIG` in sample `deployment.yaml` file

Once updated, deploy the pod.
