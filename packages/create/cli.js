#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const meow = require('meow')
const prompts = require('prompts/dist')
const chalk = require('chalk')
const fetchRepoDir = require('fetch-repo-dir');
const exec = require('shelljs.exec');

const logo = chalk.bold('[Svelte-Docs]')
const log = (...args) => {
  console.log(logo, ...args)
}
log.error = (...args) => {
  console.log(chalk.red('[ERROR]'), ...args)
}

function npminstall (dir) {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', [ '--prefix', dir, 'install' ], {
      stdio: 'inherit'
    })
    child.on('close', code => {
      if (code !== 0) {
        reject()
        return
      }
      resolve()
    })
  })
}

const themes = [
  { name: 'Default', path: 'default' },
]

const cli = meow(`
  Usage

    $ npm init svelte-docs

    $ npx create-svelte-docs

  Options

    --name  Directory name for docs

    -y      Create docs without confirmation step

`, {
  booleanDefault: undefined,
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    },
    name: {
      type: 'string'
    },
    confirm: {
      type: 'boolean',
      alias: 'y'
    }
  }
})

const form = [
  /*
  {
    type: 'select',
    name: 'template',
    message: 'Choose a base template',
    choices: templates.map(({ name }, i) => ({ title: name, value: i }))
  },
  */
  {
    type: 'text',
    name: 'name',
    message: 'Choose a name for the docs sources folder',
    initial: 'docs_src'
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: (prev, values) => `Create docs sources in ${values.name}?`,
    initial: true
  }
]

const run = async opts => {
  prompts.inject(opts)
  const response = await prompts(form)

  if (!response.confirm) {
    log('aborted')
    process.exit(0)
  }
  const { name } = response
  const theme = themes[response.theme] || themes[0]

  log('Creating docs ...')

  if (!name) {
    log.error('name is required')
    process.exit(1)
  }

  if (!theme) {
    log.error('theme not found')
    process.exit(1)
  }

  try{
    log('Downloading docs template...');
    await fetchRepoDir([
      {src: 'alexxnb/svelte-docs/template', dir:name},
      {src: 'alexxnb/svelte-docs/themes/'+theme.path, dir:path.join(name,'src','theme')}
    ]);
    log('Installing NPM packages...');
    exec(`npm --prefix ${name} install`);
    log('Docs created succesfully!')
    log(chalk.green(`Go to the ${name} and run 'npm run dev' command`));
    process.exit(0)
  }catch(err){
    log.error('Failed to create docs')
      log.error(err)
      process.exit(1)
  }
}

run(cli.flags);

