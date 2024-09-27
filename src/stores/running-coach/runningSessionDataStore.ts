import { defineStore } from 'pinia'
import {
  fetchSessions,
  fetchSessionData,
  fetchWeeklyCaloriesData,
  fetchAvailableWeeks
} from '@/api/running-coach'
import {
  DATA_REDUCTION_THRESHOLD,
  DATA_REDUCTION_STEP,
  DAILY_TARGET
} from '@/constant/running/running-coach-constant'
import moment from 'moment-timezone'

export const useRunningSessionDataStore = defineStore('sessionData', {
  state: () => ({
    sessions: [] as { start_time: number; end_time: number }[],
    stats: [] as { label: string; value: number }[],
    sessionData: {
      distance: 0,
      speed: 0,
      calories: 0,
      heartRate: 0,
      path: [] as { lat: number; lng: number }[],
      heartrates: [] as number[],
      speeds: [] as number[],
      timestamps: [] as number[]
    },
    totalCalories: 0,
    weeklyCaloriesData: [] as { day: string; percentage: number }[],
    availableWeeks: [] as string[],
    dailyTarget: DAILY_TARGET,
    userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }),
  actions: {
    async fetchSessions(date: string) {
      try {
        const data = await fetchSessions(date)
        this.sessions = data
      } catch (error) {
        console.error('Failed to fetch sessions:', error)
      }
    },
    async fetchSessionData(sessionId: number) {
      try {
        const data = await fetchSessionData(sessionId)

        const path = data.map((row: any) => ({ lat: row.curr_lat, lng: row.curr_lng }))
        const heartrates = data.map((row: any) => row.heart_rate)
        const speeds = data.map((row: any) => row.speed)
        const timestamps = data.map((row: any) => row.timestamp)
        const distance = data.length ? data[data.length - 1].distance : 0
        const speed = data.length
          ? speeds.reduce((a: number, b: number) => a + b) / speeds.length
          : 0
        const calories = data.map((row: any) => row.calories)

        const totalCalories = data.length ? Math.round(calories[calories.length - 1]) : 0

        const avgHeartRate = Math.round(
          heartrates.reduce((acc: any, val: any) => acc + val, 0) / heartrates.length
        )

        let reducedData = {
          path: [] as { lat: number; lng: number }[],
          heartrates: [] as number[],
          speeds: [] as number[],
          timestamps: [] as number[]
        }

        if (timestamps.length > DATA_REDUCTION_THRESHOLD) {
          console.log('need reduct***', timestamps.length)
          for (let i = 0; i < timestamps.length; i += DATA_REDUCTION_STEP) {
            reducedData.path.push(path[i])
            reducedData.heartrates.push(heartrates[i])
            reducedData.speeds.push(speeds[i])
            reducedData.timestamps.push(timestamps[i])
          }
        } else {
          reducedData = { path, heartrates, speeds, timestamps }
        }

        const stats = [
          { label: 'Total Distance', value: distance },
          { label: 'Average Speed', value: speed },
          { label: 'Calories Burned', value: totalCalories },
          { label: 'Average Heart Rate', value: avgHeartRate }
        ]

        this.sessionData = {
          ...reducedData,
          distance: distance,
          speed: speed,
          calories: totalCalories,
          heartRate: avgHeartRate
        }
        this.totalCalories = totalCalories
        this.stats = stats
      } catch (error) {
        console.error('Failed to fetch session data:', error)
      }
    },
    async fetchWeeklyCaloriesData(weekStartDate: string) {
      try {
        const data = await fetchWeeklyCaloriesData(weekStartDate)
        console.log('Weekly Calories Data:', data)

        this.weeklyCaloriesData = data.map((dayData: { day: string; total_calories: number }) => ({
          day: dayData.day,
          percentage: (dayData.total_calories / this.dailyTarget) * 100
        }))
      } catch (error) {
        console.error('Failed to fetch weekly calories data:', error)
      }
    },
    async fetchAvailableWeeks() {
      try {
        const data = await fetchAvailableWeeks()
        console.log('Available Weeks:', data)
        this.availableWeeks = data.map((weekStart: string) => {
          const startDate = moment.tz(weekStart, 'MMM DD, YYYY', this.userTimeZone)
          const endDate = startDate.clone().add(6, 'days')
          return `${startDate.format('MMM DD')} - ${endDate.format('MMM DD, YYYY')}`
        })
      } catch (error) {
        console.error('Failed to fetch available weeks:', error)
      }
    }
  }
})
