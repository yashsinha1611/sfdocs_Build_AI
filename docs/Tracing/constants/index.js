import React from "react";

export const JAVA_MAIN_TABS = [
  {
    label: (
      <>
        <img className="tab_header_image" src="/img/platform-instance.svg" />
        <span className="tab_header_label">Instance</span>
      </>
    ),
    value: 'instance'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="/img/platform-kubernetes.svg" />
        <span className="tab_header_label">Kubernetes</span>
        </>
    ),
    value: 'kubernetes'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="/img/platform-docker.svg" />
        <span className="tab_header_label">Docker</span>
      </>
    ),
    value: 'docker'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="/img/platform-ecs.svg" />
        <span className="tab_header_label">ECS</span>
        </>
      ),
    value: 'ecs'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="/img/platform-aws-lambda.svg" />
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