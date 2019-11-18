import {current_page} from '@svelte-docs/get/routes';


{#if $current_page.url !== ''}
# [![LOGO](static/logo.svg)](/) #
{/if}

<style>
    img{
        height: 30px;
        vertical-align: middle;
    }   
</style>