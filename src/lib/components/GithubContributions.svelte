<script lang="ts">
	import { onMount } from 'svelte';

	let data_load = $state(false);
	let weeks: any = $state();
	const username = 'nikolaiborbe';
	let months: Array<string> = $state([
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Des'
	]);

	function rotateArray(arr: Array<string>, n: number) {
		return arr.slice(n).concat(arr.slice(0, n));
	}

	onMount(async () => {
		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_GITHUB_KEY}`
			},
			body: JSON.stringify({
				query: `
          query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }
        `
			})
		});
		let bg_color = '#313133';
		const data = await response.json();
		weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
		weeks = weeks.map((week: any) => ({
			...week,
			contributionDays: week.contributionDays.map((day: any) => ({
				...day,
				color: day.color === '#ebedf0' ? bg_color : day.color
			}))
		}));
		let start_month_index = Number(weeks[weeks.length-1].contributionDays[0].date.split('-')[1]);
		months = rotateArray(months, start_month_index);
		data_load = true;
	});

	// let start_month: number = weeks.contributionDays[0].date.split('-')[1];
	// console.log(start_month)
</script>

<main>
	<h1 class="title pb-4">Github contributions</h1>
	{#if !data_load}
		<div class="rounded-lg border border-[#3F3F46] bg-[#212123] p-4 h-36 animate-pulse">
		</div>
	{:else}
		<div class="graph flex overflow-auto rounded-lg border border-[#3F3F46] bg-[#212123] p-4">
			<div class="flex flex-col justify-between pb-3 pr-2 pt-7 text-xs">
				<p>Mon</p>
				<p>Wed</p>
				<p>Fri</p>
			</div>
			<div>
				<div class="flex justify-between text-xs">
					{#each months as month}
						<p>{month}</p>
					{/each}
				</div>
				<div class="graph overflow flex">
<!-- 					TODO: Try get this working:
					(better rendering) -->
<!-- 				<div class="graph overflow flex">
					{#each weeks as week}
						<div class="">
							<svg height="111" width="719">
								<g width="686">
									{#each week.contributionDays as { date, count, color }}
										<rect style="fill: white;" x={week} y={count}></rect>
									{/each}
								</g>
							</svg>
						</div>
					{/each} -->
					{#each weeks as week}
						<div class="">
							{#each week.contributionDays as { date, count, color }}
								<div
									style="background-color: {color}"
									class="day"
									title="{date}: {count} contributions"
								>
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	.graph {
		image-rendering: pixelated;
	}
	.day {
		width: 10px;
		height: 10px;
		border-radius: 2px;
		box-sizing: border-box;
		margin: 2px;
	}
</style>
