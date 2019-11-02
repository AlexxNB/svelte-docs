<script>
    import {url} from '@svelte-docs/core/navigation'
    import routes from '@svelte-docs/get/routes';
    import Error from './Error.svelte';
    
    function getPageCmp(path) {

        if(path !== '/') path = `/${path}`;
        
        window.scrollTo(0,0);

        if(routes.hasOwnProperty(path)){
            return routes[path]
        }else{
            return Error
        }

    }

    $: cmp = getPageCmp($url)

</script>

<article>
    <svelte:component this={cmp} />
</article>


