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
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";
import Board from "@/components/Board.vue";
import Timer from "@/components/Timer.vue";
import { BoardEvent, IBoardStatusChangeEvent } from "../models/board";

export default defineComponent({
  name: "Home",
  components: {
    Board,
    Timer
  },
  setup(props, {}) {
    const xTimer = ref(null);
    const oTimer = ref(null);
    const onBoardStatusChange = function (event: IBoardStatusChangeEvent) {
      // TODO - types
      const prevTimer: any =
        event.currentTurn === "X" ? oTimer.value : xTimer.value;
      const nextTimer: any =
        event.currentTurn === "X" ? xTimer.value : oTimer.value;

      if (event.type === BoardEvent.reset) {
        prevTimer.clear();
        nextTimer.clear();
      }

      if (event.isGameOver) {
        nextTimer.stop();
        prevTimer.stop();
      } else {
        nextTimer.start();
        prevTimer.stop();
      }
    };

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
