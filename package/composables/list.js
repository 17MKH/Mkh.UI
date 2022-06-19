import { ref } from 'vue'

export default function () {
  //列表组件引用
  const listRef = ref()
  //当前操作选择的列
  const selection = ref({})
  //当前操作模式
  const mode = ref('')
  //显示编辑或添加
  const saveVisible = ref(false)

  //添加
  const add = () => {
    mode.value = 'add'
    saveVisible.value = true
  }

  //编辑
  const edit = row => {
    selection.value = row
    mode.value = 'edit'
    saveVisible.value = true
  }

  //预览
  const view = row => {
    selection.value = row
    mode.value = 'view'
    saveVisible.value = true
  }

  //刷新
  const refresh = () => {
    if (listRef.value) listRef.value.refresh()
  }

  //重置
  const reset = () => {
    if (listRef.value) listRef.value.reset()
  }

  return {
    listRef,
    selection,
    mode,
    saveVisible,
    add,
    edit,
    view,
    refresh,
    reset,
  }
}

//基类实体的列信息
export const entityBaseCols = function () {
  return [
    { prop: 'creator', label: 'mkh.creator', width: 150, expand: true },
    { prop: 'createdTime', label: 'mkh.created_time', width: 200, expand: true },
    { prop: 'modifier', label: 'mkh.modifier', width: 150, expand: true },
    { prop: 'modifiedTime', label: 'mkh.modified_time', width: 200, expand: true },
  ]
}
