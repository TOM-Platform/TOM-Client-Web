import { PunchType, type SessionData } from '@/types/martial-arts'
import { defineStore } from 'pinia'

type martialArtsSessionDataState = {
  data: SessionData
  filter: PunchType
}

export const martialArtsSessionDataStore = defineStore('martialArtsSessionDataStore', {
  // arrow function recommended for full type inference
  state: (): martialArtsSessionDataState => {
    return {
      data: {
        session_duration: '0',
        interval_duration: 0,
        total_punches: 0,
        total_reaction_time: 0,
        punch_dict: {
          [PunchType.LEFT_JAB]: 0,
          [PunchType.LEFT_CROSS]: 0,
          [PunchType.RIGHT_JAB]: 0,
          [PunchType.RIGHT_CROSS]: 0
        },
        good_punch: 0,
        bad_angle: 0,
        off_target: 0,
        uncategorized: 0,
        datetime: new Date().getTime(),
        id: 0,
        raw_data: []
      },
      filter: PunchType.ALL
    }
  },
  getters: {
    filteredSessionData(): SessionData {
      if (this.filter === PunchType.ALL) {
        return this.data
      }

      const filteredRawData = this.data.raw_data.filter(
        (rawData) => rawData.punchData.punchType === this.filter
      )

      return {
        ...this.data,
        punch_dict: {
          [this.filter as any]: filteredRawData.length
        },
        raw_data: filteredRawData,
        total_punches: filteredRawData.length,
        good_punch: filteredRawData
          .map((rawData) => rawData.feedback_category)
          .filter((feedback) => feedback === 'good_punch').length,
        bad_angle: filteredRawData
          .map((rawData) => rawData.feedback_category)
          .filter((feedback) => feedback === 'bad_angle').length,
        off_target: filteredRawData
          .map((rawData) => rawData.feedback_category)
          .filter((feedback) => feedback === 'off_target').length
      }
    }
  }
})

type ChartData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
  }[]
}

type PreviousSession = {
  date: string
  duration: string
  id: string
}

export type PeriodData = {
  totalTrainingTime: number
  totalPunches: number
  reactionTimeData: ChartData
  accuracyData: ChartData
  previousSessions: PreviousSession[]
}

type PeriodViewState = {
  dateRange: [number, number]
  prevDateRange: [number, number]
  data: PeriodData
  previousRangeData: PeriodData
  comparisonData: ComparisonData
  aggregatedData: {
    avgReactionTime: number
    avgAccuracy: number
  }
}

export type ComparisonData = {
  trainingTimeDiff: number
  punchesDiff: number
  reactionTimeDiff: number
  accuracyDiff: number
}

export const periodViewStore = defineStore('periodViewStore', {
  state: (): PeriodViewState => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set time to midnight (00:00:00)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    sevenDaysAgo.setHours(0, 0, 0, 0) // Set time to midnight (00:00:00)
    return {
      // one week
      dateRange: [sevenDaysAgo.getTime(), today.getTime()],
      prevDateRange: [sevenDaysAgo.getTime(), today.getTime()],
      data: {
        totalTrainingTime: 0,
        totalPunches: 0,
        reactionTimeData: {
          labels: [],
          datasets: [
            {
              label: 'Reaction Time',
              data: [],
              backgroundColor: '#f87979'
            }
          ]
        },
        accuracyData: {
          labels: [],
          datasets: [
            {
              label: 'Punches',
              data: [],
              backgroundColor: '#f87979'
            }
          ]
        },
        previousSessions: []
      },
      previousRangeData: {
        totalTrainingTime: 0,
        totalPunches: 0,
        reactionTimeData: {
          labels: [],
          datasets: [
            {
              label: 'Reaction Time',
              data: [],
              backgroundColor: '#f87979'
            }
          ]
        },
        accuracyData: {
          labels: [],
          datasets: [
            {
              label: 'Punches',
              data: [],
              backgroundColor: '#f87979'
            }
          ]
        },
        previousSessions: []
      },
      aggregatedData: {
        avgReactionTime: 0,
        avgAccuracy: 0
      },
      comparisonData: {
        trainingTimeDiff: 0,
        punchesDiff: 0,
        reactionTimeDiff: 0,
        accuracyDiff: 0
      }
    }
  },
  getters: {
    getDateRange(): [number, number] {
      return this.dateRange
    },
    getPrevDateRange(): [number, number] {
      return this.prevDateRange
    },
    getTotalTrainingTime(): number {
      return this.data.totalTrainingTime
    },
    getTotalPunches(): number {
      return this.data.totalPunches
    },
    getReactionTimeData(): ChartData {
      return this.data.reactionTimeData
    },
    getAccuracyData(): ChartData {
      return this.data.accuracyData
    },
    getPreviousSessions(): PreviousSession[] {
      return this.data.previousSessions
    },
    getPreviousRangeData(): PeriodData {
      return this.previousRangeData
    },
    getComparisonData(): ComparisonData {
      return this.comparisonData
    },
    getAggregatedData(): {
      avgReactionTime: number
      avgAccuracy: number
    } {
      return this.aggregatedData
    }
  },
  actions: {
    setDateRange(range: [number, number]) {
      this.dateRange = range
    },
    setPrevDateRange(range: [number, number]) {
      this.prevDateRange = range
    },
    setTotalTrainingTime(time: number) {
      this.data.totalTrainingTime = time
    },
    setTotalPunches(punches: number) {
      this.data.totalPunches = punches
    },
    setReactionTimeData(data: ChartData) {
      this.data.reactionTimeData = data
    },
    setAccuracyData(data: ChartData) {
      this.data.accuracyData = data
    },
    setPreviousSessions(sessions: PreviousSession[]) {
      this.data.previousSessions = sessions
    },
    setPreviousRangeData(data: PeriodData) {
      this.previousRangeData = data
    },
    setComparisonData(data: ComparisonData) {
      this.comparisonData = data
    },
    setAggregatedData(data: { avgReactionTime: number; avgAccuracy: number }) {
      this.aggregatedData = data
    }
  }
})
