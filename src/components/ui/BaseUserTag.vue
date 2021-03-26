<template>
  <div class="flex items-center m-2 px-2">
    <span v-if="isModerator">
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
        viewBox="0 0 32 32"
      >
        <path
          d="M29.415 19L27.7 17.285A2.97 2.97 0 0 0 28 16a3 3 0 1 0-3 3a2.97 2.97 0 0 0 1.286-.3L28 20.414V28h-6v-3a7.008 7.008 0 0 0-7-7H9a7.008 7.008 0 0 0-7 7v5h28v-9.586A1.988 1.988 0 0 0 29.415 19zM4 25a5.006 5.006 0 0 1 5-5h6a5.006 5.006 0 0 1 5 5v3H4z"
          fill="#626262"
        />
        <path
          d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z"
          fill="#626262"
        />
        <rect x="0" y="0" width="32" height="32" fill="rgba(0, 0, 0, 0)" />
      </svg>
    </span>
    <span v-else>
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
        viewBox="0 0 32 32"
      >
        <path
          d="M16 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z"
          fill="#626262"
        />
        <path
          d="M26 30h-2v-5a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z"
          fill="#626262"
        />
        <rect x="0" y="0" width="32" height="32" fill="rgba(0, 0, 0, 0)" />
      </svg>
    </span>
    <div class="px-2 text-base text-left font-light">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["role"],
  setup(props) {
    const isModerator = computed(() => props.role === "Moderator");

    return {
      isModerator
    };
  }
};
</script>

<style></style>
