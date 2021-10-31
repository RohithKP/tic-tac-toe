<template>
  <div class="board grid justify-center items-center content-center">
    <Cell
      v-for="i in cells"
      :key="i"
      @cell-clicked="onCellClick(i, $event)"
    ></Cell>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "../store";
import Cell from "./Cell.vue";

export default defineComponent({
  name: "Board",
  components: {
    Cell
  },
  setup() {
    const store = useStore(key); // store instead of `$store`
    const cells = computed(() => store.state.board);
    const turn = computed(() => store.state.turn);

    function onCellClick(i: number, event: MouseEvent) {
      console.log(i, event);
      nextTurn();
      console.log(store.state.turn);
    }

    function nextTurn() {
      const nextTurnValue = turn.value === "X" ? "O" : "X";
      store.commit("setTurn", nextTurnValue);
    }

    return { cells, onCellClick };
  }
});
</script>

<style scoped>
.board {
  grid-template-columns: repeat(3, auto);
}
.cell {
  width: var(--cell-size);
  height: var(--cell-size);
}

.cell:first-child,
.cell:nth-child(2),
.cell:nth-child(3) {
  border-top: none;
}

.cell:nth-child(3n + 1) {
  border-left: none;
}

.cell:nth-child(3n + 3) {
  border-right: none;
}

.cell:last-child,
.cell:nth-child(8),
.cell:nth-child(7) {
  border-bottom: none;
}
</style>
