<template>
  <div class="flex flex-col min-h-full">
    <div
      class="px-3 py-1 text-sm font-semibold"
      v-if="groomedStoryId && groomedStoryId !== ''"
    >Story: {{groomedStoryId}}</div>
    <div class="flex-grow overflow-auto h-40">
      <div class="grid grid-cols-4">
        <user-hand-item
          v-for="userHand in userHands"
          :key="userHand.userId"
          :handValue="userHand.hand"
        >{{ userHand.userId }}</user-hand-item>
      </div>
    </div>
    <div v-if="isModerator" class="flex-none p-2 bg-blue-50 text-right">
      <base-button
        :disabled="userHands.length === 0"
        @click="toggleCards"
      >{{toggleCard ? "Allow Tip In" : "Show"}}</base-button>
    </div>
  </div>
</template>

<script>
import UserHandItem from "../scrumpoker/UserHandItem.vue";
import BaseButton from "../ui/BaseButton.vue";
import { ref, provide, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    UserHandItem,
    BaseButton
  },

  setup() {
    const store = useStore();
    const userHands = computed(() => store.getters["userhands/allUserHands"]);
    const isModerator = store.getters.role === "Moderator";

    const userHandSummary = computed(
      () => store.getters["userhands/userHandSummary"]
    );
    watch(userHandSummary, (userHandSummary, prevUserHandSummary) => {
      if (userHandSummary && userHandSummary.length > 0) {
        toggleCard.value = true;
      } else {
        toggleCard.value = false;
      }
    });

    let toggleCard = ref(false);
    provide("showCards", toggleCard);

    const groomedStoryId = computed(
      () => store.getters["stories/groomedStoryId"]
    );

    watch(groomedStoryId, (groomedStoryId, prevGroomedStoryId) => {
      if (groomedStoryId !== prevGroomedStoryId) {
        store.dispatch("userhands/resetUserHandSummary");
        toggleCard.value = false;
      }
    });

    watch(userHands, (userHands, prevUserHands) => {
      toggleCard.value = false;
    });

    function toggleCards() {
      toggleCard.value = !toggleCard.value;
      if (toggleCard.value) {
        store.dispatch("userhands/summarizeUserHands");
      } else {
        store.dispatch("userhands/resetUserHandSummary");
      }
    }

    async function bindUserHands() {
      try {
        await store.dispatch("userhands/bindUserHands");
      } catch (err) {
        console.log(err);
      }
    }

    async function bindUserHandSummary() {
      try {
        await store.dispatch("userhands/watchUserHandSummary");
      } catch (err) {
        console.log(err);
      }
    }

    function created() {
      bindUserHands();
      bindUserHandSummary();
      toggleCard.value = userHandSummary.value.length > 0;
      console.log("Assigned togglecard:" + toggleCard.value);
    }
    created();

    return {
      isModerator,
      toggleCards,
      toggleCard,
      userHands,
      groomedStoryId
    };
  }
};
</script>

<style>
</style>
