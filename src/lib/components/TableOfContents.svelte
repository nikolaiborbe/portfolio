<script lang="ts">
	import { onMount } from 'svelte';

	type Section = { id: string; title: string };
	let { sections }: { sections: Section[] } = $props();

	let activeId = $state(sections[0]?.id ?? '');

	onMount(() => {
		function updateActive() {
			let current = sections[0]?.id ?? '';
			for (const section of sections) {
				const el = document.getElementById(section.id);
				if (el && el.getBoundingClientRect().top <= 100) {
					current = section.id;
				}
			}
			activeId = current;
		}

		window.addEventListener('scroll', updateActive, { passive: true });
		updateActive();

		return () => window.removeEventListener('scroll', updateActive);
	});
</script>

<nav class="toc" aria-label="Table of contents">
	<p class="text-xs tracking-wide text-neutral-400 mb-3 font-sans">Contents</p>
	<ul class="border-l border-neutral-200">
		{#each sections as section}
			<li>
				<a
					href="#{section.id}"
					class="block py-1.5 pl-4 text-sm border-l-2 -ml-px transition-colors duration-150 no-underline
						{activeId === section.id
						? 'border-neutral-800 text-neutral-800'
						: 'border-transparent text-neutral-400 hover:text-neutral-600'}"
				>
					{section.title}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.toc {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		left: max(1.5rem, calc(50% - 375px - 2rem - 11rem));
		width: 11rem;
	}

	@media (max-width: 1279px) {
		.toc {
			display: none;
		}
	}

	@media print {
		.toc {
			display: none;
		}
	}
</style>
