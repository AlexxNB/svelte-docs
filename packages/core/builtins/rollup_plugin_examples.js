import path from 'path';
import fs from 'fs';
import { EX_CSS,EX_IFRAME,EX_CMP, EX_LAYOUT } from './../constants';
import { ExamplesStore } from './../stores';
import { ERR } from './../utils.js';
import config from './../config';

const components = {
    "BuiltinExample.js": `export {default} from '${EX_CMP}';`,
    "ExampleLayout.js": `export {default} from '${EX_LAYOUT}';`,
    "basepath.js": `export default '${config.basepath}';`,
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
                import '${EX_CSS}';`;

                config.incCSS.forEach(csspath => {
                    if (!fs.existsSync(csspath)) ERR('Config.incCSS: No such file',csspath);
                    file = file+`\nimport '${csspath}';`
                })

                Object.keys(ExamplesStore.get()).forEach(name => {
                    file = file+`\nexport {default as ${name}} from '${name}.svelte';`
                });

                return file;
            }
            return null;
        }
    }
}


// handle imports of virtual packages
export function incpkg() {
    return {
        name: 'rollup_plugin_incpkg',

        resolveId(id) { return config.incPKG[id] !== undefined ? id : null },
        load(id) { 
            if(config.incPKG[id] !== undefined){
                const pkgpath = path.resolve(config.incPKG[id]);
                if (!fs.existsSync(pkgpath)) ERR('Config.incPKG: No such file',pkgpath);
                return fs.readFileSync(pkgpath,{encoding:'utf-8'})
            }else
                return null;
        }
    }
}

