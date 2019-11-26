<script>
    import {current_page} from '@svelte-docs/get/routes';

    current_page.subscribe(() => {
        window.scrollTo(0,0);
    });
</script>

<article>
    <svelte:component this={$current_page.component} />
</article>


