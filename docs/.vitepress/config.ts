import { defineConfig } from 'vitepress';
import { readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import pkg from '../../package.json';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const getReleasedVersions = () => {
    try {
        return execSync("git tag --list 'v*' --sort=-v:refname", {
            encoding: 'utf-8'
        })
            .trim()
            .split('\n')
            .map((tag) => tag.replace(/^v/, ''))
            .filter(Boolean);
    } catch {
        return [];
    }
};

const getApiSidebar = () => {
    const apiDir = resolve(
        new URL(import.meta.url).pathname,
        '..',
        '..',
        'api'
    );

    const groups = readdirSync(apiDir, { withFileTypes: true })
        .filter((info) => info.isDirectory())
        .map((info) => info.name);

    return groups.flatMap((group) => {
        const groupDir = resolve(apiDir, group);
        try {
            const items = readdirSync(groupDir)
                .filter((f) => f.endsWith('.md'))
                .map((f) => ({
                    text: f.replace('.md', ''),
                    link: `/api/${group}/${f.replace('.md', '')}`
                }));

            return [{ text: capitalize(group), items, collapsed: false }];
        } catch {
            return [];
        }
    });
};

export default defineConfig({
    title: pkg.name,
    description: pkg.description,

    markdown: {
        theme: {
            light: 'catppuccin-latte',
            dark: 'catppuccin-mocha'
        }
    },

    themeConfig: {
        nav: [
            { text: 'Guide', link: '/guide' },
            { text: 'API', link: '/api/' },
            {
                text: `<span style="color: var(--vp-c-brand)">v${pkg.version}</span>`,
                items: [
                    ...getReleasedVersions()
                        .filter((version) => version !== pkg.version)
                        .map((version) => {
                            const sameMajor = version.startsWith(
                                `${pkg.version.split('.')[0]}.`
                            );
                            return {
                                text: sameMajor
                                    ? `v${version}`
                                    : `<span style="opacity: 0.5">v${version}</span>`,
                                link: `https://github.com/madkarmaa/results-ts/releases/tag/v${version}`
                            };
                        }),
                    {
                        text: 'Contributing',
                        link: 'https://github.com/madkarmaa/results-ts/blob/main/CONTRIBUTING.md'
                    }
                ]
            }
        ],

        search: {
            provider: 'local'
        },

        sidebar: {
            '/api/': [
                {
                    text: 'API Reference',
                    items: getApiSidebar()
                }
            ],
            '/guide/': [
                {
                    text: 'Guide',
                    items: [
                        {
                            text: 'Getting Started',
                            link: '/guide/getting-started'
                        },
                        {
                            text: 'Async',
                            link: '/guide/async'
                        },
                        {
                            text: 'Error handling',
                            link: '/guide/error-handling'
                        }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/madkarmaa/results-ts' }
        ],

        footer: {
            message:
                'Made with ❤️ by <a href="https://github.com/madkarmaa" target="_blank">MadKarma</a> and <a href="https://github.com/madkarmaa/results-ts/graphs/contributors" target="_blank">contributors</a> &#58;&#41;'
        }
    }
});
