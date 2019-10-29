#!/usr/bin/env node

const path = require('path');
const meow = require('meow');
const sirv = require('sirv');
const { createServer } = require('http');
const clear = require('console-clear');
const chalk = require('chalk');
const importCWD = require('import-cwd');

const config = importCWD('./svelte-docs.config.js');

const cli = meow(`
    Usage
      $ node sirv.js [options]
 
    Options
      --dev, -d  Development mode
      --single, -s  SPA Mode
 
    Examples
      $ node sirv.js --dev --basepath subdir
`, {
    flags: {
        dev: {
            type: 'boolean',
            alias: 'd'
        },
        single: {
            type: 'boolean',
            alias: 's'
        }
    }
});

const CWD = process.cwd();

const DEV = cli.flags.dev;
const SINGLE = cli.flags.single;

const DIR = DEV ? path.join(CWD,config.pathes.dev) : path.join(CWD,config.pathes.build);

let port = process.env.PORT || 5000;
let hostname = process.env.HOST || '0.0.0.0';

const mw = sirv(DIR, {
    dev: DEV,
    maxAge: 31536000, // 1Y
    immutable: true,
    onNoMatch: SINGLE ? (req, res) => (req.path='/',mw(req, res, () => (res.statusCode=404,res.end()))) : undefined
});

createServer(mw).listen(port, hostname, err => {
    if (err) throw err;

    const srv = DEV ? chalk.yellow('DEVELOPMENT server started...') : chalk.green('Server started...');

    clear(true);
    console.log(`
    ${chalk.bold('Svelte-Docs:')} ${srv}
    Please open: ${chalk.blue('http://'+(hostname === '0.0.0.0' ? 'localhost' : hostname)+':'+port+config.basepath)}
    `);
});