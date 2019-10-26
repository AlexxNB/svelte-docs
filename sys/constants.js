import path from 'path';

export const BUILTIN_PKG = 'svelte-docs-builtins';
export const STORE_PKG = 'svelte-docs-store';
export const CMP_PROPS = path.resolve('./sys/components/Properties.svelte');
export const CMP_EXAMPLE = path.resolve('./sys/components/Example/Example.svelte');
export const EX_DIR = path.resolve('./sys/_examples');
export const EX_LIST = path.join(EX_DIR,`list.js`);
export const EX_CSS = path.resolve('./src/theme/examples.css');