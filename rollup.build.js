import { rollup } from 'rollup';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

const option = {
    entry: './src/preload.js',
    plugins: [ 
        // buble(),
        uglify()
    ],
}

rollup(option)
    .then((bundle) => {
        bundle.write({
            format: 'cjs',
            moduleName: 'preload',
            sourceMap: true,
            useStrict: false,
            dest: './dist/preload.cjs.js'
        });
        return rollup(option)
    })
    .then((bundle) => {
        bundle.write({
            format: 'iife',
            moduleName: 'preload',
            sourceMap: true,
            useStrict: false,
            dest: './dist/preload.global.js'
        });
        return rollup(option)
    })
    .then((bundle) => {
        bundle.write({
            format: 'umd',
            moduleName: 'preload',
            sourceMap: true,
            useStrict: false,
            dest: './dist/preload.umd.js'
        });
        return rollup({
            entry: './src/preload.js',
            plugins: [ 
                buble()
            ],
        })
    })
    .then((bundle) => {
        bundle.write({
            format: 'es',
            sourceMap: true,
            dest: './dist/preload.js'
        });
        // return rollup(option)
    })