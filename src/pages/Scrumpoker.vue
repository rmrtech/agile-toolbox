<template>
  <section class="flex flex-grow">
    <teleport to="#pageheader">
      <scrumpoker-header></scrumpoker-header>
    </teleport>
    <div class="flex-grow grid grid-cols-5 gap-2">
      <base-card
        title="StoryPot"
        description="Stories for refinement"
        class="col-span-4 row-span-2"
      >
        <userstory-list></userstory-list>
      </base-card>
      <base-card title="Players" class="col-span-1 row-span-3">
        <player-list></player-list>
      </base-card>
      <base-card
        title="Showdown"
        description="Story points tipped for story"
        class="col-span-2 row-span-2"
      >
        <user-hand-list></user-hand-list>
      </base-card>
      <base-card
        title="Best of It"
        description="Choose the best of the hands"
        class="col-span-2 row-span-2"
      >
        <bestof-it></bestof-it>
      </base-card>
      <base-card title="Summary" class="col-span-1 row-span-3">
        <groom-summary></groom-summary>
      </base-card>
      <base-card title="Tip Your Hand" description="Choose your hand" class="col-span-4 row-span-2">
        <tip-hand></tip-hand>
      </base-card>
    </div>
  </section>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
import UserstoryList from "../components/scrumpoker/UserstoryList.vue";
import PlayerList from "../components/scrumpoker/PlayerList.vue";
import UserHandList from "../components/scrumpoker/UserHandList.vue";
import BestofIt from "../components/scrumpoker/BestofIt.vue";
import TipHand from "../components/scrumpoker/TipHand.vue";
import GroomSummary from "../components/scrumpoker/GroomSummary.vue";
import ScrumpokerHeader from "../components/scrumpoker/ScrumpokerHeader.vue";
export default {
  components: {
    BaseCard,
    ScrumpokerHeader,
    UserstoryList,
    PlayerList,
    UserHandList,
    BestofIt,
    TipHand,
    GroomSummary
  }
};
</script>

<style></style>
