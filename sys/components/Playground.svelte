<script>
  import ReplMini from "./ReplMini/ReplMini.svelte";
  import { onMount } from "svelte";
  let repl;

  export let panel = false;
  export let result = 100;
  export let editor = 70;


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
        <ReplMini bind:this={repl} 
            {panel}
            result_height={result}
            editor_height={editor}
        />
    </div>
</div>

<style>
    .container{
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