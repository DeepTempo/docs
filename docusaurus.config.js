// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DeepTempo Docs',
  tagline: 'Turning the Tables on Attackers',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'http://docs.deeptempo.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'deeptempo', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
        direction: 'ltr',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/Skidaway-io/docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  // Performance optimizations can be added when dependencies are installed

  // Plugins will be added here when PWA dependencies are installed
  plugins: [],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/DeepTempo-ai.png',
      metadata: [
        {name: 'keywords', content: 'deep learning, cybersecurity, threat detection, network security, AI, machine learning, MITRE ATT&CK, anomaly detection'},
        {name: 'author', content: 'DeepTempo'},
        {name: 'robots', content: 'index,follow'},
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: 'DeepTempo Documentation'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: '@DeepTempo'},
      ],
      navbar: {
        title: 'DeepTempo',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
          href: 'https://deeptempo.ai',
        },
        items: [
          {
            to: '/',
            label: 'Docs',
            position: 'left',
          },
          {
            to: '/docs/snowflake-setup',
            label: 'Snowflake Setup',
            position: 'left',
          },
          {
            to: 'https://app.snowflake.com/marketplace/listing/GZTYZOYXHP3/deeptempo-cybersecurity-tempo',
            label: 'Launch Snowflake',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Snowflake Setup',
                to: '/docs/snowflake-setup',
              },
            ],
          },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //   ],
          // },
          {
            title: 'Socials',
            items: [
              {
                label: 'Medium Blog',
                href: 'https://medium.com/deeptempo',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@DeepTempo-ai',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/deeptempo/',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'Docs Improvements',
                href: 'https://github.com/DeepTempo/docs',
              },
              {
                label: 'DeepTempo',
                href: 'https://deeptempo.ai',
              },
            ],
          },
        ],
        copyright: `Copyright © 2025 Deeptempo, Inc.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
