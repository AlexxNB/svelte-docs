import {writable} from 'svelte/store';

export const url = writable(getURL());

export function go(href){
    history.pushState({}, '', href);
    url.set(href);
}

export function initNavigation() {
    addEventListener('click', click);
    return function() {
        removeEventListener('click', click);
    }
}

function getURL() {
    let path = location.pathname;
    if(path.length !== '/') path = path.slice(1);
    return path;
}

function click (event) {

    const a = event.target.closest('a');
    if(!a) return;

    const href = a.getAttribute('href');
    if(!href) return;

    // Open external links in new tab
    if(!!href.match(/^\w+:\/\//)) {
        a.setAttribute('target','_blank');
        return;
    }

    event.preventDefault();

    return go(href);
}