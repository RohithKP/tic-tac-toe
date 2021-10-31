<template>
  <div
    class="
      cell
      flex
      content-center
      items-center
      justify-center
      cursor-pointer
      border-4 border-solid border-gray-300
    "
    @click="cellClick"
  ></div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  // props: {
  //   label: String as PropType<string>
  // },
  setup() {},
  methods: {
    cellClick(event: MouseEvent) {
      this.$emit("cell-clicked", event);
    }
  }
});
</script>
