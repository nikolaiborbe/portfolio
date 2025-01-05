<script lang="ts">
	import WorkingIcon from '$lib/icons/WorkingIcon.svelte';
	import { onMount } from 'svelte';
	let live = $state(false);

	async function checkIfLive() {
		const response = await fetch(`https://twitchstatus.com/api/user/nikogrytvik`);
		const data = await response.json();
		live = data.is_live;
		console.log(data);
	}
	onMount(() => {
		checkIfLive();
		setInterval(() => {
			checkIfLive();
		}, 5000);
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
		</div>
	{/if}
</div>
