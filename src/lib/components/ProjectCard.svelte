<script lang="ts">
	import GithubOutline from "$lib/icons/GithubOutline.svelte";
	import LinkIcon from "$lib/icons/LinkIcon.svelte";
	import Preview from "$lib/icons/Preview.svelte";
	import Status from "$lib/icons/Status.svelte";

	let { title, description, image, tags, link, github, live } = $props();
	let preview = $state(false);

</script>

<div class="flex flex-col rounded-lg border border-[#3F3F46] bg-[#212123] hover:bg-[#252527] transition-all hover:cursor-pointer gap-4 p-2 md:flex-row">
	<div class="picture max-h-52 justify-self-center rounded-md overflow-hidden">
		<img src={image} alt="Daily crimes"  />
	</div>
	<div class="content ">
		<div class="flex pb-1 justify-between items-center">
			<div class="flex items-center gap-4">
				<div class="text-3xl font-bold">{title}</div>
				<Status {live} />
			</div>
			<div>
				<Preview {preview}/>
				<LinkIcon {link}/>
				<GithubOutline {github} />
			</div>
		</div>
		<div>{description}</div>
		<!-- {#each tags as tag}
			<div>{tag}</div>
		{/each}
		<div>{link}</div>
		<div>{github}</div> -->
	</div>
</div>
