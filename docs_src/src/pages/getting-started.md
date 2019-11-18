# Getting started

### Initialize Svelte-docs

Just run this command in the root directory of your project:

```bash
npm init svelte-docs
```

It will ask you about the destination directory for the documents' sources. Then it will download template and theme into the specified directory and install required NPM packages.

### Edit your docs

Switch to the created directory, ex.:

```bash
cd docs_srv
```

Run docs in development mode on the local server:

```bash
npm run dev
```

Point your browser on [http://localhost:5000](http://localhost:5000) to see your docs in action.

Now you can edit files in `src/docs` directory and page in a browser will be reloaded on each save. 

### Build the documentation site

As soon as documentation ready for release you need to run the build:

```bash
npm run build
```

All needed files will be builded into the `__DOCS__/build` directory(see [config.pathes](config/pathes)). You can upload it to any service which supports static file serving. For convenience, Svelte-Docs have built-in ability to publish site on Github Pages.
