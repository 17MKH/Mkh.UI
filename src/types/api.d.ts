import type { Authorize } from '../api/index'

declare module '@/types/mkh' {
  interface Api {
    /**
     * 文档模块
     */
    doc: {
      authorize: Authorize
    }
  }
}
