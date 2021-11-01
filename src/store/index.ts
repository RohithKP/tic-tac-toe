import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { GameStatus } from "@/models/board";

// define your typings for the store state
export interface State {
  turn: string;
  board: Array<string | null>;
  progress: GameStatus;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    turn: "X",
    board: new Array(9).fill(null),
    progress: GameStatus.Idle
  },
  mutations: {
    setTurn(state, payload) {
      state.turn = payload;
    },
    setCell(state, payload: { index: number; turn: string }) {
      state.board[payload.index] = payload.turn;
    },
    setBoard(state, payload: State["board"]) {
      state.board = payload;
    },
    setProgress(state, payload: GameStatus) {
      state.progress = payload;
    }
  },
  actions: {},
  modules: {}
});
