# Pages configuration

You can configure every pages with few parameters in markdown's metatags block at the top of needed pages.

```markdown
---
parameter1: value1
parameter2: value2
---
... 
```

### title

You can specify title of current page. It is overwrite [`title.header`](config/title) config option. 

```markdown
---
title: 'My page'
---
... 
```


### layout

Every theme have various layouts which can be with this property. If no layout specified will be used `default` layout. You can find list of available layouts in the themes descriptions.

In this example, page will render in fullscreen layout without sidebar on the left side(assume default theme):

```markdown
---
layout: 'no_sidebar'
---
... 
```