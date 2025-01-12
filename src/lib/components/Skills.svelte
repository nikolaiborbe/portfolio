<script lang="ts">
	import Skill from '$lib/icons/Skill.svelte';
	import Skill2 from '$lib/icons/Skill2.svelte';
	import C from '$lib/icons/C.svelte';

	import {
		LogoSvelte,
		LogoPython,
		Sql
	} from 'carbon-icons-svelte';

	let skills = [
		'C-Plus-Plus',
		'Python',
		'TypeScript',
    "Figma",
		'React',
		'Java',
		'git',
    "Tailwind-css"
	];
	let skills2: { [key: string]: typeof LogoPython } = {
		Svelte: LogoSvelte,
		Sql: Sql
	};
</script>

<div class="flex flex-wrap gap-2">
  <div class="flex h-fit w-fit items-center gap-2 rounded-md border border-[#3F3F46] bg-[#212123] px-3 py-1">
    <div class="scale-125"><C /></div> C
  </div>
	{#each Object.keys(skills2) as skill2}
		<Skill2 title={skill2} icon={skills2[skill2]} />
	{/each}
	{#each skills as skill}
		<Skill title={skill} />
	{/each}
</div>
