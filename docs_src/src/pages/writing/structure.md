# Structure

Let's see the structure of the doc's project directory:

```bash
src
├── includes
├── pages
├── static
└── theme   
...
svelte-docs.config.js
```

It is very simple, sources of you documentation are live in `src` directory:

* **includes** - there are small pieces of the MDSv code that can be reusable within any document page
* **pages** - all pages of your documentation are stored in this directory
* **static** - place here any static assets using in your documentation (files, images, icons and etc.)
* **theme** - it is CSS and svelte files of the current theme which might be changed for appearance tunning