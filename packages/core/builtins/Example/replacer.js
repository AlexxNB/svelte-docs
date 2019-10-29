import highlight from './../../highlight';
import { ExamplesStore } from './../../stores';

export default (content,params,name) => () => {
    ExamplesStore.set(name,content);
  
    if(params.script && params.script === 'hide'){
      content = content.replace(/^[\t ]*<script>[\S\s]*?<\/script>\n?/m,'');
    }
  
    if(params.style && params.style === 'hide'){
      content = content.replace(/^[\t ]*<style.*>[\S\s]*?<\/style>\n?/m,'');
    }
  
    return `<Example name="${name}" code={"${highlight(content,params.lang,true)}"}/>`;
  }

  