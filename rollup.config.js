import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import {markdown} from 'svelte-preprocess-markdown';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import globsync from "rollup-plugin-globsync";

import {pagesRoutes} from './sys/rollup_plugin_routes';
import {pagesSections} from './sys/rollup_plugin_sections';
import {builtins} from './sys/rollup_plugin_builtins';
import {incpkg} from './sys/rollup_plugin_incpkg';
import {builtinsPreprocessor} from './sys/svelte_preprocess_builtins';

const production = !process.env.ROLLUP_WATCH;

export default [{
	input: 'sys/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		pagesRoutes(),
		pagesSections(),
		builtins(),
		globsync({
            patterns : ["src/theme/assets/**/*"],
			dest : "./public/theme",
			options: {transform: file => file.replace('src/theme/assets/','')}
        }),
		svelte({
			dev: !production,
			emitCss:true,
			extensions: ['.svelte','.md'],
			preprocess: [
				builtinsPreprocessor(),
				markdown()
			]
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
		clearScreen: false,
		exclude: 'sys/_examples'
	}
},
// Examples bundle
{
	input: './sys/_examples/list.js',
	output: {
		sourcemap: false,
		format: 'iife',
		name: 'app',
		file: 'public/examples.js'
	},
	plugins: [
		incpkg(),
		svelte({
			dev: production,
			emitCss:true,
			extensions: ['.svelte'],
			preprocess: []
		}),
		postcss({
            extract: true,
            minimize: production,
			sourceMap: false,
			plugins:[
				postcssImport()
			]
        }),
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),
		production && terser()
	],
	watch: {
		exclude: './sys/_examples/*.svelte'
	}
}];
