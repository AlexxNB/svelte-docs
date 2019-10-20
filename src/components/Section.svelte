<script>    
    export let section = {};
</script>


{#if section.url}
    {#if section.external}
        <a href={section.url} target="_blank">{section.title}</a>
    {:else}
        <a href={section.url}>{section.title}</a>
    {/if}
{:else}
    <span>{section.title}</span>
{/if}