import { SkinDefinition } from '@/types'
import component from './index.vue'

const skin: SkinDefinition = {
  name: '简约',
  code: 'brief',
  preview: './assets/mkh/preview.png',
  component,
  themes: [
    {
      name: 'dark',
      color: '#0e1726',
    },
    {
      name: 'light',
      color: '#89e',
    },
  ],
}

export default skin
