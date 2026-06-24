import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { run } from 'mitata';

import './constructors';
import './result';
import './option';
import './result.async';
import './option.async';

// ---------------------------------------------------------------------------
// Runner modes
// ---------------------------------------------------------------------------
const PUBLISH = process.env.BENCH_PUBLISH === '1';

const main = async () => {
    if (!PUBLISH) {
        await run();
        return;
    }

    const lines: string[] = [];

    lines.push('# Benchmarks');
    lines.push('');

    await run({
        format: 'markdown',
        colors: false,
        print: (s: string) => lines.push(s)
    });

    const out = lines.join('\n').trimEnd() + '\n';

    const benchDir = resolve(dirname(fileURLToPath(import.meta.url)));
    writeFileSync(resolve(benchDir, '..', 'BENCHMARKS.md'), out);

    console.log('wrote BENCHMARKS.md');
};

main();
