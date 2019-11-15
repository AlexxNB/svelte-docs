<script>
    import {current_page} from '@svelte-docs/get/routes';
</script>

<article>
    <svelte:component this={$current_page.component} />
</article>


