<template>
  <div class="flex flex-col bg-white shadow-md overflow-hidden rounded-lg">
    <div class="flex-grow-0 px-3 py-2 h-16">
      <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ description }}</p>
    </div>
    <div class="flex-grow border-t border-gray-200">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "description"]
};
</script>

<style></style>
