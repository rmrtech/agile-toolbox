import { createApp } from "vue";
import "./index.css";
import { auth } from "./db-init.js";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";

auth.onAuthStateChanged(async (user) => {
  console.log("Authentication change: " + (user ? user.uid : "No user"));
  const authenticated = store.getters.authenticated;
  const userName = store.getters.userName;
  const signedOut = store.getters.signedOut;
  if (!user && signedOut) {
    console.log("Sign out complete");
    router.replace("/login");
  } else if (!authenticated && userName === "") {
    await store.dispatch("loadActiveUserSession", user);
    const sessionId = store.getters.sessionId;
    if (user && sessionId !== "") {
      await store.dispatch("watchSession");
    }
    console.log("Loading current user");
    await store.dispatch("loadCurrentUser", user);
    await store.dispatch("stories/bindUserStories");
    createApp(App).use(store).use(router).mount("#app");
    console.log("Loaded Application");
  } else if (user && userName !== "") {
    console.log("Sign in complete and binding user");
    await store.dispatch("bindAuth", user);
    await store.dispatch("stories/bindUserStories");
    store.dispatch("watchSession");
    router.replace("/");
  }
});
