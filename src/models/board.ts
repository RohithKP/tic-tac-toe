export interface IBoardStatusChangeEvent {
  currentTurn: string;
  isGameOver: boolean;
  type: BoardEvent;
}

export enum BoardEvent {
  cellClick,
  reset
}
