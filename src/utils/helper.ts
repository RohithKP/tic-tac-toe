export type CallbackFunction = (formattedTime: string) => void;
export class Timer {
  private startTime: number = 0;
  private timer: number = 0;
  private timerCallBack: CallbackFunction;
  private name: string;
  private pausedTimeDiff: number = 0;
  private t1 = 0;
  private t2 = 0;

  constructor(name: string, timerCallBack: CallbackFunction) {
    this.name = name;
    this.timerCallBack = timerCallBack;
  }

  private startTimeCounter() {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const diff = Math.max(nowInSeconds - this.startTime, 1);
    this.pausedTimeDiff = diff;
    const m = Math.floor(diff / 60);
    const s = Math.floor(diff % 60);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.startTimeCounter.bind(this), 500);
    this.timerCallBack(`${this.padTime(m)} : ${this.padTime(s)}`);
    console.log(this.name);
  }

  private padTime(i: number) {
    return i.toString().padStart(2, "0");
  }

  start() {
    this.startTime = Math.floor(Date.now() / 1000 - this.pausedTimeDiff);
    this.startTimeCounter();
    this.t1 = performance.now();
  }

  stop() {
    clearTimeout(this.timer);
    this.t2 = performance.now();
    return this.t1 ? (this.t2 - this.t1) / 1000 : 0;
  }

  clear() {
    this.pausedTimeDiff = 0;
    this.t1 = 0;
    this.t2 = 0;
    this.timerCallBack(`${this.padTime(0)} : ${this.padTime(0)}`);
  }
}
