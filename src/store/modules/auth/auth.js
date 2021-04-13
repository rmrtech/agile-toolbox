import { database, auth } from "../../../db-init.js";
export default {
  state() {
    return {
      userId: "",
      userName: "",
      role: "",
      sessionId: "",
      signedOut: false,
      sessionEnded: false,
      sessionStartTime: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    userName(state) {
      return state.userName;
    },
    role(state) {
      return state.role;
    },
    sessionId(state) {
      return state.sessionId;
    },
    sessionPath(state) {
      return "sessions/" + state.sessionId;
    },
    userPath(state) {
      return "sessions/" + state.sessionId + "/users";
    },
    authenticated(state) {
      return state.userId !== "";
    },
    signedOut(state) {
      return state.signedOut;
    },
    sessionEnded(state) {
      return state.sessionEnded;
    },
    sessionStartTime(state) {
      return state.sessionStartTime;
    },
  },

  mutations: {
    setUserId(state, uid) {
      state.userId = uid;
    },
    setUserName(state, username) {
      state.userName = username;
    },
    setRole(state, role) {
      state.role = role;
    },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId;
    },
    setSignedOut(state, signOut) {
      state.signedOut = signOut;
    },
    setSessionEnded(state, sessionEnded) {
      state.sessionEnded = sessionEnded;
    },
    setSessionStartTime(state, time) {
      state.sessionStartTime = time;
    },
  },

  actions: {
    async signIn(context, userData) {
      await auth
        .signInAnonymously()
        .then(() => {
          console.log("Signing in user");
          context.commit("setSignedOut", false);
          context.commit("setUserName", userData.userName);
          context.commit("setRole", userData.role);
          context.commit("setSessionId", userData.sessionId);
        })
        .catch((fberror) => {
          var errorCode = fberror.code;
          var errorMessage = fberror.message;
          const error = new Error("SignIn failed: " + errorMessage);
          throw error;
        });
    },

    async signOut(context) {
      context.commit("setSignedOut", true);
      await context.dispatch("unbindUser");
      await auth.currentUser.delete().then(() => {
        context.commit("setSessionEnded", false);
        console.log("Deleted current user");
      });

      await auth.signOut().catch((fberror) => {
        var errorMessage = fberror.message;
        const error = new Error("SignOut failed: " + errorMessage);
      });
    },

    async unbindUser(context) {
      const userPath = context.getters.userPath;
      const userId = context.getters.userId;
      const role = context.getters.role;
      await database.ref(userPath + "/" + userId).remove();
      await database.ref("userActiveSession/" + userId).remove();
      console.log("Removed user active session for " + userId);

      await database
        .ref(userPath)
        .once("value")
        .then((data) => {
          if (!data.exists()) {
            database.ref(context.getters.sessionPath).remove();
          } else if (role === "Moderator") {
            data.forEach((user) => {
              database.ref("userActiveSession/" + user.key).remove();
              console.log("Removed moderator active session for " + user.key);
            });
            database.ref(context.getters.sessionPath).remove();
          }
        });

      context.commit("setUserId", "");
      context.commit("setUserName", "");
      context.commit("setRole", "");
      console.log("Unbinded user");
    },

    async loadActiveUserSession(context, user) {
      if (user) {
        const uid = user.uid;
        await database
          .ref("userActiveSession/" + uid)
          .once("value")
          .then(async (sessionId) => {
            if (sessionId.exists()) {
              context.commit("setSessionId", sessionId.val());
              const userPath = context.getters.userPath;
              await database
                .ref(userPath + "/" + uid)
                .once("value")
                .then((data) => {
                  context.commit("setUserName", data.val().userName);
                  context.commit("setRole", data.val().role);
                  console.log(
                    "Loaded user from previous session: " + data.val().userName
                  );
                });
            } else {
              context.commit("setSessionEnded", true);
              console.log("No session found");
            }
          });
      }
    },

    async loadCurrentUser(context, user) {
      if (user) {
        context.commit("setUserId", user.uid);
        await database
          .ref("users/" + user.uid)
          .once("value")
          .then((data) => {
            if (data.exists()) {
              console.log("Loaded user: " + data.val().userName);
              context.commit("setUserName", data.val().userName);
              context.commit("setRole", data.val().role);
              context.commit("setSessionId", data.val().sessionId);
              console.log(
                "Binded user: " +
                  context.getters.userName +
                  "-" +
                  context.getters.role +
                  "-" +
                  context.getters.sessionId
              );
            }
          });
      }
    },

    async bindAuth(context, user) {
      console.log("Binding authentication");
      const uid = user.uid;
      const userName = context.getters.userName;
      const role = context.getters.role;
      if (role === "Moderator") {
        const session = database.ref("sessions").push({
          creationTime: Date.now(),
        });
        const sessionId = session.key;
        context.commit("setSessionId", sessionId);
        console.log("Set session Id: " + context.getters.sessionId);
      } else {
        let sessionIdInput = context.getters.sessionId;
        await database
          .ref("sessions/" + sessionIdInput)
          .once("value")
          .then(async (data) => {
            if (!data.exists()) {
              console.log("Session not active");
              context.commit("setSessionId", "inactivesession");
              await context.dispatch("signOut");
            }
          });
      }
      context.commit("setSessionEnded", false);

      let sessionId = context.getters.sessionId;
      if (sessionId !== "inactivesession") {
        context.commit("setUserId", uid);
        await database
          .ref("userActiveSession/" + uid)
          .set(context.getters.sessionId);

        const userPath = context.getters.userPath;
        await database.ref(userPath + "/" + uid).set({
          userName: userName,
          role: role,
        });
        console.log("Binded authentication");
      }
    },

    watchSession(context) {
      const sessionPath = context.getters.sessionPath;
      database.ref(sessionPath).on("value", (snapshot) => {
        if (!snapshot.exists()) {
          const signedOut = context.getters.signedOut;
          if (signedOut) {
            context.commit("setSessionEnded", false);
          } else {
            context.commit("setSessionEnded", true);
            console.log("Session ended");
          }
        } else {
          const session = snapshot.val();
          context.commit("setSessionStartTime", session.creationTime);
        }
      });
    },
  },
};
