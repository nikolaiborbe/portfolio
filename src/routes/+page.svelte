<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { Project } from './Types';
	import Projects from './projects.json';

	let projects: Array<Project> = Object.values(Projects).flat();
</script>

<div class="flex flex-col gap-5 md:text-xl">
	<UserCard />
	<div class="flex flex-col gap-1">
		<div class="title">About me</div>
		<div class="size-lg">
			Hey, I'm Niko, a full-stack developer with OCD. I love building things that people genuinely
			use and love, not just for showcases (like the typical engineer).
		</div>
	</div>
	<div>
		<div class="title">Projects</div>
		{#each projects as project}
			<ProjectCard {...project} />
		{/each}
	</div>
</div>
