<script>    
    import {url} from 'svelte-docs-core/navigation'
    import sections from 'sections.js';
    import Section from './Section.svelte';
</script>

<ul>
{#each sections as section}
    <li>
        <Section {section} active={section.url === $url}/>
        {#if section.sub.length > 0}
            <ul>
            {#each section.sub as subsection}
                <li><Section section={subsection} active={subsection.url === $url} /></li>
            {/each}
            </ul>
        {/if}
    </li>
{/each}
</ul>