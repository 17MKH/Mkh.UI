import component from './index.vue'
import store from './store'

const options = {
  name: '蓝色-现代',
  code: 'blue',
  preview: './assets/mkh/preview.png',
  store,
  component,
  themes: [
    {
      name: 'dark',
      color: '#0e1726',
    },
  ],
}

//使用皮肤
mkh.useSkin(options)
