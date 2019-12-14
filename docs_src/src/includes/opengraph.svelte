<script>
    import {current_page} from '@svelte-docs/get/routes';
    import maintitle from '@svelte-docs/get/maintitle';
    $: title = $current_page.title ? $current_page.title + ' — ' + maintitle : maintitle;
</script>


<svelte:head>
    <meta property="og:title" content={title}>
    <meta property="og:description" content="A rapid way to document your Svelte things">
    <meta property="og:image" content="https://alexxnb.github.io/svelte-docs/static/social.png">
    <meta property="og:url" content="https://alexxnb.github.io/svelte-docs/{$current_page.url}">
    <meta name="twitter:card" content="summary_large_image">
</svelte:head>