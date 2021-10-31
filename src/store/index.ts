import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

// define your typings for the store state
export interface State {
  turn: string;
  board: Array<string>;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    turn: "X",
    board: new Array(9).fill(null) as Array<string>
  },
  mutations: {
    setTurn(state, payload) {
      state.turn = payload;
    },
    setBoard(state, payload: { index: number; key: string }) {
      state.board[payload.index] = payload.key;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getBoard: state => state.board
  }
});
