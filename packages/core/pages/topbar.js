import fs from 'fs';
import {TOPBAR} from './../constants';

export default function() {
    let match;
    const source = fs.readFileSync(TOPBAR, {encoding: 'utf-8'});

    let links = [];
    let re = /^\s*[*\-+]\s+\[(.+)\]\((.+)\)\s*$/mg;
    while(match = re.exec(source)){
        links.push({title:match[1],url:match[2]});
    }

    const logo = {html:'Logo',url:'/'};
    match = /^\s*#[\t ]+(?:\[(.+)\]\((.+)\)|(.+))[\t ]+#\s*$/m.exec(source);
    if(match) {
        logo.html = (match[3] ? match[3] : match[1]).replace(/\*([^*]+)\*/g,'<span>$1</span>');
        if(match[2]) logo.url = match[2];
    }


    return `
        export const logo = ${JSON.stringify(logo)};
        export const links = ${JSON.stringify(links)};
    `;
}

