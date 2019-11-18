# incCSS option

If you want to use global CSS styles for result in the Example code block. You can easy include them with this option.

Suppose you have following structure of your project:

```javascript
my-project
├── docs_src
│   └── ...
├── mycomponent
│   ├── counter.css
│   └── Counter.svelte
└── ...
```

Add *global css* using `incCSS` option:

```javascript
incCSS: [
    ...
    './../mycomponent/counter.css',
    ...
]
```

Same way you can import any CSS from NPM packages(don't forget to install it before):

```javascript
incCSS: [
    ...
    'node_modules/thebestcssframework/styles.min.css',
    ...
]
```