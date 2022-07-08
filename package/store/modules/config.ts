import type { ConfigState } from '@/types/store'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('app.config', {
  state: (): ConfigState => ({
    site: {
      logo: './assets/mkh/logo.png',
      title: '',
      home: '',
      profile: '',
    },
    auth: {
      enableButtonPermissions: true,
      enableVerifyCode: true,
    },
    component: {
      loading: {
        background: 'rgba(255, 255, 255, 0.4)',
        spinner: 'el-icon-loading',
      },
      login: 'm',
      dialog: {
        draggable: false,
      },
      list: {
        formatters: null,
      },
    },
    actions: {
      login: null,
      refreshToken: null,
      getVerifyCode: null,
      getProfile: null,
      toggleSkin: null,
    },
    skin: null,
  }),
})
