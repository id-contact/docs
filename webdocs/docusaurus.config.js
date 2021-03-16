module.exports = {
  title: 'ID-Contact',
  tagline: 'The tagline of my site',
  url: 'https://id-contact.github.io/docs',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'id-contact', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ['http'],
    },
    navbar: {
      title: 'ID-Contact',
      /*logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },*/
      items: [
        {
          to: '/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
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
              label: 'Authentication plugins',
              to: '/auth/overview',
            },
            {
              label: 'Communication plugins',
              to: '/comm/overview',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tweede Golf. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
