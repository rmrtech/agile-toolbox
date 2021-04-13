<template>
  <div class="flex justify-center -mt-24">
    <div class="max-w-md w-full space-y-8 z-0">
      <login-header></login-header>
      <form @submit.prevent="startSession">
        <div
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 grid grid-cols-2 gap-3"
        >
          <div>
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="username"
              >Username</label
            >
            <input
              class="shadow border rounded w-full py-1 px-3 text-grey-darker focus:outline-none"
              :class="{ invalid: validation.invalidUsername }"
              @blur="resetError('invalidUsername')"
              id="username"
              type="text"
              placeholder="Username"
              v-model.trim="userName"
            />
            <p v-if="validation.invalidUsername" class="invalidMessage">
              Please provide a user name
            </p>
          </div>
          <div>
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="role"
              >Role</label
            >
            <select
              class="shadow border border-red rounded w-full py-1 px-3 text-grey-darker focus:outline-none"
              id="role"
              placeholder="Select"
              @change="setRole"
            >
              <option value="Moderator">Moderator</option>
              <option value="Participant">Participant</option>
            </select>
          </div>
          <div class="col-span-2">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="sessionid"
              >Session</label
            >
            <input
              class="shadow border rounded w-full py-1 px-3 text-grey-darker focus:outline-none"
              :class="{
                invalid:
                  validation.invalidSessionid || validation.inactiveSession,
              }"
              @blur="resetError('invalidSessionid', 'inactiveSession')"
              :disabled="isModerator"
              id="sessionid"
              type="text"
              v-model.trim="sessionId"
              :placeholder="isModerator ? '' : 'Session Id'"
            />
            <p v-if="validation.invalidSessionid" class="invalidMessage">
              Please provide the session id
            </p>
            <p v-else-if="validation.inactiveSession" class="invalidMessage">
              The session id is not active
            </p>
          </div>
          <div class="mt-6 flex items-center justify-between col-span-2">
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="text-indigo-300 z-0"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  style="
                    -ms-transform: rotate(360deg);
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                  "
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6 8H1V6h5V4l3 3l-3 3zm10-8v13l-6 3v-3H4V9h1v3h5V3l4-2H5v4H4V0z"
                    fill="currentColor"
                  />
                  <rect
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    fill="rgba(0, 0, 0, 0)"
                  />
                </svg>
              </span>
              {{ isModerator ? "Create Session" : "Join Session" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LoginHeader from "../components/auth/LoginHeader.vue";
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteUpdate } from "vue-router";
export default {
  components: {
    LoginHeader,
  },

  setup() {
    const store = useStore();
    const userName = ref("");
    const role = ref("Moderator");
    const sessionId = ref("");

    const validation = reactive({
      invalidSessionid: false,
      invalidUsername: false,
      inactiveSession: false,
    });

    const isModerator = computed(() => role.value === "Moderator");

    function startSession() {
      if (!validateInput()) {
        return;
      }
      store.dispatch("toggleLoading", true);
      const signInData = {
        userName: userName.value,
        role: role.value,
        sessionId: sessionId.value,
      };
      store.dispatch("signIn", signInData);
    }

    function validateInput() {
      let valid = true;
      if (userName.value === "") {
        validation.invalidUsername = true;
        valid = false;
      }

      if (!isModerator.value && sessionId.value === "") {
        validation.invalidSessionid = true;
        valid = false;
      }
      return valid;
    }

    function resetError(...invalidFields) {
      invalidFields.forEach(
        (invalidField) => (validation[invalidField] = false)
      );
    }

    function setRole(event) {
      resetError("invalidSessionid", "inactiveSession");
      let selected = event.target.value;
      role.value = selected;
      if (selected === "Moderator") {
        validation.invalidSessionid = false;
        sessionId.value = "";
      }
    }

    onBeforeRouteUpdate(async (to, from) => {
      if (to.query.error === "inactivesession") {
        validation["inactiveSession"] = true;
        return false;
      }
      return true;
    });

    return {
      userName,
      role,
      setRole,
      sessionId,
      isModerator,
      validation,
      resetError,
      startSession,
    };
  },
};
</script>

<style scoped>
.invalid {
  @apply border border-red-500;
}
.invalidMessage {
  @apply text-xs text-red-500 italic;
}
</style>
