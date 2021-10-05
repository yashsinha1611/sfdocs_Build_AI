/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
 // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [  
    {
      type: 'category',
      label: 'Quick Start Guide',
      items: [ 
        {
         type: 'doc',
         id: 'Quick_Start/getting_started',
         label: 'Getting Started',
        },       
       
      ],      
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Tracing', 
      items: [
         {
          type: 'doc',
          id: 'Tracing/overview',
          label: 'Overview',
         },
         {
          type: 'doc',
          id: 'Tracing/java',
          label: 'Java',
         },
         {
          type: 'doc',
          id: 'Tracing/python',
          label: 'Python',
         },
         {
          type: 'doc',
          id: 'Tracing/ruby',
          label: 'Ruby',
         },
         {
          type: 'doc',
          id: 'Tracing/nodejs',
          label: 'NodeJS',
         }, 
         {
          type: 'doc',
          id: 'Tracing/csharp',
          label: 'C#',
          },
          {
              type: 'doc',
              id: 'Tracing/go',
              label: 'Go',
          },
        ],
  },
  {
    type: 'category',
    label: 'Integrations',
    collapsed: false,
    items: [
      {
       type: 'doc',
       id: 'Integrations/overview',
       label: 'Overview',
        },
        {
            JAVA:
                [
                    {
                        type: 'doc',
                        id: 'Integrations/java/overview',
                        label: 'Overview',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/java/java_instances',
                        label: 'Monitoring JAVA on Instances',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/java/java_kubernetes',
                        label: 'Monitoring JAVA on Kubernetes',
                    },
                ],
        },
        {
            Nginx:
                [
                    {
                        type: 'doc',
                        id: 'Integrations/nginx/overview',
                        label: 'Overview',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/nginx/nginx_instance',
                        label: 'Monitoring Nginx on Instances',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/nginx/nginx_kubernetes',
                        label: 'Monitoring Nginx on Kubernetes',
                    },
                ],
        },
        {
            Kubernetes:
                [
                    {
                        type: 'doc',
                        id: 'Integrations/kubernetes/overview',
                        label: 'Overview',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/kubernetes/kubernetes_monitoring_with_sfPod',
                        label: 'Kubernetes Monitoring with sfPod',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/kubernetes/sfkubeagent_installation',
                        label: 'Kubernetes Monitoring with sfKubeAgent',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/kubernetes/prometheus_exporter',
                        label: 'Prometheus Integration',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/kubernetes/centralized_logging_of_application_pod_logs',
                        label: 'Centralized Logging of Application Pods',
                    },
                ],
        },
        {
            Postgres:
                [
                    {
                        type: 'doc',
                        id: 'Integrations/postgres/overview',
                        label: 'Overview',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/postgres/postgres_instances',
                        label: 'Postgres on Instances',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/postgres/postgres_kubernetes',
                        label: 'Postgres on Kubernetes',
                    },
                ],
        },
        {
            MySQL:
                [
                    {
                        type: 'doc',
                        id: 'Integrations/mysql/overview',
                        label: 'Overview',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/mysql/mysql_instances',
                        label: 'MySQL on Instances',
                    },
                    {
                        type: 'doc',
                        id: 'Integrations/mysql/mysql_kubernetes',
                        label: 'MySQL on Kubernetes',
                    },
                ],
        },
        {
            Apache:
                [
                    {
                        type: 'doc',
                        id: 'Integrations/apache/overview',
                        label: 'Monitoring Apache on Instances',
                    },                    
                ],
        },
        {
            'Operating Systems':
                [
                  {
                    Linux:
                    [
                        {
                            type: 'doc',
                            id: 'Integrations/os/linux/overview',
                            label: 'Overview',
                        },
                        {
                            type: 'doc',
                            id: 'Integrations/os/linux/sfagent_linux',
                            label: 'Monitoring Linux Instances',
                        },
                        {
                            type: 'doc',
                            id: 'Integrations/os/linux/linux_os',
                            label: 'Monitoring Linux OS',
                        },
                        {
                            type: 'doc',
                            id: 'Integrations/os/linux/psutil',
                            label: 'PSUtil',
                        },
                        {
                            type: 'doc',
                            id: 'Integrations/os/linux/lsof',
                            label: 'LSOF',
                        },
                        {
                            type: 'doc',
                            id: 'Integrations/os/linux/netstat',
                            label: 'Netstat',
                        },
                    ],
                  },
                  {
                    Windows:
                          [
                              {
                                  type: 'doc',
                                  id: 'Integrations/os/windows/sfagent_windows',
                                  label: 'Monitoring Windows Instances',
                              },
                              
                          ],
                  },
                ],
        },
        {
            Statsd:
                [
                    {
                        type: 'doc',
                        id: 'Integrations/statsd/custom_monitoring',
                        label: 'Custom Monitoring using Statsd',
                    },
                ],

        },
    ],  
  },
  {
    type: 'category',
    label: 'Log Management',
    items:[ 
      {
        type: 'doc',
        id: 'Log_management/log_overview',
        label: 'Log Overview Search',
       },
       {
        type: 'doc',
        id: 'Log_management/feature_extraction',
        label: 'Feature Extraction',
       },
       {
        type: 'doc',
        id: 'Log_management/archival',
        label: 'Archival',
       },
       {
        type: 'doc',
        id: 'Log_management/log_signatures',
        label: 'Log Signatures',
       },
       {
        type: 'doc',
        id: 'Log_management/etl_jobs',
        label: 'ETL Jobs',
       },  
      ],
  },
  {
    type: 'category',
    label: 'Dashboards',
    items:[ 
      {
        type: 'doc',
        id:  'Dashboards/getting_started',
        label: 'Getting Started',
       },
       {
        type: 'doc',
        id:  'Dashboards/dashboard_management',
        label: 'Dashboard Management',
       },
     ],
  },
  {
    type: 'category',
    label: 'Alerts & Notifications',
    items:[
      {
        type: 'doc',
        id: 'Alerts_notifications/getting_started',
        label: 'Getting Started',
       },
       {
        type: 'doc',
        id:  'Alerts_notifications/alert_management',
        label: 'Alert Management',
       },
       {
        type: 'doc',
        id: 'Alerts_notifications/slo',
        label: 'SLO',
       }, 
      ],
  },
  
  ],
};
