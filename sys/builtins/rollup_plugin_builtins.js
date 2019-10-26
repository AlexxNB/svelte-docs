import { BUILTIN_PKG, CMP_EXAMPLE} from './../constants';

function getBuiltComponents(pkg) {

    if(pkg === BUILTIN_PKG) return `
        export {default as Example} from '${CMP_EXAMPLE}'; 
    `;
}

export function builtins() {
    const packages = [BUILTIN_PKG];

    return {
        name: 'rollup_plugin_builtins',
        resolveId(id) { return packages.indexOf(id) !== -1 ? id : null },
        load(id) { 
            if(packages.indexOf(id) !== -1) return getBuiltComponents(id);
            return null;
        }
    }
}

