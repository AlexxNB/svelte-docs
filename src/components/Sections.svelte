<script>    
    import sections from 'pages_sections.js';
    import Section from './Section.svelte';
</script>

<ul>
{#each sections as section}
    <li>
        <Section {section}/>
        {#if section.sub.length > 0}
            <ul>
            {#each section.sub as subsection}
                <li><Section section={subsection}/></li>
            {/each}
            </ul>
        {/if}
    </li>
{/each}
</ul>