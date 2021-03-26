<template>
  <div
    class="flex flex-col min-h-screen bg-gray-200"
    :class="{ overFlowHidden: isModelActive || hasSessionEnded }"
  >
    <the-header :authenticated="isAuthenticated" class="flex-grow-0"></the-header>
    <main class="flex flex-col flex-grow px-3 py-4 justify-center" style="margin-top: 8.25rem">
      <router-view v-slot="{ Component }">
        <transition name="slidein" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <the-footer class="flex-grow-0"></the-footer>
  </div>
  <base-spinner v-if="isLoading"></base-spinner>
  <session-end-model :sessionEnded="hasSessionEnded"></session-end-model>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import SessionEndModel from "./components/auth/SessionEndModel.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    TheHeader,
    TheFooter,
    BaseSpinner,
    SessionEndModel
  },

  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters["authenticated"]);
    const isLoading = computed(() => store.getters["isLoading"]);
    const hasSessionEnded = computed(() => store.getters["sessionEnded"]);
    const isModelActive = computed(() => store.getters["isModelActive"]);

    return {
      isModelActive,
      isLoading,
      hasSessionEnded,
      isAuthenticated
    };
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.overFlowHidden {
  @apply overflow-hidden fixed w-full overscroll-none;
}

.slidein-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slidein-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.slidein-enter-active {
  transition: all 0.3s ease-out;
}

.slidein-leave-active {
  transition: all 0.3s ease-in;
}

.slidein-enter-to,
.slidein-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
