import {Playground} from 'svelte-docs';

# Welcome

```playground editor:100 result:150
    ```App.svelte
        <h1>Two components!</h1>
    ```
    ```Child.svelte
        <h1>Child components</h1>
    ```
```

```playground
    <script>
        let Hello="bue";
    </script>
    <h1>Just one component</h1>
    <button>
        {Hello}
    </button>
```



```js
    console.log(123);
```