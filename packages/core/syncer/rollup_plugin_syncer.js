import path from 'path';
import fs from 'fs-extra';
import syncFolders from 'sync-folders';

import {STATIC,THEME} from './../constants';

const assets = [
    path.join(THEME,'assets'),
    STATIC,
]

export default function (dev=false) {
    const options = {
        type: dev ? 'hardlink' : 'copy'
    }

    return {
        name: 'rollup_plugin_syncer',
        generateBundle(opts, bundle) { 
            const dir = opts.dir || path.dirname(opts.file);
            assets.forEach(asset => {
                const filepath = path.resolve(asset)
                if(fs.pathExistsSync(filepath)){
                    syncFolders(filepath, dir, options);
                }
            })
        }
    }
}
