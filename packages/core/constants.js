import path from 'path';

export const CWD = process.cwd();
export const CORE = path.resolve(path.join(CWD,'node_modules','@svelte-docs','core'));

export const DEVPATH = path.join(CWD,'__DOCS__','dev');
export const BUILDPATH = path.join(CWD,'__DOCS__','dist');
export const INDEX = path.join(CORE,'main.js');

export const DOCROOT = path.join(CWD,'src/docs');
export const PAGES = path.join(DOCROOT,'pages');
export const SECTIONS = path.join(DOCROOT,'sections.md');
export const TOPBAR = path.join(DOCROOT,'topbar.md');
export const STARTPAGE = path.join(DOCROOT,'start.md');

export const PROPS_CMP = path.join(CWD,'src','theme','components','Properties.svelte');
export const ERROR_CMP = path.join(CWD,'src','theme','components','Error.svelte');
export const EX_LAYOUT = path.join(CWD,'src','theme','components','Example.svelte');
export const EX_CSS = path.join(CWD,'src','theme','examples.css');

export const EX_CMP = path.join(CORE,'builtins','Example','Example.svelte');

export const EX_IFRAME = path.join(CORE,'builtins','Example','iframe.js');
export const EX_INDEX = path.join(CORE,'examples.main.js');