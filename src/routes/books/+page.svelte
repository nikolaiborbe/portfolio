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

<h1 class="text-4xl">Books</h1>

<br>

<div class="pl-4">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<ul class="list-disc" onmouseover={(e) => {
		const anchor = (e.target as HTMLElement).closest('a');
		if (anchor?.href) prefetch(anchor.href);
	}}>
		<li>
			<a href="/books/introduction_to_optics.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Introduction To Optics</a>
		</li>
		<li>
			<a href="/books/rocket_propulsion_elements.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Rocket Propulsion Elements</a>
		</li>
		<li>
			<a href="/books/quantum_mechanics_3rd.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Quantum Mechanics (3rd edition)</a>
		</li>
		<li>
			<a href="/books/linear_algebra.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Linear Algebra</a>
		</li>
		<li>
			<a href="/books/advanced_engineering_mathematics.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Advanced Engineering Mathematics</a>
		</li>
		<li>
			<a href="/books/elementary_linear_algebra_applications.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Elementary Linear Algebra Applications</a>
		</li>
		<li>
			<a href="/books/probability_and_statistics_for_engineers.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Probability And Statistics For Engineers</a>
		</li>
		<li>
			<a href="/books/general_chemistry.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">General Chemistry: Principles And Modern Applications</a>
		</li>
		<li>
			<a href="/books/deep_learning_in_computational_mechanics.pdf" class="text-fg-brand underline hover:no-underline" target="_blank">Deep Learning In Computational Mechanics</a>
		</li>
	</ul>
</div>
