import database from "../../../db-init.js";
export default {
  namespaced: true,
  state() {
    return {
      sessionUsers: [],
    };
  },
  getters: {
    sessionUsers(state) {
      return state.sessionUsers;
    },
  },
  mutations: {
    setSessionUsers(state, sessionUsers) {
      state.sessionUsers = sessionUsers;
    },
  },
  actions: {
    watchSessionUsers(context) {
      const userPath = context.rootGetters.userPath;
      database.ref(userPath).on("value", (snapshot) => {
        const sessionUsers = [];
        if (snapshot.exists()) {
          for (const [key, value] of Object.entries(snapshot.val())) {
            sessionUsers.push({
              userName: value.userName,
              role: value.role,
            });
          }
          context.commit("setSessionUsers", sessionUsers);
          console.log(sessionUsers);
        }
      });
    },
  },
};
