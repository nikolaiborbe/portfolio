<script lang='ts'>
  let {title, icon} = $props();
  let Icon = icon;
</script>

<div class="flex h-fit w-fit items-center gap-2 rounded-md border border-[#3F3F46] bg-[#212123] px-3 py-1">
  <div class="scale-125">
    <Icon />
  </div>
  {title}
</div>