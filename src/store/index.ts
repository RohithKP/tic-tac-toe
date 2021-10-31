import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

// define your typings for the store state
export interface State {
  turn: string;
  board: Array<string | null>;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    turn: "X",
    board: new Array(9).fill(null)
  },
  mutations: {
    setTurn(state, payload) {
      state.turn = payload;
    },
    setCell(state, payload: { index: number; turn: string }) {
      state.board[payload.index] = payload.turn;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getBoard: state => state.board
  }
});
