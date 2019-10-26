import fs from 'fs-extra';
import path from 'path';
import hljs from 'highlight.js';
import hasha from 'hasha';
import marked from 'marked';
import { EX_DIR } from './constants';
import { getRealImportedPath } from './utils';
import config from './../config';

import('svelte/register');

export function builtinsPreprocessor() {
    
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
  let used = []; 
  let uid = 0;

  //current file identificator
  const fid = hasha(path.relative('./src/docs',filename).replace(/[\/.]/g,'_'),{algorithm: 'md5'});
  
  //remve all examples by file id
  fs.readdirSync(EX_DIR).forEach(file => {
    let r = /Ex_\d+_([a-f0-9]{32})\.svelte/.exec(file);
    if(r && r[1] === fid)  fs.removeSync(path.join(EX_DIR,file));
  })
  
   
  // parse blocks in the file
  getBlocks(text).forEach(block => {
    
    if(block.type === 'example') {
     
      if(used.indexOf('Example') === -1) used.push('Example');
      let name = `Ex_${uid++}_${fid}`;
      text = text.replace(block.fragment,example_replacer(block.content,block.params,name))
    
    }else if(block.type === 'properties') {
      let name = `Props_${uid++}_${fid}`;
      text = text.replace(block.fragment,properties_replacer(block.content,block.params,name))
    
    }

  });
  
  if(used.length > 0){

    let used_str = `import { ${used.join(',')} } from 'svelte-docs-builtins';`
    
    if(/^[\t ]*<script>/.test(text))
      text = text.replace(/^[\t ]*<script>/,"$&\n"+used_str);
    else if(/^[\t ]*import .+ from .+$/.test(text))
      text = text.replace(/^[\t ]*import .+ from .+$/,used_str+"\n$&");
    else
      text = used_str+"\n"+text; 
  }
  
  return text;
}

const highlight = (text,lang) => {
  lang = lang || 'xml';
  
  const result = hljs.highlight(lang,text);

  return result.value
          .replace(/{/g,'&#123;')
          .replace(/}/g,'&#125;')
          .replace(/"/g,'\\"')
          .replace(/\n/g,'\\n');
}

const  example_replacer = (content,params,name) => () => {
  fs.writeFileSync(path.join(EX_DIR,`${name}.svelte`), content);

  if(params.script && params.script === 'hide'){
    content = content.replace(/^[\t ]*<script>[\S\s]*?<\/script>\n?/m,'');
  }

  if(params.style && params.style === 'hide'){
    content = content.replace(/^[\t ]*<style.*>[\S\s]*?<\/style>\n?/m,'');
  }

  return `<Example name="${name}" code={"${highlight(content,params.lang)}"}/>`;
}

const  properties_replacer = (content,params,name) => () => {
  let props = [];
  if(!/[|\n]/.test(content) && /\//.test(content)){
    const filepath = getRealImportedPath(content.trim())

    if(filepath){
      const source = fs.readFileSync('./mylib/Button.svelte',{encoding:'utf-8'});
      props = propsExtrator(source);
    }
  }else{
    props = content.split('\n')
      .map(line => line.split('|')
        .map(cell => cell.trim())
      )                       //<3 <3 <3 Love will save the World !
      .filter(line => !(line.length <3) )
      .map(line => {return { name:line[0], description:line[1], attr:line[2] }})
      .map(line => {
        const parsed = /([^\(\)]+)(\((.+)\))?/.exec(line.attr);

        line.attr = {
          default: parsed[3],
          types: parsed[1].split('/').map(type => {
            type = type.trim();
            type = type.split(',').map(i => i.trim());
            return (type.length === 1) ? type[0] : type;
          })
        }

        line.description = marked(line.description).replace(/<\/?p>\n?/g,'');
      
        return line;
      })
  }


      const App = require('./sys/components/Properties.svelte').default;
      const {html} = App.render({data:props});
  return html;
}

function propsExtrator(source){
  const re_props = /(\/\*\s+(.+)\|(.+)\*\/[\t ]*\n)?[\t ]*export\s+(.+?)[\t ]+([^= ;]+)([\t ]+=\s+(.+?))?[\t ]*;?\n/g;
  let result;
  let props = [];

  const trim = (str) => {
    if(typeof str === 'string') str = str.trim();
    return str;
  }

  while(result = re_props.exec(source)){
    props.push({ 
      name:trim(result[5]), 
      description:trim(result[2]), 
      attr:{
        default: trim(result[7]),
        types: result[3] ? result[3].split('/').map(type => {
          type = type.trim();
          type = type.split(',').map(i => i.trim());
          return (type.length === 1) ? type[0] : type;
        }) : result[3]
      } 
    });
  }

  return props;
}


function getBlocks (text) {

    const re = new RegExp('^([\\t ]*)```([\\w:\. ]*)[\\t ]*$','mg');
    let result;
    let level = 0;
    let map = [];
    const mapitem = {type:'',params:[], fragment:'' , content:''};
    let start = 0;
    let end = 0;
    let length = 0;
    while(result = re.exec(text)){
        if(result[2].length !== 0) {
            level++;
            if(level === 1) {
                start = result['index']
                const {type,params} = getProps(result[2]);
                mapitem.type = type;
                mapitem.params = params;
            }
        }else{
            level--;
            if(level === 0) {
                end = (result['index']+result[1].length+3)
                mapitem.fragment = text.slice(start,end)
                let content = mapitem.fragment.split("\n");
                content.shift();
                content.pop();
                const minspace = content.reduce((min,line) => {
                  const cur = Number( line.replace( /^([\t ]*).+$/,(txt,spaces)=>spaces.length));
                  return cur<min ? cur : min;
                },Infinity);
                content = content.map(line => line.replace(new RegExp('^[\t ]{0,'+minspace+'}'),''))  ;  
                mapitem.content =content.join("\n");
                map.push({...mapitem});
                mapitem.type = mapitem.fragment = mapitem.content = '';
                mapitem.params = {};
            }
            
        }
    }

    return map
}


const getProps = function (str) {
  if(!str) return {type:'',params:[]};
  const list = str.replace(/\s{2,}/g,' ').trim().split(' ');
  const type = list.shift();
  const params = list.reduce((acc,item) => {
    const p = item.split(':');
    if(p.length === 1) p.push(null);
    acc[p[0]] = p[1];
    return acc
  },{})

  return {type,params}
}