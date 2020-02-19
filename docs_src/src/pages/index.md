---
layout: 'no_sidebar'
title: false
---

<div class="hero">
    <div class="banner">

        ![Svelte-Docs Logo](static/logo.svg)

        <p>A rapid way to document your Svelte things</p>
        
    </div>

    <div class="buttons">
        <a href="introduction">Introduction</a>
        <a href="getting-started">Getting Started</a>
    </div>
</div>

<style>
    .hero{
        display: flex;
        flex-direction: column;
        height:100vh;
        margin-top: calc(var(--topbar-height) * -1);
    }

    .banner{
        flex: 1 0 auto;
        margin-top: 100px;
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
        flex: 0 0 auto;
        text-align: center;
        margin-bottom: 100px;
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
