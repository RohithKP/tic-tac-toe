<template>
  <div
    class="
      cell
      flex
      content-center
      items-center
      cursor-pointer
      border-4 border-solid border-indigo-400
    "
    @click="cellClick"
  ></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  methods: {
    cellClick(event: MouseEvent) {
      this.$emit("cell-clicked", event);
    }
  }
});
</script>
