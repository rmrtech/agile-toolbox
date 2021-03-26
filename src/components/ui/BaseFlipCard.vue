<template>
  <div class="flip-card">
    <div
      class="w-8 h-11 bg-yellow-50 shadow-md rounded-sm flex justify-center items-center p-1 flip-card-inner"
      :class="{ showCard: toggleCard }"
    >
      <div class="flip-card-front flex p-1 min-w-full min-h-full">
        <div class="border-red-400 border-2 bgcard bg-clip-border min-w-full min-h-full"></div>
      </div>
      <div class="flip-card-back">
        <slot :cardBackContent="userHandValue"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, ref } from "vue";
export default {
  props: ["cardBackValue"],
  setup(props) {
    const toggleCard = inject("showCards");
    //inject("showCards", true);
    const userHandValue = computed(() => props.cardBackValue);

    return {
      userHandValue,
      toggleCard
    };
  }
};
</script>

<style>
.bgcard {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 10 12c1.67 0 3.182-.683 4.27-1.785A5.998 5.998 0 0 0 14 12h2a4 4 0 0 1 4-4V6c-1.67 0-3.182.683-4.27 1.785C15.905 7.22 16 6.622 16 6c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 20 6V4a4 4 0 0 1-4-4h-2c0 .622.095 1.221.27 1.785A5.982 5.982 0 0 0 10 0C8.33 0 6.818.683 5.73 1.785 5.905 1.22 6 .622 6 0H4a4 4 0 0 1-4 4v2c1.67 0 3.182.683 4.27 1.785A5.998 5.998 0 0 1 4 6c0-.622.095-1.221.27-1.785A5.982 5.982 0 0 1 0 6v2a4 4 0 0 1 4 4h2zm-4 0a2 2 0 0 0-2-2v2h2zm16 0a2 2 0 0 1 2-2v2h-2zM0 2a2 2 0 0 0 2-2H0v2zm20 0a2 2 0 0 1-2-2h2v2zm-10 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' fill='%23ff0000' fill-opacity='0.45' fill-rule='evenodd'/%3E%3C/svg%3E");
}
.flip-card {
  perspective: 1000px;
  -moz-perspective: perspective(1000px);
}
.flip-card-inner {
  position: relative;
  transition: transform 0.6s;
  -moz-transition: 0.6s;
  transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
}

.showCard {
  transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: rotateY(0deg);
}
.flip-card-back {
  transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
}
</style>
