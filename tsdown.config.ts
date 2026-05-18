import { defineConfig } from 'tsdown';

export default defineConfig({
    platform: 'browser',
    dts: true,
    minify: {
        compress: true,
        mangle: false
    }
});
