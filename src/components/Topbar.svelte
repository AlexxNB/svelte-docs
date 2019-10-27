<script>
    import {url} from './../../sys/navigation'
    import {logo,links} from 'topbar.js';
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