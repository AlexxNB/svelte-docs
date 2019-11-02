<script>
/* (!) Restart bandler if this file was edited
*   
*   Properties data structure:
*   data = [
*       { 
*           name <string>,
*           description <string>,
*           attr[
*               default<string>,
*               types: <string> | [ <string> ]
*           ]
*       },
*       ...
*   ]
*/
    export let data;

    function getTypes(types) {

        if(!types) return '';

        const typeValue = (type) => {
            if(!type) return '';
            if(typeof type === 'string') return type;
            
            return type.map(v => `<i>${v}</i>`).join(',');
        }

        return types.map(type=>`<dfn>${typeValue(type)}</dfn>`).join('');
    }
</script>

<dl class="properties">
{#each data as prop}
<dt class:required={!prop.attr.default}>{prop.name}</dt>
<dd>{@html getTypes(prop.attr.types)}</dd>
<dd>{prop.attr.default ? prop.attr.default : ''}</dd>
<dd>{prop.description ? prop.description : ''}</dd>
{/each}
</dl>