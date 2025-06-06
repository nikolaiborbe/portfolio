<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export const doomPercent = writable<number | null>(null);

	const ARENA_CSV =
		'https://huggingface.co/datasets/mathewhe/chatbot-arena-elo/resolve/main/elo.csv';

	onMount(async () => {
		try {
			const text = await fetch(ARENA_CSV, { cache: 'no-store' }).then((r) => r.text());
			const [header, ...rows] = text.trim().split('\n');
			const eloCol = header.split(',').findIndex((h) => /arena\s*score/i.test(h));
			if (eloCol === -1) throw new Error('Elo column not found');

			const topElo = Math.max(...rows.map((l) => parseFloat(l.split(',')[eloCol] || '0')));
			const pdoom = Math.round((topElo / 2500) * 100) * 0.3;

			doomPercent.set(pdoom);
		} catch (err) {
			console.error('Failed to load Arena Elo:', err);
			doomPercent.set(null);
		}
	});

	onMount(() => {
		const renderMath = () => {
			// KaTeX gets attached to window by the CDN script
			if (typeof (window as any).katex !== 'undefined') {
				const el = document.getElementById('elo-formula');
				if (el) {
					(window as any).katex.render(
						String.raw`P(\text{doom}) = \dfrac{E_{\text{top}}}{E_{\text{top}} + \Delta}\times100 \times 0.3`,
						el,
						{ throwOnError: false }
					);
				}
				const el1 = document.getElementById('e');
				if (el1) {
					(window as any).katex.render(String.raw`E_{top}`, el1, { throwOnError: false });
				}
				const el2 = document.getElementById('delta');
				if (el2) {
					(window as any).katex.render(String.raw`\Delta`, el2, { throwOnError: false });
				}
        const el3 = document.getElementById('estimate');
        if (el3) {
          (window as any).katex.render(String.raw`\Delta = 1500`, el3, { throwOnError: false });
        }
			} else {
				// Try again shortly if the script hasn't finished loading
				setTimeout(renderMath, 200);
			}
		};
		renderMath();
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
	<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
</svelte:head>

<div class="flex justify-start p-4 md:justify-end">
	<div class="flex gap-2">
		<!-- Wrap only the text in a “group” so the tooltip appears only when hovering this text -->
		<a href="https://ai-2027.com/" target="_blank" rel="noopener noreferrer">
			<div class="group relative cursor-pointer font-bold text-[#D8D8D8]">
				P(doom) ≈ <span class="font-mono"
					>{#if $doomPercent}{$doomPercent}%{:else}
						…{/if}</span
				>

				<!-- Tooltip box: hidden until you hover over exactly the “P(doom)” text -->
				<div
					class="
          pointer-events-none
          absolute
          left-auto
          right-0
          top-full
          z-10
          mt-2
          w-80
          max-w-[90vw]
          transform-none
          whitespace-normal
          rounded-lg border
          border-gray-700
          bg-[#212123]
          p-4
          text-base
          font-normal
          leading-relaxed
          text-[#D8D8D8] opacity-0
          shadow-xl
          transition-opacity

          duration-200
          group-hover:pointer-events-auto
          group-hover:opacity-100
          md:left-auto
          md:right-0
          md:transform-none
        "
				>
					Based on the Hugging Face Chatbot Arena Elo rating <span id="e"></span>, my estimate for a super-intelligence Elo rating difference
          <span id="estimate"></span>, and a 30% chance that the model will be malevolent,
					<br /><br />
					<span id="elo-formula"></span>
					<br /><br />
					Note: the <span id="delta"></span> will decrease as the top models improve, so this is only my 
					temporary estimate.
				</div>
			</div>
		</a>
	</div>
</div>
