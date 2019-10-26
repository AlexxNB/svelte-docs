<script>
    export let data;

    function getTypes(types) {

        const typeValue = (type) => {
            if(typeof type === 'string') return type;
            return type.map(v => `<i>${v}</i>`).join(',');
        }

        return types.map(type=>`<dfn>${typeValue(type)}</dfn>`).join('');
    }
</script>


<dl class="properties">
{#each data as prop}
<dt>{prop.name}</dt>
<dd>{@html getTypes(prop.attr.types)}</dd>
<dd>{prop.attr.default ? prop.attr.default : ''}</dd>
<dd>{prop.description}</dd>
{/each}
</dl>