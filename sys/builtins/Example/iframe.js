import { addListener } from 'resize-detector';

let iframe_id = 0;

function getHeight(){
    return document.documentElement.offsetHeight
}

window.addEventListener('message', function (event) {
    if (event.data.hasOwnProperty("COMPONENT")) {
        const Example = app[event.data.COMPONENT];
        iframe_id = event.data.iframe_id;
 

        addListener(document.body, (e)=>{
            event.source.postMessage({ 'HEIGHT': getHeight(), iframe_id }, "*");
        });

        new Example({
            target: document.body,
            props: {}
        });    
    }
});