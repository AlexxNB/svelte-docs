<script>
  import * as yootils from "yootils";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let fixed = false;
  export let result_height = 100;
  export let code_height = 70;
  export let panel = false;

  if(panel) code_height = code_height+50;

  const refs = {};

  let dragging = false;


  function setResultHeight(event) {
    const { top } = refs.container.getBoundingClientRect();

    const px = yootils.clamp(
      event.clientY,
      top + 50,
      top + 800
    );
    result_height = px-top;

    dispatch("change");
  }

  function setCodeHeight(event) {
    const { top } = refs.container.getBoundingClientRect();

    const px = yootils.clamp(
      event.clientY,
      top + result_height + 50,
      top + result_height + 800
    );
    
    code_height = px - top - result_height;

    dispatch("change");
  }

  function drag(node, callback) {
    const mousedown = event => {
      if (event.which !== 1) return;

      event.preventDefault();

      dragging = true;

      const onmouseup = () => {
        dragging = false;

        window.removeEventListener("mousemove", callback, false);
        window.removeEventListener("mouseup", onmouseup, false);
      };

      window.addEventListener("mousemove", callback, false);
      window.addEventListener("mouseup", onmouseup, false);
    };

    node.addEventListener("mousedown", mousedown, false);

    return {
      destroy() {
        node.removeEventListener("mousedown", onmousedown, false);
      }
    };
  }
</script>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom:12px;
    
  }

  .pane {
    position: relative;
    float: left;
    width: 100%;
    height: 100%;
  }

  .mousecatcher {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.01);
  }

  .divider {
    position: absolute;
    z-index: 10;
    display: none;
    padding: 12px 0;
    width: 100%;
    height: 0;
    cursor: ns-resize;
  }

  .divider::after {
    content: "";
    position: absolute;
    background-color: #eee;
    background-color: var(--second);
    top: 8px;
    left: 0;
    width: 100%;
    height: 1px;
  }

  .divider {
    display: block;
  }

</style>



<div class="container" bind:this={refs.container}>
  <div class="pane" style="height: {result_height}px;">
    <slot name="b" />
  </div>

  <div class="pane" style="height: {code_height}px;">
    <slot name="a" />
  </div>

 {#if !fixed}
    <div
      class="divider"
      style="top: {result_height-12}px"
      use:drag={setResultHeight} />

      <div
      class="divider"
      style="top: {result_height+code_height-20}px;"
      use:drag={setCodeHeight} />
  {/if}

</div>

 

{#if dragging}
  <div class="mousecatcher" />
{/if}
