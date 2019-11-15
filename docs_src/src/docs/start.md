---
fullscreen: true
---

<div class="hero">
    <div class="banner">

        ![Svelte-Docs Logo](static/logo.svg)

        <p>A rapid way to document your Svelte things</p>
        
    </div>

    <div class="buttons">
        <a href="introduction">Introduction</a>
        <a href="start">Getting Started</a>
    </div>
</div>

<style>
    .hero{
        height:95vh;
        position: relative;
    }

    .banner{
        padding-top: 100px;
    }

    .banner img{
        width: 300px;
    }

    .banner p{
        font-size: 1.5em;
        font-weight: 600;
        text-align: center;
    }

    .buttons{
        position: absolute;
        bottom:100px;
        width:100%;
        text-align: center;
    }

    .buttons a{
        display: inline-block;
        padding: 10px;
        color: white;
        background: var(--primary);
        text-decoration: none;
        opacity: 1;
        border-radius: 3px;
    }

    .buttons a:hover{
        opacity: .8;
    }
</style>
