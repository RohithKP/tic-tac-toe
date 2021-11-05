import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { GameStatus, IStringArrayMap } from "@/models/common";

// define your typings for the store state
export interface State {
  turn: string;
  board: Array<string | null>;
  progress: GameStatus;
  moveIntervals: IStringArrayMap;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    turn: "X",
    board: new Array(9).fill(null),
    progress: GameStatus.Idle,
    moveIntervals: {
      x: [],
      o: []
    }
  },
  mutations: {
    setTurn(state, payload: string) {
      state.turn = payload;
    },
    setCell(state, { index, turn }: { index: number; turn: string }) {
      state.board[index] = turn;
    },
    setBoard(state, payload: State["board"]) {
      state.board = payload;
    },
    setProgress(state, payload: GameStatus) {
      state.progress = payload;
    },
    setIntervals(
      state,
      { turn, interval }: { turn: string; interval: number }
    ) {
      state.moveIntervals[turn.toLowerCase()].push(+interval.toFixed(3));
    },
    resetIntervals(state) {
      state.moveIntervals.x.length = 0;
      state.moveIntervals.o.length = 0;
    }
  },
  actions: {},
  modules: {},
  getters: {
    xIntervals: state => state.moveIntervals["x"] || [],
    oIntervals: state => state.moveIntervals["o"] || []
  }
});
