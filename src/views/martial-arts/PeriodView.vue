<template>
  <div class="view">
    <n-space vertical style="margin-bottom: 50px">
      <br />
      <h1>
        Here are your stats for {{ formatDate(new Date(dateRange[0])) }} -
        {{ formatDate(new Date(dateRange[1])) }}
      </h1>

      <n-text
        >Compared to {{ formatDate(new Date(prevDateRange[0])) }} -
        {{ formatDate(new Date(prevDateRange[1])) }} (Previous Period)</n-text
      >
      <br />

      <h3>Select date range:</h3>

      <n-date-picker
        v-model:value="store.dateRange"
        :on-confirm="updateRange"
        type="daterange"
        clearable
      />
      <n-divider />
      <n-space horizontal size="large">
        <n-card>
          <n-space vertical align="center">
            <n-text style="font-size: 60px">🔥</n-text>
            <n-text style="font-size: 30px">{{ totalTrainingTime }} mins</n-text>
            <n-text>of training time</n-text>
            <n-tag
              v-bind:type="
                comparisonData.trainingTimeDiff === 0
                  ? ''
                  : comparisonData.trainingTimeDiff > 0
                    ? 'success'
                    : 'error'
              "
            >
              <n-icon>
                <MdArrowUp v-if="comparisonData.trainingTimeDiff > 0" />
                <MdArrowDown v-if="comparisonData.trainingTimeDiff < 0" />
                <IosRemove v-if="comparisonData.trainingTimeDiff === 0" />
              </n-icon>
              {{ Math.round(comparisonData.trainingTimeDiff * 100) / 100 }} over previous period
            </n-tag>
          </n-space>
        </n-card>
        <n-card>
          <n-space vertical align="center">
            <n-text style="font-size: 60px">👊</n-text>
            <n-text style="font-size: 30px">{{ totalPunches }}</n-text>
            <n-text>punches thrown</n-text>
            <n-tag
              v-bind:type="
                comparisonData.punchesDiff === 0
                  ? ''
                  : comparisonData.punchesDiff > 0
                    ? 'success'
                    : 'error'
              "
            >
              <n-icon>
                <MdArrowUp v-if="comparisonData.punchesDiff > 0" />
                <MdArrowDown v-if="comparisonData.punchesDiff < 0" />
                <IosRemove v-if="comparisonData.punchesDiff === 0" />
              </n-icon>
              {{ comparisonData.punchesDiff }} over previous period
            </n-tag>
          </n-space>
        </n-card>
        <!-- <n-card>
          <n-space vertical align="center">
            <n-text style="font-size: 60px">❤️</n-text>
            <n-text style="font-size: 30px">78 bpm</n-text>
            <n-text>avg. heart rate</n-text>
            <n-tag type="success">
              <n-icon>
                <MdArrowDown />
              </n-icon>
              4 bpm over last week
            </n-tag>
          </n-space>
        </n-card> -->
      </n-space>
      <n-space horizontal size="large">
        <n-card title="Average Reaction Time">
          <div id="chart" style="width: 500px; height: 400px">
            <n-space horizontal align="center">
              <n-text style="font-size: 30px">{{ aggregatedData.avgReactionTime }} sec(s)</n-text>
              <n-tag
                v-bind:type="
                  comparisonData.reactionTimeDiff === 0
                    ? ''
                    : comparisonData.reactionTimeDiff < 0
                      ? 'success'
                      : 'error'
                "
                v-if="!isNaN(comparisonData.reactionTimeDiff)"
              >
                <n-icon>
                  <MdArrowUp v-if="comparisonData.reactionTimeDiff > 0" />
                  <MdArrowDown v-if="comparisonData.reactionTimeDiff < 0" />
                  <IosRemove v-if="comparisonData.reactionTimeDiff === 0" />
                </n-icon>
                {{ Math.round(comparisonData.reactionTimeDiff * 100) / 100 }}%
              </n-tag>
            </n-space>
            <n-text>Compared to previous period</n-text>
            <div style="width: 500px; height: 300px">
              <LineGraph :data="reactionTimeData" />
            </div>
          </div>
        </n-card>
        <n-card title="Punches on Target">
          <div id="chart" style="width: 500px; height: 400px">
            <n-space horizontal align="center">
              <n-text style="font-size: 30px">{{ aggregatedData.avgAccuracy }}%</n-text>
              <n-tag
                v-bind:type="
                  comparisonData.accuracyDiff === 0
                    ? ''
                    : comparisonData.accuracyDiff > 0
                      ? 'success'
                      : 'error'
                "
                v-if="!isNaN(comparisonData.accuracyDiff)"
              >
                <n-icon>
                  <MdArrowUp v-if="comparisonData.accuracyDiff > 0" />
                  <MdArrowDown v-if="comparisonData.accuracyDiff < 0" />
                  <IosRemove v-else />
                </n-icon>
                {{ comparisonData.accuracyDiff }}%
              </n-tag>
            </n-space>
            <n-text>Compared to previous period</n-text>
            <div style="width: 500px; height: 300px">
              <LineGraph :data="accuracyData" />
            </div>
          </div>
        </n-card>
      </n-space>
    </n-space>
    <n-divider />
    <n-space vertical>
      <n-text style="font-size: 30px">Past Sessions</n-text>
      <n-table :single-line="false">
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in prevSessions" :key="index">
            <td>{{ item.date }}</td>
            <td>{{ item.duration }}</td>
            <td>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <IosEye
                    @click="() => navigateToDetailedView(item.id)"
                    style="width: 30px; height: 30px; cursor: pointer"
                  />
                </template>
                <span>View</span>
              </n-tooltip>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-space>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import LineGraph from '@/components/martial-arts/LineGraph.vue'
