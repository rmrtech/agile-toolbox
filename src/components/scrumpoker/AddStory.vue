<template>
  <teleport to="#app">
    <transition name="dialog">
      <base-model v-if="showAddStory">
        <div
          class="flex flex-col justify-center bg-white shadow-md rounded-lg py-3 max-w-lg w-full"
        >
          <div class="px-3 py-2">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Add Story</h3>
          </div>
          <div class="flex flex-col justify-center border-t px-4 py-2 bg-white space-y-3">
            <p v-if="isFormInvalid" class="text-red-500 italic">Please enter all fields</p>
            <strong
              v-else-if="storyAdded !== ''"
              class="text-green-500 italic"
            >Story {{ storyAdded }} is added successfully</strong>
            <form @submit.prevent="addStory">
              <div>
                <label for="user_story" class="block text-sm font-medium text-gray-700">User Story</label>
                <input
                  type="text"
                  name="user_story"
                  id="user_story"
                  class="text-sm text-gray-600 border border-gray-300 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-blue-500 block w-1/2 shadow-sm rounded-md"
                  :class="{invalid: validation.invalidStoryId}"
                  v-model.trim="storyId"
                  @blur="resetError('invalidStoryId')"
                />
              </div>
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <div class="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    class="text-sm text-gray-600 shadow-sm border-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-blue-500 mt-1 block w-full h-12 rounded-md resize-none"
                    :class="{invalid: validation.invalidDescription}"
                    v-model.trim="description"
                    @blur="resetError('invalidDescription')"
                  ></textarea>
                </div>
              </div>
              <div class="mt-5 flex flex-row space-x-2 justify-end">
                <button
                  type="submit"
                  class="text-base font-medium text-white bg-blue-500 hover:bg-blue-700 py-1 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >Add</button>
                <button
                  type="button"
                  class="text-base font-medium text-blue-500 py-1 px-4 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  @click="closeModel"
                >Done</button>
              </div>
            </form>
          </div>
        </div>
      </base-model>
    </transition>
  </teleport>
</template>

<script>
import BaseModel from "../ui/BaseModel.vue";
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    BaseModel
  },
  props: ["showAddStory"],
  emits: ["close-model"],

  setup(props, context) {
    const store = useStore();

    const storyId = ref("");
    const storyAdded = ref("");

    const description = ref("");
    const isFormInvalid = ref(false);
    const validation = reactive({
      invalidStoryId: false,
      invalidDescription: false
    });

    function closeModel() {
      Object.entries(validation).forEach(
        ([validationProp, value]) => (validation[validationProp] = false)
      );
      isFormInvalid.value = false;
      resetAllMessages();
      resetAllInputs();
      context.emit("close-model");
    }

    function addStory() {
      if (!validateForm()) {
        isFormInvalid.value = true;
        return;
      }
      const storyDetails = {
        storyId: storyId.value,
        description: description.value,
        storyStatus: "Not Refined",
        storyPoints: "?"
      };
      store.dispatch("stories/saveStory", storyDetails);
      storyAdded.value = storyId.value;
      resetAllInputs();
    }

    function validateForm() {
      let valid = true;
      if (!storyId.value) {
        validation.invalidStoryId = true;
        valid = false;
      }
      if (!description.value) {
        validation.invalidDescription = true;
        valid = false;
      }
      return valid;
    }

    function resetError(invalidField) {
      validation[invalidField] = false;
      isFormInvalid.value = false;
      resetAllMessages();
    }

    function resetAllMessages() {
      storyAdded.value = "";
    }

    function resetAllInputs() {
      storyId.value = "";
      description.value = "";
    }

    return {
      storyId,
      description,
      closeModel,
      isFormInvalid,
      validation,
      resetError,
      addStory,
      storyAdded
    };
  }
};
</script>

<style scoped>
.invalid {
  @apply border border-red-500;
}

.invalid input,
.invalid textarea {
  @apply border border-red-500;
}

.invalidMessage {
  @apply text-xs text-red-500 italic;
}

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
