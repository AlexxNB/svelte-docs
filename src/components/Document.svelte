<script>
    import {url} from './../../sys/navigation'
    import routes from 'routes.js';
    import Error from './Error.svelte';
    
    function getPageCmp(path) {

        if(path !== '/') path = `/${path}`;

        if(routes.hasOwnProperty(path)){
            return routes.path
        }else{
            return Error
        }
    }

    $: cmp = getPageCmp($url)

</script>

<article>
    <svelte:component this={cmp}/>
</article>


