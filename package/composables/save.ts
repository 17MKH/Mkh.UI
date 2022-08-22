import { computed, reactive, Ref, toRef } from 'vue'
import _ from 'lodash'
import { useI18n } from './i18n'

type Id = Ref<string | number>
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

export default function <TModel, TId extends Id>({ id, mode, api, model, emit, afterEdit }: SaveModel<TModel, TId>) {
  const { t } = useI18n()
  const { add, edit, update } = api

  const model_ = reactive({})
  //绑定属性
  const bind: SaveBindModel = reactive({
    title: '',
    icon: '',
    action: undefined,
    disabled: false,
    footer: true,
    destroyOnClose: true,
    loading: false,
  })

  const isAdd = computed(() => mode.value === 'add')
  const isEdit = computed(() => mode.value === 'edit')
  const isView = computed(() => mode.value === 'view')

  const handleOpen = () => {
    switch (mode.value) {
      case 'add':
        bind.title = t('mkh.add')
        bind.icon = 'plus'
        bind.action = add
        bind.disabled = false
        bind.footer = true
        break
      case 'edit':
        bind.title = t('mkh.edit')
        bind.icon = 'edit'
        bind.action = update
        bind.disabled = false
        bind.footer = true

        bind.loading = true
        if (id.value) {
          edit(id.value).then((data) => {
            _.merge(model_, data)
            _.merge(model, model_)

            afterEdit && afterEdit()

            bind.loading = false
          })
        } else {
          //
        }
        break
    }
  }

  const handleReset = () => {
    //如果编辑模式，重置会将表单数据重置为修改前，而不是清空
    if (mode.value === 'edit') {
      _.merge(model, model_)
    }

    emit('reset')
  }

  const handleSuccess = (data: any) => {
    emit('success', data)
  }

  const handleError = () => {
    emit('error')
  }

  return {
    isAdd,
    isEdit,
    isView,
    bind,
    on: { open: handleOpen, reset: handleReset, success: handleSuccess, error: handleError },
  }
}

//通用属性
export const withSaveProps = {
  //主键
  id: {
    type: [String, Number],
    default: 0,
  },
  //预览
  mode: {
    type: String,
    default: 'add',
  },
}
