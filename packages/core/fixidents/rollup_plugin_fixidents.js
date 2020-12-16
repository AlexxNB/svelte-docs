import path from 'path';
import fs from 'fs-extra';

// this will remove idents inside <pre> tags in builted bundle;
export default function () {
    
    const ident_remover = function(text) {
        return text.replace(/(<code[^>]+>)\\n\\t\\t\\t/,'$1').replace(/\\t\\t\\t/g,'');
    }

    let FILE = '';
    return {
        name: 'rollup_plugin_fixident',
        writeBundle: async (opts, bundle) => {
           fs.writeFileSync(opts.file, bundle[path.basename(opts.file)].code.replace(/innerHTML='<code.+?code>'/g,ident_remover));
        }
    }
}
