<script lang="ts">
  let { link } = $props();
  import SvelteTooltip from 'svelte-tooltip';
  let color = $state("gray");
</script>

<SvelteTooltip tip="Website">
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label="Link to live website">
    <div
      role="button"
      aria-label="Link to live website"
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
      height="20px">
      <path d="M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z"></path><path d="M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z"></path>
    </svg>
    </div>

  </a>

</SvelteTooltip>