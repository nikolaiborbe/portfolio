<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { Project } from './Types';
	import Projects from './projects.json';
	import WakaTime from '$lib/components/WakaTime.svelte';
	import WakatimeTable from '$lib/components/WakatimeTable.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Age from '$lib/objects/Age.svelte';

	let showAll = false;
	let projects: any = Object.values(Projects).flat();
</script>

<div class="flex flex-col gap-4 md:text-xl">
	<UserCard />
	<div class="flex flex-col gap-3">
		<div class="title">About me</div>
		<div class="size-lg">
			I’m a <Age /> year-old developer who's passionate
			about AI and building cool stuff. Currently, I’m pursuing a bachelor’s degree in physics
			while programming in my free time.
		</div>
	</div>
	<div>
		<div class="title pb-4">Skills</div>
		<Skills />
	</div>
	<div>
		<div class="title pb-4">Projects</div>
		<div class="flex flex-col gap-4">
			{#each projects.slice(0, showAll ? projects.length : 2) as project}
				<ProjectCard {...project} />
			{/each}
		</div>
		{#if projects.length > 2}
			<button
				class="mt-4 w-full rounded-lg border border-[#3F3F46] bg-[#212123] transition-colors flex items-center justify-center p-2"
				on:click={() => (showAll = !showAll)}
				aria-label="Show all projects"
			>
				<svg
					class={`h-6 w-6 transition-transform ${showAll ? 'rotate-180' : ''}`}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
		{/if}
	</div>
	<WakaTime />
	<WakatimeTable />
	<hr class="mt-4 border-[#3F3F46]" />
	<div class="color-[#535353] mb-6 mt-1 flex justify-center text-lg">
		Website design greatly inspired by ‎ <a
			href="https://x.com/damnGruz"
			target="_blank"
			class="hover:cursor-poitner transition-all hover:font-medium">Gruz.</a
		>
	</div>
</div>
