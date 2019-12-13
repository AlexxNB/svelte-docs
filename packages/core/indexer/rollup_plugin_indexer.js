import path from 'path';
import fs from 'fs-extra';
import { PAGES } from './../constants';
import config from './../config';


export default function (dev=false) {

    return {
        name: 'rollup_plugin_indexer',
        generateBundle(opts, bundle) { 
            const dir = opts.dir || path.dirname(opts.file);

            fs.outputFileSync(path.join(dir,'index.html'),getTemplate());

            if(!dev) goTree(PAGES);               
        }
    }
}

function goTree(dir,slug='') {
    fs.readdirSync(dir).forEach( file => {
        const filepath = path.join(dir,file);
        if(fs.statSync(filepath).isDirectory()){
            if(!file.startsWith('_')){
               goTree(filepath,path.join(slug,file));
            }
        }else{
            const match = file.match(/^([^_][\S]+)\.(?:md|svelte)$/);
            if(match){
                fs.outputFileSync(path.join(config.pathes.build,config.basepath,slug,match[1],'index.html'),getTemplate());
            }
        }
    });
}


let meta = [];
if(config.favicon) meta.push(`<link rel='icon' type='image/png' href='${config.favicon}'>`);
if(config.preview) {
    meta.push(`<meta property='og:site_name' content='${config.title.main}'>`);
    meta.push(`<meta property='og:image' content='${config.preview}'>`);
    meta.push(`<meta content='${config.preview}' name=twitter:image>`);
}

function getTemplate(){
    
    return `<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1.0'>
    <base href="${config.basepath}" />
    <title>${config.title.main}</title>
    ${meta.join("\n")}
    <link rel='stylesheet' href='bundle.css'>
    <script defer src='bundle.js'></script>
</head>

<body>
</body>
</html>`
}