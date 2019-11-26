import fs from 'fs-extra';
import path from 'path';
import config from './config';

const CWD = process.cwd();

export function getThemePath(){
    if(!config.theme) throw new Error('No theme option in the `svelte-docs.config.js`');
    

    // Check if theme is present in default pack
    const package_path = path.join(CWD,'node_modules','@svelte-docs','themes',config.theme);
    if(fs.existsSync(package_path)) return package_path;

    // Check if user set option to the local path
    const local_path = path.resolve(config.theme);
    if(fs.existsSync(local_path)) return local_path;

    throw new Error('Unknown theme option value in the `svelte-docs.config.js`');
}
