import { computed, reactive, toRef } from 'vue'
import _ from 'lodash'
import { i18n } from '../locales'

//mode: add、添加 edit、编辑 view、预览
export default function ({ props, api, model, emit, afterEdit }) {
  const { add, edit, update } = api
  const id = toRef(props, 'id')
  const mode = toRef(props, 'mode')

  const model_ = reactive({})
  //绑定属性
  const bind = reactive({
    title: '',
    icon: '',
    action: null,
    disabled: false,
    footer: true,
    destroyOnClose: true,
    loading: false,
  })

  const isAdd = computed(() => props.mode === 'add')
  const isEdit = computed(() => props.mode === 'edit')
  const isView = computed(() => props.mode === 'view')

  const handleOpen = () => {
    switch (mode.value) {
      case 'add':
        bind.title = i18n.global.t('mkh.add')
        bind.icon = 'plus'
        bind.action = add
        bind.disabled = false
        bind.footer = true
        break
      case 'edit':
        bind.title = i18n.global.t('mkh.edit')
        bind.icon = 'edit'
        bind.action = update
        bind.disabled = false
        bind.footer = true

        bind.loading = true
        edit(id.value).then(data => {
          _.merge(model_, data)
          _.merge(model, model_)

          afterEdit && afterEdit()

          bind.loading = false
        })
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

  const handleSuccess = data => {
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
