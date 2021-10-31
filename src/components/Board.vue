<template>
  <div
    class="board grid justify-center items-center content-center"
    :class="isGameOver ? '' : turn"
  >
    <Cell
      v-for="(i, index) in board"
      :key="i"
      @cell-clicked="onCellClick(index, $event)"
      :class="board[index]"
    ></Cell>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store";
import Cell from "./Cell.vue";

export default defineComponent({
  name: "Board",
  components: {
    Cell
  },
  setup() {
    const isGameOver = ref(false);
    const store = useStore(key); // store instead of `$store`
    const board = computed(() => store.state.board);
    const turn = computed(() => store.state.turn);

    function onCellClick(i: number, event: MouseEvent) {
      console.log(i, event);
      makeMove(i);
      console.log(store.state.turn);
    }

    function nextTurn() {
      const nextTurnValue = turn.value === "X" ? "O" : "X";
      store.commit("setTurn", nextTurnValue);
    }

    function setCellState(index: number, turn: string) {
      store.commit("setCell", { index, turn });
    }

    function makeMove(i: number) {
      if (!isInProgress() || board.value[i]) {
        return;
      }

      setCellState(i, turn.value);

      if (!findWinningCombination()) {
        nextTurn();
      }
    }

    function findWinningCombination() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const { value: boardState } = board;

        if (
          boardState[a] &&
          boardState[a] === boardState[b] &&
          boardState[a] === boardState[c]
        ) {
          isGameOver.value = true;
          return combination;
        }
      }

      return null;
    }

    function isInProgress() {
      return board.value.includes(null) && !isGameOver.value;
    }

    return { board, onCellClick, turn, isGameOver };
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

.cell.X,
.cell.O {
  cursor: not-allowed;
}

.cell.X::before,
.cell.X::after {
  background-color: #74b3ff;
}
.cell.O::before {
  background-color: #ef4444;
}

.board.X .cell:not(.X):not(.O):hover::before,
.board.X .cell:not(.X):not(.O):hover::after {
  background-color: #c3dbf8;
}
.board.O .cell:not(.X):not(.O):hover::before {
  background-color: #f1a8a8;
}

.cell.X::before,
.cell.X::after,
.board.X .cell:not(.X):not(.O):hover::before,
.board.X .cell:not(.X):not(.O):hover::after {
  content: "";
  position: absolute;
  width: calc(var(--mark-size) * 0.15);
  height: var(--mark-size);
}

.cell.X::before,
.board.X .cell:not(.X):not(.O):hover::before {
  transform: rotate(45deg);
}

.cell.X::after,
.board.X .cell:not(.X):not(.O):hover::after {
  transform: rotate(-45deg);
}

.cell.O::before,
.cell.O::after,
.board.O .cell:not(.X):not(.O):hover::before,
.board.O .cell:not(.X):not(.O):hover::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}

.cell.O::before,
.board.O .cell:not(.X):not(.O):hover::before {
  width: var(--mark-size);
  height: var(--mark-size);
}

.cell.O::after,
.board.O .cell:not(.X):not(.O):hover::after {
  width: calc(var(--mark-size) * 0.7);
  height: calc(var(--mark-size) * 0.7);
  background-color: white;
}
</style>
