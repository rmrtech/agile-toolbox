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
    totalSessionUsers(state) {
      return state.sessionUsers.length;
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
          let moderator = {};
          for (const [key, value] of Object.entries(snapshot.val())) {
            if (value.role === "Moderator") {
              moderator = {
                userName: value.userName,
                role: value.role,
                voted: false,
              };
            } else {
              sessionUsers.push({
                userName: value.userName,
                role: value.role,
                voted: false,
              });
            }
          }
          sessionUsers.unshift(moderator);
          context.commit("setSessionUsers", sessionUsers);
          console.log(sessionUsers);
        }
      });
    },

    updateUserVotingStatus(context, newUserHands) {
      const updatedSessionUsers = [];
      const currSessionUsers = context.getters.sessionUsers;
      currSessionUsers.forEach((sessionUser) => {
        const matchedUserHand = newUserHands.find(
          (userHand) => userHand.userId === sessionUser.userName
        );
        sessionUser["voted"] =
          matchedUserHand &&
          matchedUserHand.hand &&
          (matchedUserHand.hand === "?" || matchedUserHand.hand > 0);
        updatedSessionUsers.push(sessionUser);
      });
      context.commit("setSessionUsers", updatedSessionUsers);
    },
  },
};
