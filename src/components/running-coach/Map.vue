<template>
  <div class="map-card">
    <GoogleMap
      :api-key="apiKey"
      class="map"
      :center="{ lat: centerLat, lng: centerLng }"
      :zoom="16.5"
      ref="mapRef"
    >
      <MapPolyline v-if="shouldRenderPath" :options="borderPolylineOptions" />
      <MapPolyline v-if="shouldRenderPath" :options="pathPolylineOptions" />
      <CustomMarker :options="{ position: { lat: centerLat, lng: centerLng } }">
        <div>
          <img src="@/assets/images/marker.png" width="22" height="22" />
        </div>
      </CustomMarker>
    </GoogleMap>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { GoogleMap, Polyline as MapPolyline, CustomMarker } from 'vue3-google-map'
import { useRunningLiveDataStore } from '@/stores/running-coach/runningLiveDataStore'
import { useRunningSessionDataStore } from '@/stores/running-coach/runningSessionDataStore'
import { useCommonUIStore } from '@/stores/commonUIStore'
import { useWebSocketStore } from '@/stores/webSocketStore'

import { map_api_key as MAPAPIKEY } from '@/credential/google_maps_credential.json'

export default defineComponent({
  name: 'MapComponent',
  components: {
    GoogleMap,
    MapPolyline,
    CustomMarker
  },
  setup() {
    const apiKey = MAPAPIKEY

    const runningLiveDataStore = useRunningLiveDataStore()
    const runningSessionDataStore = useRunningSessionDataStore()
    const commonUIStore = useCommonUIStore()
    const webSocketStore = useWebSocketStore()
    const shouldRenderPath = ref(true)
    const mapRef = ref<any>(null)

    const computedPath = computed(() => {
      return commonUIStore.selectedMode === 'Live Data'
        ? runningLiveDataStore.path
        : runningSessionDataStore.sessionData.path
    })

    const centerLat = computed(() => {
      return commonUIStore.selectedMode === 'Live Data'
        ? runningLiveDataStore.currLat
        : runningSessionDataStore.sessionData.path.length > 0
          ? runningSessionDataStore.sessionData.path[0].lat
          : 0
    })

    const centerLng = computed(() => {
      return commonUIStore.selectedMode === 'Live Data'
        ? runningLiveDataStore.currLng
        : runningSessionDataStore.sessionData.path.length > 0
          ? runningSessionDataStore.sessionData.path[0].lng
          : 0
    })

    const borderPolylineOptions = computed(() => ({
      path: computedPath.value,
      geodesic: true,
      strokeColor: '#2569c6',
      strokeOpacity: 1.0,
      strokeWeight: 7
    }))

    const pathPolylineOptions = computed(() => ({
      path: computedPath.value,
      geodesic: true,
      strokeColor: '#01b1ff',
      strokeOpacity: 1.0,
      strokeWeight: 4
    }))

    watch(
      () => computedPath.value,
      () => {
        shouldRenderPath.value = false
        nextTick(() => {
          shouldRenderPath.value = true
        })
      },
      { deep: true }
    )

    return {
      apiKey,
      computedPath,
      borderPolylineOptions,
      pathPolylineOptions,
      isConnected: computed(() => webSocketStore.isConnected),
      centerLat,
      centerLng,
      shouldRenderPath,
      mapRef
    }
  }
})
</script>

<style scoped>
.map-card {
  margin-right: 16px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
</style>
