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
		if (seconds < 60) return `0`;
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
	}

	async function fetchWakaTimeData() {
		try {
			const res_heatbeats = await fetch('/wakatime_heartbeats.json');
			const res_summaries = await fetch('/wakatime_summaries.json');
			if (!res_heatbeats.ok) throw new Error('Error fetching WakaTime heartbeats data');
			if (!res_summaries.ok) throw new Error('Error fetching WakaTime summaries data');

			const data = await res.json();
			const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

			// First, try to extract summary data for today.
			if (data.summary && data.summary.data) {
				console.log(1)
				const todayData = data.summary.data.find(
					(day: { range: { date: string } }) => day.range.date === today
				);
				codingTimeToday = todayData ? todayData.grand_total.total_seconds : 0;

				if (todayData && todayData.projects && todayData.projects.length > 0) {
					topProject = todayData.projects.reduce(
						(
							max: { total_seconds: number; name: string },
							project: { total_seconds: number; name: string }
						) => (project.total_seconds > max.total_seconds ? project : max),
						todayData.projects[0]
					);
				} else {
					topProject = null;
				}
			} else if (data.heartbeat && data.heartbeat.data && data.heartbeat.data.length > 0) {
				// Fallback: if summary data is missing, use the first heartbeat's project.
				const fallbackHeartbeat = data.heartbeat.data[0];
				topProject = { name: fallbackHeartbeat.project, total_seconds: 0 };
				codingTimeToday = 0;
			} else {
				topProject = null;
				codingTimeToday = 0;
			}

			// Check heartbeat data for current activity.
			if (data.heartbeat && data.heartbeat.data && data.heartbeat.data.length > 0) {
				// Use the last heartbeat (most recent)
				const lastHeartbeat = data.heartbeat.data[data.heartbeat.data.length - 1];
				const currentTimestamp = Date.now() / 1000; // current time in seconds

				// Consider active if the last heartbeat is recent (within 2 minutes) and was a write action.
				if (currentTimestamp - lastHeartbeat.time < 120 && lastHeartbeat.is_write) {
					currently_programming = true;
					current_project = lastHeartbeat.entity || '';
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

<div class="flex justify-end p-4 md:justify-start">
	{#if topProject}
		<a
			href={`https://github.com/${github_username}/${topProject.name}`}
			target="_blank"
			class="flex items-center gap-2"
		>
			<div class="md:hidden flex text-[#32cd32]">
				<WorkingIcon color="#32cd32" />
				<div class="pl-2 font-medium">
					Coding: {topProject ? formatTime(codingTimeToday) : 'N/A'}
				</div>
			</div>
			<div class="hidden md:flex text-[#32cd32]">
				<div class="pr-2 font-medium">
					Coding: {topProject ? formatTime(codingTimeToday) : 'N/A'}
				</div>
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
