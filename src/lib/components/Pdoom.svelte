<script lang="ts">
  // Pure CSS tooltip—no extra TypeScript needed
</script>

<div class="flex justify-start p-4 md:justify-end">
  <div class="flex gap-2">
    <!-- Wrap only the text in a “group” so the tooltip appears only when hovering this text -->
    <div class="relative group font-bold text-[#D8D8D8] cursor-pointer">
      P(doom) ≈ <span>30%</span>

      <!-- Tooltip box: hidden until you hover over exactly the “P(doom)” text -->
      <div
        class="
          absolute
          top-full
          mt-2
          w-80
          max-w-[90vw]
          p-4
          bg-[#212123]
          text-[#D8D8D8]
          text-base
          font-normal
          leading-relaxed
          border border-gray-700
          rounded-lg
          shadow-xl
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-200
          pointer-events-none group-hover:pointer-events-auto
          z-10
          whitespace-normal

          left-0
          md:left-auto
          md:right-0
        "
      >
        I believe that by 2028 (1) all knowledge work will be obsolete, (2) NVIDIA’s market cap will pass $15T, and (3) the human species will either be on an unavoidable trajectory to doom or will become a Type III civilization with high probability.
      </div>
    </div>
  </div>
</div>