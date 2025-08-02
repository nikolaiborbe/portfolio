<script lang="ts">
	import GithubOutline from '$lib/icons/GithubOutline.svelte';
	import LinkIcon from '$lib/icons/LinkIcon.svelte';
	import Preview from '$lib/icons/Preview.svelte';
	import Status from '$lib/icons/Status.svelte';

	let { title, description, image, tags, link, github, live } = $props();
	let preview = $state(false);

	// loading state for the project screenshot
	let loading = $state(true);

	// TODO: add preview

</script>

<div
	class="flex flex-col gap-3 rounded-lg border border-[#3F3F46] bg-[#212123] p-2 transition-all hover:bg-[#252527] md:flex-row"
>
	<div class="relative h-48 md:w-56 overflow-hidden rounded-md flex-none">
		{#if loading}
		<img
			src={image}
			alt={title}
			class="absolute h-full w-full object-cover "
		/>
		{/if}

		<img
			src={image}
			alt={title}
			class="h-full w-full object-cover"
			class:opacity-0={loading}
			onload={() => (loading = false)}
		/>
	</div>
	<div class="content flex flex-col justify-between pl-1">
		<div>
			<div class="flex justify-between items-center ">
				<div class="flex items-center gap-4">
					<div class="text-2xl font-medium">{title}</div>
					<Status {live} />
				</div>
				<div class="pt-1 md:pt-0 flex gap-1 self-start">
					{#if preview} 
						<Preview {preview} />
					{/if}
					{#if link}
						<LinkIcon {link} />
					{/if}
					{#if github}
						<GithubOutline {github} />
					{/if}
				</div>
			</div>
			<div class="text-md">{description}</div>
		</div>
		<div class="flex justify-end gap-2 pt-4">
			{#each tags as tag}
				<div class="bg-[#222226] border border-[#403F45] rounded-md px-2 text-sm">{tag}</div>
			{/each}
		</div>
	</div>
</div>
