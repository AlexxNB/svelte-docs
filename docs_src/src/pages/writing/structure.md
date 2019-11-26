# Structure

Let's see the structure of the doc's project directory:

```bash
src
├── includes
├── pages
├── static
├── examples.css   
└── theme.css   
...
svelte-docs.config.js
```

It is very simple, sources of you documentation are live in `src` directory:

* **includes** - there are small pieces of the MDSv code that can be reusable within any document page
* **pages** - all pages of your documentation are stored in this directory
* **static** - place here any static assets using in your documentation (files, images, icons and etc.)
* **examples.css** - it is styles using within examples
* **theme.css** - tune current documentation theme with variables, add new styles or `@import` any css file.