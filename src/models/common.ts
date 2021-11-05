import { Ref } from "vue";

export interface IBoardStatusChangeEvent {
  prevTurn: string;
  currentTurn: string;
  progress: GameStatus;
  type: BoardEvent;
}

export enum BoardEvent {
  CellClick,
  Reset
}

export interface ITimer {
  running: Ref<boolean>;
  time: Ref<string>;
  start: () => void;
  stop: () => number;
  clear: () => void;
}

export enum GameStatus {
  Idle,
  InProgress
}

export interface IStringArrayMap {
  [key: string]: Array<number>;
}
