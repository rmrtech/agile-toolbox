import { createStore } from "vuex";
import auth from "./modules/auth/auth.js";
import stories from "./modules/stories/stories.js";
import userhands from "./modules/userhands/userhands.js";
import users from "./modules/users/users.js";

const store = createStore({
  state() {
    return {
      modelActive: false,
      loading: false,
    };
  },
  getters: {
    isModelActive(state) {
      return state.modelActive;
    },
    isLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    setModelActive(state, modelActive) {
      state.modelActive = modelActive;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    toggleModel(context, value) {
      context.commit("setModelActive", value);
    },
    toggleLoading(context, value) {
      context.commit("setLoading", value);
    },
  },
  modules: {
    auth: auth,
    stories: stories,
    userhands: userhands,
    users: users,
  },
});

export default store;
