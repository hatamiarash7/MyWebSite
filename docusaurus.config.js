module.exports = {
    title: "Arash Hatami",
    tagline: "DevOps - SRE / Network Eng",
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
            copyright: `Copyright © ${new Date().getFullYear()} Arash Hatami`,
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
            },
        ],
    ],
};
