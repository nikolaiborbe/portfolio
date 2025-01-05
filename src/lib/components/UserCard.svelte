<script lang="ts">
	import Linkedin from './../icons/Linkedin.svelte';
  import BuyCoffee from "$lib/icons/BuyCoffee.svelte";
	import GitHub from "$lib/icons/GitHub.svelte";
	import LeetCode from "$lib/icons/LeetCode.svelte";
  let age = $props();
</script>
<div class="flex items-center">
  <img src="pp.png" class="w-32 h-32 md:w-40 md:h-40 rounded-lg" alt="" />
  <div class=" pl-4 flex flex-col gap-1 md:gap-2 self-center">
    <h1 class="font-bold text-2xl md:text-4xl">Nikolai</h1>
    <h2 class="md:text-xl">The [22.3042] year old rocketscientist</h2>
    <div class="flex flex-wrap gap-2">
      <GitHub />
      <LeetCode />
      <BuyCoffee />
      <Linkedin />
    </div>

  </div>

</div>