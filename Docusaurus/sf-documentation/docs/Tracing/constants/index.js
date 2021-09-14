import React from "react";

export const JAVA_MAIN_TABS = [
  {
    label: (
      <>
        <img className="tab_header_image" src="../../../static/img/instances-logo.png" />
        <span className="tab_header_label">Instance</span>
      </>
    ),
    value: 'instance'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="../../../static/img/kubernetes-logo.png" />
        <span className="tab_header_label">Kubernetes</span>
        </>
    ),
    value: 'kubernetes'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="../../../static/img/docker-logo.png" />
        <span className="tab_header_label">Docker</span>
      </>
    ),
    value: 'docker'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="../../../static/img/amazon-ecs-logo.png" />
        <span className="tab_header_label">ECS</span>
        </>
      ),
    value: 'ecs'
  },
  {
    label: (
      <>
        <img className="tab_header_image" src="../../../static/img/lambda-functions-logo.png" />
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