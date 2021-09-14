import React from "react";

export const JAVA_MAIN_TABS = [
  {
    label: (
      <>
        <img className="tab_header_image" src="images/instances-logo.png" />
        <span className="tab_header_label">Instance</span>
      </>
    ),
    value: 'instance'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="images/kubernetes-logo.png"/>
        <span className="tab_header_label">Kubernetes</span>
        </>
    ),
    value: 'kubernetes'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="images/docker-logo.png"/>
        <span className="tab_header_label">Docker</span>
      </>
    ),
    value: 'docker'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="images/amazon-ecs-logo.png"/>
        <span className="tab_header_label">ECS</span>
        </>
      ),
    value: 'ecs'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="images/lambda-functions-logo.png"/>
        <span className="tab_header_label">AWS Lambda</span>
      </>
    ),
    value: 'aws_lambda'
  }
];

export const INSTANCE_SUB_TABS = [
  {
    label: 'Command Line',
    value: 'command_line'
  },
  {
    label: 'Apache Tomcat',
    value: 'apache_tomcat'
  },
  {
    label: 'JBoss EAP/WildFly',
    value: 'jboss_eap'
  }
];