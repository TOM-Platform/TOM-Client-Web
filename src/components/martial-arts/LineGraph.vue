<template>
  <LineChart :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line as LineChart } from 'vue-chartjs'

export type LineGraphData = {
  labels: string[]
  datasets: {
    label: string
    backgroundColor: string
    data: number[]
  }[]
}

export const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'LineGraph',
  components: {
    LineChart
  },
  props: {
    data: {
      type: Object as () => LineGraphData,
      required: true
    },
    options: {
      type: Object as () => Record<string, any>,
      default: () => defaultOptions
    }
  }
}
</script>
