<script>
    import {url} from '@svelte-docs/core/navigation'
    import {logo,links} from '@svelte-docs/get/topbar';
</script>

<section>
    <a href="{logo.url}" class="logo">{@html logo.html}</a>
</section>
<section>
    <ul>
    {#each links as link}
        <li><a href="{link.url}" class:active={link.url === $url}>{link.title}</a></li>
    {/each}
    </ul>
</section>