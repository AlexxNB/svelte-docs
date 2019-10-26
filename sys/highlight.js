import hljs from 'highlight.js';

export default function(text,lang,interpolation=false) {
    lang = lang || 'xml';
    
    const result = hljs.highlight(lang,text);

    let code = result.value
            .replace(/{/g,'&#123;')
            .replace(/}/g,'&#125;');

    if(interpolation){
        code = code
            .replace(/"/g,'\\"')
            .replace(/\n/g,'\\n');
    }

    return code;
  }