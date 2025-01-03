<script lang="ts">
  let {title, description, image, tags, link, github} = $props();
</script>

<div>{title}</div>
<div>{description}</div>
<div>{image}</div>
{#each tags as tag}
  <div>{tag}</div>
{/each}
<div>{link}</div>
<div>{github}</div>