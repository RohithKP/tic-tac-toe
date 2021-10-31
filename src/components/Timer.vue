<template>
  <div class="flex">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    {{ time }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Timer } from "../utils/helper";

export default defineComponent({
  setup() {
    let time = ref("00: 00");
    const timer = new Timer(function (formattedTime: string) {
      time.value = formattedTime;
    });
    timer.start();
    return {
      time,
      start: () => timer.start(),
      stop: () => timer.stop(),
      clear: () => timer.clear()
    };
  }
});
</script>
