<script>    
    export let section = {};
    export let active = false;
</script>


{#if section.url}
    <a href={section.url} class:active>{section.title}</a>
{:else}
    <span>{section.title}</span>
{/if}