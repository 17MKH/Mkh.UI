import type { JwtCredential } from '@/types'
import { defineStore } from 'pinia'
import db from '@/utils/db'
import { defaultCredential } from '@/defaults'

const key = `token`

/** 使用令牌存储 */
export const useTokenStore = defineStore('app.token', {
  state(): JwtCredential {
    return Object.assign({}, defaultCredential)
  },
  actions: {
    /** 加载令牌 */
    load() {
      this.set(db.get<JwtCredential>(key))
    },
    set(credential?: JwtCredential) {
      if (credential) {
        this.$patch(credential)
        db.set(key, credential)
      }
    },
    clear() {
      // 清除令牌信息
      this.$patch(defaultCredential)
      db.remove(key)
    },
  },
})
