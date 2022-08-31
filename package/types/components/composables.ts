import type { Ref } from 'vue'

export interface CollapseEmit {
  (e: 'collapse-change', isCollapse: Ref<boolean>): void
}

export interface FullscreenEmit {
  (e: 'fullscreen-change', isFullscreen: Ref<boolean>): void
}

export interface FullscreenMixins {
  /***
   * 开启全屏
   */
  openFullscreen: () => {}
  /**
   * 关闭全屏
   */
  closeFullscreen: () => {}
  /**
   * 切换全屏
   */
  toggleFullscreen: () => {}
}

export declare type Id = Ref<string | number>

//mode: add、添加 edit、编辑 view、预览
export interface SaveModel<TModel, TId extends Id> {
  id: Ref<TId | undefined>
  mode: Ref<'add' | 'edit' | 'view'>
  api: {
    add: (model: TModel) => Promise<any>
    edit: (id: TId) => Promise<void>
    update: (model: TModel) => Promise<void>
  }
  model: TModel
  emit: {
    (e: 'success', data: any): void
    (e: 'error'): void
    (e: 'reset'): void
  }
  afterEdit: () => void
}

export interface SaveBindModel {
  title: string
  icon: string
  action?: Function
  disabled: boolean
  footer: boolean
  destroyOnClose: boolean
  loading: boolean
}
