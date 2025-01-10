<script lang="ts">
	import GithubOutline from '$lib/icons/GithubOutline.svelte';
	import LinkIcon from '$lib/icons/LinkIcon.svelte';
	import Preview from '$lib/icons/Preview.svelte';
	import Status from '$lib/icons/Status.svelte';

	let { title, description, image, tags, link, github, live } = $props();
	let preview = $state(false);
</script>

<div
	class="flex flex-col gap-3 rounded-lg border border-[#3F3F46] bg-[#212123] p-2 transition-all hover:cursor-pointer hover:bg-[#252527] md:flex-row"
>
	<div class="picture max-h-52 justify-self-center overflow-hidden rounded-md">
		<img src={image} alt="Daily crimes" class="h-full w-full object-cover" />
	</div>
	<div class="content pl-1">
		<div class="flex items-center justify-between pb-1">
			<div class="flex items-center gap-4">
				<div class="text-3xl font-bold">{title}</div>
				<Status {live} />
			</div>
			<div>
				<Preview {preview} />
				<LinkIcon {link} />
				<GithubOutline {github} />
			</div>
		</div>
		<div>{description}</div>
		<div class="flex justify-end gap-2 pt-4">
			{#each tags as tag}
				<div class="bg-[#222226] border border-[#403F45] rounded-md px-2 text-sm">{tag}</div>
			{/each}
		</div>
	</div>
</div>
