<template>
  <div class="flex-col fixed w-full z-100 top-0">
    <nav class="py-2 pl-3 pr-6 bg-indigo-800 w-screen text-indigo-50">
      <div
        class="mx-auto flex flex-wrap justify-between items-center flex-shrink-0"
      >
        <div
          class="flex justify-between justify-items-center text-center space-x-4"
        >
          <img
            class="block h-9 w-9"
            alt="logo"
            src="../../assets/images/agiletoolbox-logo.svg"
          />
          <h3 class="my-auto italic font-bold text-lg">Agile Toolbox</h3>
        </div>
        <div v-if="isAuthenticated" class="flex space-x-4 items-center">
          <base-menulink toPath="/scrumpoker">Scrumpoker</base-menulink>
          <base-menulink toPath="/retrospective">Retrospective</base-menulink>
        </div>
        <div
          v-if="isAuthenticated"
          class="flex justify-items-end items-center space-x-2"
        >
          <base-avatar>{{ user }}</base-avatar>
          <base-logout @click="logOut"></base-logout>
        </div>
      </div>
    </nav>
    <the-session-info v-if="isAuthenticated"></the-session-info>
    <header
      v-if="isAuthenticated"
      id="pageheader"
      class="flex justify-between items-center bg-white text-2xl font-bold leading-tight text-gray-600 mx-auto py-2 px-3 shadow h-12"
    ></header>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseAvatar from "../ui/BaseAvatar.vue";
import BaseLogout from "../ui/BaseLogout.vue";
import BaseMenulink from "../ui/BaseMenulink.vue";
import TheSessionInfo from "../layout/TheSessionInfo.vue";
import { useStore } from "vuex";
export default {
  props: {
    authenticated: Boolean,
  },
  components: {
    BaseAvatar,
    BaseLogout,
    BaseMenulink,
    TheSessionInfo,
  },

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => props.authenticated);
    const user = computed(() => store.getters.userName);

    function logOut() {
      store.dispatch("signOut");
      router.replace("/login");
    }

    return {
      user,
      logOut,
      isAuthenticated,
    };
  },
};
</script>

<style scoped></style>
