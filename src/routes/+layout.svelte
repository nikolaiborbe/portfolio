<script lang="ts">
	import CurrentlyWorking from '$lib/components/CurrentlyWorking.svelte';
	import Pdoom from '$lib/components/Pdoom.svelte';
	import TotalTimeProgrammed from '$lib/components/TotalTimeProgrammed.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-full w-full overflow-x-hidden">
	<div class="flex w-full justify-between">
		<CurrentlyWorking />
	</div>
	<div class="flex justify-center">
		<div class="w-full max-w-full px-4 md:max-w-[780px]">
			{@render children()}
		</div>
	</div>
</div>
