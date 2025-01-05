<script lang="ts">
	import { color } from 'd3';
  import { onMount } from 'svelte';

  let contributions: any[] = [];
  const username = 'nikolaiborbe';

  onMount(async () => {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_KEY}`,
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
        `,
      }),
    });
    
    let bg_color = "#313133"
    const data = await response.json();
    contributions = data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week: any) => week.contributionDays
    );
    contributions = contributions.map((c) => ({
      ...c,
      color: c.color === "#ebedf0" ? bg_color : c.color
    }));
  });

</script>

<main>
  <h1>GitHub Contributions for {username}</h1>
  <div class="flex flex-wrap border p-2 rounded-lg border-[#3F3F46] bg-[#212123]">
    {#each contributions as { date, contributionCount, color }}
      <div style="background-color: {color}" class="day" title="{date}: {contributionCount} contributions"></div>
    {/each}
  </div>
</main>

<style>
  .day {
    width: 14px;
    height: 14px;
    margin: 1.5px;
    border-radius: 3px;
  }
</style>