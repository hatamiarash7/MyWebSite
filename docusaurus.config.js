module.exports = {
    title: "آرش حاتمی",
    tagline: "DevOps - SRE / Network Eng",
    url: "https://arash-hatami.ir",
    baseUrl: "/",
    favicon: "img/favicon.ico",
    organizationName: "hatamiarash7",
    projectName: "MyWebSite",
    themeConfig: {
        navbar: {
            title: "آرش حاتمی",
            logo: {
                alt: "Logo",
                src: "img/logo.svg",
            },
            links: [
                {
                    to: "docs/doc1",
                    activeBasePath: "docs",
                    label: "پروژه ها",
                    position: "left",
                },
                {
                    to: "blog",
                    label: "نوشته ها",
                    position: "left",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "دیگر سایت ها",
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
                    title: "پروفایل ها",
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
                    ],
                },
                {
                    title: "شبکه های اجتماعی",
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
