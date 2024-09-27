import { defineStore } from 'pinia'
import { SocketData } from '@/proto/socket_data'
import { WEBSOCKET_HOST_IP, WEBSOCKET_HOST_PORT } from '@/constant/config'
import { useRunningLiveDataStore } from '@/stores/running-coach/runningLiveDataStore'
import { useTemplateLiveDataStore } from '@/stores/template/templateLiveDataStore'
import { RequestData } from '@/proto/request_data'
import DATATYPES from '@/constant/DataTypes.json'

export const useWebSocketStore = defineStore('webSocketStore', {
  state: () => ({
    ws: null as WebSocket | null,
    isConnected: false,
    currentDatatype: null as number | null
  }),

  actions: {
    connect(datatype: number) {
      this.currentDatatype = datatype
      this.ws = new WebSocket(
        `ws://${WEBSOCKET_HOST_IP}:${WEBSOCKET_HOST_PORT}?websocket_client_type=dashboard`
      )
      this.ws.binaryType = 'arraybuffer'

      this.ws.onopen = () => {
        this.isConnected = true
        if (this.currentDatatype !== null) {
          this.sendStartMessage(this.currentDatatype)
        }
      }

      this.ws.onmessage = (event) => {
        const buffer = new Uint8Array(event.data)
        this.handleMessage(buffer)
      }

      this.ws.onclose = () => {
        this.isConnected = false
        console.log('WebSocket connection closed')
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        this.isConnected = false
      }
    },

    disconnect() {
      if (this.ws) {
        this.ws.close()
        this.ws = null
        this.isConnected = false
      }
    },

    toggleConnection(datatype: number) {
      if (this.isConnected) {
        this.disconnect()
      } else {
        this.connect(datatype)
      }
    },

    sendStartMessage(datatype: number) {
      let requestPayload: any

      // Different request loads are generated depending on the datatype
      switch (datatype) {
        case DATATYPES['REQUEST_TEMPLATE_DATA']['key']:
          requestPayload = {
            detail: 'Requesting template data'
          }
          break
        case DATATYPES['DASHBOARD_REQUEST_LIVE_DATA']['key']:
          requestPayload = {
            requestId: 1,
            requestStatus: 'START'
          }
          break
        default:
          console.error('Unknown datatype:', datatype)
          return
      }

      const requestBuffer = RequestData.encode(RequestData.create(requestPayload)).finish()

      const payload = {
        dataType: datatype,
        data: requestBuffer
      }

      const errMsg = SocketData.verify(payload)
      if (errMsg) throw Error(errMsg)

      const socketDataMessage = SocketData.create(payload)
      const buffer = SocketData.encode(socketDataMessage).finish()

      this.send(buffer)
    },

    send(data: Uint8Array) {
      if (this.ws && this.isConnected) {
        this.ws.send(data)
      } else {
        console.error('WebSocket is not connected')
      }
    },

    handleMessage(buffer: Uint8Array) {
      try {
        const decodedMessage = SocketData.decode(buffer)
        const messageObject = SocketData.toObject(decodedMessage, {
          longs: Number,
          enums: String,
          bytes: String,
          defaults: true,
          arrays: true,
          objects: true
        })

        const dataType = messageObject.dataType
        console.log('messageObject***:', messageObject)
        console.log('dataType***:', dataType)

        const runningLiveDataStore = useRunningLiveDataStore()
        const templateLiveDataStore = useTemplateLiveDataStore()

        const messageHandlers: Record<number, (buffer: Uint8Array) => void> = {
          [DATATYPES['DASHBOARD_LIVE_RUNNING_DATA']['key']]:
            runningLiveDataStore.handleWebSocketMessage.bind(runningLiveDataStore),
          [DATATYPES['TEMPLATE_DATA']['key']]:
            templateLiveDataStore.handleWebSocketMessage.bind(templateLiveDataStore)
        }

        const handler = messageHandlers[dataType]
        if (handler) {
          handler(buffer)
        } else {
          console.error('Unknown data type:', dataType)
        }
      } catch (error) {
        console.error('Failed to decode message:', error)
      }
    }
  },

  getters: {
    connectionLabel(): string {
      return this.isConnected ? 'Disconnect Server' : 'Connect Server'
    }
  }
})

export const { toggleConnection, connectionLabel, isConnected } = useWebSocketStore()
