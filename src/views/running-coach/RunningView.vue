<template>
  <div class="view container">
    <div class="card profile-card">
      <div class="profile-content">
        <div class="profile-text">
          <p class="greeting-text">Hello {{ PROFILEDATA.FirstName }}, {{ greetingText }}</p>
          <p class="welcome-text">Welcome back to check your TOM dashboard!</p>
        </div>
        <div>
          <n-avatar :src="avatarUrl" size="80" class="profile-avatar" alt="User Avatar" />
        </div>
        <div class="profile-info-card">
          <div v-for="(item, index) in PROFILEDATA.Info" :key="index" class="info-content">
            <div class="info-value">{{ item.value }}</div>
            <div class="info-label">{{ item.label }}</div>
          </div>
        </div>
        <div class="calendar-container">
          <CalendarComponent @update-date="handleDateChange" />
        </div>
        <div class="chart-card calories-chart-container">
          <CaloriesBarChart
            :labels="caloriesLabels"
            :data="caloriesData"
            :dropdownOptions="weekOptions"
            @selectWeek="handleWeekChange"
          />
        </div>
      </div>
    </div>
    <div class="card main-content">
      <div class="header">
        <n-dropdown :options="dropdownOptions" trigger="click" @select="handleDropdownChange">
          <n-button class="dropdown-button">
            {{ selectedMode }}
            <n-icon size="16" class="dropdown-icon">
              <IosArrowDown />
            </n-icon>
          </n-button>
        </n-dropdown>
        <n-dropdown
          v-if="selectedMode === 'Session Data'"
          :options="sessionDropdownOptions"
          trigger="click"
          @select="handleSessionDropdownChange"
        >
          <n-button class="dropdown-button">
            {{ selectedSession }}
            <n-icon size="16" class="dropdown-icon">
              <IosArrowDown />
            </n-icon>
          </n-button>
        </n-dropdown>
        <button
          v-if="selectedMode === 'Live Data'"
          class="connect-button"
          @click="toggleConnection"
        >
          {{ connectionLabel }}
        </button>
        <div class="current-date">{{ formattedSelectedDate }}</div>
      </div>
      <div class="map-and-stats">
        <div class="map-stats-container">
          <div class="map-container">
            <MapComponent />
          </div>
          <div class="stat-card-container">
            <div class="card stat-card">
              <img src="@/assets/images/distance-icon.png" class="stat-icon" alt="Distance Icon" />
              <div class="stat-text">
                <p class="stat-value">{{ selectedData.distance.toFixed(1) }} M</p>
                <p class="stat-label">Total Distance</p>
              </div>
            </div>
            <div class="card stat-card">
              <img src="@/assets/images/speed-icon.png" class="stat-icon" alt="Speed Icon" />
              <div class="stat-text">
                <p class="stat-value">{{ selectedData.speed.toFixed(1) }} KM/H</p>
                <p class="stat-label">
                  {{ selectedMode === 'Live Data' ? 'Current Speed' : 'Avg Speed' }}
                </p>
              </div>
            </div>
            <div class="card stat-card">
              <img src="@/assets/images/calories-icon.png" class="stat-icon" alt="Calories Icon" />
              <div class="stat-text">
                <p class="stat-value">{{ selectedData.totalCalories }} CAL</p>
                <p class="stat-label">Calories Burned</p>
              </div>
            </div>
            <div class="card stat-card">
              <img
                src="@/assets/images/heart-rate-icon.png"
                class="stat-icon"
                alt="Heart Rate Icon"
              />
              <div class="stat-text">
                <p class="stat-value">{{ selectedData.heartRate }} BPM</p>
                <p class="stat-label">
                  {{ selectedMode === 'Live Data' ? 'Current Heart Rate' : 'Avg Heart Rate' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-card heart-rate-card">
          <HeartRateChart :data="selectedData.heartrates" :timestamps="selectedData.timestamps" />
        </div>
        <div class="chart-card speed-chart-card">
          <SpeedChart :data="selectedData.speeds" :timestamps="selectedData.timestamps" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRunningLiveDataStore } from '@/stores/running-coach/runningLiveDataStore'
import { useRunningSessionDataStore } from '@/stores/running-coach/runningSessionDataStore'
import { useCommonUIStore } from '@/stores/commonUIStore'
import { useWebSocketStore } from '@/stores/webSocketStore'

import HeartRateChart from '@/components/running-coach/HeartRateChart.vue'
import SpeedChart from '@/components/running-coach/SpeedChart.vue'
import { NDropdown, NButton } from 'naive-ui'
import { IosArrowDown } from '@vicons/ionicons4'
import CaloriesBarChart from '@/components/running-coach/CaloriesBarChart.vue'
import CalendarComponent from '@/components/Calendar.vue'
import MapComponent from '@/components/running-coach/Map.vue'
import { PROFILEDATA } from '@/constant/running/running-coach-constant'
import * as momentTemp from 'moment'
const moment = momentTemp['default']
import AVATAR_PIC_URL from '@/assets/images/avatar-pic.png'
const avatarUrl = ref(AVATAR_PIC_URL)

export default defineComponent({
  name: 'RunningView',
  components: {
    MapComponent,
    HeartRateChart,
    SpeedChart,
    CalendarComponent,
    CaloriesBarChart,
    NDropdown,
    NButton,
    IosArrowDown
  },
  setup() {
    const runningLiveDataStore = useRunningLiveDataStore()
    const runningSessionDataStore = useRunningSessionDataStore()
    const commonUIStore = useCommonUIStore()
    const webSocketStore = useWebSocketStore()
    const isConnected = computed(() => webSocketStore.isConnected)
    const connectionLabel = computed(() => webSocketStore.connectionLabel)

    const today = new Date()
    const defaultDate = ref(today)

    const currentDate = ref(
      new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    )

    const greetingText = computed(() => {
      const hour = new Date().getHours()
      if (hour < 12) {
        return 'Good morning'
      } else if (hour < 17) {
        return 'Good afternoon'
      } else {
        return 'Good evening'
      }
    })

    const selectedMode = ref('Live Data')
    const selectedSession = ref('Select Session')
    const dropdownOptions = ref([
      { label: 'Live Data', key: 'Live Data' },
      { label: 'Session Data', key: 'Session Data' }
    ])

    function formatTimestampToTimeString(timestamp: number): string {
      return moment
        .unix(timestamp / 1000)
        .local()
        .format('h:mm:ss A')
    }

    const sessionDropdownOptions = computed(() =>
      runningSessionDataStore.sessions.map((session) => ({
        label: `${formatTimestampToTimeString(session.start_time)} - ${formatTimestampToTimeString(session.end_time)}`,
        key: session.start_time
      }))
    )

    const handleDropdownChange = async (key: string | number) => {
      selectedMode.value = String(key)
      commonUIStore.setSelectedMode(selectedMode.value)

      if (selectedMode.value === 'Session Data') {
        await runningSessionDataStore.fetchSessions(
          moment(runningLiveDataStore.selectedDate).format('YYYY-MM-DD')
        )
      } else {
        selectedSession.value = 'Select Session'
      }
    }

    const handleSessionDropdownChange = async (key: string | number) => {
      const session = runningSessionDataStore.sessions.find((session) => session.start_time === key)
      const formattedTime = `${formatTimestampToTimeString(Number(key))} - ${
        session ? formatTimestampToTimeString(session.end_time) : ''
      }`
      selectedSession.value = formattedTime
      runningSessionDataStore.sessionData.path = []
      await runningSessionDataStore.fetchSessionData(Number(key))
    }

    const formattedSelectedDate = computed(() =>
      runningLiveDataStore.selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    )

    const handleDateChange = async (timestamp: number) => {
      const date = new Date(timestamp)
      runningLiveDataStore.setSelectedDate(date)
      selectedSession.value = 'Select Session'
    }

    watch(
      () => runningLiveDataStore.selectedDate,
      async (newDate) => {
        await runningSessionDataStore.fetchSessions(moment(newDate).format('YYYY-MM-DD'))
      }
    )

    const selectedData = computed(() => {
      if (commonUIStore.selectedMode === 'Live Data') {
        return {
          path: runningLiveDataStore.path,
          heartrates: runningLiveDataStore.heartrates,
          speeds: runningLiveDataStore.speeds,
          timestamps: runningLiveDataStore.timestamps,
          distance: runningLiveDataStore.distance,
          speed: runningLiveDataStore.speed,
          totalCalories: runningLiveDataStore.totalCalories,
          calories: runningLiveDataStore.calories,
          heartRate: runningLiveDataStore.heartRate,
          currLat: runningLiveDataStore.path.length > 0 ? runningLiveDataStore.currLat : 1.2966,
          currLng: runningLiveDataStore.path.length > 0 ? runningLiveDataStore.currLng : 103.7764
        }
      } else {
        return {
          path: runningSessionDataStore.sessionData.path,
          heartrates: runningSessionDataStore.sessionData.heartrates,
          speeds: runningSessionDataStore.sessionData.speeds,
          timestamps: runningSessionDataStore.sessionData.timestamps,
          distance: runningSessionDataStore.sessionData.distance,
          speed: runningSessionDataStore.sessionData.speed,
          totalCalories: runningSessionDataStore.totalCalories,
          calories: runningLiveDataStore.calories,
          heartRate: runningSessionDataStore.sessionData.heartRate,
          currLat:
            runningSessionDataStore.sessionData.path.length > 0
              ? runningSessionDataStore.sessionData.path[0].lat
              : 1.2966,
          currLng:
            runningSessionDataStore.sessionData.path.length > 0
              ? runningSessionDataStore.sessionData.path[0].lng
              : 103.7764
        }
      }
    })

    const caloriesLabels = computed(() =>
      runningSessionDataStore.weeklyCaloriesData.map((item) => item.day)
    )
    const caloriesData = computed(() =>
      runningSessionDataStore.weeklyCaloriesData.map((item) => item.percentage)
    )

    const weekOptions = computed(() => {
      return runningSessionDataStore.availableWeeks.map((date, index) => ({
        label: date,
        key: index
      }))
    })

    const handleWeekChange = async (key: number) => {
      const selectedWeek = weekOptions.value[key]
      if (selectedWeek) {
        const startDateString = selectedWeek.label.split(' - ')[0]
        const startDate = moment(startDateString + ` ${moment().year()}`, 'MMM DD YYYY')
        const formattedStartDate = startDate.format('MMM DD, YYYY')

        await runningSessionDataStore.fetchWeeklyCaloriesData(formattedStartDate)
      }
    }

    onMounted(async () => {
      await runningSessionDataStore.fetchAvailableWeeks()
      await runningSessionDataStore.fetchSessions(moment(today).format('YYYY-MM-DD'))
    })

    return {
      runningLiveDataStore,
      runningSessionDataStore,
      commonUIStore,
      connectionLabel,
      toggleConnection: webSocketStore.toggleConnection,
      isConnected,
      currentDate,
      defaultDate,
      selectedMode,
      selectedSession,
      dropdownOptions,
      sessionDropdownOptions,
      handleDropdownChange,
      handleSessionDropdownChange,
      avatarUrl,
      PROFILEDATA,
      formattedSelectedDate,
      handleDateChange,
      selectedData,
      greetingText,
      IosArrowDown,
      caloriesLabels,
      caloriesData,
      weekOptions,
      handleWeekChange
    }
  }
})
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 16px);
  gap: 16px;
  padding: 16px;
  background-color: #f2f2f2;
}

