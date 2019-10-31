# Structure
In common cases you should edit `*.md` files in the `src/docs` directory. There are several files and directories:

* **pages** - all pages of your documentation are stored in this directory, except start page
* **static** - place here any static assets using in your documentation. Files, images, icons and etc.
* **topbar.md** - file to customize logo and links on the topbar of the site
* **sections.md** - representation of the documentation contents links
* **start.md** - root page of the documentation

## Routing

*Svelte-Docs* has built-in routing system based on files structure in the `src/docs/pages` directory:

```bash
src                         #  URL path part:
└── docs                    #    ex: http://mydocs.com/page1,
    ├── pages               #        http://mydocs.com/sub/page2
    │   ├── components      #
    │   │   ├── list.md     #  components/list
    │   │   ├── button.md   #  components/button
    │   │   └── input.md    #  components/input
    │   ├── install.md      #  instal
    └── start.md            #  / 

```

## sections.md

This file contains list of content on the right sidebar. This is your documentation's structure reflected in markdown code. 

Let's look on example:

```markdown
* Getting Started
‎‎‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎- [Install](install)
* [Components](components/list)
‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ - [Button](components/button)
‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ - [Input](components/input)
* [Github](https://github.com/me/my-svelte-lib)
```

As you can see it is just an 1 or 2-level list of links or strings. You can freely arrange items as you want, no necessary to reproduce a file structure of the `src/docs/pages` directory. 

URL of local pages is an a path to corresponding `*.md` file. In the example above `components/button` will link to the page described in `src/docs/pages/components/button.md` file. Please see *Routing* section on this page for more info about URL.

External URLs will be opened in new window.

## topbar.md

There you can change logo's text and add links on topbar of the documentation site.

Common example of its structure:

```markdown
# My*Lib* #
‎‎‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ 
* [Home](/)
* [Github](https://github.com/me/my-svelte-lib)
```

Logo's text is situated between `#` marks (like a *h1* paragraph in markdown). The text of logo will have primary color of current theme, but the text between `*` marks will be of secondary color. 

Second part of the `topbar.md` is a single-level list of links. There are same rules than in `sections.md` above.

## start.md

This is just a root page of your documentation, which will be available at https://mydocs.com/, or when you user will click on the link to `/`. 

> Don't delete `start.md` file, it will break the documentation.