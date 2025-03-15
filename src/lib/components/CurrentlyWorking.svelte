<script lang="ts">
	import WorkingIcon from '$lib/icons/WorkingIcon.svelte';
	import { onDestroy, onMount } from 'svelte';

	let currently_programming: boolean = $state(false);
	let current_project: string = $state('');
	let codingTimeToday: number = $state(0);
	let localAdditionalSeconds: number = $state(0);
	let lastHeartbeatTime: number = $state(0);
	const github_username = 'nikolaiborbe';

	// WakaTime updates every 15 minutes (900,000 ms)
	const WAKATIME_UPDATE_INTERVAL = 900000;

	function formatTime(seconds: number) {
		if (seconds < 60) return "0m";
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
	}

	async function fetchHeartbeat() {
		try {
			const res = await fetch("/heartbeat.json");
			if (!res.ok) throw new Error("Error fetching heartbeat");
			const data = await res.json();
			
			if (!data || data.length === 0) {
				currently_programming = false;
				current_project = '';
				return;
			}

			const latest = data[data.length - 1];
			const heartbeatTime = latest.time * 1000;
			const now = Date.now();
			const timeDiff = now - heartbeatTime;

			// Consider inactive if no heartbeat in last 15 minutes
			if (timeDiff > WAKATIME_UPDATE_INTERVAL) {
				currently_programming = false;
				current_project = '';
			} else {
				currently_programming = true;
				current_project = latest.project || '';
				lastHeartbeatTime = heartbeatTime;
				localAdditionalSeconds = 0; // Reset when new data comes in
			}
		} catch (err) {
			console.error("Error fetching heartbeat:", err);
			currently_programming = false;
			current_project = '';
		}
	}

	async function fetchCodingTime() {
		try {
			const res = await fetch("/coded_today.json");
			if (!res.ok) throw new Error("Error fetching coding time");
			const data = await res.json();
			codingTimeToday = data.cumulative_total.seconds;
		} catch (err) {
			console.error("Error fetching coding time:", err);
		}
	}

	let updateInterval: NodeJS.Timeout;
	let secondsInterval: NodeJS.Timeout;

	onMount(async () => {
		// Initial fetch
		await Promise.all([fetchHeartbeat(), fetchCodingTime()]);
		
		// Update data every 15 minutes to match WakaTime's schedule
		updateInterval = setInterval(async () => {
			await Promise.all([fetchHeartbeat(), fetchCodingTime()]);
		}, WAKATIME_UPDATE_INTERVAL);

		// Update local seconds counter every second but cap at 15 minutes
		secondsInterval = setInterval(() => {
			if (currently_programming) {
				const now = Date.now();
				const elapsed = Math.floor((now - lastHeartbeatTime) / 1000);
				// Don't count beyond WakaTime's update interval
				localAdditionalSeconds = Math.min(elapsed, WAKATIME_UPDATE_INTERVAL / 1000);
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(updateInterval);
		clearInterval(secondsInterval);
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
				Today: {formatTime(codingTimeToday + (currently_programming ? localAdditionalSeconds : 0))}
			</div>
		</div>
		<div class="hidden md:flex text-[#32cd32]">
			<div class="pr-2 font-medium">
				Today: {formatTime(codingTimeToday + (currently_programming ? localAdditionalSeconds : 0))}
			</div>
			<WorkingIcon color="#32cd32" />
		</div>
	</a>
{/snippet}

<div class="flex justify-end p-4 md:justify-start">
	{#if current_project && currently_programming}
		{@render snippet1()}
	{:else}
		<div class="flex gap-2">
			<div class="font-medium text-[#ff0000]">Offline</div>
			<WorkingIcon color="#ff0000" />
		</div>
	{/if}
</div>