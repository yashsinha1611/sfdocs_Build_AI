const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Documentation',
  tagline: 'Simplified Monitoring',
  url: 'https://docs.snappyflow.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'SnappyFlow', // Usually your GitHub org/user name.
  projectName: 'Documentation', // Usually your repo name.
  plugins: [require.resolve('docusaurus-lunr-search')],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/ram-dot-kumar/SFwebsite.git',
        },
        // blog: {
        //   showReadingTime: true, 
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        // logo: { 
        //   alt: 'SnappyFlow',
        //   type: 'doc',
        //   docId: 'Tracing/overview',
        //   src: 'img/logo-new.png',
        // },
        // items: [
        //   {
        //     type: 'doc',
        //     href: '/',
        //     position: 'left',
        //     label: 'DOCS',
        //     target:'_self',
        //   }
        // ],
        logo: {
          alt: 'SnappyFlow',
          src: 'img/logo-new.png', 
          href: 'https://www.snappyflow.io/',
          target: '_self',
        },
        items: [
          {
            type: 'doc', 
            href: '/',
            docId:'Tracing/overview',
            target: '_self',
            position: 'left',
            label: 'Docs',
          }
        ],
      },
      footer: {
        style: 'dark',
        // links: [
        //   {
        //     title: 'Docs',
        //     items: [
        //       {
        //         label: 'Tutorial',
        //         to: '/docs/Tracing/overview',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Community',
        //     items: [
        //       {
        //         label: 'Stack Overflow',
        //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //       },
        //       {
        //         label: 'Discord',
        //         href: 'https://discordapp.com/invite/docusaurus',
        //       },
        //       {
        //         label: 'Twitter',
        //         href: 'https://twitter.com/docusaurus',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       {
        //         label: 'Blog',
        //         to: '/blog',
        //       },
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/facebook/docusaurus',
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme, 
       themes: ['@docusaurus/theme-live-codeblock'], 
      }, 
    }),
});
