<script lang="ts">
	let { live } = $props();
	let color = live ? '#22c55e' : '#ef4444';
</script>

{#if live}
	<div class="live flex justify-around px-2 text-green-500">
		<div class="animate-pulse self-center">
			<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
				<circle cx="5" cy="5" r="4" fill={color} />
			</svg>
		</div>
		<p class="text-green-300 pl-1 self-center font-normal">Live</p>
	</div>
{:else}
	<div class="notlive flex justify-around px-2">
		<div class="animate-pulse self-center">
			<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
				<circle cx="5" cy="5" r="4" fill={color} />
			</svg>
		</div>
			<p class="text-red-500 pl-1 self-center font-normal ">Building</p>
	</div>
{/if}

<style>
	.live {
		background-color: rgba(30, 255, 97, 0.192);
		border-radius: 4px;
		font-size: 15px;
		height: 24px;
	}
  .notlive {
		background-color: rgba(255, 30, 30, 0.192);
		border-radius: 4px;
		font-size: 15px;
		height: 24px;
	}
</style>
