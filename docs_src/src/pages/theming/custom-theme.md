# Custom theme

You can make your own theme and use its directory path as [config.theme](config/theme) value. There are several files which must exist:

```bash
themedir
├── components
|   ├── Layout.svelte        # Page layout
|   ├── Error.svelte         # Error page layout
|   ├── Example.svelte       # Example component
|   └── Properties.svelte    # Properties component
├── meta.json                # Some info about the theme
└── style.css                # CSS Styles
```

The simplest way is to copy one of the defaut themes and change it as you want. You can find them in the `./node_modules/@svelte-docs/themes` directory or downaload from the [Github](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/AlexxNB/svelte-docs/tree/master/packages/themes)