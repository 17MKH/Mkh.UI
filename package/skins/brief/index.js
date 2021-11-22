import component from './index.vue'
import store from './store'

const options = {
  name: '简约',
  code: 'brief',
  preview: './assets/mkh/preview.png',
  store,
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

//使用皮肤
mkh.useSkin(options)
