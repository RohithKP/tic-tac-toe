export class Timer {
  private startTime: number;
  private timer: number = 0;
  private timerCallBack: Function;

  constructor(timerCallBack: Function) {
    this.timerCallBack = timerCallBack;
    this.startTime = Math.floor(Date.now() / 1000);
  }

  private startTimeCounter() {
    var now = Math.floor(Date.now() / 1000);
    var diff = now - this.startTime;
    var m = Math.floor(diff / 60);
    var s = Math.floor(diff % 60);
    this.timer = setTimeout(this.startTimeCounter.bind(this), 500);
    this.timerCallBack(`${this.padTime(m)} : ${this.padTime(s)}`);
    console.log(this.padTime(m), this.padTime(s));
  }

  private padTime(i: number) {
    return i.toString().padStart(2, "0");
  }

  start() {
    this.startTimeCounter();
  }

  stop() {
    clearInterval(this.timer);
  }

  clear() {
    this.startTime = Math.floor(Date.now() / 1000);
  }
}
