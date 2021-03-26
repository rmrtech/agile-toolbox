<template>
  <teleport to="#app">
    <base-model></base-model>
    <div class="spinner">
      <svg fill="none" viewBox="0 0 24 24" class="text-indigo-700 w-32 h-32 animate-spin">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-100"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  </teleport>
</template>

<script>
import BaseModel from "./BaseModel.vue";
export default {
  components: {
    BaseModel
  }
};
</script>

<style scoped>
.spinner {
  @apply fixed min-h-screen flex items-center justify-center bg-transparent left-0 bottom-0 right-0 top-0 w-full h-full overscroll-none z-999;
}
</style>