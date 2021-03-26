<template>
  <div class="flex flex-col justify-between items-center">
    <transition-group name="tip-card-group" tag="div" class="h-28 relative p-4 m-2 min-w-full">
      <div
        class="layout"
        v-for="(tipItem, index) in tipItems"
        :class="[
          { 'tip-disabled': isTipDisabled(index) },
          tipStyle(index).zPos,
          tipStyle(index).mPos,
        ]"
        :key="tipItem[0]"
        @click="selectHand(index)"
      >{{ tipItem[1] }}</div>
    </transition-group>
    <div class="flex-grow"></div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();

    let tipItems = ref([
      [1, "1"],
      [2, "2"],
      [3, "3"],
      [4, "5"],
      [5, "8"],
      [6, "13"],
      [7, "21"],
      [8, "34"],
      [9, "55"],
      [10, "?"]
    ]);
    const tipStyles = [
      { id: 1, zPos: "-z-30", mPos: "ml-0" },
      { id: 2, zPos: "-z-20", mPos: "ml-8" },
      { id: 3, zPos: "-z-10", mPos: "ml-16" },
      { id: 4, zPos: "z-0", mPos: "ml-24" },
      { id: 5, zPos: "z-10", mPos: "ml-32" },
      { id: 6, zPos: "z-20", mPos: "ml-40" },
      { id: 7, zPos: "z-30", mPos: "ml-48" },
      { id: 8, zPos: "z-40", mPos: "ml-56" },
      { id: 9, zPos: "z-50", mPos: "ml-64" },
      { id: 10, zPos: "z-50", mPos: "ml-96 selected-item" }
    ];

    const groomedStoryId = computed(
      () => store.getters["stories/groomedStoryId"]
    );

    watch(groomedStoryId, (groomedStoryId, prevGroomedStoryId) => {
      if (groomedStoryId !== prevGroomedStoryId) {
        resetTipItems();
      }
    });

    const userHandSummary = computed(
      () => store.getters["userhands/userHandSummary"]
    );
    const isTipDisabled = computed(() => itemIndex =>
      userHandSummary.value.length > 0 && itemIndex < 9
    );

    const tipStyle = computed(() => tipIndex => tipStyles[tipIndex]);

    function selectHand(index) {
      const lastIndex = tipItems.value.length - 1;
      if (index === lastIndex || userHandSummary.value.length > 0) {
        return;
      }
      const lastItem = tipItems.value.pop();
      const currItem = tipItems.value[index];
      tipItems.value.splice(index, 1);
      const lastItemIndex =
        lastItem[0] - 1 > index ? lastItem[0] - 2 : lastItem[0] - 1;
      tipItems.value.splice(lastItemIndex, 0, lastItem);

      tipItems.value.push(currItem);
      if (groomedStoryId.value !== "") {
        store.dispatch("userhands/tipHand", currItem[1]);
      }
    }

    function resetTipItems() {
      tipItems.value = [
        [1, "1"],
        [2, "2"],
        [3, "3"],
        [4, "5"],
        [5, "8"],
        [6, "13"],
        [7, "21"],
        [8, "34"],
        [9, "55"],
        [10, "?"]
      ];
    }

    return {
      tipItems,
      tipStyle,
      selectHand,
      isTipDisabled
    };
  }
};
</script>

<style scoped>
.layout {
  @apply absolute bg-yellow-50 shadow-md w-14 h-20 px-1 rounded transform rotate-6 cursor-pointer;
}
.tip-card-group-move {
  transition: transform 0.8s ease;
}
.selected-item {
  @apply transform rotate-0 scale-125 shadow-xl cursor-auto;
}
.tip-disabled {
  @apply cursor-not-allowed;
}
</style>
