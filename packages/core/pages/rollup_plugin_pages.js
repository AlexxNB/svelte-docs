import getRoutes from './routes'

const imports = {
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