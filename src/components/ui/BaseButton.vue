<template>
  <button class="button" :class="{'btn-disabled' : isDisabled}" :disabled="isDisabled">
    <slot></slot>
  </button>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    disabled: Boolean
  },

  setup(props) {
    const isDisabled = computed(() => props.disabled);

    return {
      isDisabled
    };
  }
};
</script>

<style scoped>
.button {
  @apply inline-block w-24 justify-center px-2 border border-transparent shadow text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}
.btn-disabled {
  @apply cursor-not-allowed bg-opacity-50 hover:bg-indigo-600 hover:bg-opacity-50;
}
</style>