import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';
import { describe, expect, test } from 'vitest';

type Example = {
    readonly code: string;
    readonly name: string;
};

const root = resolve(import.meta.dirname, '..');
const guideDir = resolve(root, 'docs', 'guide');
const markdownFiles = [
    resolve(root, 'README.md'),
    ...readdirSync(guideDir)
        .filter((file) => file.endsWith('.md'))
        .map((file) => resolve(guideDir, file))
];
const typescriptFence = /```(?:typescript|ts)\n([\s\S]*?)```/g;

const examples = markdownFiles.flatMap((file): readonly Example[] => {
    const markdown = readFileSync(file, 'utf8');
    const relativeFile = file.slice(root.length + 1);

    return Array.from(markdown.matchAll(typescriptFence), (match, index) => ({
        code: match[1] ?? '',
        name: `${relativeFile} example ${index + 1}`
    }));
});

const compilerOptions: ts.CompilerOptions = {
    lib: ['lib.esnext.d.ts', 'lib.dom.d.ts'],
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    noEmit: true,
    paths: { 'results-ts': [resolve(root, 'src', 'index.ts')] },
    skipLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ESNext
};

const compileExamples = (): readonly ts.Diagnostic[] => {
    const virtualFiles = new Map(
        examples.map(({ code, name }) => [
            resolve(root, '.docs-examples', `${name.replaceAll(' ', '-')}.ts`),
            code
        ])
    );
    const host = ts.createCompilerHost(compilerOptions);
    const getSourceFile = host.getSourceFile.bind(host);

    host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) => {
        const code = virtualFiles.get(fileName);

        return code !== undefined
            ? ts.createSourceFile(
                  fileName,
                  code,
                  languageVersion,
                  true,
                  ts.ScriptKind.TS
              )
            : getSourceFile(fileName, languageVersion, onError, shouldCreate);
    };
    host.fileExists = (fileName) =>
        virtualFiles.has(fileName) || ts.sys.fileExists(fileName);
    host.readFile = (fileName) =>
        virtualFiles.get(fileName) ?? ts.sys.readFile(fileName);

    return ts.getPreEmitDiagnostics(
        ts.createProgram([...virtualFiles.keys()], compilerOptions, host)
    );
};

describe('documentation examples', () => {
    test('finds handwritten TypeScript examples', () => {
        expect(examples.length).toBeGreaterThan(0);
    });

    test('compiles every example', () => {
        const diagnostics = compileExamples();
        const message = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
            getCanonicalFileName: (fileName) => fileName,
            getCurrentDirectory: () => root,
            getNewLine: () => '\n'
        });

        expect(diagnostics, message).toEqual([]);
    });
});
