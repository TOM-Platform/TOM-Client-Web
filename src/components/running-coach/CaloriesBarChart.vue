<template>
  <div class="bar-chart-container">
    <n-dropdown :options="dropdownOptions" trigger="click" @select="handleWeekSelect">
      <n-button class="dropdown-button">
        {{ selectedWeekLabel }}
        <n-icon size="16" class="dropdown-icon">
          <IosArrowDown />
        </n-icon>
      </n-button>
    </n-dropdown>
    <canvas ref="ChartBar"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from 'vue'
import Chart, { type ChartConfiguration, type TooltipItem } from 'chart.js/auto'
import { IosArrowDown } from '@vicons/ionicons4'
import { NDropdown, NButton, NIcon } from 'naive-ui'
import { DAILY_TARGET } from '@/constant/running/running-coach-constant'

const emit = defineEmits(['selectWeek'])


const props = defineProps<{
  labels: string[]
  data: number[]
  dropdownOptions: { label: string; key: string | number }[]
}>()

const selectedWeekLabel = ref('Select Week')

const ChartBar = ref(null)
let chart: Chart<'bar', { x: string; y: number }[], string>

const options: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: false,
        text: 'Days of the Week'
      },
      ticks: {
        font: {
          size: 10
        }
      }
    },
    y: {
      title: {
        display: true,
        text: 'Calories Burned (%)'
      },
      ticks: {
        callback: function (tickValue: number | string) {
          return tickValue + ' %'
        },
        font: {
          size: 10
        },
        stepSize: 10
      },
      suggestedMin: 0,
      suggestedMax: 50
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (tooltipItem: TooltipItem<'bar'>) {
          const rawValue = tooltipItem.raw as { x: string; y: number }
          return `Calories Burned: ${rawValue.y}%`
        }
      }
    },
    title: {
      display: true,
      text: ['Weekly Calories Burned', `(Daily Target: ${DAILY_TARGET} cal)`],
      align: 'end',
      position: 'top',
      font: {
        size: 14,
        weight: 'normal'
      },
      padding: {
        top: 0,
        bottom: 16
      }
    }
  }
}

const data = ref({
  labels: props.labels,
  datasets: [
    {
      label: 'Calories Burned (%)',
      data: props.data.map((value, index) => ({ x: props.labels[index], y: value })),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
})

onMounted(() => {
  if (ChartBar.value) {
    chart = new Chart(ChartBar.value, {
      type: 'bar',
      data: toRaw(data.value),
      options: options
    })
  }
})

const updateChart = () => {
  if (chart) {
    data.value.labels = props.labels
    data.value.datasets[0].data = props.data.map((value, index) => ({
      x: props.labels[index],
      y: value
    }))
    chart.data.labels = toRaw(data.value.labels)
    chart.data.datasets[0].data = toRaw(data.value.datasets[0].data)
    chart.update()
  }
}

const handleWeekSelect = (key: string | number) => {
  const selectedOption = props.dropdownOptions.find((option) => option.key === key)
  if (selectedOption) {
    selectedWeekLabel.value = selectedOption.label
  }
  emit('selectWeek', key)
}

watch(
  () => props.labels,
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
.bar-chart-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.dropdown-button {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
  color: #666666;
}

.dropdown-icon {
  color: #808080;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
