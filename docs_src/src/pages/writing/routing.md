# Routing

*Svelte-Docs* has built-in routing system based on files structure in the `src/pages` directory:

```bash
src                     #  URL path part:
└── pages               #
    ├── components      #
    │   ├── list.md     #  components/list
    │   ├── button.md   #  components/button
    │   └── input.md    #  components/input
    ├── install.md      #  install
    └── index.md         #  / 

```

You can make links anywhere in your docs with URL part based on file hierarchy. For example, if you want to link to the `src/pages/components/button.md` you should use this href attribute for the `a` element - `components/button`. Or in markdown - `[Button](component/button)`.