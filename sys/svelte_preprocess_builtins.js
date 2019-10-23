export function builtinsPreprocessor() {
    
    return {
        markup({ content, filename }) {
            
            if(filename.endsWith('.md')){
                content = replaceBuiltins(content);
            }

            return { code: content };
        }
    };
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



function replaceBuiltins(text){
    let used = [];

    getBlocks(text).forEach(block => {
      if(block.type === 'playground') {
        if(used.indexOf('Playground') === -1) used.push('Playground');
        text = text.replace(block.fragment,playground_replacer(block.content,block.params))
      }
    });

    if(used.length > 0){

      let used_str = used.map(cmp => `import {${cmp}} from 'svelte-docs';`).join("\n");
      
      if(/^[\t ]*<script>/.test(text))
        text = text.replace(/^[\t ]*<script>/,"$&\n"+used_str);
      else if(/^[\t ]*import .+ from .+$/.test(text))
        text = text.replace(/^[\t ]*import .+ from .+$/,"$&\n"+used_str);
      else
        text = used_str+"\n"+text;
    }
    
    return text;
}

const  playground_replacer = (content,params) => () => {
  let components = getBlocks(content);
  if(components.length === 0) components = [{type:'App.svelte',content}];
  components = components.map(comp => {
    let fileinfo = comp.type.split('.');
    if(fileinfo.length === 1) fileinfo.push('svelte');

    return {
        type: fileinfo.pop(),
        name: fileinfo.join('.'),
        source: comp.content
    }
  });

  let attributes = Object.keys(params).reduce((arr,param) => {
      if(params[param] !== null) 
        return [...arr,`${param}="${params[param]}"`];
      else
        return [...arr,`${param}`];
  },[]);

  attributes.push('components={'+JSON.stringify(components)+'}')

  return `<Playground ${attributes.join(' ')} />`
}