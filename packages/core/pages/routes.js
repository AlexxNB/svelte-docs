import path from 'path';
import fs from 'fs';

import {PAGES,STARTPAGE} from './../constants';


export default function () {
    const pages = getRoutes(PAGES);

    const strImports = pages.map(item =>`import ${item.component} from '${item.path}'`).join(";\n");
    const strRoutes = pages.map(item =>`"${item.route}": ${item.component}`).join(",\n");

    return `${strImports}
    
    export default {
        ${strRoutes}
    }`;
}

function getRoutes(dir,slug='') {
    slug = `${slug}/`;

    let pages = [];
    if(slug==='/') pages.push({
        component:'Startpage',
        route:'/',
        path:STARTPAGE
    });

    fs.readdirSync(dir).forEach( file => {
        const filepath = path.join(dir,file);
        if(isDir(filepath)){
            if(!file.startsWith('_')){
               const subpages = getRoutes(filepath,slug+formatSlug(file));
               pages = pages.concat(subpages);
            }
        }else{
            const match = file.match(/^([^_][\S]+)\.(?:md|svelte)$/);
            if(match){
                const compname = formatComponentName(match[1]);
                const url = slug+formatSlug(match[1]);
                pages.push({
                    component:compname,
                    route:url,
                    path:filepath
                });
            }
        }
    });

    return pages;
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