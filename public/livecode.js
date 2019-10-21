import {rollup} from 'https://unpkg.com/rollup/dist/rollup.browser.es.js';
import memory from 'https://unpkg.com/rollup-plugin-memory/dist/rollup-plugin-memory.es.js';
import 'https://unpkg.com/svelte@3.12.1/compiler.js';


export function render (source) {

    const {js} = svelte.compile(source);
    return rollup({
		input: 'index.js',
		
		plugins: [
			memory({
				path: 'index.js',
				contents: js.code
			}),
			unpkg()
		]
	}).then( async bundle => {
		let result = await bundle.generate({
			format: 'iife',  // amd, es6, iife, umd, cjs
			name: 'App',
		});
		return result.output[0].code;
	});
}

function unpkg(config) {
    return {
        resolveId: function resolveId(id) {
            return id;
        },

        load: async function load(id) {
               id = id.replace('svelte/internal','svelte/internal/index.mjs') 
               const result = await fetch(`https://unpkg.com/${id}?module`);
               //  const result = await getSiteContent(`https://bundle.run/${id}/`);

                let code = await result.text();
                return code;
 
        }
    };
}