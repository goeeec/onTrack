import { observable, computed, action, decorate } from "mobx";

class Timer {
  start = Date.now();
  current = Date.now();

  get elapsedTime() {
    return this.current - this.start + "milliseconds";
  }

  tick() {
    this.current = Date.now();
  }
}
decorate(Timer, {
  start: observable,
  current: observable,
  elapsedTime: computed,
  tick: action
});

const store = new Timer();
export default store;
