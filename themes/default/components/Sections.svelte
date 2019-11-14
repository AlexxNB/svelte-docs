<script>    
    import {current_page} from '@svelte-docs/get/routes';
    import sections from '@svelte-docs/get/sections';
    import Section from './Section.svelte';
</script>

<ul>
{#each sections as section}
    <li>
        <Section {section} active={section.url === $current_page.url}/>
        {#if section.sub.length > 0}
            <ul>
            {#each section.sub as subsection}
                <li><Section section={subsection} active={subsection.url === $current_page.url} /></li>
            {/each}
            </ul>
        {/if}
    </li>
{/each}
</ul>