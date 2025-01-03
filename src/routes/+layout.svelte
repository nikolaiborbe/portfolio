<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="w-full h-full">
	<div class="p-4 font-medium">
		Currently working
	</div>
	<div class="flex justify-center">
		<div class="w-full max-w-full px-4 md:max-w-[780px] ">
			{@render children()}
		</div>
	</div>
</div>
