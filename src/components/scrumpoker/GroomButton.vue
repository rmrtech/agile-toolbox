<template>
  <button class="relative grmbtn h-6" :class="buttonStyle">
    <span class="absolute" v-if="isActive">
      <svg fill="none" viewBox="0 0 24 24" class="w-3 h-3 animate-spin">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <p class="mx-auto">{{ label }}</p>
  </button>
</template>

<script>
import { ref, computed } from "vue";
export default {
  props: {
    actionAllowed: Boolean,
    isGrooming: Boolean,
    groomLabel: String,
    disabled: Boolean
  },
  setup(props) {
    const isActive = computed(() => props.isGrooming);
    const label = computed(() => props.groomLabel);
    const isDisabled = computed(() => props.disabled);

    const buttonStyle = computed(() => {
      return {
        grmbtnactive: isActive.value,
        grmbtnenabled: !isDisabled.value,
        grmbtndisabled: isDisabled.value,
        grmbtnnotallowed: !props.actionAllowed
      };
    });

    return {
      isActive,
      label,
      buttonStyle
    };
  }
};
</script>

<style scoped>
.grmbtn {
  @apply w-28 inline-flex items-center border-2 border-blue-600 rounded-full text-xs font-medium text-blue-600 px-2 transition duration-300 ease-in-out focus:outline-none;
}
.grmbtnenabled {
  @apply hover:bg-blue-600 hover:text-white;
}
.grmbtndisabled {
  @apply cursor-not-allowed text-opacity-50 border-opacity-50;
}
.grmbtnnotallowed {
  @apply cursor-default;
}
.grmbtnactive {
  @apply bg-blue-600 text-white border-blue-600 ring-2 ring-yellow-400 ring-opacity-80;
}
</style>