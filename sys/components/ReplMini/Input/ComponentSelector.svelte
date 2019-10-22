<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let handle_select;

  const { components, selected, request_focus, rebundle } = getContext("REPL");

  let editing = null;

  function selectComponent(component) {
    if ($selected !== component) {
      editing = null;
      handle_select(component);
    }
  }

  function editTab(component) {
    if ($selected === component) {
      editing = $selected;
    }
  }

  function closeEdit() {
    const match = /(.+)\.(svelte|js|md)$/.exec($selected.name);
    $selected.name = match ? match[1] : $selected.name;
    if (match && match[2]) $selected.type = match[2];
    editing = null;

    // re-select, in case the type changed
    handle_select($selected);

    components = components; // TODO necessary?

    // focus the editor, but wait a beat (so key events aren't misdirected)
    setTimeout(request_focus);

    rebundle();
  }

  function remove(component) {
    let result = confirm(
      `Are you sure you want to delete ${component.name}.${component.type}?`
    );

    if (result) {
      const index = $components.indexOf(component);

      if (~index) {
        components.set(
          $components.slice(0, index).concat($components.slice(index + 1))
        );
      } else {
        console.error(`Could not find component! That's... odd`);
      }

      handle_select($components[index] || $components[$components.length - 1]);
    }
  }

  function selectInput(event) {
    setTimeout(() => {
      event.target.select();
    });
  }

  let uid = 1;

  function addNew() {
    const component = {
      name: uid++ ? `Component${uid}` : "Component1",
      type: "svelte",
      source: ""
    };
    
    editing = component;
    components.update(components => components.concat(component));
    handle_select(component);
  }
</script>

<style>
  .component-selector {
    position: relative;
    overflow: hidden;
    background-color: var(--playground-panel);
  }

 
  .file-tabs {
    border: none;
    margin: 0;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .file-tabs .button,
  .file-tabs button {
    position: relative;
    display: inline-block;
    font: 400 12px/1.5 var(--font);
    background:var(--playground-panel);
    border: none;
    border-bottom: 3px solid transparent;
    padding: 12px 24px 9px 8px;
    margin: 0;
    color: #999;
    border-radius: 0;
    border-right: 1px solid var(--playground-code);
    cursor: pointer;
  }

  .file-tabs button:last-child{
    border-right: none;
  }

  .file-tabs .button:first-child {
    padding-left: 12px;
  }

  .file-tabs .button.active {
    color: var(--text);
    background-color: var(--playground-code);
  }

  .editable,
  .uneditable,
  .input-sizer,
  input {
    display: inline-block;
    position: relative;
  }

  .input-sizer {
    color:var(--text);
  }

  .input-sizer::selection {
    background: var(--text);
  }

  input {
    position: absolute;
    width: 100%;
    left: 4px;
    top: 7px;
    font: 400 12px/1.5 var(--font);
    border: none;
    color: var(--text);
    outline: none;
    background-color: transparent;
  }

  .remove {
    position: absolute;
    display: none;
    right: 1px;
    top: 3px;
    width: 24px;
    text-align: right;
    padding: 10px 3px 12px 0px;
    font-size: 8px;
    cursor: pointer;
    color: var(--playground-border);
  }

  .remove:hover {
    color: var(--dark);
  }

  .file-tabs .button.active .editable {
    cursor: text;
  }

  .file-tabs .button.active .remove {
    display: block;
  }

  .add-new {
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px 10px 8px 3px !important;
   
    text-align: center;
  }

  .add-new:hover {
    color: var(--flash) !important;
  }

  svg {
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    -o-object-fit: contain;
    object-fit: contain;
    -webkit-transform-origin: center center;
    transform-origin: center center;

    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: currentColor;
  }
</style>

<div class="component-selector">
  {#if $components.length}
    <div class="file-tabs" on:dblclick={addNew}>
      {#each $components as component}
        <div
          id={component.name}
          class="button"
          role="button"
          class:active={component === $selected}
          on:click={() => selectComponent(component)}
          on:dblclick={e => e.stopPropagation()}>
          {#if component.name == 'App'}
            <div class="uneditable">App.svelte</div>
          {:else if component === editing}
            <span class="input-sizer">
               {editing.name + (/\./.test(editing.name) ? '' : `.${editing.type}`)}

            </span>
            
            <!-- svelte-ignore a11y-autofocus -->
            <input
              autofocus
              spellcheck={false}
              bind:value={editing.name}
              on:focus={selectInput}
              on:blur={closeEdit}
              on:keydown={e => e.which === 13 && e.target.blur()} />
          {:else}
            <div
              class="editable"
              title="edit component name"
              on:click={() => editTab(component)}>
               {component.name}.{component.type}
            </div>

            <span class="remove" on:click={() => remove(component)}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          {/if}
        </div>
      {/each}

      
      <button class="add-new" on:click={addNew} title="add new component">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <line  x1="12" y1="5" x2="12" y2="19" />
          <line  x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

    </div>
  {/if}
</div>

