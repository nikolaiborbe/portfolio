<script lang="ts">
	import WorkingIcon from '$lib/icons/WorkingIcon.svelte';
	import { onDestroy, onMount } from 'svelte';

	let currently_programming: boolean = false;
	let current_project: string = '';
	let session_start: number | null = null;
	let elapsed_time: number = 0;
	let codingTimeToday: number = 0;
	let topProject: { name: string; total_seconds: number } | null = null;
	let error: string | null = null;

	const github_username = 'nikolaiborbe';

	function formatTime(seconds: number) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);
		return `${hours}h ${minutes}m`;
	}

	async function fetchWakaTimeData() {
		try {
			const res = await fetch('/wakatime.json');
			if (!res.ok) throw new Error('Error fetching WakaTime data');

			const data = await res.json();
			console.log(data);

			// Extract today's summary data.
			const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
			const todayData = data.summary.data.find(
				(day: { range: { date: string } }) => day.range.date === today
			);
			codingTimeToday = todayData ? todayData.grand_total.total_seconds : 0;

			// Determine the top project for today.
			if (todayData && todayData.projects && todayData.projects.length > 0) {
				topProject = todayData.projects.reduce(
					(max: { total_seconds: number }, project: { total_seconds: number; name: string }) =>
						project.total_seconds > max.total_seconds ? project : max,
					todayData.projects[0]
				);
			} else {
				topProject = null;
			}

			// Check heartbeat data for current activity.
			// If a heartbeat exists, check that its timestamp is within the last 2 minutes.
			if (data.heartbeat && data.heartbeat.data && data.heartbeat.data.length > 0) {
				const heartbeat = data.heartbeat.data[0];
				const currentTimestamp = Date.now() / 1000; // current time in seconds
				if (currentTimestamp - heartbeat.timestamp < 120) {
					currently_programming = true;
					current_project = heartbeat.entity || '';
					if (!session_start) {
						session_start = Date.now();
					}
				} else {
					currently_programming = false;
					session_start = null;
					elapsed_time = 0;
				}
			} else {
				currently_programming = false;
				session_start = null;
				elapsed_time = 0;
			}
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
		}
	}

	let updateInterval: ReturnType<typeof setInterval>;

	onMount(() => {
		fetchWakaTimeData();
		updateInterval = setInterval(fetchWakaTimeData, 60000);
	});

	onDestroy(() => {
		clearInterval(updateInterval);
	});
</script>

<div class="p-4">
	{#if !error}
			<a
				href={`https://github.com/${github_username}/${topProject?.name}`}
				target="_blank"
				class="flex items-center gap-2"
			>
				<div class="flex text-[#32cd32]">
					<div class="pr-2 font-medium">Current session: {topProject ? formatTime(topProject.total_seconds) : 'N/A'}</div>
					<WorkingIcon color="#32cd32" />
				</div>
			</a>
		{:else}
			<div class="flex gap-2">
				<div class="font-medium text-[#ff0000]">Offline</div>
				<WorkingIcon color="#ff0000" />
			</div>
	{/if}
</div>
