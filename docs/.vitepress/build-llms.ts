import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getDocumentationFiles } from './docs-order';

const outputFile = resolve(import.meta.dirname, '../public/llms.txt');
const documentation = await Promise.all(
    getDocumentationFiles().map((file) => readFile(file, 'utf8'))
);

await writeFile(
    outputFile,
    `${documentation.map((content) => content.trimEnd()).join('\n\n')}\n`
);
