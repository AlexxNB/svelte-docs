import hljs from 'highlight.js';
import hljs_svelte from 'highlightjs-svelte';

hljs_svelte(hljs);

export default function(text,lang,interpolation=false) {
    lang = (lang || 'svelte');

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