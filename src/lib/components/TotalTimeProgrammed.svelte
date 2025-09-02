<script lang="ts">
	import { onMount } from 'svelte';

	async function getTime() {
		const res = await fetch('/api/tot-time');
		return await res.json();
	}
	let not_tracked_estimated_time = 750;
	let totalTime = $state(0);
	let loading = $state(true);
	onMount(async () => {
		const data = await getTime();
		totalTime = Math.floor(data.seconds / 3600) + not_tracked_estimated_time;
		loading = false;
	});
</script>

{totalTime ? totalTime + ' hours' : ''}
