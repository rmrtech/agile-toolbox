<template>
  <router-link :to="toPath" class="menu-link" active-class="active">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ["toPath"],
};
</script>

<style scoped>
.menu-link {
  @apply text-indigo-300 hover:bg-indigo-700 hover:text-white py-1.5 rounded-md text-sm font-medium w-32 text-center;
}
.active {
  @apply bg-indigo-900 text-white ring-4 ring-indigo-300 ring-opacity-50;
}
</style>
