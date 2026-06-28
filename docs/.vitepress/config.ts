import { defineConfig } from 'vitepress';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import pkg from '../../package.json';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

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
            { text: 'API', link: '/api/' }
        ],
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
                        }
                    ]
                }
            ]
        }
    }
});
