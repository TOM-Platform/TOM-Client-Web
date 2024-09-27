<template>
  <canvas ref="ChartLine"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from 'vue'
import Chart, { type ChartConfiguration, type TooltipItem } from 'chart.js/auto'
import 'chartjs-adapter-date-fns'
import { format } from 'date-fns'

const props = defineProps<{
  data: number[]
  timestamps: number[]
}>()

const ChartLine = ref(null)
let chart: Chart<'line', { x: Date; y: number }[], Date>

const options: ChartConfiguration<'line'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'second',
        displayFormats: {
          second: 'h:mm:ss a'
        }
      },
      title: {
        display: false
      },
      ticks: {
        font: {
          size: 10
        },
        callback: function (value: number | string) {
          const timestamp = typeof value === 'string' ? parseFloat(value) : value
          const date = new Date(timestamp)
          return format(date, 'h:mm:ss a')
        }
      }
    },
    y: {
      suggestedMin: 0,
      suggestedMax: 16,
      title: {
        display: true,
        text: 'Speed (KM/H)'
      },
      ticks: {
        font: {
          size: 10
        },
        stepSize: 1,
        callback: function (value: number | string) {
          return value
        }
      }
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (tooltipItem: TooltipItem<'line'>) {
          const rawValue = tooltipItem.raw as { x: number; y: number }
          return `Speed: ${rawValue.y} KM/H`
        }
      }
    }
  }
}

const data = ref({
  labels: props.timestamps.map((ts) => {
    const date = new Date(ts)
    return date
  }),
  datasets: [
    {
      label: 'Speed',
      data: props.timestamps.map((ts, index) => {
        const date = new Date(ts)
        return { x: date, y: props.data[index] }
      }),
      borderColor: 'rgba(255, 165, 0, 1)',
      borderWidth: 1,
      fill: true,
      pointRadius: 2,
      backgroundColor: 'rgba(255, 165, 0, 0.1)',
      pointBackgroundColor: 'rgba(255, 165, 0, 1)'
    }
  ]
})

onMounted(() => {
  try {
    const canvas = ChartLine.value
    if (!canvas) {
      throw new Error('Canvas element not found')
    }
    chart = new Chart(canvas, {
      type: 'line',
      data: toRaw(data.value),
      options: options
    })
  } catch (error) {
    console.error('Error during mounted hook execution:', error)
  }
})

const updateChart = () => {
  if (chart) {
    data.value.labels = props.timestamps.map((ts) => {
      const date = new Date(ts)
      return date
    })
    data.value.datasets[0].data = props.timestamps.map((ts, index) => {
      const date = new Date(ts)
      return { x: date, y: props.data[index] }
    })
    chart.data.labels = toRaw(data.value.labels)
    chart.data.datasets[0].data = toRaw(data.value.datasets[0].data)
    chart.update()
  }
}

watch(
  () => props.timestamps,
  () => {
    updateChart()
  },
  { deep: true }
)

watch(
  () => props.data,
  () => {
    updateChart()
  },
  { deep: true }
)
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
