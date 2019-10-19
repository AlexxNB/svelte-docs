import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import {markdown} from 'svelte-preprocess-markdown';
import {pagesRoutes} from './sys/rollup_plugin_routes';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import globsync from "rollup-plugin-globsync";


const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'sys/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		pagesRoutes(),
		globsync({
            patterns : [
                "src/theme/assets/**/*",
            ],
			dest : "./public/theme",
			options: {
				transform: file => file.replace('src/theme/assets/','')
			}
        }),
		svelte({
			dev: !production,
			emitCss:true,
			extensions: ['.svelte','.md'],
			preprocess: markdown()
		}),
		postcss({
            extract: true,
            minimize: production,
			sourceMap: !production,
			plugins:[
				postcssImport()
			]
        }),
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
