<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { Project } from './Types';
	import Projects from './projects.json';
	import WakaTime from '$lib/components/WakaTime.svelte';
	import GithubContributions from '$lib/components/GithubContributions.svelte';

	let projects: Array<Project> = Object.values(Projects).flat();
</script>

<div class="flex flex-col gap-4 md:text-xl">
	<UserCard />
	<div class="flex flex-col gap-1">
		<div class="title">About me</div>
		<div class="size-lg">
			Hey, I’m Nikolai, a full-stack developer from Norway. I do my best to understand the world
			around me. Right now, I’m working on my bachelor’s degree in physics while programming rocket
			engines at <a
				href="https://www.propulse.no/"
				target="_blank"
				class="transition-all hover:font-bold">Propulse</a
			>.
		</div>
	</div>
	<div>
		<div class="title pb-4">Projects</div>
		{#each projects as project}
			<ProjectCard {...project} />
		{/each}
	</div>
	<WakaTime />
	<GithubContributions />
	<hr class="mt-4 border-[#3F3F46]" />
	<div class="color-[#535353] my-4 flex justify-center text-lg">
		Website design greatly inspired by ‎ <a
			href="https://x.com/damnGruz"
			target="_blank"
			class="hover:cursor-poitner transition-all hover:font-medium">Gruz.</a
		>
	</div>
</div>
