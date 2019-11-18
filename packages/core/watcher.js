const path = require('path');
const touch = require('touch');
const watch = require('node-watch');

const watch_path = [
    path.resolve('./src'),
]

const touch_path = path.resolve('./node_modules/@svelte-docs/core/App.svelte');


watch(watch_path, { recursive: true }, function(evt, name) {
    touch(touch_path);
});
