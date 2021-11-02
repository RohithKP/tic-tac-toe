<template>
  <div
    class="board grid justify-center items-center content-center"
    :class="progress === 0 ? '' : turn"
  >
    <Cell
      v-for="(cellValue, index) in board"
      :key="index"
      @cell-clicked="onCellClick(index, $event)"
      :class="[
        board[index],
        winningSequence?.includes(index) ? 'bg-green-100' : ''
      ]"
    ></Cell>
  </div>
  <transition name="bounce">
    <div>
      <div
        v-if="progress === 0"
        class="
          game-over-banner
          text-7xl
          absolute
          bottom-0
          left-0
          right-0
          top-0
          flex
          content-center
          flex-col
          justify-center
          items-center
          text-green-900
        "
      >
        <template v-if="!isBoardEmpty">
          <div style="background: #ffffffa6" class="w-full">
            <span v-if="winningSequence">{{ turn }}'s win!</span>
            <span v-else>Draw!</span>
            <div>
              <button
                class="bg-blue-700 p-2 rounded-full text-white animate-pulse"
                @click.stop="resetBoard()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <button @click.stop="startGame" v-if="progress === 0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 transform scale-150 text-purple-500 scale-450"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </template>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { BoardEvent, GameStatus } from "@/models/board";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { key } from "../store";
import Cell from "./Cell.vue";
const bounceSound = require("@/assets/audio/bounce.mp3");
const playSound = require("@/assets/audio/play.mp3");
const xSound = require("@/assets/audio/xSound.wav");
const oSound = require("@/assets/audio/oSound.wav");

export default defineComponent({
  name: "Board",
  emits: ["board-status-changed"],
  components: {
    Cell
  },
  setup(props, { emit }) {
    const winningSequence = ref<number[] | null>(null);
    const store = useStore(key); // store instead of `$store`
    const board = computed(() => store.state.board);
    const turn = computed(() => store.state.turn);
    const progress = computed(() => store.state.progress);
    const isBoardEmpty = computed(() => !store.state.board.some(val => !!val));
    watch(progress, (current, prev) => {
      if (current === GameStatus.Idle) {
        playAudio(bounceSound);
      }
    });

    function onCellClick(i: number, event: MouseEvent) {
      makeMove(i);
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

      playAudio(turn.value === "X" ? xSound : oSound);

      setCellState(i, turn.value);

      winningSequence.value = findWinningCombination();

      if (!winningSequence.value) {
        nextTurn();
      }

      if (!board.value.includes(null) || winningSequence.value) {
        store.commit("setProgress", GameStatus.Idle);
      }

      emit("board-status-changed", {
        currentTurn: turn.value,
        progress: progress.value,
        type: BoardEvent.CellClick
      });
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
          return combination;
        }
      }

      return null;
    }

    function isInProgress() {
      return board.value.includes(null) && progress.value;
    }

    function resetBoard() {
      store.commit("setProgress", GameStatus.InProgress);
      store.commit("setTurn", "X");
      store.commit("setBoard", new Array(9).fill(null));

      winningSequence.value = null;

      emit("board-status-changed", {
        currentTurn: turn.value,
        progress: progress.value,
        type: BoardEvent.Reset
      });
    }

    function startGame() {
      playAudio(playSound);
      setTimeout(() => {
        resetBoard();
      });
    }

    function playAudio(sound: any) {
      new Audio(sound).play();
    }

    return {
      board,
      onCellClick,
      turn,
      winningSequence,
      resetBoard,
      progress,
      startGame,
      isBoardEmpty
    };
  }
});
</script>

<style scoped>
.board {
  grid-template-columns: repeat(3, auto);
  /* background: #e2e9dd42; */
}
.game-over-banner {
  text-shadow: -5px 3px 3px #e4ffe2;
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

/* animation */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.scale-450 {
  --tw-scale-x: 4.5;
  --tw-scale-y: 4.5;
}
</style>
