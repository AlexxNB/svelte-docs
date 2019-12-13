import getRoutes from './routes';
import config from './../config';

const imports = {
    "@svelte-docs/get/routes": getRoutes,
    "@svelte-docs/get/maintitle": ()=>`export default '${config.title.main}'`,
}

export function pages() {
    return {
        name: 'rollup_plugin_pages',
        resolveId(id) { return imports[id] !== undefined ? id : null },
        load(id) { 
            if(imports[id] !== undefined) return imports[id](); 
            return null;
        }
    }
}