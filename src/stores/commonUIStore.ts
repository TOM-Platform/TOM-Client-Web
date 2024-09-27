import { defineStore } from 'pinia'

export const useCommonUIStore = defineStore('commonData', {
  state: () => ({
    selectedDate: new Date(),
    selectedMode: 'Live Data',
    selectedSession: 'Select Session'
  }),
  actions: {
    setSelectedDate(date: Date) {
      this.selectedDate = date
    },
    setSelectedMode(mode: string) {
      this.selectedMode = mode
    },
    setSelectedSession(session: string) {
      this.selectedSession = session
    }
  }
})
