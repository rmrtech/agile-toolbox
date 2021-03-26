<template>
  <button class="btn" :class="{ bgblue: isBlue, bgpurple: isPurple }">
    <span v-if="addStory">
      <svg
        class="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        style="
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        "
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path d="M17 19.22H5V7h7V5H3v16h16v-9h-2z" />
        <path
          d="M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z"
        />
        <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["color", "icon"],
  setup(props) {
    const isBlue = computed(() => props.color === "blue");
    const isPurple = computed(() => props.color === "purple");
    const addStory = computed(() => props.icon === "addstory");
    return {
      isBlue,
      isPurple,
      addStory,
    };
  },
};
</script>

<style scoped>
.btn {
  @apply text-xs font-medium py-1 px-2 rounded inline-flex items-center shadow focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn span {
  @apply mr-1;
}

.bgblue {
  @apply bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500;
}

.bgpurple {
  @apply bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500;
}
</style>
