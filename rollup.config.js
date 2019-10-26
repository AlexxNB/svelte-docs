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

import { 	example_component, 
			examples_sources, 
			examples_index, 
			incpkg
		} from './sys/builtins/rollup_plugin_examples';

import {builtins} from './sys/builtins/svelte_preprocess_builtins';

import config from './config';

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
		example_component(),
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
				builtins(),
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
	}
},
// Examples bundle
{
	input: 'sys/examples.main.js',
	output: {
		sourcemap: false,
		format: 'iife',
		name: 'app',
		file: 'public/examples.js'
	},
	plugins: [
		incpkg(),
		examples_index(),
		examples_sources(),
		svelte({
			dev: production,
			emitCss:true,
			extensions: ['.svelte'],
			preprocess: config.preprocess
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
		clearScreen: false,
	}
}];
