<script context="module">
    let uid = 1;
</script>

<script>    
    import ExampleLayout from 'ExampleLayout.js';

    export let name;
    export let code;

    let iframe;
    let iframe_id = uid++;
    let iframe_height = 70;

    const srcdoc = `<!doctype html>
<html style="height: auto !important">
    <head>
        <meta charset='utf-8'>
        <base href="/" />
        <link rel='stylesheet' href='examples.css'>
        <scr`+`ipt defer src='examples.js'></scr`+`ipt>
    </head>
    <body style="height: auto !important"></body>
</html>`;

    const sendMessage = function(){
        iframe.contentWindow.postMessage({"COMPONENT":name,iframe_id}, "*"); 
    }

    window.addEventListener('message', function (event) {
        if(event.data.iframe_id && event.data.iframe_id === iframe_id){
            if (event.data.hasOwnProperty("HEIGHT")) {
                iframe_height = event.data.HEIGHT;
            }
        }
    })

</script>


<ExampleLayout>
    <iframe slot="result"
        on:load={sendMessage}
        style="height:{iframe_height}px"
        title="Result"
        scrolling="no"
        bind:this={iframe}
        sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-scripts"
        {srcdoc}
    ></iframe>
     <pre slot="code" class="hljs"><code>{@html code.trim()}</code></pre>
</ExampleLayout>

<style>   
	pre{margin:0px;}

    iframe{
        width: 100%;
        display: block;
        border:none;
    }
</style>