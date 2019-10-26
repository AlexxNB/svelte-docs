import hljs from 'highlight.js';
import { ExamplesStore } from './../../stores';

export default (content,params,name) => () => {
    ExamplesStore.set(name,content);
  
    if(params.script && params.script === 'hide'){
      content = content.replace(/^[\t ]*<script>[\S\s]*?<\/script>\n?/m,'');
    }
  
    if(params.style && params.style === 'hide'){
      content = content.replace(/^[\t ]*<style.*>[\S\s]*?<\/style>\n?/m,'');
    }
  
    return `<Example name="${name}" code={"${highlight(content,params.lang)}"}/>`;
  }

  function highlight (text,lang) {
    lang = lang || 'xml';
    
    const result = hljs.highlight(lang,text);
  
    return result.value
            .replace(/{/g,'&#123;')
            .replace(/}/g,'&#125;')
            .replace(/"/g,'\\"')
            .replace(/\n/g,'\\n');
  }