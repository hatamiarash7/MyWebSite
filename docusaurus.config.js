module.exports = {
    title: "Arash Hatami",
    tagline: "Progranner .:|:. DevOps .:|:. Network Eng",
    url: "https://arash-hatami.ir",
    baseUrl: "/",
    favicon: "img/favicon.ico",
    organizationName: "hatamiarash7",
    projectName: "MyWebSite",
    themeConfig: {
        navbar: {
            title: "Arash Hatami",
            logo: {
                alt: "Logo",
                src: "img/logo.svg",
            },
            links: [
                {
                    to: "blog",
                    label: "Blog",
                    position: "left",
                },
                {
                    to: "docs/doc1",
                    activeBasePath: "docs",
                    label: "Projects",
                    position: "left",
                },
            ],
        },
        footer: {
            style: "dark",
            logo: {
                alt: "Arash Hatami",
                src: "img/logo-footer.svg",
            },
            links: [
                {
                    title: "Another Websites",
                    items: [
                        {
                            label: "Code Guide",
                            href: "https://cg.arash-hatami.ir",
                        },
                        {
                            label: "DNS Lookup",
                            href: "https://dns.arash-hatami.ir",
                        },
                    ],
                },
                {
                    title: "Community",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/hatamiarash7",
                        },
                        {
                            label: "Stack Overflow",
                            href:
                                "https://stackoverflow.com/users/4905220/arash-hatami",
                        },
                        {
                            label: "Docker Hub",
                            href: "https://hub.docker.com/u/hatamiarash7",
                        },
                        {
                            label: "Packagist",
                            href:
                                "https://packagist.org/packages/hatamiarash7/",
                        },
                    ],
                },
                {
                    title: "Social",
                    items: [
                        {
                            label: "LinkedIn",
                            href: "https://www.linkedin.com/in/hatamiarash7",
                        },
                        {
                            label: "Instagram",
                            href: "https://instagram.com/hatamiarash7",
                        },
                        {
                            label: "Twitter",
                            href: "https://twitter.com/hatamiarash7",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()}`,
        },
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl:
                        "https://github.com/facebook/docusaurus/edit/master/website/",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
                blog: {
                    feedOptions: {
                        type: "rss",
                        copyright: `Copyright © ${new Date().getFullYear()} Arash Hatami.`,
                        language: "fa",
                    },
                    path: "blog",
                    routeBasePath: "blog",
                    include: ["*.md"],
                    postsPerPage: 15,
                },
                sitemap: {
                    cacheTime: 600 * 1000,
                    changefreq: "weekly",
                    priority: 0.5,
                },
            },
        ],
    ],
    scripts: [
        "js/custom.js",
        {
            src: "//www.statcounter.com/counter/counter.js",
            async: true,
        },
    ],
};
