# Includes

In the `src/includes` directory live little MDSv components which you can include in any page you want. There are some default files used by theme:

### sidebar.md

This file contains list of content on the left sidebar. This is your documentation's structure reflected in markdown code. 

Let's look on example:

```markdown
* Getting Started
‎‎‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎- [Install](install)
* [Components](components/list)
‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ - [Button](components/button)
‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ - [Input](components/input)
* [Github](https://github.com/me/my-svelte-lib)
```

Usually it is just a list of links or strings. You can freely arrange items as you want, no necessary to reproduce a file structure of the `src/pages` directory. 

URL of local pages is an a path to corresponding `*.md` file. In the example above `components/button` will link to the page described in `src/pages/components/button.md` file. Please see [Routing](writing/routing) section for more info about URL.

External URLs will be opened in new window.

### logo.md

Commonly used for showing any logotype.  Just write something like:

```markdown
# MyComponent #
```

Or you can use an image as your logotype:

```markdown
# ![Logo](static/logo.png) #
```

### topbar.md

Play with right section of the topbar. For example add some links there:

```markdown
* [Home](/)
* [Github](https://github.com/me/my-svelte-lib)
```

### error.md

Just an error message which will be shown when user requests unexistent URL.

## Custom includes

You are free to create any `*.md` files which you can to include on any page you want using special import path:

```html
<script>
    import Banner from '@INCLUDES/banner.md';
</script>

<Banner />
```