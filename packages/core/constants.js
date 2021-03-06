import path from 'path';
import config from './config';
import {getThemePath} from './themes';

export const CWD = process.cwd();
export const CORE = path.resolve(path.join(CWD,'node_modules','@svelte-docs','core'));

export const DEVPATH = path.join(CWD,config.pathes.dev);
export const BUILDPATH = path.join(CWD,config.pathes.build);
export const INDEX = path.join(CORE,'main.js');

export const SRC = path.join(CWD,'src');
export const PAGES = path.join(SRC,'pages');
export const INCLUDES = path.join(SRC,'includes');
export const THEME = getThemePath();
export const STATIC = path.join(SRC,'static');
export const STARTPAGE = path.join(PAGES,'index.md');
export const ERRORPAGE = path.join(INCLUDES,'error.md');

export const PROPS_CMP = path.join(THEME,'components','Properties.svelte');
export const EX_LAYOUT = path.join(THEME,'components','Example.svelte');
export const EX_CSS = path.join(SRC,'examples.css');
export const EX_CMP = path.join(CORE,'builtins','Example','Example.svelte');
export const EX_IFRAME = path.join(CORE,'builtins','Example','iframe.js');
export const EX_INDEX = path.join(CORE,'examples.main.js');
