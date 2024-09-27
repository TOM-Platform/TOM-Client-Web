<template>
  <div class="container">
    <div class="card">
      <button
        class="connect-button"
        @click="toggleConnection(DATATYPES['REQUEST_TEMPLATE_DATA'].key)"
      >
        {{ connectionLabel }}
      </button>
      <!-- <button
        class="connect-button"
        @click="sendStartMessage(DATATYPES['REQUEST_TEMPLATE_DATA'].key)"
      >
        Request Live Data
      </button> -->
      <div>
        <p class="detail-text">{{ templateStore.templateData.text }}</p>
        <p v-if="templateStore.templateData.receivedAt">
          Received at: {{ templateStore.templateData.receivedAt }}
        </p>
      </div>
      <div class="template-image-container">
        <img
          v-if="templateStore.templateData.imageUrl"
          :src="templateStore.templateData.imageUrl"
          alt="Received Image"
          class="template-image"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useTemplateLiveDataStore } from '@/stores/template/templateLiveDataStore'
import { useWebSocketStore } from '@/stores/webSocketStore'
import DATATYPES from '@/constant/DataTypes.json'

export default defineComponent({
  setup() {
    const templateStore = useTemplateLiveDataStore()
    const webSocketStore = useWebSocketStore()
    const connectionLabel = computed(() => webSocketStore.connectionLabel)

    onMounted(() => {})

    return {
      templateStore,
      toggleConnection: webSocketStore.toggleConnection,
      sendStartMessage: webSocketStore.sendStartMessage,
      connectionLabel,
      DATATYPES
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 32px);
  width: 100%;
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
  height: calc(100vh - 64px);
  width: 100%;
}

.template-image-container {
  height: calc(100vh - 192px);
  background-color: #f2f2f2;
}

.template-image {
  height: calc(100vh - 194px);
  width: auto;
  object-fit: contain;
}

.title-text {
  font-size: 1.2em;
  color: black;
  margin-top: 4px;
}

.detail-text {
  font-size: 1.2em;
  color: #666;
}

.connect-button {
  /* height: 64px; */
  width: 144px;
}
</style>
