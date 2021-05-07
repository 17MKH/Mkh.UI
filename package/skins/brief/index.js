import component from './index.vue'
import store from './store'

const options = {
  name: '简约',
  code: 'brief',
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
MkhUI.useSkin(options)
