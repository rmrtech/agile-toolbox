<template>
  <div class="flex-row justify-center items-center p-2">
    <div class="flex justify-center">
      <base-flip-card :cardBackValue="cardBackValue">
        <template v-slot="slotProps">
          <p>{{ slotProps.cardBackContent }}</p>
        </template>
      </base-flip-card>
    </div>
    <div class="flex justify-center text-sm font-medium">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BaseFlipCard from "../ui/BaseFlipCard.vue";
import { computed } from "vue";
export default {
  props: ["handValue"],
  components: {
    BaseFlipCard
  },

  setup(props) {
    const cardBackValue = computed(() => props.handValue);

    return {
      cardBackValue
    };
  }
};
</script>

<style></style>
