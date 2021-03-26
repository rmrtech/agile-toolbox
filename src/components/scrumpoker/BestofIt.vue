<template>
  <div class="h-full grid grid-cols-3 justify-between divide-grey-300 divide-x gap-3 ml-8 p-5">
    <div class="col-span-2 relative bg-white border-l border-b border-red-300 mt-auto">
      <table class="min-w-full">
        <tbody class="bg-white divide-y divide-blue-200 text-xs font-extralight">
          <tr>
            <td class="graphx">
              <div>100%</div>
            </td>
          </tr>
          <tr>
            <td class="graphx">
              <div>80%</div>
            </td>
          </tr>
          <tr>
            <td class="graphx">
              <div>50%</div>
            </td>
          </tr>
          <tr>
            <td class="graphx">
              <div>30%</div>
            </td>
          </tr>
          <tr>
            <td class="graphx">
              <div>20%</div>
            </td>
          </tr>
          <tr>
            <td class="graphx">
              <div>10%</div>
            </td>
          </tr>
          <tr>
            <td class="graphx">
              <div>0%</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="grid grid-flow-col auto-cols-max min-w-full absolute bottom-0 gap-2 ml-2">
        <div
          v-for="handSummary in userHandSummary"
          :key="handSummary.hand"
          class="mt-auto"
          @click="selectBluechip(handSummary.hand)"
        >
          <div class="text-center w-5">{{ handSummary.hand }}</div>
          <div
            class="bg-purple-500 w-5 box-content"
            :class="[{barselected : isSelectedBar(handSummary.hand)}, {barhover : isModerator && !isSelectedBar(handSummary.hand)}]"
            :style="barHeight(handSummary.percentage)"
          ></div>
        </div>
      </div>
    </div>
    <div class="col-span-1 flex justify-center">
      <div class="flex justify-center items-center mt-auto">
        <div class="grid grid-rows-2 gap-4">
          <div class="flex justify-center items-center underline">Blue Chip</div>
          <div class="flex justify-center">
            <div class="flex justify-center items-center w-10 h-14 shadow-md rounded">{{ blueChip }}</div>
          </div>
          <div class="flex justify-center">
            <base-button
              v-if="isModerator"
              :disabled="blueChip === '?'"
              @click="confirmStory"
            >Confirm</base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "../ui/BaseButton.vue";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
export default {
  components: {
    BaseButton
  },

  setup(props) {
    const store = useStore();
    const isModerator = store.getters.role === "Moderator";
    const blueChip = ref("?");
    const groomedStoryId = computed(
      () => store.getters["stories/groomedStoryId"]
    );
    watch(groomedStoryId, (groomedStoryId, prevGroomedStoryId) => {
      if (groomedStoryId !== prevGroomedStoryId) {
        blueChip.value = "?";
      }
    });

    const allStories = computed(() => store.getters["stories/allStories"]);
    watch(
      allStories,
      (stories, prevStories) => {
        console.log("watching story change");
        const groomedStory = stories.find(
          story => story.storyId === groomedStoryId.value
        );
        if (groomedStory) {
          blueChip.value = groomedStory.points;
        }
      },
      { deep: true }
    );

    const userHandSummary = computed(
      () => store.getters["userhands/userHandSummary"]
    );
    watch(userHandSummary, (userHandSummary, prevUserHandSummary) => {
      const groomedStory = allStories.value.find(
        story => story.storyId === groomedStoryId.value
      );
      blueChip.value = groomedStory ? groomedStory.points : "?";
      // if (userHandSummary && userHandSummary.length == 0) {
      //   blueChip.value = "?";
      // }
    });

    function barHeight(handPercentage) {
      let heightPercentage = 0;
      if (handPercentage <= 30) {
        heightPercentage = (handPercentage / 30) * 50;
      } else if (handPercentage > 30 && handPercentage <= 50) {
        heightPercentage = 50 + ((handPercentage - 30) / 20) * 16.66;
      } else if (handPercentage > 50 && handPercentage <= 80) {
        heightPercentage = 66.66 + ((handPercentage - 50) / 30) * 16.66;
      } else if (handPercentage > 80 && handPercentage <= 100) {
        heightPercentage = 83.33 + ((handPercentage - 80) / 20) * 16.66;
      }
      const heightpx = (7.8 * heightPercentage) / 100;
      return "height: " + heightpx + "rem";
    }

    const isSelectedBar = computed(() => handValue =>
      blueChip.value === handValue
    );

    function selectBluechip(selectedValue) {
      if (isModerator) {
        blueChip.value = selectedValue;
      }
    }

    function confirmStory() {
      if (blueChip.value === "?") {
        return;
      }
      console.log("Confirming story");
      const storyId = groomedStoryId.value;
      const updatePayload = {
        storyId: storyId,
        points: blueChip.value,
        status: "Refined"
      };

      store.dispatch("stories/updateStory", updatePayload);
      store.dispatch("userhands/resetUserHands", storyId);
    }

    function initBlueChip() {
      const groomedStory = allStories.value.find(
        story => story.storyId === groomedStoryId.value
      );
      blueChip.value = groomedStory ? groomedStory.points : "?";
    }

    function created() {
      initBlueChip();
    }
    created();

    return {
      isModerator,
      userHandSummary,
      barHeight,
      blueChip,
      selectBluechip,
      isSelectedBar,
      confirmStory
    };
  }
};
</script>
<style>
.graphx {
  @apply h-5 align-bottom text-right;
}
.graphx div {
  @apply -ml-12 -mb-3 w-7;
}

.barselected {
  @apply bg-purple-700 border-l-2 border-t-2 border-r-2 border-yellow-300;
}

.barhover {
  @apply hover:bg-purple-600;
}
</style>