import { defineStore } from 'pinia'
import { TemplateData } from '@/proto/template_data'
import { SocketData } from '@/proto/socket_data'

export const useTemplateLiveDataStore = defineStore('templateDataStore', {
  state: () => ({
    templateData: { text: '', imageUrl: '', receivedAt: '' }
  }),
  actions: {
    handleWebSocketMessage(buffer: Uint8Array) {
      try {
        const decodedMessage = SocketData.decode(buffer)
        const templateData = TemplateData.decode(decodedMessage.data)

        if (templateData.image && templateData.text) {
          const blob = new Blob([templateData.image], { type: 'image/png' })
          const imageUrl = URL.createObjectURL(blob)

          const receivedAt = new Date().toLocaleString()

          this.templateData = {
            text: templateData.text,
            imageUrl: imageUrl,
            receivedAt: receivedAt
          }

          console.log('imageUrl', this.templateData['imageUrl'])
          console.log('text', this.templateData['text'])
          console.log('receivedAt', this.templateData['receivedAt'])
        }
      } catch (error) {
        console.error('Failed to decode WebSocket message:', error)
      }
    },
    resetData() {
      this.templateData = { text: '', imageUrl: '', receivedAt: '' }
    }
  }
})
