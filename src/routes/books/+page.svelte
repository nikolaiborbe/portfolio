<script lang="ts">
	const prefetched = new Set<string>();

	const bookCategories = [
		{
			title: 'Physics',
			books: [
				{
					title: 'Introduction To Optics',
					href: '/books/introduction_to_optics.pdf'
				},
				{
					title: 'Quantum Mechanics (3rd edition)',
					href: '/books/quantum_mechanics_3rd.pdf'
				},
				{
					title: 'Thermodynamics by Enrico Fermi',
					href: 'https://materias.df.uba.ar/f4Ba2013c1/files/2012/07/57652344-Thermodynamics-by-Enrico-Fermi.pdf'
				}
			]
		},
		{
			title: 'Mathematics',
			books: [
				{
					title: 'Linear Algebra',
					href: '/books/linear_algebra.pdf'
				},
				{
					title: 'Advanced Engineering Mathematics',
					href: '/books/advanced_engineering_mathematics.pdf'
				},
				{
					title: 'Numerical Analysis (2nd edition)',
					href: '/books/sauer_numerical_analysis_2nd.pdf'
				},
				{
					title: 'Elementary Linear Algebra Applications',
					href: '/books/elementary_linear_algebra_applications.pdf'
				},
				{
					title: 'Probability And Statistics For Engineers',
					href: '/books/probability_and_statistics_for_engineers.pdf'
				}
			]
		},
		{
			title: 'Engineering',
			books: [
				{
					title: 'Rocket Propulsion Elements',
					href: '/books/rocket_propulsion_elements.pdf'
				},
				{
					title: 'Deep Learning In Computational Mechanics',
					href: '/books/deep_learning_in_computational_mechanics.pdf'
				}
			]
		},
		{
			title: 'Chemistry',
			books: [
				{
					title: 'General Chemistry: Principles And Modern Applications',
					href: '/books/general_chemistry.pdf'
				}
			]
		},
		{
			title: 'Programming',
			books: [
				{
					title: 'Programming: Principles And Practice Using C++ (3rd edition)',
					href: '/books/programming_principles_and_practice_using_cpp.pdf'
				}
			]
		}
	];

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

<br />

<div class="space-y-5">
	{#each bookCategories as category}
		<section>
			<h2 class="text-2xl font-semibold">{category.title}</h2>
			<div class="pl-4">
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_mouse_events_have_key_events -->
				<ul
					class="list-disc"
					onmouseover={(e) => {
						const anchor = (e.target as HTMLElement).closest('a');
						if (anchor?.href) prefetch(anchor.href);
					}}
				>
					{#each category.books as book}
						<li>
							<a href={book.href} class="text-fg-brand underline hover:no-underline" target="_blank"
								>{book.title}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/each}
</div>
