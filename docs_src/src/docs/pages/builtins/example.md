# Example code block

When you document your Svelte component you want show it in action. You can do it with *Example code block*. 

```markdown
    ```example
    <script>
        let name='Button';
    </script>

    <button>{name}</button>

    <style>
        button{background: red}
    </style>
    ```
```

```example
<script>
    let name='Button';
</script>

<button>{name}</button>

<style>
    button{background: red}
</style>
```

### Hide script and/or style blocks

Sometimes no need to show what is inside the *style* or *script* blocks. You can use `script:hide` and `style:hide` modifiers.

```markdown
    ```example script:hide style:hide
    <script>
        let name='Button';
    </script>

    <button>{name}</button>

    <style>
        button{background: red}
    </style>
    ```
```

```example script:hide style:hide
<script>
    let name='Button';
</script>

<button>{name}</button>

<style>
    button{background: red}
</style>
```

### import in examples

You can import any installed NPM package or local file as you usually do inside ordinary `*.svelte` file.

```example
<script>
    import {Button} from 'svelte-chota';
</script>

<Button primary>Button</Button>
```

Also you can import any local file by relative path according documents directory root:

```example
<script>
    import Button from './../mylib/Button.svelte';
</script>

<Button>Button</Button>
```

Other way to import local files - using *virtual packages*(see more [config.incPKG](config/incpkg)).

```javascript
// svelte-docs.config.js
...
incPKG:{
    './Button.svelte': './../mylib/Button.svelte'
},
...
```


```example
<script>
    import Button from './Button.svelte';
</script>

<Button>Button</Button>
```