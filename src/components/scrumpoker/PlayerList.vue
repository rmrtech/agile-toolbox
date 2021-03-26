<template>
  <div class="flex-col overflow-auto">
    <base-user-tag
      v-for="user in sessionUsers"
      :key="user.userName"
      :role="user.role"
    >{{ user.userName }}</base-user-tag>
  </div>
</template>

<script>
import BaseUserTag from "../ui/BaseUserTag.vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";
export default {
  components: {
    BaseUserTag
  },

  setup(props) {
    const store = useStore();
    const sessionUsers = computed(() => store.getters["users/sessionUsers"]);

    function bindSessionUsers() {
      store.dispatch("users/watchSessionUsers");
    }
    bindSessionUsers();

    return {
      sessionUsers
    };
  }
};
</script>

<style></style>
