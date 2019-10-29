import getSections from './sections'
import getRoutes from './routes'
import getTopbar from './topbar'

const imports = {
    "topbar.js": getTopbar,
    "sections.js": getSections,
    "routes.js": getRoutes,
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