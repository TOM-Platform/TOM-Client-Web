<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useMessage, useDialog, useNotification, useLoadingBar, type MenuOption } from 'naive-ui'
import { LAYOUT_ITEMS } from '@/constant/constant'
import { useRouter } from 'vue-router'
import useConfig from '@/hooks/useConfig'
import Settings32Regular from '@vicons/fluent/Settings32Regular'
import PlugConnected24Filled from '@vicons/fluent/PlugConnected24Filled'
import PlugDisconnected24Regular from '@vicons/fluent/PlugDisconnected24Regular'
import { Icon } from '@vicons/utils'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()
    // mount on window
    window.$message = useMessage()
    window.$dialog = useDialog()
    window.$notification = useNotification()
    window.$loadingBar = useLoadingBar()
    const configDrawerActive = ref(false)
    const layoutOptions = ref<MenuOption[]>(LAYOUT_ITEMS)
    const collapsed = ref(false)
    // const activeName = ref('/')
    const activeName = ref('/running')
    const handleMenuSelect = (value: string) => {
      activeName.value = value
      router.push({
        path: value
      })
    }

    // config
    const { theme, lang, changeTheme, changeLang } = useConfig()
    const showLang = computed(() => {
      return lang.value.name === 'zh-CN' ? '中文' : 'English'
    })

    const toggleConfigDrawer = () => {
      configDrawerActive.value = !configDrawerActive.value
    }
    return {
      layoutOptions,
      collapsed,
      activeName,
      configDrawerActive,
      theme,
      lang,
      showLang,
      changeTheme,
      changeLang,
      handleMenuSelect,
      toggleConfigDrawer,
      Settings32Regular,
      PlugConnected24Filled,
      PlugDisconnected24Regular,
      Icon
    }
  }
})
</script>

<template>
  <n-layout has-sider class="app-layout" position="absolute">
    <n-layout-sider
      position="absolute"
      collapse-mode="transform"
      :collapsed-width="0"
      :width="164"
      :collapsed="collapsed"
      class="app-layout-sider"
      show-trigger="bar"
      style="border-top-right-radius: 16px"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <span class="app-layout-sider__title"> TOM </span>
      <n-menu
        :value="activeName"
        :options="layoutOptions"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        @update:value="handleMenuSelect"
      />
      <div style="padding-left: 20px">
        <!-- <n-button type="primary" @click="toggleConfigDrawer" :ghost="!isWsConnected" round>
                    <n-icon :size="24" :component="wsconnStateIcon" />
                    &nbsp;WS: {{ isWsConnected ? 'ON' : 'off' }}
                </n-button> -->
        <!-- <span style="margin-right: 20px;" @click="toggleConfigDrawer">Toggle Settings</span> -->
        <!-- <span @click="changeLang">{{ showLang }}</span> -->
      </div>
      <div style="padding-left: 20px">
        <!-- <n-button type="primary" ghost @click="changeTheme">{{
                    theme === null ? 'Theme: Light' : 'Theme: Dark'
                }}</n-button> -->
        <!-- <span @click="changeLang">{{ showLang }}</span> -->
      </div>
    </n-layout-sider>
    <n-layout
      position="absolute"
      style="transition: all 0.3s"
      :style="{ left: collapsed ? '10px' : '180px' }"
    >
      <n-layout-content class="layout-content">
        <div style="padding: 0">
          <router-view v-slot="{ Component }">
            <component :is="Component" :key="$route.path" />
          </router-view>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <n-drawer v-model:show="configDrawerActive" :width="502" placement="bottom" resizable>
    <n-drawer-content title="Configuration">
      <n-flex vertical>
        <n-tag type="success">
          {{ isWsConnected ? 'Connected' : 'Disconnected' }}
        </n-tag>
        <n-form>
          <n-form-item label="Websocket URL">
            <n-input v-model:value="websocketURL" />
          </n-form-item>
        </n-form>
        <n-button type="primary" @click="connectWebsocketServer"
          >Connect to Websocket Server</n-button
        >
      </n-flex>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.app-layout-sider {
  background-color: 'green';
}

.app-layout-sider__title {
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  padding-left: 20px;
  height: 28px;
  color: #333;
  font-weight: 500;
  font-size: 20px;
}

.n-layout-header {
  padding: 24px;
  display: flex;
  justify-content: flex-end;
}

.n-layout-header span {
  cursor: pointer;
}
</style>
