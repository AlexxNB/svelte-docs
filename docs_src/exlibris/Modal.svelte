<script>
    import {fade} from 'svelte/transition';
    export let open = false;
</script>

{#if open}
<div class="container" transition:fade={{ duration: 200 }}>
    <div class="background" on:click={e => open=false}/>
    <div class="modal"><slot></slot></div>
</div>
{/if}

<style>
.container{
    position:fixed;
    top:0px;
    left:0px;
    width:100vw;
    height:100vh;
    z-index:10000;
}
.background{
    position:fixed;
    top:0px;
    left: 0px;
    width:100vw;
    height:100vh;
    background-color:black;
    opacity: 0.5;
}
.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width:300px;
    background-color: white;
    padding: 10px;
}
</style>