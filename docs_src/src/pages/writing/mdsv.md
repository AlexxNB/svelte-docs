<script>
    import Counter from './../../../exlibris/Counter.svelte';
    import Spoiler from './../../../exlibris/spoiler.md';
     let items = ['item0','item1'];
    function add() { items = [...items,'item'+items.length] }
    function del() { items = items.slice(0,-1) }
</script>

# What is MDSv

MDSv is a Svelte component written in Markdown syntax. You can import and use any Svelte components right inside the markdown markup. 

For more info please visit the [svelte-preprocess-markdown](https://alexxnb.github.io/svelte-preprocess-markdown/) site.

Markdown is a fast and comfortable way to write documentation, but MDSv providing full power of Svelte to your docs. 

This document also wrote in MDSv format, so we can do this right inside the document...

```svelte
<script>
    let items = ['item0','item1'];
    function add() { items = [...items,'item'+items.length] }
    function del() { items = items.slice(0,-1) }
</script>
...
{#each item as item}
* {item}
{/each}

<button on:click={add}>Add Item</button>
<button on:click={del}>Del Item</button>
```

... and get the result:

{#each items as item}
* {item}
{/each}

<button on:click={add}>Add Item</button>
<button on:click={del}>Del Item</button>

Or we can import any Svelte component and use it where we want:

```markdown
<script>
    import Counter from './Counter.svelte';
</script>

*The counter:* <Counter /> 
```

... and it will work:

*The counter:* <Counter /> 

You even can import other `*.md` files:

```markdown
<!-- spoiler.md -->
> *MDSv is really cool!*


<!-- document.md -->
<script>
    import Spoiler from './spoiler.md';
</script>

**Spoiler:**
<Spoiler />
```

... and it will be included in the specified place:

**Spoiler:**
<Spoiler />