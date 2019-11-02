import marked from 'marked';
import fs from 'fs-extra';
import { PROPS_CMP } from './../../constants';
import { getRealImportedPath } from './../../utils';

import('svelte/register');

export default (content,params,name) => () => {
    let props = [];
    if(!/[|\n]/.test(content) && /\//.test(content)){
      const filepath = getRealImportedPath(content.trim())
  
      if(filepath){
        const source = fs.readFileSync(filepath,{encoding:'utf-8'});
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
    
    const App = require(PROPS_CMP).default;
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