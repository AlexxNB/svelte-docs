const path = require('path');
const touch = require('touch');
const watch = require('node-watch');

const watch_path = [
    path.resolve('./src/docs'),
]

const touch_path = path.resolve('./sys/App.svelte');


watch(watch_path, { recursive: true }, function(evt, name) {
    touch(touch_path);
});
