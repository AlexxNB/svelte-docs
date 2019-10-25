<script context="module">
    let uid = 1;
</script>

<script>    
    export let name;
    export let code;

    let iframe;
    let iframe_id = uid++;
    let iframe_height = 70;

    const srcdoc = `<!doctype html>
<html>
    <head>
        <meta charset='utf-8'>
        <base href="/" />
        <link rel='stylesheet' href='examples.css'>
        <scr`+`ipt defer src='examples.js'></scr`+`ipt>
    </head>
    <body></body>
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

<div class="container">
    <div class="result">
        <iframe
            on:load={sendMessage}
            style="height:{iframe_height}px"
            title="Result"
			scrolling="no"
            bind:this={iframe}
            sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-scripts"
            {srcdoc}
        ></iframe>
    </div>
    <div class="code">
        <pre class="hljs"><code>{@html code}</code></pre>
    </div>
</div>

<style>
    .container{
        position:relative;
        width:calc(100vw - 50px);
        margin:0 25px;
        border:1px solid var(--example-border);
    }

    .code{
		/*border-bottom:1px solid transparent;*/
        border-top: 1px solid var(--example-border);
	}
	
	pre{margin:0px;}

    iframe{
        width: 100%;
        display: block;
        border:none;
    }
</style>