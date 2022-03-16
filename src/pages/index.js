import React, { useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import {StageHomePageUrl} from '../components/Constants';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.location.host.includes('stage')) {
        siteConfig.themeConfig.navbar.logo.href = StageHomePageUrl
      }
    }
  });
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
