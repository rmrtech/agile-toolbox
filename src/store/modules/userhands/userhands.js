import database from "../../../db-init.js";
export default {
  namespaced: true,
  state() {
    return {
      userhands: [
        // {
        //   userId: "User1",
        //   hand: "8",
        // },
        // {
        //   userId: "User2",
        //   hand: "13",
        // },
      ],
      userHandSummary: [
        // { hand: 5, percentage: 30 },
        // { hand: 8, percentage: 20 },
      ],
    };
  },
  getters: {
    allUserHands(state) {
      return state.userhands;
    },
    userHandSummary(state) {
      return state.userHandSummary;
    },
  },
  mutations: {
    setUserHands(state, newUserHands) {
      state.userhands = newUserHands;
    },
    setUserHandSummary(state, userHandSummary) {
      state.userHandSummary = userHandSummary;
    },
  },
  actions: {
    async resetUserHands(context, groomedStoryId) {
      const sessionPath = context.rootGetters.sessionPath;
      await database.ref(sessionPath + "/userhands/" + groomedStoryId).remove();
      console.log("user hands removed ");
    },

    async tipHand(context, handValue) {
      const sessionPath = context.rootGetters.sessionPath;
      const groomedStoryId = context.rootGetters["stories/groomedStoryId"];
      const userName = context.rootGetters.userName;
      const userHand = {};
      userHand[userName] = handValue;
      await database
        .ref(sessionPath + "/userhands/" + groomedStoryId)
        .update(userHand);
    },

    async summarizeUserHands(context) {
      const allUserHands = context.getters.allUserHands;
      const totalUsers = allUserHands.length;
      if (totalUsers > 0) {
        const handSummary = {};
        allUserHands.forEach((userHand) => {
          let count = handSummary[userHand.hand];
          handSummary[userHand.hand] = count ? count + 1 : 1;
        });

        const sessionPath = context.rootGetters.sessionPath;
        const userHandSummaryData = {};
        userHandSummaryData["totalHands"] = totalUsers;
        userHandSummaryData["handSummary"] = handSummary;
        await database
          .ref(sessionPath + "/userHandSummary")
          .set(userHandSummaryData);
      }
    },

    async resetUserHandSummary(context) {
      const sessionPath = context.rootGetters.sessionPath;
      await database.ref(sessionPath + "/userHandSummary").remove();
    },

    bindUserHands(context) {
      const sessionPath = context.rootGetters.sessionPath;
      const userHands = database.ref(sessionPath + "/userhands");
      userHands.on("child_added", (data) => {
        console.log("user hands added " + data.key);
        const newUserHands = [];
        for (const [key, value] of Object.entries(data.val())) {
          newUserHands.push({
            userId: key,
            hand: value,
          });
        }
        context.commit("setUserHands", newUserHands);
        context.dispatch("users/updateUserVotingStatus", newUserHands, {
          root: true,
        });
      });

      userHands.on("child_removed", (data) => {
        const emptyUserHands = [];
        context.commit("setUserHands", emptyUserHands);
        context.dispatch("users/updateUserVotingStatus", emptyUserHands, {
          root: true,
        });
      });

      userHands.on("child_changed", (data) => {
        console.log("user hands changed " + data.key);
        const changedUserHands = [];
        for (const [key, value] of Object.entries(data.val())) {
          changedUserHands.push({
            userId: key,
            hand: value,
          });
        }
        context.commit("setUserHands", changedUserHands);
        context.dispatch("users/updateUserVotingStatus", changedUserHands, {
          root: true,
        });
      });
    },

    watchUserHandSummary(context) {
      const sessionPath = context.rootGetters.sessionPath;
      database.ref(sessionPath + "/userHandSummary").on("value", (snapshot) => {
        if (snapshot.exists()) {
          const userHandSummary = [];
          const totalHands = snapshot.val()["totalHands"];
          const handSummary = snapshot.val()["handSummary"];
          for (const [key, value] of Object.entries(handSummary)) {
            userHandSummary.push({
              hand: key,
              percentage: (value / totalHands) * 100,
            });
          }
          context.commit("setUserHandSummary", userHandSummary);
          console.log(userHandSummary);
        } else {
          context.commit("setUserHandSummary", []);
        }
      });
    },
  },
};
