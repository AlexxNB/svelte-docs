<script>
    import {current_page} from '@svelte-docs/get/routes';
    import maintitle from '@svelte-docs/get/maintitle';
    
    let descr = 'A rapid way to document your Svelte things';
    let img = 'https://alexxnb.github.io/svelte-docs/static/social.png';

    $: title = $current_page.title ? $current_page.title + ' — ' + maintitle : maintitle;
    $: url = `https://alexxnb.github.io/svelte-docs/${$current_page.url}`;
</script>


<svelte:head>
    <meta property="og:title" content={title}>
    <meta property="og:description" content={descr}>
    <meta property="og:image" content={img}>
    <meta property="og:url" content={url}>
    <meta name="twitter:title" content={title}>
    <meta name="twitter:description" content={descr}>
    <meta name="twitter:image" content={img}>
    <meta name="twitter:card" content="summary_large_image">
</svelte:head>