import fs from 'fs-extra';
import path from 'path';
import { BUILTIN_PKG, STORE_PKG, CMP_EXAMPLE,EX_DIR,EX_LIST,EX_CSS,CMP_PROPS } from './constants';
import { ERR } from './utils.js';
import config from './../config';
import { ClientStore } from './stores';


// clean examples dir on startup
(function(){fs.emptyDirSync(EX_DIR)})();


function getBuiltComponents(pkg) {

    if(pkg === BUILTIN_PKG) return `
        export {default as Example} from '${CMP_EXAMPLE}'; 
    `;

    if(pkg === STORE_PKG) return `
        export default ${JSON.stringify(ClientStore.get())};
    `;
}

export function builtins() {
    const packages = [STORE_PKG,BUILTIN_PKG];

    return {
        name: 'rollup_plugin_builtins',
        resolveId(id) { return packages.indexOf(id) !== -1 ? id : null },
        load(id) { 
            if(packages.indexOf(id) !== -1) return getBuiltComponents(id);
            return null;
        },
        writeBundle() { 
            
            fs.writeFileSync(EX_LIST, `import '${path.resolve('./sys/components/Example/iframe.js')}';\n`);
            fs.appendFileSync(EX_LIST, `import '${EX_CSS}';\n`);
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

