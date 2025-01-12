<script lang="ts">
  import Icon from '@iconify/svelte';
	let { title } = $props();
  let icon_name = title.replace(".", "").toLowerCase();
  if (title == "C-Plus-Plus") {
    title = "C++";
  } else if (title == "Tailwind-css") {
    title = "Tailwind";
  }

</script>

<div
	class="flex h-fit w-fit items-center gap-2 rounded-md border border-[#3F3F46] bg-[#212123] px-3 py-1"
>
	<div class="scale-125">
		<Icon icon="bxl:{icon_name}" width="20" height="20" />
	</div>
	{title}
</div>
