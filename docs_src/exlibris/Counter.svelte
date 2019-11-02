<script>
let count = 0;
</script>

<span class="counter">
<span class="minus" on:click={e => count--}>-</span>
<span class="value">{count}</span>
<span class="plus" on:click={e => count++}>+</span>
</span>

<style>
.counter{
background-color: #f9ac00;
padding: 2px;
border-radius:5px;
}

.value{
display: inline-block;
background-color: white;
text-align: center;
padding:0 5px;
border-radius:5px;
color: black;
}

.minus,.plus{
display: inline-block;
color: white;
width:15px;
text-align: center;
font-weight: bold;
cursor:pointer;
}
</style>