<script lang="ts">
	let { title, description, image, tags, link, github } = $props();
</script>

<div class="flex flex-col md:flex-row rounded-md border border-[#3F3F46] p-2">
	<div class="picture">
    <img src={image} alt="Daily crimes" class="rounded-md " />
	</div>
	<div class="content">
		<div>{title}</div>
		<div>{description}</div>
		{#each tags as tag}
			<div>{tag}</div>
		{/each}
		<div>{link}</div>
		<div>{github}</div>
	</div>
</div>
