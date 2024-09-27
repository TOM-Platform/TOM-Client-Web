import type { SessionData } from '@/types/martial-arts'
import axios from 'axios'
import { API_BASE_URL } from '../constant/config'

export async function getSessionData(sessionId: string) {
  const resp = await axios.get<SessionData>(`${API_BASE_URL}/martial-arts/${sessionId}`)
  return resp.data
}

export async function getPeriodData(startDate: Date, endDate: Date) {
  try {
    const resp = await axios.post<any>(`${API_BASE_URL}/martial-arts/`, {
      start_date: startDate,
      end_date: endDate
    })
    return resp.data
  } catch (error) {
    // Handle error here
    console.error('Error fetching period data:', error)
    throw error
  }
}
