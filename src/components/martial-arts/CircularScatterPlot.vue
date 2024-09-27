<template>
  <Scatter
    :data="data"
    :options="chartOptions"
    :plugins="[plugin]"
    style="position: relative; z-index: 99"
  />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Scatter } from 'vue-chartjs'
import { type ChartData, type Point } from 'chart.js/auto'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart) => {
    const { ctx } = chart
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = `rgba(153, 255, 255, 0)`
    ctx.fillRect(0, 0, chart.width, chart.height)
    ctx.restore()
  }
}

export const chartConfig = {
  aspectRatio: 1,
  maintainAspectRatio: true,
  scales: {
    x: {
      type: 'linear',
      position: 'center',
      min: -1,
      max: 1,
      ticks: {
        stepSize: 0.1
      },
      // set true to debug if alignment is off
      display: true
    },
    y: {
      type: 'linear',
      position: 'center',
      min: -1,
      max: 1,
      ticks: {
        stepSize: 0.1
      },
      // set true to debug if alignment is off
      display: true
    }
  },
  plugins: {
    customCanvasBackgroundColor: {
      color: 'rgba(0,0,0,0)'
    },
    legend: {
      display: false
    }
  }
}

export default {
  name: 'CircularScatterPlot',
  components: {
    Scatter
  },
  props: {
    data: {
      type: Object as () => ChartData<'scatter', Point[]>,
      required: true
    }
  },
  data() {
    return {
      chartOptions: chartConfig,
      plugin: plugin
    }
  }
}
</script>
