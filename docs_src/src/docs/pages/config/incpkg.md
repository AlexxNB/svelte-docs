# incPKG option

If you want use your local components in Examples code block you should link it with vitrual package name in `incPKG` option.

Suppose you have following structure of your project:

```javascript
my-project
├── docs_src
│   └── ...
├── mycomponent
│   └── Counter.svelte
└── ...
```

And want to import `mycomponents/Counter.svelte` in your Example code block, you may use relative path(from the docs root) like this:

```markdown
    ```example
    <script>
        import Counter from './../mycomponent/Counter.svelte';
    </script>
    <Counter />
    ```
```

But it is not looks good, especially when you will publish your components on NPM and want to teach users how to use it . 

So you can add *virtual package* using `incPKG` option:

```javascript
incPKG:{
    ...
    "my-counter-package": "./../mycomponent/Counter.svelte",
    ...
}
```

And then you can import this *virtual package* inside of the Example:

```markdown
    ```example
    <script>
        import Counter from 'my-counter-package';
    </script>
    <Counter />
    ```
```

