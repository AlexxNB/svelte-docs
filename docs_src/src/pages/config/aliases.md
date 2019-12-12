# aliases option

Option `aliases` is the list of aliases for you local component's paths.

Suppose you have following structure of your project:

```javascript
my-project
├── docs_src
│   └── ...
├── mycomponent
│   └── Counter.svelte
└── ...
```

And you want to import `mycomponents/Counter.svelte` in your Example code block(or just in the page), you may use relative path(from the docs root) like this:

```markdown
    ```example
    <script>
        import Counter from './../mycomponent/Counter.svelte';
    </script>
    <Counter />
    ```
```

But it is not looks good, especially when you will publish your components on NPM and want to teach users how to use it . 

So you can add *virtual package* using `aliases` option:

```javascript
aliases:{
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