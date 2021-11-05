<template>
  <div class="flex text-2xl items-center justify-center">
    <span class="pr-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        :class="running ? 'animate-spin text-green-400' : ''"
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
    </span>
    <span :class="running ? 'text-green-400' : 'text-gray-500'">
      {{ time }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Timer } from "../utils/helper";

export default defineComponent({
  props: {
    label: {
      type: String as PropType<string>,
      required: true
    },
    timeoutInMins: {
      type: Number as PropType<number>,
      default: Infinity
    }
  },
  beforeUnmount() {
    this.clear();
  },

  setup(props) {
    const running = ref(false);
    const time = ref("00 : 00");
    const timer = new Timer(props.label, function (formattedTime: string) {
      time.value = formattedTime;
    });

    return {
      running,
      time,
      start: () => {
        running.value = true;
        timer.start();
      },

      stop: () => {
        running.value = false;
        return timer.stop();
      },
      clear: () => timer.clear()
    };
  }
});
</script>
<style scoped></style>
