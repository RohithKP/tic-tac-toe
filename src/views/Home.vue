<template>
  <div class="home container mx-auto">
    <section class="mb-10">
      <Board />
    </section>

    <section class="flex justify-center mx-auto">
      <div class="flex-1">
        <h2 class="pb-5">
          <span class="font-extrabold text-4xl text-blue-400">X</span>
        </h2>
        <Timer ref="xTimer"></Timer>
      </div>
      <div class="flex-1">
        <h2 class="pb-5">
          <span class="font-extrabold text-4xl text-red-500">O</span>
        </h2>
        <Timer ref="oTimer"></Timer>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "@/components/Board.vue";
import Timer from "@/components/Timer.vue";

export default defineComponent({
  name: "Home",
  components: {
    Board,
    Timer
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
  /* background: linear-gradient(to right, #94f9f0 0%, #6ca8f3 100%); */
  z-index: -1;
}
</style>
