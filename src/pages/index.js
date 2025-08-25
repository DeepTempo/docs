import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button--hero"
            to="/docs/snowflake-setup">
            Tempo Tutorial - 15min
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="DeepTempo - Advanced Cybersecurity Threat Detection"
      description="Advanced deep learning cybersecurity platform for network threat detection. Deploy Tempo on-premises or in Snowflake for AI-powered security analytics, MITRE ATT&CK mapping, and real-time anomaly detection.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className="padding-vert--lg">
          <div className="container">
            </div>
            
        </section>
      </main>
    </Layout>
  );
}
