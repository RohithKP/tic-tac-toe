<template>
  <section class="my-10 relative">
    <Board @board-status-changed="onBoardStatusChange($event)" />
  </section>

  <section class="flex justify-center mx-auto">
    <div class="flex-1">
      <h2 class="pb-5">
        <span class="font-extrabold font-mono text-5xl text-blue-400">X</span>
      </h2>
      <Timer ref="xTimer" label="xTimer"></Timer>
    </div>
    <div class="flex-1">
      <h2 class="pb-5">
        <span class="font-extrabold font-mono text-5xl text-red-500">O</span>
      </h2>
      <Timer ref="oTimer" label="oTimer"></Timer>
    </div>
  </section>
  <!-- <Analytics></Analytics> -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Board from "@/components/Board.vue";
import Timer from "@/components/Timer.vue";
// import Analytics from "@/components/Analytics.vue";
import {
  BoardEvent,
  GameStatus,
  IBoardStatusChangeEvent,
  ITimer
} from "../models/board";
import { testExpressServer } from "../services/testService";

export default defineComponent({
  name: "Home",
  components: {
    Board,
    Timer
    // Analytics
  },
  setup() {
    const xTimer: any = ref(null);
    const oTimer: any = ref(null);

    const onBoardStatusChange = function (event: IBoardStatusChangeEvent) {
      // TODO - types
      const prevTimer: ITimer =
        event.currentTurn === "X" ? oTimer.value : xTimer.value;
      const nextTimer: ITimer =
        event.currentTurn === "X" ? xTimer.value : oTimer.value;

      if (event.type === BoardEvent.Reset) {
        prevTimer.clear();
        nextTimer.clear();
      }

      if (event.progress == GameStatus.Idle) {
        nextTimer.stop();
        prevTimer.stop();
      } else {
        nextTimer.start();
        prevTimer.stop();
      }
    };

    testExpressServer().then(data => console.log(data)); //for testing api end point

    return {
      onBoardStatusChange,
      xTimer,
      oTimer
    };
  }
});
</script>

<style scoped>
h2 > span {
  position: relative;
}

h2 > span::before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 160%;
  height: 8px;
  transform: skew(-12deg) translateX(-20%);
  background: rgb(0 0 0 / 10%);
  z-index: -1;
}
</style>

function created(arg0: () => void) { throw new Error("Function not
implemented."); }
