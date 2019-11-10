# Theming

Svelte-docs supports the customizable appearance. All you need for applying changes to almost every visual aspect of your documentation is located in `src/theme` dir.

### Themes

At the moment we have only one default theme which is made as a copy of the official [Svelte documentation](https://svelte.dev/docs) theme. But feel free to [add](https://github.com/alexxnb/svelte-docs/pulls) your fantastic theme to this repository. 

### Colors

To tune the colors of the current theme just edit custom properties in the `src/theme/styles.css` file.

### Styles

All styles of the site are in the `src/theme/styles` directory. Any of this `*.css` files should be imported in the `src/theme/styles.css` file.

### Layout

You can find Svelte components in the `src/theme/components` directory. It is the barebone of the documentation site. Change it only if you know what you do.