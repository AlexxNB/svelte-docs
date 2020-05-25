import {writable} from 'svelte/store';

export const url = writable(getURL());

export function go(href){
    history.pushState({}, '', href === '' ? getBasepath() : href);
    url.set(href.split('#')[0]);
}

export function initNavigation() {
    addEventListener('click', click);
    addEventListener('popstate', gohistory);
    
    return function() {
        removeEventListener('click', click);
        removeEventListener('popstate', gohistory);
    }
}

function gohistory(){
    url.set(getURL());
}

function getURL() {
    let path = location.pathname;
    path = cleanURL(path);
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
    if(url.startsWith('/')) url = url.slice(1);
    if(url.endsWith('/')) url = url.slice(0,-1);
    return url;
}

function getBasepath(){
    let basepath = (document.querySelector('base') || {}).href.replace(window.location.origin,'').slice(0,-1);
    return basepath === '' ? '/' : basepath;
}
