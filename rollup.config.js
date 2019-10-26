import path from 'path';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import {markdown} from 'svelte-preprocess-markdown';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import globsync from "rollup-plugin-globsync";

import indexer from './sys/indexer/rollup_plugin_indexer';
import {pages} from './sys/pages/rollup_plugin_pages';
import {example_component,incpkg} from './sys/builtins/rollup_plugin_examples';
import {examples_sources,examples_index} from './sys/builtins/rollup_plugin_examples';
import {builtins} from './sys/builtins/svelte_preprocess_builtins';

import {DEVPATH,BUILDPATH,EX_INDEX,DOCROOT} from './sys/constants';
import config from './config';

const production = !process.env.ROLLUP_WATCH;

const DIR = production ? BUILDPATH : DEVPATH

export default [{
	input: 'sys/main.js',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: path.join(DIR,'bundle.js')
	},
	plugins: [
		indexer(!production),
		pages(),
		example_component(),
		globsync({
            patterns : ["src/theme/assets/**/*"],
			dest : path.join(DIR,'theme'),
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
		!production && livereload(DIR),
		production && terser()
	],
	watch: {
		clearScreen: false,
		exclude: [DOCROOT+'/**']
	}
},
// Examples bundle
{
	input: EX_INDEX,
	output: {
		sourcemap: false,
		format: 'iife',
		name: 'app',
		file: path.join(DIR,'examples.js')
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
