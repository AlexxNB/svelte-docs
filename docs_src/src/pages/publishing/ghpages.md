# Publishing on Github Pages

Svelte-docs has built-in publishing tool to deploy builded documentation into *gh-pages* branch of your current project. 

To do it just run command in you documents source directory at any time:

```bash
npm run deploy
```

Then you should confirm publishing and wait some time while documents will be deployed to the GitHub.

> Your document sources directory or any parent directory should contents `.git` folder with initialized Github repository.

> You must set the [config.basepath](config/basepath) too the value equal `/you-repository-name/`;