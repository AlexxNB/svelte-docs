import fs from 'fs-extra';
import path from 'path';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import {markdown} from 'svelte-preprocess-markdown';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';

import replacer from './replacer/rollup_plugin_replacer';
import aliases from './aliases/rollup_plugin_aliases';
import indexer from './indexer/rollup_plugin_indexer';
import syncer from './syncer/rollup_plugin_syncer';
import fixidents from './fixidents/rollup_plugin_fixidents';
import {pages} from './pages/rollup_plugin_pages';
import {example_component, examples_sources,examples_index} from './builtins/rollup_plugin_examples';
import {builtins} from './builtins/svelte_preprocess_builtins';

import {INDEX,DEVPATH,BUILDPATH,EX_INDEX,SRC} from './constants';
import highlight from './highlight';
import config from './config';

const production = !process.env.ROLLUP_WATCH;

const DIR = production ? path.join(BUILDPATH,config.basepath) : path.join(DEVPATH,config.basepath);

fs.removeSync(DIR);

export default [{
	input: INDEX,
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: path.join(DIR,'bundle.js')
	},
	plugins: [
		replacer(),
		aliases(),
		indexer(!production),
		syncer(!production),
		pages(),
		example_component(),
		svelte({
			dev: !production,
			emitCss:true,
			extensions: ['.svelte','.md'],
			preprocess: [
				builtins(),
				markdown({highlight})
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
		production && terser(),
		production && fixidents(),
	],
	watch: {
		clearScreen: false,
		exclude: [SRC]
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
		aliases(),
		examples_index(),
		examples_sources(),
		production && fixidents(),
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
		exclude: [SRC]
	}
}];