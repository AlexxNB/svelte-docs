# Theme tuning

Each theme allows to tune some predefined CSS variables which are listed in themes descriptions.

Add values you want to change into the `src/theme.css` as shown below:

```css
:root{
    --primary: #009225;
    --secondary: #3f3f70;
}
```

Also you may write your own CSS styles there, they will overwrite default styles for same selectors:

```css
h1{
    color: red;
    text-transform: uppercase;
}
```