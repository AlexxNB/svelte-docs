# Examples view CSS

Examples view(where the result shows) use CSS styles which are isolated from theme of the site. They are situated in the `src/examples.css` file. 

## import styles

You can include CSS file from the local directory, npm package or from CDN:

```css
@import './../mystyles.css';
@import './node_modules/my-favorite-css-framework';
@import 'https://anycdn.com/my-favorite-css-framework';
```

> When you use `:global()` or `@import` keywords in one example, they will affect on the all examples, because all examples styles bundeled in the single CSS file.