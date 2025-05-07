<script lang="ts">
	import WorkingIcon from '$lib/icons/WorkingIcon.svelte';
	import { writable } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';

	let localAdditionalSeconds: number = $state(0);
	const github_username = 'nikolaiborbe';

	type Status = { loading: boolean; active: boolean; project: string | null , seconds: number | null};
	const status = $state(writable<Status>({ loading: true, active: false, project: null , seconds: null }));

	const THRESHOLD_MIN = 20;          // keep in sync with your default
	const POLL_MS       = 60_000;      // how often to re‑query

	async function check() {
		const res  = await fetch(`/api/check-wakatime?threshold=${THRESHOLD_MIN}`);
		const json = await res.json();
		status.set({ loading: false, active: json.result, project: json.project, seconds: json.seconds});
	}

	function formatTime(seconds: number): string {
		const hours   = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs    = seconds % 60;
		return `${hours}h ${minutes}m ${secs}s`;
	}

	onMount(() => {
		check();                                 // first run
		const id = setInterval(check, POLL_MS);  // keep polling
		const now = setInterval(() => {
			if ($status.active) {
				localAdditionalSeconds += 1;
			}
		}, 1000);                               // update every second
		
		onDestroy(() => {
			clearInterval(id);
			clearInterval(now);
		});

	});


</script>

{#snippet snippet1()}
	<a
		href={`https://github.com/${github_username}/${$status.project}`}
		target="_blank"
		class="flex items-center gap-2"
	>
		<div class="md:hidden flex text-[#32cd32]">
			<WorkingIcon color="#32cd32" />
			<div class="pl-2 font-medium">
				{#if $status.seconds}
					Today: {formatTime($status.seconds + ($status.active ? localAdditionalSeconds : 0))}
				{/if}
			</div>
		</div>
		<div class="hidden md:flex text-[#32cd32]">
			<div class="pr-2 font-medium">
				{#if $status.seconds}
					Today: {formatTime($status.seconds + ($status.active ? localAdditionalSeconds : 0))}
				{/if}
			</div>
			<WorkingIcon color="#32cd32" />
		</div>
	</a>
{/snippet}

<div class="flex justify-end p-4 md:justify-start">
	{#if $status.active}
		{@render snippet1()}
	{:else}
		<div class="flex gap-2">
			<div class="font-medium text-[#ff0000]">Offline</div>
			<WorkingIcon color="#ff0000" />
		</div>
	{/if}
</div>