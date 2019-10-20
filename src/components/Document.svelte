<script>
    import {url} from './../../sys/navigation'
    import routes from 'pages_routes.js';
    import Error from './Error.svelte';
    
    function getPageCmp(path) {

        if(path !== '/') path = `/${path}`;

        if(routes.hasOwnProperty(path)){
            return routes[path]
        }else{
            return Error
        }
    }

    $: cmp = getPageCmp($url)

</script>

<svelte:component this={cmp}/>

