// @ts-check

const { themes } = require("prism-react-renderer");
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Rotz",
  tagline:
    "Fully cross platform dotfile manager and dev environment bootstrapper written in Rust.",
  url: "https://volllly.github.io",
  baseUrl: process.env.NODE_ENV == "development" ? "/" : "/rotz/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "volllly",
  projectName: "rotz",
  trailingSlash: false,

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/volllly/rotz/tree/main/docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexBlog: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Rotz",
        logo: {
          alt: "Nose Emoji",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "getting-started",
            position: "left",
            label: "Getting Started",
          },
          {
            type: "doc",
            docId: "configuration/README",
            position: "left",
            label: "Configuration",
          },
          {
            href: "https://github.com/volllly/rotz",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/docs/getting-started",
              },
              {
                label: "Configuration",
                to: "/docs/configuration",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Changelog",
                href: "https://github.com/volllly/rotz/blob/main/CHANGELOG.md",
              },
              {
                label: "GitHub",
                href: "https://github.com/volllly/rotz",
              },
              {
                label: "crates.io",
                href: "https://crates.io/crates/rotz",
              },
            ],
          },
        ],
        copyright:
          'Rotz is an evolution of <a href="https://github.com/volllly/Dotted">Dotted</a>',
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ["toml"],
      },
    }),
};

module.exports = config;
