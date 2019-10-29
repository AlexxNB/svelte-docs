export function getBlocks (text) {

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


function getProps(str) {
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