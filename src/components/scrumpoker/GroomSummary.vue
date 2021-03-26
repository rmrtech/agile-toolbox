<template>
  <div class="m-2 px-2 text-base font-medium text-gray-600">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">Total Stories:</div>
      <div class="flex justify-start">{{ totalStories }}</div>
      <div class="col-span-2">Total Points:</div>
      <div class="flex justify-start">{{ totalPoints }}</div>
      <div class="col-span-2">Avg Groom Time:</div>
      <div class="flex justify-start">{{ averageGroomTime }}</div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, watch } from "vue";
export default {
  setup(props) {
    const store = useStore();
    const totalStories = ref(0);
    const totalPoints = ref(0);
    const averageGroomTime = ref(0);

    const sessionStartTime = computed(() => store.getters["sessionStartTime"]);
    const allStories = computed(() => store.getters["stories/allStories"]);
    watch(
      allStories,
      (stories, prevStories) => {
        let points = 0;
        totalStories.value = stories.length;
        totalPoints.value = calculateTotalPoints(stories);
        averageGroomTime.value = getAverageGroomTime(stories);
      },
      { deep: true }
    );

    function calculateTotalPoints(stories) {
      if (stories) {
        const totalGroomedPoints = stories
          .filter(story => story.status === "Refined")
          .map(story => parseInt(story.points))
          .reduce((point1, point2) => point1 + point2, 0);
        return totalGroomedPoints;
      } else {
        return 0;
      }
    }

    function getAverageGroomTime(stories) {
      if (stories && stories.length > 0) {
        const allgroomedStories = stories.filter(
          story => story.groomTime && story.groomTime != null
        );
        const totalGroomTime = allgroomedStories
          .map(story => story.groomTime)
          .reduce((time1, time2) => time1 + time2, 0);

        return totalGroomTime === 0
          ? "00:00:00"
          : msToTime(totalGroomTime / allgroomedStories.length);
      } else {
        return "00:00:00";
      }
    }

    function msToTime(duration) {
      let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    }

    function created() {
      const stories = allStories.value;
      totalStories.value = stories.length;
      totalPoints.value = calculateTotalPoints(stories);
      averageGroomTime.value = getAverageGroomTime(stories);
    }
    created();

    return {
      totalStories,
      totalPoints,
      averageGroomTime
    };
  }
};
</script>

<style></style>
