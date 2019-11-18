import path from 'path';
import fs from 'fs';

import {PAGES,STARTPAGE,ERROR_CMP} from './../constants';


export default function () {
    const pages = getRoutes(PAGES);

    const strImports = pages.map(item =>`import {default as ${item.component}, META as ${item.component}_META} from '${item.path}'`).join(";\n");
    const strRoutes = pages.map(item =>`{url: '${item.route}', component:${item.component}, meta:${item.component}_META}`).join(",\n");

    return `${strImports}
    import Error from '${ERROR_CMP}';

    import {derived} from 'svelte/store';
    import {url} from '@svelte-docs/core/navigation'
    
    const routes = [
        ${strRoutes}
    ]

    export const current_page = derived(url,$url => {

        const route = routes.filter(r => r.url === $url);
        
        if(route.length > 0)
            return route[0];
        else
            return {url:'404', component:Error, meta:{fullscreen: true}};
    });
    `;
}

function getRoutes(dir,slug='') {
    slug = `${slug}/`;

    let pages = [];
    if(slug==='/') pages.push({
        component:'Startpage',
        route:'',
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
                    route:url.slice(1),
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