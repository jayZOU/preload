import buble from 'rollup-plugin-buble';
import serve from 'rollup-plugin-serve';

export default {
    moduleName: 'preload',
    entry: './src/preload.js',
    sourceMap: true,
    useStrict: false,
    plugins: [ 
        buble(),
        serve({
            contentBase: '',
            host: 'localhost',
            port: 8888
        })
    ],
    targets: [
        {
            format: 'es',
            dest: './dist/preload.js'
        }, 
        {
            format: 'cjs',
            dest: './dist/preload.cjs.js'
        }, 
        {
            format: 'umd',
            dest: './dist/preload.umd.js'
        },
        {
            format: 'iife',
            dest: './dist/preload.global.js',
        }
    ],
    external: ['html'],

    globals: {
        html: 'html'
    }
};