<script lang="ts">
  let { color } = $props();
  
</script>

<div class={` animate-pulse rounded-[0.25rem] h-3 w-3 flex justify-center items-center self-center`}>
  <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="4" fill={color} />
  </svg>
</div>