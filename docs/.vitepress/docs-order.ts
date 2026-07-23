import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const docsDirectory = resolve(new URL(import.meta.url).pathname, '..', '..');
const apiDirectory = resolve(docsDirectory, 'api');
const apiGroupOrder = ['interfaces', 'type-aliases', 'functions'];

export const guidePages = [
    {
        text: 'Getting started',
        path: 'guide/getting-started'
    },
    {
        text: 'Error handling',
        path: 'guide/error-handling'
    },
    {
        text: 'Async',
        path: 'guide/async'
    }
] as const;

const getApiGroups = () =>
    readdirSync(apiDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .sort((left, right) => {
            const leftIndex = apiGroupOrder.indexOf(left.name);
            const rightIndex = apiGroupOrder.indexOf(right.name);

            if (leftIndex === -1 && rightIndex === -1)
                return left.name.localeCompare(right.name);

            if (leftIndex === -1) return 1;

            if (rightIndex === -1) return -1;

            return leftIndex - rightIndex;
        })
        .map((entry) => ({
            name: entry.name,
            files: readdirSync(resolve(apiDirectory, entry.name))
                .filter((file) => file.endsWith('.md'))
                .sort((left, right) => left.localeCompare(right))
        }));

export const getApiSidebar = () =>
    getApiGroups().map((group) => ({
        text: group.name.charAt(0).toUpperCase() + group.name.slice(1),
        items: group.files.map((file) => ({
            text: file.replace('.md', ''),
            link: `/api/${group.name}/${file.replace('.md', '')}`
        })),
        collapsed: false
    }));

export const getDocumentationFiles = () => [
    resolve(docsDirectory, 'index.md'),
    resolve(docsDirectory, 'guide/index.md'),
    ...guidePages.map((page) => resolve(docsDirectory, `${page.path}.md`)),
    resolve(apiDirectory, 'index.md'),
    ...getApiGroups().flatMap((group) =>
        group.files.map((file) => resolve(apiDirectory, group.name, file))
    )
];