import { MdArrowUp, MdArrowDown, IosEye, IosRemove } from '@vicons/ionicons4'
import { periodViewStore } from '@/stores/martial-arts/martialArtsSessionDataStore'
import { getPeriodData } from '@/api/martial-arts'

export default defineComponent({
  methods: {
    navigateToDetailedView(id) {
      this.$router.push(`/martial-arts/${id}`)
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    },
    processResp(resp) {
      let trainingTime = 0
      let punches = 0
      let reactionTimeData = {
        labels: [],
        datasets: [
          {
            label: 'Reaction Time',
            backgroundColor: '#18A058',
            data: []
          }
        ]
      }
      let accuracyData = {
        labels: [],
        datasets: [
          {
            label: 'On Target',
            backgroundColor: '#18A058',
            data: []
          }
        ]
      }
      const prevSessions = []
      resp.forEach((d) => {
        const [minutes, seconds] = d.session_duration.split(':').map(Number)
        const totalMinutes = minutes + seconds / 60
        const roundedMinutes = Math.round(totalMinutes * 100) / 100
        trainingTime += roundedMinutes
        punches += d.total_punches
        const dateStr = new Date(d.datetime * 1000).toISOString().split('T')[0]
        reactionTimeData.labels.push(dateStr)
        reactionTimeData.datasets[0].data.push(d.total_reaction_time / d.total_punches)
        accuracyData.labels.push(dateStr)
        accuracyData.datasets[0].data.push((1 - d.off_target / d.total_punches) * 100)
        const dateTime = new Date(d.datetime * 1000).toISOString()
        const datePart = dateTime.split('T')[0]
        const timePart = dateTime.split('T')[1].split('.')[0] // Extracting time and removing milliseconds
        const dateTimeString = `${datePart} ${timePart}`
        prevSessions.push({
          date: dateTimeString,
          duration: `${d.session_duration}`,
          id: d.id
        })
      })

      prevSessions.sort((a, b) => new Date(b.date) - new Date(a.date))

      return {
        trainingTime,
        punches,
        reactionTimeData,
        accuracyData,
        prevSessions
      }
    },
    getPreviousDateRange(startDate, endDate) {
      const duration = endDate - startDate // Duration of the current date range in milliseconds
      const previousStartDate = new Date(startDate - duration).getTime() // Subtract the duration from the start date
      const previousEndDate = new Date(endDate - duration).getTime() // Subtract the duration from the end date
      return [previousStartDate, previousEndDate]
    },
    getAvg(data) {
      if (data.datasets[0].data.length === 0) {
        return 0
      }
      const filteredData = data.datasets[0].data.filter((d) => !isNaN(d))
      // Round to 2 decimal places
      return Math.round((filteredData.reduce((a, b) => a + b, 0) / filteredData.length) * 100) / 100
    },
    async fetchData() {
      const startTimestamp = new Date(this.dateRange[0]).getTime()
      const endDate = new Date(this.dateRange[1])
      endDate.setDate(endDate.getDate() + 1) // Add one day to the end date
      const endTimestamp = endDate.getTime()

      const resp = await getPeriodData(startTimestamp, endTimestamp)
      const { trainingTime, punches, reactionTimeData, accuracyData, prevSessions } =
        this.processResp(resp)

      this.store.setTotalTrainingTime(Math.round(trainingTime * 100) / 100)
      this.store.setTotalPunches(punches)
      this.store.setReactionTimeData(reactionTimeData)
      this.store.setAccuracyData(accuracyData)
      this.store.setPreviousSessions(prevSessions)

      const previousDateRange = this.getPreviousDateRange(startTimestamp, endTimestamp)
      this.store.setPrevDateRange(previousDateRange)
      const prevResp = await getPeriodData(previousDateRange[0], previousDateRange[1])
      const {
        trainingTime: prevTrainingTime,
        punches: prevPunches,
        reactionTimeData: prevReactionTimeData,
        accuracyData: prevAccuracyData
      } = this.processResp(prevResp)
      this.store.setPreviousRangeData({
        totalTrainingTime: prevTrainingTime,
        totalPunches: prevPunches,
        reactionTimeData: prevReactionTimeData,
        accuracyData: prevAccuracyData
      })

      const trainingTimeDiff =
        Math.round(trainingTime * 100) / 100 - Math.round(prevTrainingTime * 100) / 100
      const punchesDiff = punches - prevPunches
      const avgReactionTime = this.getAvg(reactionTimeData)
      const prevAvgReactionTime = this.getAvg(prevReactionTimeData)
      let avgReactionTimeDiff = undefined

      if (prevAvgReactionTime !== 0) {
        avgReactionTimeDiff = Math.round(
          ((avgReactionTime - prevAvgReactionTime) / prevAvgReactionTime) * 100
        )
      }

      const avgAccuracy = this.getAvg(accuracyData)
      const prevAvgAccuracy = this.getAvg(prevAccuracyData)
      let avgAccuracyDiff = undefined
      if (prevAvgAccuracy !== 0) {
        avgAccuracyDiff = Math.round(((avgAccuracy - prevAvgAccuracy) / prevAvgAccuracy) * 100)
      }

      this.store.setComparisonData({
        trainingTimeDiff: trainingTimeDiff,
        punchesDiff: punchesDiff,
        reactionTimeDiff: avgReactionTimeDiff,
        accuracyDiff: avgAccuracyDiff
      })
      this.store.setAggregatedData({
        avgReactionTime,
        avgAccuracy
      })

      if (!isNaN(avgAccuracyDiff)) {
        this.store.setAccuracyData({
          ...accuracyData,
          datasets: [
            {
              ...accuracyData.datasets[0],
              backgroundColor: avgAccuracyDiff > 0 ? '#18A058' : '#f87979'
            }
          ]
        })
      }

      if (!isNaN(avgReactionTimeDiff)) {
        this.store.setReactionTimeData({
          ...reactionTimeData,
          datasets: [
            {
              ...reactionTimeData.datasets[0],
              backgroundColor: avgReactionTimeDiff > 0 ? '#f87979' : '#18A058'
            }
          ]
        })
      }
    }
  },
  setup() {
    const store = periodViewStore()
    const dateRange = computed(() => store.getDateRange)
    const prevDateRange = computed(() => store.getPrevDateRange)
    const totalTrainingTime = computed(() => store.getTotalTrainingTime)
    const totalPunches = computed(() => store.getTotalPunches)
    const reactionTimeData = computed(() => store.getReactionTimeData)
    const accuracyData = computed(() => store.getAccuracyData)
    const prevSessions = computed(() => store.getPreviousSessions)
    const comparisonData = computed(() => store.getComparisonData)
    const aggregatedData = computed(() => store.getAggregatedData)

    const updateRange = (newRange) => {
      store.setDateRange(newRange)
    }

    const previousRangeData = computed(() => store.getPreviousRangeData)

    return {
      dateRange,
      prevDateRange,
      updateRange,
      totalTrainingTime,
      totalPunches,
      reactionTimeData,
      accuracyData,
      prevSessions,
      previousRangeData,
      comparisonData,
      aggregatedData,
      store
    }
  },
  watch: {
    dateRange: {
      handler: 'fetchData', // Call fetchData method when dateRange changes
      deep: true // Watch changes deeply in the array
    }
  },
  async mounted() {
    await this.fetchData()
  },
  components: {
    LineGraph,
    MdArrowUp,
    MdArrowDown,
    IosEye,
    IosRemove
  }
})
</script>

<style></style>
