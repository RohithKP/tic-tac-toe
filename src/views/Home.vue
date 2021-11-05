<template>
  <section class="my-10 relative">
    <Board
      @boardStatusChanged="onBoardStatusChange($event)"
      timeoutInMins="2"
    />
  </section>

  <div class="mx-auto game-detail-wrapper">
    <section class="flex justify-center">
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
        <Timer ref="oTimer" label="oTimer" :timeoutInMins="1"></Timer>
      </div>
    </section>
    <section>
      <Chart :series="seriesData" :timeoutInMins="1"></Chart>
    </section>
  </div>

  <!-- <Analytics></Analytics> -->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Board from "@/components/Board.vue";
import Timer from "@/components/Timer.vue";
import Chart from "@/components/Chart.vue";
// import Analytics from "@/components/Analytics.vue";
import {
  BoardEvent,
  GameStatus,
  IBoardStatusChangeEvent,
  ITimer
} from "../models/common";
import { testExpressServer } from "../services/testService";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "Home",
  components: {
    Board,
    Timer,
    Chart
    // Analytics
  },
  setup() {
    const xTimer: any = ref(null);
    const oTimer: any = ref(null);
    const store = useStore(key);
    const { xIntervals, oIntervals } = store.getters;
    const seriesData = computed(() => ({ x: xIntervals, o: oIntervals }));
    const onBoardStatusChange = function (event: IBoardStatusChangeEvent) {
      // TODO - types
      const prevTimer: ITimer =
        event.prevTurn === "X" ? xTimer.value : oTimer.value;
      const nextTimer: ITimer =
        event.currentTurn === "X" ? xTimer.value : oTimer.value;
      if (event.type === BoardEvent.Reset) {
        prevTimer.clear();
        nextTimer.clear();
      }
      let interval = 0;
      if (event.progress == GameStatus.Idle) {
        interval = nextTimer.stop();
        prevTimer.stop();
      } else {
        nextTimer.start();
        interval = prevTimer.stop();
      }
      if (interval > 60) {
        // TODO
        console.log("Timeout");
      }
      if (event.prevTurn) {
        store.commit("setIntervals", {
          turn: event.prevTurn,
          interval
        });
      }
    };

    testExpressServer().then(data => console.log(data));
    return {
      onBoardStatusChange,
      xTimer,
      oTimer,
      seriesData
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
  width: 190%;
  height: 6px;
  transform: skew(-12deg) translateX(-20%);
  background: rgb(0 0 0 / 21%);
  z-index: -1;
}
.game-detail-wrapper {
  max-width: 760px;
}
</style>
