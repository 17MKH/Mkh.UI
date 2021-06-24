import { reactive, ref } from 'vue'

export default function () {
  //列表组件引用
  const listRef = ref(null)
  //当前操作选择的列ID
  const selection = reactive({ id: '' })
  const saveVisible = ref(false)
  const preview = ref(false)

  //添加
  const add = () => {
    selection.id = ''
    preview.value = false
    saveVisible.value = true
  }

  //编辑
  const edit = row => {
    Object.assign(selection, row)
    preview.value = false
    saveVisible.value = true
  }

  //预览
  const view = row => {
    Object.assign(selection, row)
    preview.value = true
    saveVisible.value = true
  }

  //刷新
  const refresh = () => {
    listRef.value.refresh()
  }

  return {
    listRef,
    selection,
    saveVisible,
    preview,
    add,
    edit,
    view,
    refresh,
  }
}
