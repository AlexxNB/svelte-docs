# Welcome

```example lang:markdown
# Hello !

**hello**
```

```example
<script>
    // test
    import Button from './Button.svelte';
    import { slide } from 'svelte/transition';
    let name = 'NewWorld';
    let show = false;
</script>
<button on:click={e => show = !show}>downdrop</button>
{#if show}
    <div transition:slide>
        <h1>Buy {name}!</h1>
        <h1>Buy {name}!</h1>
        <h1>Buy {name}!</h1>
        <h1>Buy {name}!</h1>
        <h1>Buy {name}!</h1>
    </div>
{/if}
```

