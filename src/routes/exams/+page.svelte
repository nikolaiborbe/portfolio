<script lang="ts">
	const prefetched = new Set<string>();

	function prefetch(href: string) {
		if (prefetched.has(href)) return;
		prefetched.add(href);
		const link = document.createElement('link');
		link.rel = 'prefetch';
		link.href = href;
		document.head.appendChild(link);
	}
</script>

<h1 class="text-4xl">Exams</h1>

<br>

<h3 class="text-2xl font-semibold">TMT4110 - Kjemi med laboratoriekurs</h3>
<div class="pl-4">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<ul class="list-disc" onmouseover={(e) => {
		const anchor = (e.target as HTMLElement).closest('a');
		if (anchor?.href) prefetch(anchor.href);
	}}>
		<li>
			<a href="/exams/Eks_2023_V_TMT4106_TMT4110_LF.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Eksamen 2023 Vår (med løsningsforslag)</a>
		</li>
		<li>
			<a href="/exams/Eksamen kont 2024.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Eksamen kont 2024</a>
		</li>
		<li>
			<a href="/exams/Eksamen kont med LF.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Eksamen kont (med løsningsforslag)</a>
		</li>
		<li>
			<a href="/exams/Eksamen_TMT4101_4106_4110_V_2025 m_LF_SV.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Eksamen 2025 Vår (med løsningsforslag)</a>
		</li>
	</ul>
</div>
