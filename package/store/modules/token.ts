import type { TokenState, TokenActions } from '@/types/store'
import { defineStore } from 'pinia'
import db from '../../utils/db'
import mkh from '@/mkh'

const key = `token`

const state = (): TokenState => {
  return {
    /** 账户编号 */
    accountId: '',
    /** 请求令牌 */
    accessToken: '',
    /** 刷新令牌 */
    refreshToken: '',
  }
}

const actions: TokenActions = {
  load: function (): void {
    this.set(db.get(key))
  },
  set(token?: TokenState) {
    if (token) {
      this.accountId = token.accountId
      this.accessToken = token.accessToken
      this.refreshToken = token.refreshToken
      db.set(key, token)
    }
  },
  clear() {
    // 清除令牌信息
    this.accountId = ''
    this.accessToken = ''
    this.refreshToken = ''
  },
}

/** 使用令牌存储 */
export const useTokenStore = defineStore('app.token', {
  state,
  actions,
})
