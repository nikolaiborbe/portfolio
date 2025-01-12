<script lang="ts">
  import { onMount } from "svelte";

  let age = $state();

  function updateAge() {
    const now = new Date();
    const diff = now.getTime() - Date.parse("August 23 2002");
    let days    = diff / 86400000;
    let years   = (days / 365.25).toPrecision(11);
    age = years;
  }


  onMount(() => {
    updateAge();
    setInterval(updateAge, 25);
  })
</script>

{age}