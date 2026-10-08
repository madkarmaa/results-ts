import { defineConfig } from 'vitepress';
import pkg from '../../package.json';
import { getApiSidebar, guidePages } from './docs-order';

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
            {
                text: 'Guide',
                link: '/guide',
                activeMatch: '^/guide(?:/|\\.html|$)'
            },
            { text: 'API', link: '/api/' },
            {
                text: `<span style="color: var(--vp-c-brand)">v${pkg.version}</span>`,
                items: [
                    {
                        text: 'Changelog',
                        link: 'https://github.com/madkarmaa/results-ts/blob/main/CHANGELOG.md'
                    },
                    {
                        text: 'Contribute',
                        link: 'https://github.com/madkarmaa/results-ts/blob/main/CONTRIBUTING.md'
                    }
                ]
            }
        ],

        search: {
            provider: 'local'
        },

        outline: [2, 3],

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
                    items: guidePages.map((page) => ({
                        text: page.text,
                        link: `/${page.path}`
                    }))
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
