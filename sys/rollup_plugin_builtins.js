import path from 'path';
import fs from 'fs';

const IMPORTS = ['playground_css.js','svelte-docs'];
const PlaygroundCSS = path.resolve('./src/theme/styles/playground.css');
const PlaygroundComponent = path.resolve('./sys/components/Playground.svelte');

function getPlaygroundCSS() {
    const source = fs.readFileSync(PlaygroundCSS,{encoding: 'utf-8'});
    return 'export default `'+source+'`';
}

function getBuiltComponents() {
    return `
        import PlaygroundCMP from '${PlaygroundComponent}'; 
       
        export const Playground = PlaygroundCMP;
    `;
}

export function builtins() {
    return {
        name: 'rollup_plugin_builtins',

        resolveId(id) { return IMPORTS.indexOf(id) !== -1 ? id : null },
        load(id) { 
            if(id === 'playground_css.js') return getPlaygroundCSS();
            if(id === 'svelte-docs') return getBuiltComponents();
            return null;
        }
    }
}