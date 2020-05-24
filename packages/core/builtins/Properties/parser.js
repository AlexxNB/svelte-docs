import espree from 'espree';

export function getInterface(source){
    const code = extractScriptTag(source);

    const proplist = parseJS(code).filter(o => o.type==='property');
    const jsdoc = parseJSDoc(code);

    return proplist.reduce((list,prop) => {
        let info = {type:undefined,descr:undefined,...jsdoc.find(v => v.index === prop.index)};
        const propObj = { 
            name: prop.name,
            description: info.descr,
            attr: {
                default: prop.default,
                types: parseTypes(info.type)
            }
        };

        return [...list,propObj];
    },[]);
}



function extractScriptTag(source){
    const extractScriptRegex = /<script(.*?)>([\s\S]+?)<\/script>/gi;
    let match = extractScriptRegex.exec(source);
    
    if (match && (match[1].includes(`context="module"`) || match[1].includes(`context='module'`))) {
        match = extractScriptRegex.exec(source);
    }
    
    return match === null ? '' : match[2].trim();
}



function parseJS(code){

    const node = espree.parse(code,{ecmaVersion:10,sourceType: "module"});

    let vars = {};
    return node.body.reduce((list,node) => {
      
      if(node.type === 'FunctionDeclaration' || node.type === 'VariableDeclaration'){
        if(node.declarations) node.declarations.forEach(dec => vars[dec.id.name] = parseDeclarator(dec,node.kind));
        return list;
      }
      
      const sample = {index:node.start,type:'unknown',name:'unknown',default:undefined};
      
      if(node.declaration === null && node.specifiers.length > 0){
        return [...list,...node.specifiers.reduce((sublist,spec)=>{
          sublist.push({...sample,...(vars[spec.local.name] || {}),...{name:spec.exported.name}});
          return sublist;
        },[])]
      }

      if(node.type === 'ExportNamedDeclaration' && node.declaration){
        const decs = node.declaration.declarations ? Array.from(node.declaration.declarations) : [node.declaration]; 
        return [...list,...decs.reduce((sublist,dec)=>{
          sublist.push({...sample,...parseDeclarator(dec,node.kind)});
          return sublist;
        },[])]
      }

      return list;
    },[]);
}

function parseDeclarator(dec,kind){
  if(dec.type === 'FunctionDeclaration'){
    return {type:'method',name:dec.id.name}
  }   

  if(dec.type === 'VariableDeclarator'){
    const def = dec.init === null ? undefined :
                dec.init.type === 'Literal' ? dec.init.raw :
                dec.init.type === 'FunctionExpression' ? 'func()' : undefined;
    const type = kind === 'const' ? 'const' : 'property';
    return {type,name:dec.id.name,default:def}
  } 
}

function parseJSDoc(code){
    let list = [];
    let match;
    const re = /(\/\*\*[\s\S]+?\*\/)[\s]+/g;
    while(match = re.exec(code)){
      const index = match['index']+match[0].length;
      const jsdoc = match[1].replace(/(\/\*\*|\*\/|^\s*\*(?!\/))/gm,'').trim();
      const parsed = /((?:^[^@].+$\s+)+)*^[ \t]*@type +\{(.+)\} *(.+)?/m.exec(jsdoc);
      if(!parsed) continue;
      const descr = [parsed[1],parsed[3]].join("").trim(); 
      list.push({index,type:parsed[2],descr})
    }
    
    return list;
}

function parseTypes(code){
    
    if(!code) return [];

    const re = /(^\(|\)$)/g;
    
   return code.replace(re,'').split('|').map(type => {
      const values = type.replace(re,'').split(',');
      return values.length === 1 ? values[0] : values;
    });
  }
