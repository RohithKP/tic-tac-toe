<template>
  <div class="home">
    <Board />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "@/components/Board.vue";

export default defineComponent({
  name: "Home",
  components: {
    Board
  }
});
</script>
