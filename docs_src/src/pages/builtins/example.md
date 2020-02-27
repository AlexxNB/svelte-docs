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

### Set fixed height of the example

By default result part of the example has flexible height, which changing within content. But you can lock height with `height:<pixels>` modifier.

```markdown
    ```example height:200
     ...
    ```
```

```example height:200
<script>
    import Modal from './Modal.svelte';
    let open = false;
</script>

<button on:click={()=>open=!open}>Show Modal</button>

<Modal {open}>
    <h1>Hello!</h1>
    <p>I'm modal.</p>
</Modal>
```

### Import in examples

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

Other way to import local files - using aliases (see [config.aliases](config/aliases)).

```javascript
// svelte-docs.config.js
...
aliases:{
    './Button.svelte': './../mylib/Button.svelte',
    'my-button-package': './../mylib/Button.svelte'
},
...
```


```example
<script>
    import Button from './Button.svelte';
    import Button2 from 'my-button-package';
</script>

<Button>Button</Button>
<Button2 error>Button2</Button2>
```

### Styling

Styles of the documentation site doesn't affect on the Example's result. Examples have their own global styles(which will be used by all examples). You can read more in the [Theming examples](theming/examples) section.It is stored in `src/theme/examples.css` file. 