<template>
  <div
    class="bg-green-50 flex justify-end items-baseline pr-1 py-1 relative border-b"
  >
    <div class="flex text-green-600">
      <span class="font-bold">SessionId:</span>
      <div class="px-1 opacity-70 relative">
        <transition name="copy-fade">
          <span
            v-if="animateCopy"
            class="px-1 absolute bg-yellow-200 rounded"
            >{{ sessionId }}</span
          >
        </transition>
        <span class="px-1">{{ sessionId }}</span>
      </div>
    </div>
    <div class="mx-2 my-auto">
      <button
        class="shadow text-xs font-medium px-1 py-1 rounded inline-flex items-center focus:outline-none border-2 border-green-600 bg-green-100 hover:bg-green-200 text-green-800"
        :class="{ 'copybtn-click': animateCopy }"
        @click="copySessionId"
      >
        <span class="flex text-center pr-1">
          <svg
            class="fill-current z-0"
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
            viewBox="0 0 512 512"
          >
            <path d="M408 432h-32v32H112V136h32v-32H80v392h328v-64z" />
            <path
              d="M176 16v384h320V153.373L358.627 16zm288 352H208V48h104v152h152zm0-200H344V48h1.372L464 166.627z"
            />
            <rect
              x="0"
              y="0"
              width="512"
              height="512"
              fill="rgba(0, 0, 0, 0)"
            />
          </svg> </span
        >Copy
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { copyText } from "vue3-clipboard";
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();
    let animateCopy = ref(false);

    const sessionId = computed(() => store.getters.sessionId);

    function copySessionId() {
      copyText(sessionId.value, sessionId.value, animateSessionIdCopy);
    }

    function animateSessionIdCopy() {
      animateCopy.value = true;
      setTimeout(() => {
        animateCopy.value = false;
      }, 100);
    }

    return {
      sessionId,
      copySessionId,
      animateCopy,
    };
  },
};
</script>
<style>
.copy-fade-leave-active {
  transition: all 0.5s ease-out;
}
.copy-fade-leave-from {
  transform: scale(1);
  opacity: 1;
}
.copy-fade-leave-to {
  transform: scale(1.5) translateY(-25px);
  opacity: 0;
}
.copybtn-click {
  @apply ring-2 ring-yellow-200;
}
</style>
