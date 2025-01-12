<script lang="ts">
	import SvelteTooltip from 'svelte-tooltip';
	let { preview } = $props();
	let color = $state('gray');
	// TODO: if prewview = ture, show video demo, else hide
</script>

<SvelteTooltip tip="Preview">
	<div
		role="button"
		aria-label="Watch a preview of the project"
		tabindex="0"
		onmouseleave={() => (color = 'gray')}
		onmouseover={() => (color = 'white')}
		onfocus={() => (color = 'white')}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			fill={color}
			preserveAspectRatio="xMidYMid meet"
			width="20px"
			height="20px"
		>
			<path
				d="M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,25c-5.3,0-10.9-3.93-12.93-9C5.1,10.93,10.7,7,16,7s10.9,3.93,12.93,9C26.9,21.07,21.3,25,16,25Z"
			></path><path d="M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"
			></path>
		</svg>
	</div>
</SvelteTooltip>
