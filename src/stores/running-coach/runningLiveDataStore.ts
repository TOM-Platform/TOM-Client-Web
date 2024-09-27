import { defineStore } from 'pinia'
import { DashboardLiveRunningData } from '@/proto/dashboard_live_running_data'
import { DATA_REDUCTION_STEP } from '@/constant/running/running-coach-constant'
import { useWebSocketStore } from '@/stores/webSocketStore'

export const useRunningLiveDataStore = defineStore('runningDataStore', {
  state: () => ({
    timestamp: 0,
    startTime: 0,
    calories: 0,
    totalCalories: 0,
    heartRate: 0,
    distance: 0,
    speed: 0,
    avgSpeed: 0,
    bearing: 0,
    currLat: 0,
    currLng: 0,
    path: [] as { lat: number; lng: number }[],
    heartrates: [] as number[],
    timestamps: [] as number[],
    speeds: [] as number[],
    updateCounter: -1,
    selectedDate: new Date()
  }),
  actions: {
    handleWebSocketMessage(buffer: Uint8Array) {
      try {
        const message = DashboardLiveRunningData.decode(buffer)
        const messageObject = DashboardLiveRunningData.toObject(message, {
          longs: Number,
          enums: String,
          bytes: String,
          defaults: true,
          arrays: true,
          objects: true
        })

        this.updateData({
          timestamp: messageObject.timestamp,
          startTime: messageObject.startTime,
          calories: messageObject.calories,
          heartRate: messageObject.heartRate,
          distance: messageObject.distance,
          speed: messageObject.speed,
          avgSpeed: messageObject.avgSpeed,
          bearing: messageObject.bearing,
          currLat: messageObject.currLat,
          currLng: messageObject.currLng
        })
      } catch (error) {
        console.error('Failed to decode WebSocket message:', error)
      }
    },

    updateData(data: any) {
      const webSocketStore = useWebSocketStore()
      if (!webSocketStore.isConnected) return

      this.timestamp = data.timestamp
      this.startTime = data.startTime
      this.calories = data.calories
      this.totalCalories = data.calories
      this.heartRate = data.heartRate
      this.distance = data.distance
      this.speed = data.speed
      this.avgSpeed = data.avgSpeed
      this.bearing = data.bearing
      this.currLat = data.currLat
      this.currLng = data.currLng

      this.path.push({ lat: data.currLat, lng: data.currLng })
      this.speeds.push(data.speed)

      this.updateCounter += 1
      if (this.updateCounter >= DATA_REDUCTION_STEP || this.updateCounter == 0) {
        this.heartrates.push(data.heartRate)
        this.timestamps.push(data.timestamp)
        this.updateCounter = 0
      }
    },

    resetData() {
      this.timestamp = 0
      this.startTime = 0
      this.calories = 0
      this.totalCalories = 0
      this.heartRate = 0
      this.distance = 0
      this.speed = 0
      this.avgSpeed = 0
      this.bearing = 0
      this.currLat = 0
      this.currLng = 0
      this.path = []
      this.heartrates = []
      this.timestamps = []
      this.speeds = []
      this.updateCounter = -1
    },

    setSelectedDate(date: Date) {
      this.selectedDate = date
    }
  }
})
