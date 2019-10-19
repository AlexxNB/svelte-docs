import path from 'path';
import fs from 'fs';

const FILE = 'pages_routes.js'

const root = path.resolve('./src/docs/pages');

function getRoutes(dir,slug='') {

    let r = [];
    let i = [];

    slug = `${slug}/`;

    fs.readdirSync(dir).forEach( file => {
        const filepath = path.join(dir,file);
        if(isDir(filepath)){
            if(!file.startsWith('_')){
               const {routes,imports} = getRoutes(filepath,slug+formatSlug(file));
               r = r.concat(routes);
               i = i.concat(imports);
            }
        }else{
            const match = file.match(/^([^_][\S]+)\.(?:md|svelte)$/);
            if(match){
                const compname = formatComponentName(match[1]);
                const url = slug+formatSlug(match[1]);
                r.push({
                    route:url,
                    component:compname,
                });
                i.push({
                    component:compname,
                    path:filepath,
                })
            }
        }
    });

    return {routes:r,imports:i}
}

function isDir(filepath) {
    return fs.statSync(filepath).isDirectory()
}

function formatComponentName(text){
    return formatSlug(text)
        .split('-')
        .reduce(
            (name,word) => {
               return name + word.charAt(0).toUpperCase() + word.slice(1);
            },'');
}

function formatSlug(text){
    return text.replace(/[^\w\d\-]/g,'-');
}

function getRoutesObjectStr() {
    const {routes,imports} = getRoutes(root);

    const strImports = imports.map(item =>`import ${item.component} from '${item.path}'`).join(";\n");
    const strRoutes = routes.map(item =>`"${item.route}": ${item.component}`).join(",\n");

    return `${strImports}
    
    export default {
        ${strRoutes}
    }`;
}

export function pagesRoutes() {
    return {
        name: 'rollup_plugin_routes',

        resolveId(id) { return id === FILE ? id : null },
        load(id) { return id === FILE ? getRoutesObjectStr() : null }
    }
}