<script lang="ts">
	import CurrentlyWorking from '$lib/components/CurrentlyWorking.svelte';
import '../app.css';
	let { children } = $props();
</script>

<div class="w-full h-full overflow-x-hidden">
	<CurrentlyWorking />
	<div class="flex justify-center">
		<div class="w-full max-w-full px-4 md:max-w-[780px] ">
			{@render children()}
		</div>
	</div>
</div>
