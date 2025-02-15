<script lang="ts">
	import WorkingIcon from '$lib/icons/WorkingIcon.svelte';
	import { onDestroy, onMount } from 'svelte';

	let currently_programming: boolean = $state(false);
	let current_project: string = $state('');
	let session_start: number | null = null;
	let elapsed_time: number = 0;
	let codingTimeToday: number = $state(0);
	let topProject: { name: string; total_seconds: number } | null = null;
	let error: string | null = null;

	let valid: boolean = $state(false);

	const github_username = 'nikolaiborbe';

	function formatTime(seconds: number) {
		if (seconds < 60) return `0`;
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		if (hours === 0) return `${minutes}m`;
		// const secs = Math.floor(seconds % 60);
		return `${hours}h ${minutes}m`;
	}

	async function fetchHeartbeat() {
		const res = await fetch("/heartbeat.json");
		if (!res.ok) throw new Error("Error fetching WakaTime data");
		const data = await res.json();
		currently_programming = data[data.length -1].is_write;
		current_project = data[data.length - 1].project;
	}

	async function fetchCodingTime() {
		const res = await fetch("/coded_today.json");
		if (!res.ok) throw new Error("Error fetching WakaTime data");
		const data = await res.json();
		codingTimeToday = data.cumulative_total.seconds;
	}

	let updateInterval: ReturnType<typeof setInterval>;
	onMount(async () => {
		fetchHeartbeat();
		fetchCodingTime();
		const res = await fetch(`https://github.com/${github_username}/${current_project}`, { method: "HEAD"});
		valid = res.ok;
		updateInterval = setInterval(fetchHeartbeat, 60000);
		updateInterval = setInterval(fetchCodingTime, 60000);
	});

	onDestroy(() => {
		clearInterval(updateInterval);
	});
</script>

{#snippet snippet1()}
	<a
		href={`https://github.com/${github_username}/${current_project}`}
		target="_blank"
		class="flex items-center gap-2"
	>
		<div class="md:hidden flex text-[#32cd32]">
			<WorkingIcon color="#32cd32" />
			<div class="pl-2 font-medium">
				Coding: {current_project ? formatTime(codingTimeToday) : 'N/A'}
			</div>
		</div>
		<div class="hidden md:flex text-[#32cd32]">
			<div class="pr-2 font-medium">
				Coding: {current_project ? formatTime(codingTimeToday) : 'N/A'}
			</div>
			<WorkingIcon color="#32cd32" />
		</div>
	</a>
{/snippet}

{#snippet snippet2()}
	<div class="md:hidden flex text-[#32cd32]">
		<WorkingIcon color="#32cd32" />
		<div class="pl-2 font-medium">
			Coding: {current_project ? formatTime(codingTimeToday) : 'N/A'}
		</div>
	</div>
	<div class="hidden md:flex text-[#32cd32]">
		<div class="pr-2 font-medium">
			Coding: {current_project ? formatTime(codingTimeToday) : 'N/A'}
		</div>
		<WorkingIcon color="#32cd32" />
	</div>
{/snippet}

<div class="flex justify-end p-4 md:justify-start">
	<!-- Very bad implementation, but will atleast update time spent that day
	 and should also reset every night.-->
	{#if currently_programming}
		{@render (valid ? snippet1 : snippet2)()}
	{:else}
		<div class="flex gap-2">
			<div class="font-medium text-[#ff0000]">Offline</div>
			<WorkingIcon color="#ff0000" />
		</div>
	{/if}
</div>
