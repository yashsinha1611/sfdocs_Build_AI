import React, { useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures'; 
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
   
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.banner_container}>
        <div className="row">
        <div className="col col--6"><h1 className="hero__title">{siteConfig.title}</h1></div>
        {/* <div className="col col--6 searchSection">
									<input className={styles.search} name="" placeholder="Search documentation" type="search" />
									<img className={styles.searchIcon} name="" src="/img/search.svg" />
				</div> */}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => { 
        // Intercom chat // 
        window.intercomSettings = {
          api_base: "https://api-iam.intercom.io",
          app_id: "q7tpwd9w"
        }; 
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/q7tpwd9w';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
 
    },[]);
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="<head />">
      <HomepageHeader />
      <main >
        <HomepageFeatures /> 
      </main> 
          
      
    </Layout>
  );
}
