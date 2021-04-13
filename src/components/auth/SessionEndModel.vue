<template>
  <teleport to="#app">
    <transition name="dialog">
      <base-model v-if="sessionEnded">
        <div
          class="bg-white rounded-lg text-center overflow-hidden shadow-xl w-5/12 m-auto"
        >
          <div class="py-4 text-left px-6">
            <div class="flex justify-between items-center pb-3">
              <p class="text-red-500 text-2xl font-bold">Session ended</p>
            </div>
            <div class="text-sm pb-3">
              <p>No active sessions could be found.</p>
              <p>Please sign out to create or join a new session.</p>
            </div>
            <div>
              <p class="text-red-500 text-sm font-medium">
                Automatic sign out happens in {{ timeOut }} seconds
              </p>
            </div>
          </div>

          <div class="flex justify-end p-2 bg-gray-100">
            <button
              type="button"
              class="border border-red-200 inline-flex justify-center rounded-md shadow-sm px-2 py-1 bg-transparent text-base font-medium text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              @click="signOut"
            >
              Sign Out
            </button>
          </div>
        </div>
      </base-model>
    </transition>
  </teleport>
</template>

<script>
import BaseModel from "../ui/BaseModel.vue";
import { useStore } from "vuex";
import { onUpdated, ref } from "vue";
export default {
  components: {
    BaseModel,
  },
  props: ["sessionEnded"],
  setup(props) {
    const store = useStore();

    function signOut() {
      store.dispatch("signOut");
    }

    let timeOut = ref(30);

    function autoSignOutOnTimeOut() {
      if (props.sessionEnded) {
        setTimeout(() => {
          if (timeOut.value > 1) {
            timeOut.value = timeOut.value - 1;
            autoSignOutOnTimeOut();
          } else {
            signOut();
          }
        }, 1000);
      }
    }

    onUpdated(() => {
      if (props.sessionEnded) {
        timeOut.value = 30;
        autoSignOutOnTimeOut();
      }
    });

    function created() {
      if (props.sessionEnded) {
        timeOut.value = 30;
        autoSignOutOnTimeOut();
      }
    }
    created();

    return {
      signOut,
      timeOut,
    };
  },
};
</script>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>