.card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.profile-card {
  width: 30%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  overflow: auto;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 16px;
}

.profile-text {
  text-align: center;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.profile-info-card {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
}

.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
}

.info-content {
  text-align: center;
  width: 33%;
}

.info-value {
  font-weight: bold;
  color: #000;
  font-size: 1.2em;
}

.info-label {
  font-size: 0.8em;
  color: #666;
}

.calories-chart-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.greeting-text {
  font-weight: bold;
  color: #000;
  font-size: 1.5em;
}

.welcome-text {
  font-size: 1em;
  color: #666;
}

.main-content {
  width: 70%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  gap: 16px;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dropdown-icon {
  margin-left: 8px;
  color: #808080;
}

.dropdown-button {
  color: #666666;
}

.connect-button {
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.data-mode-text {
  font-size: 1em;
  color: #666666;
  text-align: center;
}

.current-date {
  font-size: 1em;
  color: #666;
  margin-left: auto;
}

.map-and-stats {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.map-stats-container {
  display: flex;
  height: 48%;
  margin-bottom: 16px;
}

.map-card {
  flex: 3;
  margin-right: 16px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.stats-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.map-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
}

.stat-card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 20%;
}

.stat-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}

.stat-icon {
  width: 52px;
  height: 52px;
  margin-left: 8px;
}

.stat-text {
  display: flex;
  flex-direction: column;
  margin-left: 24px;
}

.stat-value {
  font-weight: bold;
  color: #000;
  font-size: medium;
}

.stat-label {
  font-size: small;
  color: #666;
}

h2 {
  margin: 0;
  padding: 0;
  font-size: 1.2em;
}

.connect-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
}

.connect-button:hover {
  background-color: #0056b3;
}

.heart-rate-card {
  height: 26.7%;
  margin-bottom: 16px;
}

.speed-chart-card {
  height: 26.7%;
}

.chart-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}
</style>
