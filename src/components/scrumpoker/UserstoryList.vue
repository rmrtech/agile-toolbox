<template>
  <div class="overflow-auto max-h-40">
    <table class="min-w-full">
      <thead>
        <tr>
          <th>Userstory</th>
          <th>Description</th>
          <th class="w-28 text-center">Status</th>
          <th class="text-center">Points</th>
          <th>
            <span class="sr-only">Groom</span>
          </th>
          <th v-if="isModerator">
            <span class="sr-only">Delete</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="hasStories" class="bg-white divide-y divide-gray-200">
        <tr v-for="userstory in userStories" :key="userstory.storyId">
          <td class="w-3 min-w-min">
            <div class="text-sm font-medium text-gray-900">
              {{ userstory.storyId }}
            </div>
          </td>
          <td>
            <div class="w-48 min-w-min text-sm text-gray-900">
              {{ userstory.description }}
            </div>
          </td>
          <td>
            <span :class="statusStyle(userstory.status)">{{
              userstory.status
            }}</span>
          </td>
          <td>
            <div
              class="mx-auto w-2 text-sm text-center font-medium text-gray-900"
              :class="{ animatepoint: isGroomedStory(userstory.storyId) }"
            >
              {{ userstory.points }}
            </div>
          </td>
          <td class="text-center text-sm font-medium w-36 min-w-min">
            <groom-button
              v-if="isModerator || isGroomedStory(userstory.storyId)"
              :actionAllowed="isModerator"
              :isGrooming="isGroomedStory(userstory.storyId)"
              :groomLabel="groomActionLabel(userstory.status)"
              :disabled="disableGroomButton(userstory.storyId)"
              @click="groomStory(userstory.storyId)"
            ></groom-button>
          </td>
          <td v-if="isModerator">
            <div class="flex justify-center">
              <stop-link
                v-if="isModerator && isGroomedStory(userstory.storyId)"
                @click="cancelGrooming(userstory.storyId, userstory.points)"
              ></stop-link>
              <delete-link
                v-else-if="isModerator"
                @click="removeStory(userstory.storyId)"
              ></delete-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="flex justify-center items-center text-red-500 text-xl m-2"
      v-if="!hasStories"
    >
      {{ emptyStoryMessage }}
    </div>
  </div>
</template>

<script>
import DeleteLink from "../ui/DeleteLink.vue";
import StopLink from "../ui/StopLink.vue";
import GroomButton from "./GroomButton.vue";
import { computed, reactive } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    DeleteLink,
    StopLink,
    GroomButton,
  },
  setup() {
    const store = useStore();
    const isModerator = store.getters.role === "Moderator";

    const groomedStoryId = computed(
      () => store.getters["stories/groomedStoryId"]
    );

    const userStories = computed(() => store.getters["stories/allStories"]);
    const emptyStoryMessage = computed(() =>
      isModerator ? "Add stories for refinement" : "Stories yet to be added"
    );

    const hasStories = computed(() => {
      const stories = userStories.value;
      return stories && stories.length > 0;
    });
    const groomActionLabel = computed(() => (storyStatus) => {
      if (storyStatus === "Refined") {
        return "Regroom";
      } else if (storyStatus === "Refining") {
        return "Grooming";
      } else {
        return "Groom";
      }
    });

    const statusStyle = computed(() => (storyStatus) => {
      if (storyStatus === "Refined") {
        return { rstatus: true };
      } else if (storyStatus === "Refining") {
        return { rgstatus: true };
      } else {
        return { nrstatus: true };
      }
    });

    const isGroomedStory = computed(
      () => (storyId) => storyId === groomedStoryId.value ? true : false
    );

    const disableGroomButton = computed(() => (storyId) => {
      const groomStoryValue = groomedStoryId.value;
      return groomStoryValue !== "" && storyId !== groomStoryValue;
    });

    function groomStory(storyId) {
      if (groomedStoryId.value !== "" || !isModerator) {
        return;
      }

      store.dispatch("userhands/resetUserHands", storyId);
      store.dispatch("stories/startGrooming", storyId);
    }

    function cancelGrooming(storyId, points) {
      let status = "Not Refined";
      if (points !== "?") {
        status = "Refined";
      }

      store.dispatch("stories/cancelGrooming", { storyId, status });
      store.dispatch("userhands/resetUserHands", storyId);
    }

    function removeStory(storyId) {
      store.dispatch("stories/removeStory", storyId);
    }

    return {
      isModerator,
      userStories,
      hasStories,
      groomActionLabel,
      statusStyle,
      isGroomedStory,
      disableGroomButton,
      groomStory,
      cancelGrooming,
      removeStory,
      emptyStoryMessage,
    };
  },
};
</script>

<style>
th {
  @apply sticky top-0 px-4 py-2 bg-blue-400 text-gray-50 text-left text-xs font-medium uppercase tracking-wider shadow z-10;
  clip-path: inset(0 0 -10px 0);
}

td {
  @apply px-4 py-2 whitespace-nowrap;
}

.status {
  @apply w-28 inline-block px-2 text-xs text-center leading-5 font-semibold rounded-full;
}
.nrstatus {
  @apply status;
  @apply bg-red-100 text-red-800;
}
.rgstatus {
  @apply status;
  @apply bg-blue-100 text-blue-800;
}
.rstatus {
  @apply status;
  @apply bg-green-100 text-green-800;
}
.animatepoint {
  @apply animate-ping text-red-500;
}
</style>
