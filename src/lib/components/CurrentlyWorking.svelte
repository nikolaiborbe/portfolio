<script lang="ts">
	import WorkingIcon from '$lib/icons/WorkingIcon.svelte';
	import { onMount } from 'svelte';
	let live = $state(false);

	const date = new Date();
	const time = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	console.log(time);
	const url = `https://wakatime.com/api/v1/users/current/durations?date=${time}`;

	// TODO: DOCS
	// https://stackoverflow.com/questions/70472978/sveltekit-proxy-api-to-avoid-cors
	async function checkIfLive() {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${import.meta.env.VITE_WAKATIME_KEY}`,
				'Content-Type': 'application/json',
			}
		});
		const data = await response.json();
		console.log(data);
	}

	onMount(() => {
		checkIfLive();
		setInterval(() => {
			checkIfLive();
		}, 100000);
	});
</script>

<div class="p-4">
	{#if live}
		<a href="https://www.twitch.tv/nikogrytvik" target="_blank" class="flex items-center gap-2">
			<div class="flex text-[#32cd32]">
				<div class="pr-2 font-medium">Live</div>
				<WorkingIcon color={'#32cd32'} />
			</div>
		</a>
	{:else}
		<div class="flex gap-2">
			<div class="font-medium text-[#ff0000]">Offline</div>
			<WorkingIcon color={'#ff0000'} />
			<div>This is a test</div>
		</div>
	{/if}
</div>
