<template>
  <div class="modeloverlay">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modeloverlay {
  @apply fixed flex flex-col justify-center items-center left-0 bottom-0 right-0 top-0 w-full h-full bg-gray-800 bg-opacity-50 overscroll-none z-800;
}
</style>