/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

 module.exports = {
    
       
    // By default, Docusaurus generates a sidebar from the docs folder structure
    // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

    // But you can create a sidebar manually
    tutorialSidebar: [
        {
            type: 'category',
            label: 'Quick Start Guide',  
            link: {
                type: 'doc',
                id: 'Quick_Start/getting_started' 
              },
              collapsed: true,
            items: [ 
                {
                    type: 'doc',
                    id: 'Integrations/os/linux/sfagent_linux',
                    label: 'sfAgent Installation on Linux',
                },
                {
                    type: 'doc',
                    id: 'Integrations/os/windows/sfagent_windows',
                    label: 'sfAgent Installation on Windows',
                },
                {
                    type: 'doc',
                    id: 'Quick_Start/sfpoller_setup',
                    label: 'sfPoller Setup',
                },
                {
                    type: 'doc',
                    id: 'Integrations/kubernetes/sfkubeagent_installation',
                    label: 'Monitoring Application Pods with sfKubeAgent',
                },

            ],
        }, 
        {
            type: 'category',
            label: 'Tracing Application',  
            link: { 
                type: 'generated-index', 
                title: 'Tracing in SnappyFlow',
                description: 'SnappyFlow supports distributed tracing compliant with Opentracing standard. Tracing allows users to visualize the sequence of steps a transaction (whether API or non-API such as a Celery job) takes during its execution. This analysis is extremely powerful and allows pinpointing the source of problems such as abnormal time being spent on an execution step or identifying point of failure in a transaction. SnappyFlow refers to distributed tracing as sfTrace.',
              },
              collapsed: true,
              items: ['Tracing/java', 'Tracing/python', 'Tracing/ruby', 'Tracing/nodejs', 'Tracing/csharp', 'Tracing/go'], 
        }, 
        // {
        //     type: 'category',
        //     label: 'Tracing',
        //     link: {
        //         type: 'doc',
        //         id: 'Tracing/overview', 
        //       },
        //       collapsed: true,
        //     items: [ 
        //         {
        //             type: 'doc',
        //             id: 'Tracing/java',
        //             label: 'Java',
        //         },
        //         {
        //             type: 'doc',
        //             id: 'Tracing/python',
        //             label: 'Python',
        //         },
        //         {
        //             type: 'doc',
        //             id: 'Tracing/ruby',
        //             label: 'Ruby',
        //         },
        //         {
        //             type: 'doc',
        //             id: 'Tracing/nodejs',
        //             label: 'NodeJS',
        //         },
        //         {
        //             type: 'doc',
        //             id: 'Tracing/csharp',
        //             label: 'C#',
        //         },
        //         {
        //             type: 'doc',
        //             id: 'Tracing/go',
        //             label: 'Go',
        //         },
        //     ],
        // },
        {
            type: 'category',
            label: 'Integrations',
            link: {
                type: 'doc',
                id: 'Integrations/overview' 
              },
              collapsed: true,
            items: [ 
                {
                    type: 'category',
                    label: 'JAVA',
                    link: {
                        type: 'doc',
                        id: 'Integrations/java/overview',
                      }, 
                      collapsed: true,
                       items:  [ 
                            {
                                type: 'doc',
                                id: 'Integrations/java/java_instances',
                                label: 'Monitoring JAVA on Instances',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/java/java_kubernetes',
                                label: 'Monitoring JAVA in Kubernetes',
                            },
                            {
                                Profiler: [
                                    {
                                        type: 'doc',
                                        id: 'Integrations/java/java_profiler_cpu',
                                        label: 'CPU',
                                    },
                                    {
                                        type: 'doc',
                                        id: 'Integrations/java/java_profiler_memory',
                                        label: 'Memory',
                                    },
                                ],

                            },
                        ],
                },
                {
                    type: 'category',
                    label: 'Nginx',
                    link: {
                        type: 'doc',
                        id: 'Integrations/nginx/overview',
                      },  
                      collapsed: true,
                        items: [ 
                            {
                                type: 'doc',
                                id: 'Integrations/nginx/nginx_instance',
                                label: 'Monitoring Nginx on Instances',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/nginx/nginx_kubernetes',
                                label: 'Monitoring Nginx in Kubernetes',
                            },
                        ],
                },
                {
                    type: 'doc',
                    id: 'Integrations/apache/overview',
                    label: 'Apache',
                }, 
                {
                    type: 'category',
                    label: 'Tomcat',
                    link: {
                        type: 'doc',
                        id: 'Integrations/tomcat/overview',
                      }, 
                      collapsed: true,
                    items: [ 
                        {
                            type: 'doc',
                            id: 'Integrations/tomcat/tomcat_windows',
                            label: 'Tomcat in Windows'
                        },
                    ]
                },
                {
                    IIS: [
                        {
                            type: 'doc',
                            id: 'Integrations/iis/iis_windows',
                            label: 'IIS in Windows'
                        },
                        {
                            type: 'doc',
                            id: 'Integrations/iis/iis_setup',
                            label: 'IIS Web Server and Access Logging Setup'
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Kubernetes',
                    link: {
                        type: 'doc',
                        id: 'Integrations/kubernetes/overview',
                      },   
                      collapsed: true,
                       items: [ 
                            {
                                type: 'doc',
                                id: 'Integrations/kubernetes/kubernetes_monitoring_with_sfPod',
                                label: 'Kubernetes Monitoring with sfPod',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/kubernetes/sfkubeagent_installation',
                                label: 'Application Monitoring with sfKubeAgent',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/kubernetes/prometheus_exporter',
                                label: 'Prometheus Exporter',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/kubernetes/centralized_logging_of_application_pod_logs',
                                label: 'Centralized Logging of Application Pods',
                            },
                        ],
                },
                {
                    type: 'category',
                    label: 'Postgres',
                    link: {
                        type: 'doc',
                        id: 'Integrations/postgres/overview',
                      },  
                      collapsed: true,
                        items:[ 
                            {
                                type: 'doc',
                                id: 'Integrations/postgres/postgres_instances',
                                label: 'Postgres on Instances',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/postgres/postgres_kubernetes',
                                label: 'Postgres in Kubernetes',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/postgres/postgres_sfpoller',
                                label: 'Postgres with sfPoller',
                            },
                        ],
                },
                {
                    type: 'category',
                    label: 'MySQL',
                    link: {
                        type: 'doc',
                        id: 'Integrations/mysql/overview',
                      },  
                      collapsed: true,
                        items:[ 
                            {
                                type: 'doc',
                                id: 'Integrations/mysql/mysql_instances',
                                label: 'MySQL on Instances',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/mysql/mysql_kubernetes',
                                label: 'MySQL in Kubernetes',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/mysql/mysql_windows',
                                label: 'MySQL on Windows',
                            },
                            {
                                type: 'doc',
                                id: 'Integrations/mysql/mysql_sfpoller',
                                label: 'MySQL with sfPoller',
                            },
                        ],
                },
                {
                    type: 'doc',
                    id: 'Integrations/mssql_windows',
                    label: 'MS SQL',
                },
                {
                    'Operating Systems':
                        [
                            {
                                type: 'category',
                                label: 'Linux',
                                link: {
                                    type: 'doc',
                                    id: 'Integrations/os/linux/overview',
                                  },  
                                  collapsed: true,
                                    items:[ 
                                        {
                                            type: 'doc',
                                            id: 'Integrations/os/linux/sfagent_linux',
                                            label: 'sfAgent Installation on Linux',
                                        },
                                        {
                                            type: 'doc',
                                            id: 'Integrations/os/linux/linux_os',
                                            label: 'Monitoring Linux OS',
                                        },
                                        {
                                            type: 'doc',
                                            id: 'Integrations/os/linux/netstat',
                                            label: 'Netstat',
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

                                    ],
                            },
                            {
                                Windows:
                                    [
                                        {
                                            type: 'doc',
                                            id: 'Integrations/os/windows/sfagent_windows',
                                            label: 'sfAgent installation on Windows',
                                        },

                                    ],
                            },
                        ],
                },
                {
                    StatsD:
                        [
                            {
                                type: 'doc',
                                id: 'Integrations/statsd/custom_monitoring',
                                label: 'Custom Monitoring using StatsD',
                            },
                        ],

                },
                {
                    type: 'doc',
                    id: 'Integrations/activemq',
                    label: 'ActiveMQ',
                },
                {
                    type: 'category',
                    label: 'GO',
                    link: {
                        type: 'doc',
                        id: 'Integrations/go/profiler',
                      }, 
                      collapsed: true,
                        items:[
                            {
                                type: 'doc',
                                id: 'Integrations/go/profiler',
                                label: 'Go Profiler',
                            },
                        ],
                },
                {
                    type: 'category',
                    label: 'Kafka',
                    link: {
                        type: 'doc',
                        id: 'Integrations/kafka/overview',
                      }, 
                      collapsed: true,
                      items:[ 
                        {
                            type: 'doc',
                            id: 'Integrations/kafka/kafka_kubernetes',
                            label: 'Kafka in Kubernetes'
                        },
                        {
                            type: 'doc',
                            id: 'Integrations/kafka/kafka_instances',
                            label: 'Kafka on Instances',
                        },
                    ]
                },
                {
                    type: 'doc',
                    id: 'Integrations/elb/elb_rds',
                    label: 'Elastic Load Balancer',
                },
                {
                    type: 'doc',
                    id: 'Integrations/zookeeper',
                    label: 'ZooKeeper',
                },
                {
                    type: 'doc',
                    id: 'Integrations/mongodb',
                    label: 'MongoDB',
                },
                {
                    type: 'doc',
                    id: 'Integrations/redis',
                    label: 'Redis',
                },
                {
                    type: 'doc',
                    id: 'Integrations/haproxy',
                    label: 'HAProxy',
                },
                {
                    type: 'doc',
                    id: 'Integrations/aws_lambda',
                    label: 'AWS Lambda',
                },
            ],
        },
        {
            type: 'category',
            label: 'Profiling',  
            
            link: { 
                type: 'generated-index', 
                title: 'Profiling',
                image: '/img/docusaurus.png',
              },
              collapsed: true,
              items: ['Integrations/go/profiler', 'Integrations/java/java_profiler_cpu'], 
        }, 
        {
            type: 'category',
            label: 'Log Management',
            link: {
                type: 'doc',
                id: 'Log_management/log_overview',
              }, 
              collapsed: true,
            items: [ 
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
            link: { 
                type: 'generated-index', 
                title: 'Dashboards'
              },
              collapsed: true,
              items: ['Dashboards/getting_started', 'Dashboards/dashboard_management'], 
        }, 
        {
            type: 'category',
            label: 'Alerts & Notifications',
            link: {
                type: 'doc',
                id: 'Alerts_notifications/getting_started',
              }, 
              collapsed: true, 
            items: [ 
                {
                    type: 'doc',
                    id: 'Alerts_notifications/alert_management',
                    label: 'Alert Management',
                },
                {
                    type: 'doc',
                    id: 'Alerts_notifications/slo',
                    label: 'SLO',
                },
                {
                    type: 'doc',
                    id: 'Alerts_notifications/pager_duty',
                    label: 'Pager Duty',
                },
                {
                    type: 'doc',
                    id: 'Alerts_notifications/slack',
                    label: 'Slack',
                },
            ],
        },

    ],
  };
