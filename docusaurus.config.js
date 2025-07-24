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
  url: 'http://deeptempo.ai',
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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/DeepTempo-ai.png',
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
            to: '/docs/snowUI',
            label: 'Snowflake Setup',
            position: 'left',
          },
          {
            href: 'https://app.snowflake.com/marketplace/listing/GZTYZOYXHP3/deeptempo-cybersecurity-tempo',
            label: 'Snowflake',
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
                to: '/docs/snowUI',
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
                label: 'LinkeIn',
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
