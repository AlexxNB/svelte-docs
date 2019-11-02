import getSections from './sections'
import getRoutes from './routes'
import getTopbar from './topbar'

const imports = {
    "@svelte-docs/get/topbar": getTopbar,
    "@svelte-docs/get/sections": getSections,
    "@svelte-docs/get/routes": getRoutes,
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