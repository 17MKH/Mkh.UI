import type { MFormDialog } from '../components'
import { computed, ComputedRef, ExtractPropTypes, reactive } from 'vue'
import _ from 'lodash'
import { useI18n } from './i18n'

/**
 * 主键
 */
export declare type Id = string | number

/**
 * 操作模式
 */
export type ActionMode = 'add' | 'edit' | 'view'

/**
 * 操作选项
 */
export interface ActionOptions<TKey, TModel> {
  /**
   * 属性
   */
  props: Readonly<
    ExtractPropTypes<{
      id: {
        type: NumberConstructor
      }
      mode: {
        type: StringConstructor
        default: string
      }
      [key: string]: any
    }>
  >
  /**
   * 事件发射器
   */
  emit: any
  /**
   * 接口
   */
  api: {
    add?: (model: TModel) => Promise<unknown>
    edit: (id: TKey) => Promise<unknown>
    update?: (model: TModel) => Promise<unknown>
    [key: string]: any
  }
  /**
   * 模型
   */
  model: TModel
  /**
   * 自定义方法，在获取编辑信息后执行，可用于对数据进行修改
   */
  afterEdit?: () => void
}

/**
 * 操作对象
 */
export interface ActionObject {
  /**
   * 是否添加模式
   */
  isAdd: ComputedRef<boolean>
  /**
   * 是否编辑模式
   */
  isEdit: ComputedRef<boolean>
  /**
   * 是否预览模式
   */
  isView: ComputedRef<boolean>
  /**
   * 表单对象
   */
  form: {
    /**
     * 表单属性
     */
    props: MFormDialog['$props']
    /**
     * 表单事件触发器
     */
    emit: {
      (e: 'success', data: any): void
      (e: 'error'): void
      (e: 'reset'): void
    }
    /**
     * 表单事件
     */
    on: {
      open: () => void
      reset: () => void
      success: (data: any) => void
      error: () => void
    }
  }
}

/**
 * 使用通用操作
 * @remarks
 *
 * 包含通用的新增、编辑、预览
 */
export const useAction = function <TKey, TModel, TResult = any>(options: ActionOptions<TKey, TModel>): ActionObject {
  //@ts-ignore
  const { t } = useI18n()
  const { props, emit, api, model, afterEdit } = options
  const { add, edit, update } = api

  const model_ = reactive({})
  //绑定属性
  const formProps: MFormDialog['$props'] = reactive({
    title: '',
    icon: '',
    action: undefined,
    destroyOnClose: true,
  })

  const isAdd = computed(() => props.mode === 'add')
  const isEdit = computed(() => props.mode === 'edit')
  const isView = computed(() => props.mode === 'view')

  const handleOpen = () => {
    switch (props.mode) {
      case 'add':
        formProps.title = t('mkh.add')
        formProps.icon = 'plus'
        formProps.action = add
        formProps.disabled = false
        break
      case 'edit':
        formProps.title = t('mkh.edit')
        formProps.icon = 'edit'
        formProps.action = update
        formProps.disabled = false

        formProps.loading = true
        if (props.id) {
          edit(props.id).then((data) => {
            _.merge(model_, data)
            _.merge(model, model_)

            afterEdit && afterEdit()

            formProps.loading = false
          })
        } else {
          //
        }
        break
    }
  }

  const handleReset = () => {
    //如果编辑模式，重置会将表单数据重置为修改前，而不是清空
    if (props.mode === 'edit') {
      _.merge(model, model_)
    }

    emit('reset')
  }

  const handleSuccess = (data: TResult) => {
    emit('success', data)
  }

  const handleError = () => {
    emit('error')
  }

  return {
    isAdd,
    isEdit,
    isView,
    form: {
      props: formProps,
      emit,
      on: {
        open: handleOpen,
        reset: handleReset,
        success: handleSuccess,
        error: handleError,
      },
    },
  }
}
