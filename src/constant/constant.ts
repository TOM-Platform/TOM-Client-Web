import { h } from 'vue'
import { NIcon } from 'naive-ui'
import SvgIcon from '@/components/icons/SvgIcon.vue'

export const LAYOUT_ITEMS = [
  {
    label: 'Running',
    key: '/running',
    icon: renderIcon('running-icon')
  },
  {
    label: 'Martial Arts',
    key: '/martial-arts',
    icon: renderIcon('martialarts-icon')
  },
  {
    label: 'Template',
    key: '/template',
    icon: renderIcon('template-icon')
  }
]

function renderIcon(icon: string) {
  return () =>
    h(
      NIcon,
      {
        size:
          icon == 'visualizer3d-icon' || icon == 'webrtc-icon' || icon == 'template-icon' ? 32 : 38
      },
      { default: () => h(SvgIcon, { icon }) }
    )
}

// Martial Arts
export const MARTIAL_ARTS_ROUTE = 'martial-arts'
