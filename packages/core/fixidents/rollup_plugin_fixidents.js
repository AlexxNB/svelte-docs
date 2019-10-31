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
        generateBundle(opts, bundle) { FILE = opts.file },
        writeBundle: async (bundle) => {
           fs.writeFileSync(FILE, bundle[path.basename(FILE)].code.replace(/innerHTML='<code.+?code>'/g,ident_remover));
        }
    }
}
