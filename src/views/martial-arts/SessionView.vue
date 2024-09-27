<template>
  <div class="view">
    <h1 align="center">
      Session Summary [{{
        new Date(store.filteredSessionData.datetime * 1000).toLocaleDateString() +
        ' ' +
        new Date(store.filteredSessionData.datetime * 1000).toLocaleTimeString()
      }}]
    </h1>
    <n-divider />
    <n-space vertical wrap-item="true" align="center">
      <n-space horizontal>
        <n-space horizontal size="large">
          <n-card title="Session Duration" size="small">
            <n-h1>
              <n-text>{{ filteredSessionData.session_duration }} mins</n-text>
            </n-h1>
          </n-card>
          <n-card title="Interval Duration" size="small">
            <n-h1>
              <n-text>{{ filteredSessionData.interval_duration }} s</n-text>
            </n-h1>
          </n-card>
          <n-card title="Total Punches" size="small">
            <n-h1>
              <n-text>{{ filteredSessionData.total_punches }}</n-text>
            </n-h1>
          </n-card>
          <n-card title="Avg. Reaction Time" size="small">
            <n-h1>
              <n-text
                >{{
                  calculateAvgReactionTime({
                    totalPunches: filteredSessionData.total_punches,
                    totalTime: filteredSessionData.total_reaction_time
                  })
                }}
                ms</n-text
              >
            </n-h1>
          </n-card>
          <!-- <n-card title="Avg. Heart Rate" size="small">
            <n-h1>
              <n-text>78 BPM</n-text>
            </n-h1>
          </n-card> -->
        </n-space>
      </n-space>
      <n-divider />
      <n-space vertical align="center">
        <n-space vertical align="center">
          <n-h1>
            <n-text>Showing data for: </n-text>
            <n-text>{{ readablePunchType[store.filter] }}</n-text>
          </n-h1>
          <n-space horizontal align="center">
            <n-text>Filter Punches</n-text>
            <n-dropdown trigger="hover" :options="dropdownOptions" @select="handleSelect">
              <n-button>{{ readablePunchType[store.filter] }}</n-button>
            </n-dropdown>
          </n-space>
        </n-space>
        <n-space horizontal>
          <n-card vertical title="Target Map">
            <template #header-extra>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-icon><IosInformationCircleOutline /></n-icon>
                </template>
                <span>Shows where each punch landed and whether it is on target or not.</span>
              </n-tooltip>
            </template>
            <n-h1>
              <n-text>{{ totalAccuracy }}% on target</n-text>
            </n-h1>
            <div id="chart" style="width: 500px; height: 500px. z-index: 1;">
              <CircularScatterPlot :data="hitData" />
              <div class="on-target"></div>
              <div class="off-target"></div>
            </div>
          </n-card>
          <n-space vertical>
            <n-card vertical title="Accuracy of Punches">
              <template #header-extra>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-icon><IosInformationCircleOutline /></n-icon>
                  </template>
                  <span
                    >Displays aggregated accuracy on the minute over the duration of the session.
                    Calculated using the distance from the center of the target.</span
                  >
                </n-tooltip>
              </template>

              <div id="chart" style="width: 600px; height: 300px">
                <n-h1>
                  <n-text
                    >{{
                      Math.round(
                        (accuracyData.datasets[0].data.reduce((a, b) => a + b, 0) /
                          accuracyData.datasets[0].data.length) *
                          100
                      ) / 100
                    }}%</n-text
                  >
                </n-h1>
                <div style="height: 300px">
                  <LineGraph :options="accuracyOptions" :data="accuracyData" />
                </div>
              </div>
            </n-card>
            <n-card horizontal title="Punch Breakdown">
              <template #header-extra>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-icon><IosInformationCircleOutline /></n-icon>
                  </template>
                  <span
                    >Shows the breakdown and number of each type of punch thrown during the
                    session.</span
                  >
                </n-tooltip>
              </template>
              <div id="chart">
                <apexchart
                  type="pie"
                  width="380"
                  :options="punchBreakdownOptions"
                  :series="punchBreakdownSeries"
                ></apexchart>
              </div>
            </n-card>
          </n-space>
        </n-space>
      </n-space>
    </n-space>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import CircularScatterPlot from '@/components/martial-arts/CircularScatterPlot.vue'
import { useMessage } from 'naive-ui'
import LineGraph from '@/components/martial-arts/LineGraph.vue'
import { IosInformationCircleOutline } from '@vicons/ionicons4'
import { getSessionData } from '@/api/martial-arts'
import {
  type SessionData,
  type RawData,
  PunchType,
  readablePunchType,
  CollisionData
} from '@/types/martial-arts'
import { martialArtsSessionDataStore } from '@/stores/martial-arts/martialArtsSessionDataStore'
import { storeToRefs } from 'pinia'
import { type ChartData, type Point } from 'chart.js/auto'

