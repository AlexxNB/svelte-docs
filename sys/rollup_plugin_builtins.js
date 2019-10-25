import fs from 'fs-extra';
import path from 'path';
import { BUILTIN_PKG,CMP_EXAMPLE,EX_DIR,EX_LIST } from './constants';
import { ERR } from './utils.js';
import config from './../config';


// clean examples dir on startup
(function(){fs.emptyDirSync(EX_DIR)})();


function getBuiltComponents() {
    return `
        export {default as Example} from '${CMP_EXAMPLE}'; 
    `;
}

export function builtins() {
    return {
        name: 'rollup_plugin_builtins',

        resolveId(id) { return id === BUILTIN_PKG ? id : null },
        load(id) { 
            if(id === BUILTIN_PKG) return getBuiltComponents();
            return null;
        },
        writeBundle() { 
            
            fs.writeFileSync(EX_LIST, `import '${path.resolve('./sys/components/Example/iframe.js')}';\n`);

            config.incCSS.forEach(csspath => {
                csspath = path.resolve(csspath);
                if (!fs.existsSync(csspath)) ERR('Config.incCSS: No such file',csspath);
                fs.appendFileSync(EX_LIST, `import '${csspath}';\n`);
            });

            fs.readdirSync(EX_DIR).forEach(file => {
                const result = /^(Ex_\d+_([a-f0-9]{32}))\.svelte$/.exec(file);
                if(result){
                    fs.appendFileSync(EX_LIST,`export {default as ${result[1]}} from './${result[0]}';\n`);
                }
            })

        }
    }
}

