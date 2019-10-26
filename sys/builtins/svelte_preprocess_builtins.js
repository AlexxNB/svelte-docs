import hasha from 'hasha';
import touch from 'touch';
import { ExamplesStore } from './../stores';
import { EX_INDEX } from './../constants';
import { getBlocks } from './blockparser';
import example_replacer from './Example/replacer';
import properties_replacer from './Properties/replacer';


export function builtins() {
    
    return {
        markup({ content, filename }) {
          
            if(filename.endsWith('.md')){
                content = replaceBuiltins(content,filename);
            }

            return { code: content };
        }
    };
}

function replaceBuiltins(text,filename){
  const used = new Set();
  let uid = 0;

  //current file identificator
  const fid = hasha(filename,{algorithm: 'md5'});
  
  //remve all examples by file id
  ExamplesStore.delete(new RegExp(`Ex_\\d+_${fid}`));
  
   
  // parse blocks in the file
  getBlocks(text).forEach(block => {
    
    if(block.type === 'example') {
      used.add('Example');

      let name = `Ex_${uid++}_${fid}`;
      text = text.replace(
        block.fragment,
        example_replacer(block.content,block.params,name)
      )
    
    }else if(block.type === 'properties') {
      
      let name = `Props_${uid++}_${fid}`;
      text = text.replace(
        block.fragment,
        properties_replacer(block.content,block.params,name)
      )
    }

  });
  
  if(used.size > 0){
    let used_str = Array.from(used).map(cmp => `import ${cmp} from 'Builtin${cmp}.js';`).join("\n");
    
    if(/^[\t ]*<script>/.test(text))
      text = text.replace(/^[\t ]*<script>/,"$&\n"+used_str);
    else if(/^[\t ]*import .+ from .+$/.test(text))
      text = text.replace(/^[\t ]*import .+ from .+$/,used_str+"\n$&");
    else
      text = used_str+"\n"+text; 
  }

  if(used.has('Example')) touch(EX_INDEX);
  
  return text;
}





