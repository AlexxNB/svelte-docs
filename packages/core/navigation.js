import {writable} from 'svelte/store';

export const url = writable(getURL());

export function go(href){
    history.pushState({}, '', href === '' ? getBasepath() : href);
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
    path = cleanURL(path);
    if(path.length !== '/') path = path.slice(1);
    return path;
}

function click (event) {

    const a = event.target.closest('a');
    if(!a) return;

    const href = a.getAttribute('href');
    
    if(!href) return;
    
    // Open external links in new tab
    if(/^\w+:\/\//.test(href)) {
        a.setAttribute('target','_blank');
        return;
    }
    
    event.preventDefault();

    if(/^\/$/.test(href)) {
        return go('')
    }
    
    return go(href);
}

function cleanURL(url){
    const basepath = getBasepath();
    if(url.startsWith(basepath)) url = url.slice(basepath.length);
    if(url.endsWith('/')) url = url.slice(0,-1);
    if(url === '') url = '/';
    return url;
}

function getBasepath(){
    return (document.querySelector('base') || {}).href.replace(window.location.origin,'').slice(0,-1);
}