import path from 'path';
import fs from 'fs';
import config from './../config';
import { ERR } from './utils.js';



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