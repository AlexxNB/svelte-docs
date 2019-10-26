import path from 'path';
import fs from 'fs';

const FILE = 'pages_sections.js'
const SECTIONS = path.resolve('./src/docs/sections.md');

export function pagesSections() {
    return {
        name: 'rollup_plugin_sections',

        resolveId(id) { return id === FILE ? id : null },
        load(id) { return id === FILE ? getSections() : null }
    }
}

function getSections() {
    let sections = [];

    const source = fs.readFileSync(SECTIONS,{encoding: 'utf-8'});

    let elements = [];

    const re = /^([\s]*)[*\-+][\s]+(.+)$/mg
    let match;
    while(match = re.exec(source)){
        elements.unshift([match[1],match[2]]);
    }

    let acc = [];
    elements.forEach( el => {
        let section = {title:'',url:false};

        const re_url = /\[(.+)\]\((.+)\)/
        if(el[1].match(re_url)){
            const url = re_url.exec(el[1]);
            section.title = url[1];
            section.url = url[2];
        }else{
            section.title = el[1];
        }

        if((el[0].length > 0)){
            acc.push(section);
        }else{
            
            if(acc.length > 0){
                section.sub = acc;
                acc = [];
            }else{
                section.sub = [];
            }

            sections.unshift(section);
        }
    });
    return `export default ${JSON.stringify(sections)}`;
}

