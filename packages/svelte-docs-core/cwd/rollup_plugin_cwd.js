import {CWD} from './../constants';

export default function () {
    return {
        name: 'rollup_plugin_cwd',
        resolveId(id) { return id.startsWith('$CWD/') ? id.replace('$CWD',CWD) : null },
     /*   load(id) { 
            if(imports[id] !== undefined) return imports[id](); 
            return null;
        }*/
    }
}