<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<title>Nikolai Borbe</title>
	<meta name="description" content="Nikolai Grytvik Borbe - Student at NTNU studying applied maths and physics." />
	<meta property="og:title" content="Nikolai Borbe" />
	<meta property="og:description" content="Student at NTNU studying applied maths and physics." />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="font-serif p-4 mx-auto max-w-[750px]">
	{@render children()}
</div>
