# Preprocess option

You can use any Svelte preprocessor for your Examples code block. Just install it from NPM, import in the `svelte-docs.config.file` and add to the  `preprocess` option same way you do in `rollup.config.js`.


```javascript
const markdown = require('svelte-preprocess-markdown');

module.exports={
    ...
    preprocess: [
        ...
        markdown({filetype: 'svelte'}),
        ...
    ]
    ...
}
```

Then all your examples will be preprocessed:

```markdown
    ```example
    <script>
    let name = 'World';
    </script>

    # Hello, {name}!
    ```
```