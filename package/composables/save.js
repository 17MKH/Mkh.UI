import { computed, reactive } from 'vue'

export default function ({ title, api, model, rules, props, emit }) {
  const { add, edit, update } = api
  const model_ = reactive({})
  //绑定属性
  const bind = reactive({
    title: '',
    icon: '',
    model,
    rules,
    action: null,
  })

  //判断是添加还是编辑
  const isAdd = computed(() => {
    const { id } = props
    return id === null || id === '' || id < 1
  })

  const handleOpen = () => {
    bind.disabled = props.preview
    bind.footer = !bind.disabled //预览模式不显示底部

    if (bind.disabled) {
      bind.title = '预览' + title
      bind.icon = 'plus'
    } else if (isAdd.value) {
      bind.title = '添加' + title
      bind.icon = 'plus'
      bind.action = add
    } else {
      bind.title = '编辑' + title
      bind.icon = 'edit'
      bind.action = update
      edit(props.id).then(data => {
        Object.assign(model_, data)
        Object.assign(model, model_)
      })
    }
  }

  const handleReset = () => {
    //如果编辑模式，重置会将表单数据重置为修改前，而不是清空
    if (!isAdd.value) {
      Object.assign(model, model_)
    }
  }

  const handleSuccess = data => {
    emit('success', data)
  }

  const handleError = () => {
    emit('error', data)
  }

  return {
    isAdd,
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
  preview: Boolean,
}
