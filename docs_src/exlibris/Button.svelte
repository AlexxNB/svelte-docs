<script>
    export let primary;
    export let error;
</script>

<button class:primary class:error><slot /></button>

<style>
button {
  padding: .8rem 1.5rem;
  color: #3f4144;
  background: #d2d6dd;
  border-radius: 4px;
  border: 1px solid transparent;
  line-height: 1;
  text-align: center;
  transition: opacity 0.2s ease;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.primary{
  color: #EEEEEE;
  background: #14854F;
}

.error{
  color: #EEEEEE;
  background: #d43939;
}

</style>