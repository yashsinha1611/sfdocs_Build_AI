import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import { StageHomePageUrl } from './Constants';
const FeatureList = [
  {
    title: 'Quick Start Guide',
    Png: require('../../static/img/getting-started-icon.png').default,
    Path: '/docs/Quick_Start/getting_started',
    list: [
      {
        label: "Monitor a Linux machine",
        url: '/docs/Integrations/os/linux/sfagent_linux'
      },
      {
        label: "Monitor a Windows machine",
        url: '/docs/Integrations/os/windows/sfagent_windows'
      },
      {
        label: "Monitor a Kubernets cluster",
        url: '/docs/Integrations/kubernetes/kubernetes_monitoring_with_sfPod'
      },
      {
        label: "Setup SnappyFlow in your own environment",
        url: '/docs/Quick_Start/snappyflow_self_hosted'
      },
    ]
  },
  {
    title: 'sfPoller',
    Png: require('../../static/img/integrations-icon.png').default,
    Path: '/docs/sfPoller/overview',
    list: [
      {
        label: "Overview",
        url: '/docs/sfPoller/overview'
      },
        {
        label: "Setup in AWS",
        url: '/docs/sfPoller/aws_setup'
      },
      {
        label: "Setup in vCenter",
        url: '/docs/sfPoller/vcenter_setup'
      },
      {
        label: "Setup in Azure",
        url: '/docs/sfPoller/azure_setup'
      }
    ]
  },
  {
    title: 'Integrations',
    Png: require('../../static/img/integrations-icon.png').default,
    Path: '/docs/Integrations/overview',
    list: [
      // {
      //   label: "JAVA",
      //     url: '/docs/Integrations/java/overview'
      //  },
      // {
      //       label: "Kubernetes",
      //       url: '/docs/Integrations/kubernetes/overview'
      //   },
      {
        url: '/docs/Integrations/activemq',
        label: 'ActiveMQ',
      },
      {
        url: '/docs/Integrations/apache/overview',
        label: 'Apache',
      },
      {
        label: "More....",
        url: '/docs/Integrations/overview'
      },

    ]
  },
  {
    title: 'Dashboards',
    Png: require('../../static/img/dashboards-icon.png').default,
    Path: 'docs/category/dashboards',
    list: [
      {
        label: "Getting Started",
        url: '/docs/Dashboards/getting_started'
      },
      {
        label: "Dashboard Management",
        url: '/docs/Dashboards/dashboard_management'
      }
    ]
  },
  {
    title: 'Tracing',
    Png: require('../../static/img/tracing-icon.png').default,
    Path: 'docs/category/tracing',
    list: [
      {
        label: "Java",
        url: '/docs/Tracing/java'
      },
      {
        label: "Python",
        url: '/docs/Tracing/python'
      },
      {
        label: "Ruby",
        url: '/docs/Tracing/ruby'
      },
      {
        label: "NodeJS",
        url: '/docs/Tracing/nodejs'
      },
      {
        label: "C#",
        url: '/docs/Tracing/csharp'
      }
    ]
  },
  {
    title: 'Profiling',
    Png: require('../../static/img/tracing-icon.png').default,
    Path: '/docs/category/profiling',
    list: [
      {
        label: "JAVA",
        url: '/docs/Integrations/java/java_profiler_cpu'
      },
      {
        label: "Go",
        url: '/docs/Integrations/go/profiler'
      },
    ]
  },
  {
    title: 'Log Management',
    Png: require('../../static/img/log-management-icon.png').default,
    Path: '/docs/Log_management/log_overview',
    list: [
      {
        label: "Feature Extraction",
        url: '/docs/Log_management/feature_extraction'
      },
      {
        label: "Archival",
        url: '/docs/Log_management/archival'
      },
      {
        label: "Log Signatures",
        url: '/docs/Log_management/log_signatures'
      },
      {
        label: "ETL Jobs",
        url: '/docs/Log_management/etl_jobs'
      }
    ]
  },
  {
    title: 'Alerts & Notifications',
    Png: require('../../static/img/alerts-notification-icon.png').default,
    Path: '/docs/Alerts_notifications/getting_started',
    list: [
      {
        label: "Alerts overview",
        url: '/docs/Alerts_notifications/getting_started'
      },
      {
        label: "SLO",
        url: '/docs/Alerts_notifications/slo'
      }
    ]
  },
  {
    title: 'Real User Monitoring',
    Png: require('../../static/img/tracing-icon.png').default,
    Path: '/docs/RUM/RUM_documentation',
    list: [
      {
        label: "Agent Installation",
        url: '/docs/RUM/RUM_agent_installation'
      },
      {
        label: "RUM Dashboard",
        url: '/docs/RUM/RUM_Dashboard'
      },
      {
        label: "Performance Metrics",
        url: '/docs/RUM/RUM_Metrics'
      },
      {
        label: "Glossary",
        url: '/docs/RUM/RUM_Glossary'
      }
    ]
  },
];

function Feature({ Png, title, list, Path }) {
  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.location.host.includes('stage') || window.location.host.includes('localhost')) {
        console.log('home page');
        document.querySelector('.navbar__brand').href = StageHomePageUrl
      }
    }
  }, [])
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padLR">
        <div className={styles.treePanel}>
          <h4><a className="urlPath" href={Path}><img src={Png} alt={title} />{title}</a></h4>
          <ul className={styles.treeView}>
            {
              list.map((items) => (
                <li>
                  {/* <div className={styles.brd_left_line}></div> */}
                  <a href={items.url}>{items.label}</a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.docContainer}>
        {/* <h4><img src="../../static/img/documentation-big-icon.png" /> <span>Documentation</span></h4> */}
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
