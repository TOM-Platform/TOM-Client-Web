<template>
  <n-config-provider :locale="locale" :date-locale="dateEnUS" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-modal-provider>
            <n-dialog-provider>
              <n-date-picker
                panel
                type="date"
                :actions="[]"
                :default-value="Date.now()"
                @update:value="handleDateChange"
              />
            </n-dialog-provider>
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NModalProvider,
  NDialogProvider,
  NDatePicker,
  createLocale,
  enUS
} from 'naive-ui'
import { enUS as dateEnUS } from 'date-fns/locale'

const customizedLocale = createLocale({}, enUS)

export default defineComponent({
  name: 'CalendarComponent',
  components: {
    NConfigProvider,
    NLoadingBarProvider,
    NMessageProvider,
    NNotificationProvider,
    NModalProvider,
    NDialogProvider,
    NDatePicker
  },
  setup(props, { emit }) {
    const themeOverrides = {
      common: {
        fontSize: '14px'
      }
    }

    const handleDateChange = (timestamp) => {
      emit('update-date', timestamp)
    }

    return {
      locale: customizedLocale,
      dateEnUS,
      themeOverrides,
      handleDateChange
    }
  }
})
</script>

<style scoped></style>
