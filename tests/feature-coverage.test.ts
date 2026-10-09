import { resolve } from 'node:path';
import ts from 'typescript';
import { describe, expect, test } from 'vitest';

// Inspect resolved method declarations, so an Option.map call cannot stand in
// for AsyncOption.map, and comments or benchmark labels cannot count as coverage.
const root = resolve(import.meta.dirname, '..');
const configPath = resolve(root, 'tsconfig.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const benchmarkFiles = new Set<string>();
const collectBenchmarks = (fileName: string): void => {
    const source = program.getSourceFile(fileName);
    if (!source || benchmarkFiles.has(source.fileName)) return;
    benchmarkFiles.add(source.fileName);
    for (const statement of source.statements) {
        if (
            !ts.isImportDeclaration(statement) ||
            !ts.isStringLiteral(statement.moduleSpecifier)
        )
            continue;
        if (!statement.moduleSpecifier.text.startsWith('./')) continue;
        const imported = ts.resolveModuleName(
            statement.moduleSpecifier.text,
            source.fileName,
            parsed.options,
            ts.sys
        ).resolvedModule;
        if (imported) collectBenchmarks(imported.resolvedFileName);
    }
};
collectBenchmarks(resolve(root, 'bench/index.ts'));
const features = new Set<string>();
const covered = { tests: new Set<string>(), bench: new Set<string>() };
const entry = program.getSourceFile(resolve(root, 'src/index.ts'));
if (!entry) throw new Error('Library entry point not found');
const entrySymbol = checker.getSymbolAtLocation(entry);
if (!entrySymbol) throw new Error('Library exports not found');
const exportedFunctions = new Set(
    checker
        .getExportsOfModule(entrySymbol)
        .filter((symbol) => {
            const declaration =
                symbol.flags & ts.SymbolFlags.Alias
                    ? checker.getAliasedSymbol(symbol)
                    : symbol;
            return Boolean(declaration.flags & ts.SymbolFlags.Function);
        })
        .map((symbol) => symbol.name)
);
for (const name of exportedFunctions) features.add(name);
const families: Readonly<Record<string, string>> = {
    OptionMethods: 'Option',
    OptionImpl: 'Option',
    ResultMethods: 'Result',
    ResultImpl: 'Result',
    AsyncOption: 'AsyncOption',
    AsyncOptionImpl: 'AsyncOption',
    AsyncResult: 'AsyncResult',
    AsyncResultImpl: 'AsyncResult'
};

for (const source of program.getSourceFiles()) {
    if (source.isDeclarationFile) continue;
    const relative = source.fileName
        .replaceAll('\\', '/')
        .slice(root.replaceAll('\\', '/').length + 1);
    if (relative.startsWith('src/')) {
        for (const statement of source.statements) {
            if (!ts.isInterfaceDeclaration(statement)) continue;
            const family = families[statement.name.text];
            if (!family) continue;
            for (const member of statement.members) {
                if (
                    ts.isMethodSignature(member) &&
                    ts.isIdentifier(member.name)
                ) {
                    features.add(`${family}.${member.name.text}`);
                }
            }
            if (family.startsWith('Async')) features.add(`${family}.then`);
        }
    }
    const destination =
        relative.startsWith('tests/') && relative.endsWith('.test.ts')
            ? covered.tests
            : relative.startsWith('bench/') &&
                benchmarkFiles.has(source.fileName)
              ? covered.bench
              : undefined;
    if (!destination) continue;

    const visit = (node: ts.Node): void => {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
            const symbol = checker.getSymbolAtLocation(node.expression);
            const declaration =
                symbol && symbol.flags & ts.SymbolFlags.Alias
                    ? checker.getAliasedSymbol(symbol)
                    : symbol;
            if (
                declaration &&
                exportedFunctions.has(declaration.name) &&
                declaration.declarations?.some((item) =>
                    item
                        .getSourceFile()
                        .fileName.replaceAll('\\', '/')
                        .startsWith(`${root.replaceAll('\\', '/')}/src/`)
                )
            )
                destination.add(declaration.name);
        }
        if (
            ts.isCallExpression(node) &&
            ts.isPropertyAccessExpression(node.expression)
        ) {
            const access = node.expression;
            const symbol = checker.getSymbolAtLocation(access.name);
            for (const declaration of symbol?.declarations ?? []) {
                const parent = declaration.parent;
                if (
                    (ts.isInterfaceDeclaration(parent) ||
                        ts.isClassDeclaration(parent)) &&
                    parent.name
                ) {
                    const family = families[parent.name.text];
                    if (family)
                        destination.add(`${family}.${access.name.text}`);
                }
            }
            if (access.name.text === 'then') {
                const type = checker.typeToString(
                    checker.getTypeAtLocation(access.expression)
                );
                for (const family of ['AsyncOption', 'AsyncResult']) {
                    if (
                        type.startsWith(`${family}<`) ||
                        type.startsWith(`${family}Impl<`)
                    ) {
                        destination.add(`${family}.then`);
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(source);
}

describe('public method coverage', () => {
    test.each(['tests', 'bench'] as const)(
        '%s exercise every public method on its own receiver type',
        (suite) => {
            expect(
                [...features].filter((feature) => !covered[suite].has(feature))
            ).toEqual([]);
        }
    );
});
