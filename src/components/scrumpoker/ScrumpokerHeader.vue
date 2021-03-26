<template>
  <div class="flex justify-between w-full">
    <h1>Scrumpoker</h1>
    <div v-if="isModerator" class="flex justify-end">
      <base-icon-button
        color="blue"
        icon="addstory"
        @click="toggleAddStoryModel"
      >
        <p>Add UserStory</p>
      </base-icon-button>
    </div>
    <add-user
      :showAddStory="showAddStoryModel"
      @close-model="toggleAddStoryModel"
    ></add-user>
  </div>
</template>

<script>
import BaseIconButton from "../ui/BaseIconButton.vue";
import AddUser from "./AddStory.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    BaseIconButton,
    AddUser,
  },

  setup() {
    const store = useStore();
    const isModerator = store.getters.role === "Moderator";
    let showAddStoryModel = ref(false);
    function toggleAddStoryModel() {
      showAddStoryModel.value = !showAddStoryModel.value;
      store.dispatch("toggleModel", showAddStoryModel.value);
    }

    return {
      isModerator,
      showAddStoryModel,
      toggleAddStoryModel,
    };
  },
};
</script>

<style></style>
