import hljs from 'highlight.js';
import hljs_svelte from 'highlightjs';

hljs_svelte(hljs);

export default function(text,lang,interpolation=false) {
    lang = (lang || 'svelte') === 'svelte' ? 'xml' : lang;

    
    const result = hljs.highlight(lang,"\n"+text);

    let code = result.value
            .replace(/{/g,'&#123;')
            .replace(/}/g,'&#125;')
            .replace(/<span class="(javascript|css)">/g,"$&&nbsp;");
            
    if(interpolation){
        code = code
            .replace(/"/g,'\\"')
            .replace(/\n/g,'\\n');
    }

    return code;
  }