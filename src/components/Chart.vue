<template>
  <apexchart
    id="step-time-chart"
    type="bar"
    :options="chartOptions"
    :series="series"
    :height="height"
    width="98%"
  ></apexchart>
</template>
<script lang="ts">
import { IStringArrayMap } from "@/models/common";
import { computed, defineComponent, onMounted, PropType, ref } from "vue";

export default defineComponent({
  props: {
    series: {
      required: true,
      type: Object as PropType<IStringArrayMap>
    }
  },
  setup({ series: _series }) {
    const steps = computed(() => Math.max(_series.x.length, _series.o.length));
    const series = computed(() => {
      return [
        {
          name: "X",
          data: _series.x
        },
        { name: "O", data: _series.o }
      ];
    });
    const height = computed(() => Math.min(350, steps.value * 150));

    const chartOptions: any = computed(() => ({
      colors: ["#74b3ff", "#f76969"],
      chart: {
        id: "step-time-chart",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 500
          }
        },
        toolbar: {
          tools: {
            download: false
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,

          dataLabels: {
            position: "bottom"
          }
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      legend: {
        show: false
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: new Array(steps.value).fill(0).map((n, i) => `${i + 1}`),
        title: {
          text: "Time In Seconds"
        }
      },
      yaxis: {
        title: {
          text: "Step"
        }
      }
    }));

    return {
      series,
      chartOptions,
      height
    };
  }
});
</script>
