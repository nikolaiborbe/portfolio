<script lang="ts">
	import Linkedin from './../icons/Linkedin.svelte';
	import GitHub from '$lib/icons/GitHub.svelte';
  import X from '$lib/icons/X.svelte';

	let loading = $state(true);
</script>

<div class="flex items-center">
	{#if loading}
		<div class="absolute h-32 w-32 animate-pulse rounded-lg bg-[#2a2a2d] md:h-40 md:w-40"></div>
	{/if}
	<img
		src="pp.jpg"
		onload={() => (loading = false)}
		class="h-32 w-32 rounded-lg object-cover md:h-40 md:w-40 transition-opacity duration-500"
		class:opacity-0={loading}
		alt=""
	/>
	<div class="flex flex-col gap-1 pl-4 md:gap-2">
		<h1 class="text-2xl font-bold md:text-4xl">
			<span class="hidden md:inline">Nikolai Grytvik Borbe</span><span class="md:hidden"
				>Nikolai G. Borbe</span
			>
		</h1>
		<h2 class="md:text-xl">Average programming enjoyer</h2>
		<div class="flex flex-wrap gap-2 pt-1">
			<GitHub />
			<Linkedin />
      <X />
		</div>
	</div>
</div>