export default defineComponent({
  name: 'SessionView',
  apexchart: VueApexCharts,
  components: {
    CircularScatterPlot,
    LineGraph,
    // MdArrowUp,
    // MdArrowDown,
    IosInformationCircleOutline
  },
  data() {
    return {
      pageTitle: 'Session Summary [01/02/2024 5.39pm]'
    }
  },
  setup() {
    const store = martialArtsSessionDataStore()
    const { filteredSessionData } = storeToRefs(store)
    const message = useMessage()
    const padRadius = 0.065
    const dropdownOptions: Record<string, any> = [
      {
        label: 'All Punches',
        key: PunchType.ALL
      },
      {
        label: 'Left Jab',
        key: PunchType.LEFT_JAB
      },
      {
        label: 'Right Jab',
        key: PunchType.RIGHT_JAB
      },
      {
        label: 'Left Cross',
        key: PunchType.LEFT_CROSS
      },
      {
        label: 'Right Cross',
        key: PunchType.RIGHT_CROSS
      }
    ]
    const handleSelect = (key: PunchType) => {
      store.filter = key // Update the selected option
    }

    function calculateAvgReactionTime({
      totalTime,
      totalPunches
    }: {
      totalTime: number
      totalPunches: number
    }): number {
      return Math.round((totalTime / totalPunches) * 100) / 100
    }

    const breakdownOrder: PunchType[] = [
      PunchType.LEFT_JAB,
      PunchType.RIGHT_JAB,
      PunchType.LEFT_CROSS,
      PunchType.RIGHT_CROSS
    ]

    const punchBreakdownSeries = computed(() =>
      breakdownOrder.map((punchType) => store.filteredSessionData.punch_dict[punchType] ?? 0)
    )

    const punchBreakdownOptions = {
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: breakdownOrder.map((punchType) => readablePunchType[punchType]),
      legend: {
        position: 'bottom'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: 'bottom'
            }
          }
        }
      ]
    }

    const calculateAccuraciesFromRawData = (rawData: RawData[]): number[] => {
      return rawData.map((d) => (1 - d.collisionData.distanceToTarget / (padRadius * 2)) * 100)
    }

    const accuracyData = computed(() => {
      const sessionData = store.filteredSessionData
      return {
        labels: sessionData.raw_data.map((_, index) => index.toString()),
        datasets: [
          {
            label: 'Punch Accuracy',
            backgroundColor: '#A020F0',
            data: calculateAccuraciesFromRawData(store.filteredSessionData.raw_data)
          }
        ]
      }
    })

    const accuracyOptions = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Punch #' // Specify the unit for the x-axis
          }
        },
        y: {
          title: {
            display: true,
            text: 'Accuracy (%)' // Specify the unit for the y-axis
          },
          min: 0,
          max: 100
        }
      }
    }

    const calculateDistanceFromTarget = (collisionData: CollisionData): number => {
      console.log(collisionData)
      return Math.sqrt(
        Math.pow((collisionData.collisionPoint.x - collisionData.padPosition.x) / padRadius, 2) +
          Math.pow((collisionData.collisionPoint.y - collisionData.padPosition.y) / padRadius, 2)
      )
    }

    // @ts-ignore
    const hitData: ChartData<'scatter', Point[]> = computed(() => {
      store.filteredSessionData?.raw_data?.map((d) => {
        console.log(d, {
          x: (d.collisionData.collisionPoint.x - d.collisionData.padPosition.x) / padRadius,
          y: (d.collisionData.collisionPoint.y - d.collisionData.padPosition.y) / padRadius
        })
        return d
      })
      return {
        datasets: [
          {
            type: 'scatter',
            label: 'On Target',
            backgroundColor: 'green',
            data: store.filteredSessionData.raw_data
              .filter((d) => calculateDistanceFromTarget(d.collisionData) < 0.56)
              .map((d) => ({
                x: (d.collisionData.collisionPoint.x - d.collisionData.padPosition.x) / padRadius,
                y: (d.collisionData.collisionPoint.y - d.collisionData.padPosition.y) / padRadius
              }))
          },
          {
            type: 'scatter',
            label: 'Off Target',
            backgroundColor: 'red',
            data: store.filteredSessionData.raw_data
              .filter((d) => calculateDistanceFromTarget(d.collisionData) >= 0.56)
              .map((d) => ({
                x: (d.collisionData.collisionPoint.x - d.collisionData.padPosition.x) / padRadius,
                y: (d.collisionData.collisionPoint.y - d.collisionData.padPosition.y) / padRadius
              }))
          }
        ]
      }
    })

    const totalAccuracy = computed(() => {
      const sessionData = store.filteredSessionData
      const totalPunches = sessionData.total_punches
      const onTarget = sessionData.raw_data.filter(
        (d) => calculateDistanceFromTarget(d.collisionData) < 0.56
      ).length
      return Math.round((onTarget / totalPunches) * 100 * 100) / 100
    })

    return {
      store,
      filteredSessionData,
      handleSelect,
      message,
      calculateAvgReactionTime,
      dropdownOptions,
      punchBreakdownSeries,
      punchBreakdownOptions,
      accuracyData,
      accuracyOptions,
      readablePunchType,
      hitData,
      totalAccuracy
    }
  },
  async mounted() {
    try {
      const sessionId: string = this.$route.params.sessionId as string
      const sessionDataResp: SessionData = await getSessionData(sessionId)
      this.store.data = sessionDataResp
    } catch (error: any) {
      this.message.error(`Failed to fetch session data: ${error.message}`)
    }
  }
})
</script>

<style scoped>
.on-target {
  width: 268px;
  height: 268px;
  background-color: #c6c8c6;
  opacity: 1;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  /* circle should intersect x = -0.56 and x = 0.56 roughly */
  transform: translate(-49%, -28%);
  z-index: 3;
}

.off-target {
  width: 470px;
  height: 478px;
  margin-top: 34px;
  background-color: #858585;
  opacity: 1;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  z-index: 2;
}
</style>
