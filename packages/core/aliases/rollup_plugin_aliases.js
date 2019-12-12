import config from './../config';

// handle imports of virtual packages
export default function() {
    return {
        name: 'rollup_plugin_aliases',

        resolveId(id) { return config.aliases[id] !== undefined ? id : null },
        load(id) { 
            if(config.aliases[id] !== undefined){
                const pkgpath = path.resolve(config.aliases[id]);
                if (!fs.existsSync(pkgpath)) ERR('Config.aliases: No such file',pkgpath);

                if(id.endsWith('.svelte')) 
                    return fs.readFileSync(pkgpath,{encoding:'utf-8'});
                else if(pkgpath.endsWith('.svelte')) 
                    return `export {default} from '${pkgpath}';`; 
                else
                    return `export * from '${pkgpath}';`; 
                
            }else
                return null;
        }
    }
}