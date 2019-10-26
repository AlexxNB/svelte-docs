import path from 'path';


export const DOCROOT = path.resolve('./src/docs');
export const PAGES = path.join(DOCROOT,'pages');
export const SECTIONS = path.join(DOCROOT,'sections.md');
export const STARTPAGE = path.join(DOCROOT,'start.md');

export const PROPS_CMP = path.resolve('./src/components/Properties.svelte');

export const EX_LAYOUT = path.resolve('./src/components/Example.svelte');
export const EX_CMP = path.resolve('./sys/builtins/Example/Example.svelte');
export const EX_CSS = path.resolve('./src/theme/examples.css');
export const EX_IFRAME = path.resolve('./sys/builtins/Example/iframe.js');
export const EX_INDEX = path.resolve('./sys/examples.main.js');