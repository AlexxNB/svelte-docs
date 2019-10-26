import path from 'path';
import fs from 'fs-extra';
//import { BUILTIN_PKG, CMP_EXAMPLE} from './../constants';


export default function (dev=false) {

    return {
        name: 'rollup_plugin_indexer',
        generateBundle(opts, bundle) { 
            const dir = opts.dir || path.dirname(opts.file);
            
            fs.writeFileSync(path.join(dir,'index.html'),getTemplate());
        }
    }
}

function getTemplate(){
    return `<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1.0'>
    <base href="/" />
    <title>Svelte thing Documentation</title>
    <link rel='stylesheet' href='bundle.css'>
    <script defer src='bundle.js'></script>
</head>

<body>
</body>
</html>`
}