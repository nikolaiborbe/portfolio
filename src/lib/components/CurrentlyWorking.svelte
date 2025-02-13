<script lang="ts">
	import WorkingIcon from '$lib/icons/WorkingIcon.svelte';
	let live = $state(false);
	let wakatime_data = $state();

	const date = new Date();
	const time = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	const url = `https://wakatime.com/api/v1/users/current/heartbeats`;

	async function getUserStatus() {
		const response = await fetch("/api/wakatime");
		if (!response.ok) {
			console.error("Failed to fetch wakatime data", await response.text())
			return false;
		}
		wakatime_data = await response.json();
		return true;
	}

/* 	onMount(() => {
		getUserStatus();
		setInterval(() => {
			getUserStatus();
		}, 100000);
	}); */
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
		</div>
	{/if}
</div>
