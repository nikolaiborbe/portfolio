<script lang="ts">
	import WorkingIcon from '$lib/icons/WorkingIcon.svelte';
	import { onDestroy, onMount } from 'svelte';

	let currently_programming = $state(false);
	let current_project = $state();
	let session_start: null | number = $state(null);
	let elapsed_time = 0;
	let codingTimeToday = 0;

	function formatTime(seconds: number) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);
		return `${hours}h ${minutes}m ${secs}s`;
	}

	const date = new Date();
	//const url = `https://wakatime.com/api/v1/users/current/heartbeats`;

	const github_username = 'nikolaiborbe';

	const publicJSONUrl = 'https://wakatime.com/share/@nikolaiborbe/yourhash.json';

	let topProject;
	let error: string | null = null;

	async function fetchWakaTimeData() {
		try {
			const res = await fetch(publicJSONUrl);
			if (!res.ok) throw new Error('Error fetching WakaTime data');

			console.log("res ok");
			const data = await res.json();

			// Example JSON structure assumption:
			// {
			//   "data": {
			//     "days": [
			//       { "date": "2025-02-12", "total_seconds": 3600, ... },
			//       { "date": "2025-02-13", "total_seconds": 1800, ... }
			//     ],
			//     "projects": [
			//       { "name": "my-project", "total_seconds": 2345, ... },
			//       { "name": "another-project", "total_seconds": 1234, ... }
			//     ]
			//   }
			// }

			// Get today's coding time from the "days" array:
			const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
			const todayData = data.data.days.find((day: { date: string }) => day.date === today);
			codingTimeToday = todayData ? todayData.total_seconds : 0;

			// Determine the top project by total_seconds:
			if (data.data.projects && data.data.projects.length > 0) {
				console.log(1);
				topProject = data.data.projects.reduce(
					(max: { total_seconds: number }, project: { total_seconds: number }) =>
						project.total_seconds > max.total_seconds ? project : max,
					data.data.projects[0]
				);
			}
		} catch (err) {
			if (err instanceof Error) {
				console.log(1);
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
			console.error(err);
		}
	}

	let updateInterval: NodeJS.Timeout;

	onMount(() => {
		fetchWakaTimeData();
		updateInterval = setInterval(fetchWakaTimeData, 60000);
	});

	onDestroy(() => {
		clearInterval(updateInterval);
	});
</script>

<div class="p-4">
	{#if currently_programming}
		<a
			href={`https://github.com/${github_username}/${current_project}`}
			target="_blank"
			class="flex items-center gap-2"
		>
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
