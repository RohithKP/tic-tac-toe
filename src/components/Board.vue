<template>
  <div class="grid justify-center items-center content-center grid-cols-3">
    <Cell v-for="i in 9" :key="i"></Cell>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Cell from "./Cell.vue";

export default defineComponent({
  name: "Board",
  components: {
    Cell
  },
  setup() {}
});
</script>

<style scoped>
.cell {
  width: var(--cell-size);
  height: var(--cell-size);
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.cell:first-child,
.cell:nth-child(2),
.cell:nth-child(3) {
  border-top: none;
}

.cell:nth-child(3n + 1) {
  border-left: none;
}

.cell:nth-child(3n + 3) {
  border-right: none;
}

.cell:last-child,
.cell:nth-child(8),
.cell:nth-child(7) {
  border-bottom: none;
}
</style>
