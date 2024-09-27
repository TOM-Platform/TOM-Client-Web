import axios from 'axios'
import { API_BASE_URL } from '../constant/config'
import moment from 'moment'

// use ISO 8601, week starts on Monday
moment.updateLocale('en', {
  week: {
    dow: 1 // Monday is the first day of the week
  }
})

export async function fetchSessions(date: string) {
  const response = await axios.get(API_BASE_URL + '/running-coach/' + `sessions?date=${date}`)
  return response.data
}

export async function fetchSessionData(sessionId: number) {
  const response = await axios.get(
    API_BASE_URL + '/running-coach/' + `session-data?session_id=${sessionId}`
  )
  return response.data
}

export async function fetchAvailableWeeks() {
  const response = await axios.get(`${API_BASE_URL}/running-coach/available-weeks`)
  return response.data
}

export async function fetchWeeklyCaloriesData(weekStartDate: string) {
  const weekStartTimestamp = moment(weekStartDate, 'MMM D, YYYY').startOf('isoWeek').valueOf()
  const weekEndTimestamp = moment(weekStartDate, 'MMM D, YYYY').endOf('isoWeek').valueOf()
  const response = await axios.get(`${API_BASE_URL}/running-coach/weekly-calories`, {
    params: {
      week_start: weekStartTimestamp,
      week_end: weekEndTimestamp
    }
  })
  return response.data
}
