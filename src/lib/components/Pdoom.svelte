<script lang="ts">
	// Pure CSS tooltip—no extra TypeScript needed
</script>

<div class="flex justify-start p-4 md:justify-end">
	<div class="flex gap-2">
		<!-- Wrap only the text in a “group” so the tooltip appears only when hovering this text -->
		<a href="https://ai-2027.com/" target="_blank" rel="noopener noreferrer">
			<div class="group relative cursor-pointer font-bold text-[#D8D8D8]">
				P(doom) ≈ <span>30%</span>

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
					<pre class="whitespace-pre font-mono text-sm leading-none">
           /\_/\____/\_/\
      ____/            \____
     /  _     .----.     _  \
    /  / \___/ 0  0 \___/ \  \
   |  |  (___)   ^   (___) |  |
   |  |        \___/       |  |
   |  |   .---'_____'---.  |  |
   |  |  /   /  AI  \   \  |  |
   |  |  \__/  DOOM  \__/  |  |
    \  \      \_____/      /  /
     \__\_____/     \_____/__/
         /  /|     |\  \
        /__/ |_____| \__\
        </pre>
				</div>
			</div>
		</a>
	</div>
</div>
