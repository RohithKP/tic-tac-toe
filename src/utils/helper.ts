export class Timer {
  private startTime: number = 0;
  private timer: number = 0;
  private timerCallBack: Function;
  private name: string;
  private pausedTimeDiff: number = 0;

  constructor(timerCallBack: Function, name: string) {
    this.name = name;
    this.timerCallBack = timerCallBack;
  }

  private startTimeCounter() {
    const now = Math.floor(Date.now() / 1000);
    const diff = Math.max(now - this.startTime, 1);
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
  }

  stop() {
    console.log(`stop: ${this.name}`);
    clearTimeout(this.timer);
  }

  clear() {
    this.pausedTimeDiff = 0;
    this.timerCallBack(`${this.padTime(0)} : ${this.padTime(0)}`);
  }
}
