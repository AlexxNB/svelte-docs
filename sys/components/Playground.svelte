<script>
  import Repl from "./Repl/Repl.svelte";
  import { onMount } from "svelte";
  let repl;

  export let panel = true;
  export let components = [
    {
        type: "svelte",
        name: "App",
        source: '<h1>Hello World!</h1>'
    }
];

components = components.map(cmp => {
  cmp.source = cmp.source.trim();
  return cmp;
})

  onMount(() => {
    repl.set({
      components
    });
  });
</script>

<div class="container">
    <div class="repl">
        <Repl bind:this={repl} 
            {panel}
            embedded
        />
    </div>
</div>

<style>
    .container{
        max-width: 70rem;
        margin: 0 auto;
        padding: 1rem 1rem;
    } 

    .repl{
        width:100%;
        border:1px solid var(--playground-border);
        border-radius: 5px;
        overflow: hidden;
    }
</style>