<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { Project } from './Types';
	import Projects from './projects.json';
	import WakaTime from '$lib/components/WakaTime.svelte';
	import WakatimeTable from '$lib/components/WakatimeTable.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Age from '$lib/objects/Age.svelte';

	let projects: any = Object.values(Projects).flat();									
</script>

<div class="flex flex-col gap-4 md:text-xl">
	<UserCard />
	<div class="flex flex-col gap-3">
		<div class="title">About me</div>
		<div class="size-lg">
			Hi, my name is Nikolai, I’m a <Age /> year old, full-stack developer from Norway. I’m passionate about understanding the
			world around me. Currently, I’m pursuing a bachelor’s degree in physics while programming in
			my free time.
		</div>
	</div>
	<div>
		<div class="title pb-4">Skills</div>
		<Skills />
	</div>
	<div>
		<div class="title pb-4">Projects</div>
		<div class="flex flex-col gap-4">
			{#each projects as project}
				<ProjectCard {...project} />
			{/each}
		</div>
	</div>
	<WakaTime />
	<WakatimeTable />
	<hr class="mt-4 border-[#3F3F46]" />
	<div class="color-[#535353] mt-1 mb-6 flex justify-center text-lg">
		Website design greatly inspired by ‎ <a
			href="https://x.com/damnGruz"
			target="_blank"
			class="hover:cursor-poitner transition-all hover:font-medium">Gruz.</a
		>
	</div>
</div>
