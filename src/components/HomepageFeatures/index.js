import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Jump Ahead',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        DeepTempo.ai returns the power to defenders; 
        we keep defenders ahead of attackers by increasing 
        the productivity of cyber defense while saving 
        costs by applying our LogLM (Log Language Model)  
        based solutions.
      </>
    ),
  },
  {
    title: 'Software Agent-Free Architecture',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Operates with an agent-free architecture, running on Snowflake and other security data lakes.
      </>
    ),
  },
  {
    title: 'Simple Integration with Existing SIEM and Workflows',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Integrates with existing Security Information and Event Management 
        (SIEM) systems and workflows, enhancing security teams' ability to 
        detect and respond to threats.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
