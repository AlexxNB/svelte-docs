import { EX_CSS,EX_IFRAME,EX_CMP, EX_LAYOUT } from './../constants';
import { ExamplesStore } from './../stores';
import config from './../config';

const components = {
    "@svelte-docs/get/BuiltinExample": `export {default} from '${EX_CMP}';`,
    "@svelte-docs/get/ExampleLayout": `export {default} from '${EX_LAYOUT}';`,
    "@svelte-docs/get/basepath": `export default '${config.basepath}';`,
}

export function example_component() {
    return {
        name: 'rollup_plugin_builtins',
        resolveId(id) { return components[id] !== undefined ? id : null },
        load(id) { 
            if(components[id] !== undefined) return components[id]; 
            return null;
        }
    }
}

// handle imports of the examples components
export function examples_sources() {
    const re = /(Ex_\d+_[a-f0-9]{32})\.svelte/;

    return {
        name: 'rollup_plugin_examples_sources',

        resolveId(id) { return re.test(id) ? id : null },
        load(id) { 
            if(re.test(id)) {
                const source = ExamplesStore.get(id.replace(re,'$1'));
                if(source) return source;
            }
            return null;
        }
    }
}

// handle import of the examples index file
export function examples_index() {
    return {
        name: 'rollup_plugin_examples_index',

        resolveId(id) { return id === 'examples_src.js' ? id : null },
        load(id) { 
            if(id === 'examples_src.js') {
                let file = `
                import '${EX_IFRAME}';
                import '${EX_CSS}';
                `;

                Object.keys(ExamplesStore.get()).forEach(name => {
                    file = file+`\nexport {default as ${name}} from '${name}.svelte';`
                });

                return file;
            }
            return null;
        }
    }
}