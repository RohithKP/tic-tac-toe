import { Ref } from "vue";

export interface IBoardStatusChangeEvent {
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
  stop: () => void;
  clear: () => void;
}

export enum GameStatus {
  Idle,
  InProgress
}

export interface IStringArrayMap {
  [key: string]: Array<number>;
}
