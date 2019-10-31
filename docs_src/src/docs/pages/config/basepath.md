# Basepath option

Option `basepath` is a part of URL to the root documentation site. 

By default `basepath` is equal `'/'`, it is mean that documentation will be available by URL like https://mydocs.com or https://docs.mysite.com. 

When you need to place documentation in the subdirectory of your existing site, you should change `basepath` to the value like `/subdir/`. In this case your documentation will be available by URL like https://mysite.com/subdir.

> If you plan to publish documentation in at the Github Pages inside you repository, then set `basepath` option equal the name of your repository.