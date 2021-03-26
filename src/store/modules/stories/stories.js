import database from "../../../db-init.js";
export default {
  namespaced: true,
  state() {
    return {
      stories: [
        // {
        //   storyId: "12345",
        //   description: "Invoice changes",
        //   status: "Not Refined",
        //   points: "?",
        //   groomStartTime: 123
        //   groomTime: 0
        // },
        // {
        //   storyId: "12346",
        //   description: "Invoice changes",
        //   status: "Refined",
        //   points: "5",
        //   groomStartTime: 123
        //   groomTime: 0
        // },
      ],
    };
  },
  getters: {
    allStories(state) {
      return state.stories;
    },
    hasStories(state) {
      return state.stories && state.stories.length > 0;
    },
    groomedStoryId(state) {
      const groomedStory = state.stories.find(
        (story) => story.status === "Refining"
      );
      return groomedStory ? groomedStory.storyId : "";
    },
  },
  mutations: {
    addStory(state, storyDetails) {
      state.stories.push(storyDetails);
    },
    updateStory(state, storyDetails) {
      let updatedStoryIndex = state.stories.findIndex(
        (storyObject) => storyDetails.storyId === storyObject.storyId
      );
      state.stories.splice(updatedStoryIndex, 1, storyDetails);
    },
    deleteStory(state, storyId) {
      const filteredStories = state.stories.filter(
        (storyObject) => storyId !== storyObject.storyId
      );
      state.stories = filteredStories;
    },
    setStories(state, stories) {
      state.stories = stories;
    },
  },
  actions: {
    async saveStory(context, payload) {
      const sessionPath = context.rootGetters.sessionPath;
      await database.ref(sessionPath + "/userstories/" + payload.storyId).set({
        description: payload.description,
        status: payload.storyStatus,
        points: payload.storyPoints,
      });
    },
    async removeStory(context, storyId) {
      const sessionPath = context.rootGetters.sessionPath;
      await database
        .ref(sessionPath + "/userstories/" + storyId)
        .remove()
        .then(function () {
          console.log(storyId + " is removed successfully");
        })
        .catch(function (error) {
          console.log(storyId + " remove failed: " + error.message);
        });
    },
    async startGrooming(context, storyId) {
      const updateData = {};
      updateData["storyId"] = storyId;
      updateData["status"] = "Refining";
      await context.dispatch("updateStory", updateData);
    },

    async cancelGrooming(context, { storyId, status }) {
      const updateData = {};
      updateData["storyId"] = storyId;
      updateData["status"] = status;
      await context.dispatch("updateStory", updateData);
    },

    async updateStory(context, payload) {
      const sessionPath = context.rootGetters.sessionPath;
      const updateData = {};
      const storyToUpdate = context.getters.allStories.find(
        (story) => story.storyId === payload.storyId
      );
      const prevGroomTime = storyToUpdate.groomTime
        ? storyToUpdate.groomTime
        : 0;
      if (payload.status) {
        updateData["status"] = payload.status;
        if (payload.status === "Refined" || payload.status === "Not Refined") {
          updateData["groomTime"] =
            prevGroomTime + (Date.now() - storyToUpdate.groomStartTime);
          updateData["groomStartTime"] = null;
        } else if (payload.status === "Refining") {
          updateData["groomStartTime"] = Date.now();
          updateData["groomTime"] = prevGroomTime;
        }
      }
      if (payload.points) {
        updateData["points"] = payload.points;
      }

      console.log(
        "Update story: " + payload.storyId + "-" + JSON.stringify(updateData)
      );

      await database
        .ref(sessionPath + "/userstories/" + payload.storyId)
        .update(updateData);
      console.log(
        "Updated story: " + payload.storyId + "-" + JSON.stringify(updateData)
      );
    },

    bindUserStories(context) {
      const sessionPath = context.rootGetters.sessionPath;
      let userstories = database.ref(sessionPath + "/userstories");
      userstories.on("child_added", (data) => {
        const userStory = {
          storyId: data.key,
          description: data.val().description,
          status: data.val().status,
          points: data.val().points,
          groomTime: data.val().groomTime,
          groomStartTime: data.val().groomStartTime,
        };
        context.commit("addStory", userStory);
      });

      userstories.on("child_removed", (data) => {
        context.commit("deleteStory", data.key);
      });

      userstories.on("child_changed", (data) => {
        const userStory = {
          storyId: data.key,
          description: data.val().description,
          status: data.val().status,
          points: data.val().points,
          groomTime: data.val().groomTime,
          groomStartTime: data.val().groomStartTime,
        };
        context.commit("updateStory", userStory);
      });
    },
  },
};
