import type { JwtCredential } from '@/types'
import { defineStore } from 'pinia'
import db from '../../utils/db'

const key = `token`

/** 使用令牌存储 */
export const useTokenStore = defineStore('app.token', {
  state(): JwtCredential {
    return {
      accountId: '',
      accessToken: '',
      refreshToken: '',
      expiresIn: 0,
      loginTime: '',
    }
  },
  actions: {
    /** 加载令牌 */
    load() {
      this.set(db.get<JwtCredential>(key))
    },
    set(credential?: JwtCredential) {
      if (credential) {
        Object.assign(this, credential)
        db.set(key, credential)
      }
    },
    clear() {
      // 清除令牌信息
      this.accountId = ''
      this.accessToken = ''
      this.refreshToken = ''
      this.expiresIn = 0
      this.loginTime = ''
    },
  },
})
