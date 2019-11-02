<script>
    import Counter from './../../../../exlibris/Counter.svelte';
    import Spoiler from './../../../../exlibris/spoiler.md';
    let items = ['one','two','three'];
</script>

# What is MDSv

MDSv is a Svelte component written in Markdown syntax. You can import and use any Svelte components right inside the markdown markup. 

For more info please visit the [svelte-preprocess-markdown](https://alexxnb.github.io/svelte-preprocess-markdown/) site.

Markdown is a fast and comfortable way to write documentation, MDSv providing full power of Svelte in that docs. 

This document also wrote in MDSv format, so we can do this right inside the document...

```markdown
<script>
    let items = ['one','two','three'];
</script>
...
{#each items as item}
* {item}
{/each}
```

... and get the result:

{#each items as item}
* {item}
{/each}

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