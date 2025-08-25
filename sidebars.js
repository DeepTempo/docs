/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'snowflake-quickstart',
      label: 'Quick Start',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'snowflake-setup',
        'data-requirements',
      ],
    },
    {
      type: 'category',
      label: 'On-Premises',
      items: [
        'on-premises-installation',
        'on-premises-usage',
      ],
    },
    {
      type: 'category',
      label: 'Snowflake Platform',
      items: [
        'snowflake-usage',
        'snowflake-worksheets',
        'mitre-attack-classification',
        'snowflake-command-reference-quick',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Features',
      items: [
        'Advanced/automated-detection',
        'Advanced/model-fine-tuning',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'Visualizations/splunk-integration',
      ],
    }
  ],
};

export default sidebars;
