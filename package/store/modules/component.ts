import { ToolbarDefinition } from '@/types'
import { defineStore } from 'pinia'

export const useComponentStore = defineStore('app.skin', {
  state: (): { toolbars: ToolbarDefinition[]; components: string[] } => {
    return {
      /**
       * 工具栏
       */
      toolbars: [],
      /**
       * 全局组件列表
       */
      components: [],
    }
  },
})
