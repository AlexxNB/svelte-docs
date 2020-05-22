import path from 'path';
import fs from 'fs';
import { ERR } from './../utils.js';
import config from './../config';

// handle imports of virtual packages
export default function() {
    return {
        name: 'rollup_plugin_aliases',

        resolveId(id,importer) { 
            if(id.endsWith('.svelte') && config.aliases[id] !== undefined){
                return this.resolve(config.aliases[id],importer);
            }
            return config.aliases[id] ? id : null;
        },
        load(id) { 
            if(config.aliases[id] !== undefined){
                const pkgpath = path.resolve(config.aliases[id]);
                if (!fs.existsSync(pkgpath)) ERR('Config.aliases: No such file',pkgpath);

                if(pkgpath.endsWith('.svelte')) 
                    return `export {default} from '${pkgpath}';`; 
                else
                    return `export * from '${pkgpath}';`; 
                
            }else
                return null;
        }
    }
}