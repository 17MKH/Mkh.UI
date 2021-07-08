import { reactive, ref } from 'vue'

export default function () {
  //列表组件引用
  const listRef = ref(null)
  //当前操作选择的列ID
  const selection = reactive({})
  const mode = ref('')
  const saveVisible = ref(false)

  //添加
  const add = () => {
    mode.value = 'add'
    saveVisible.value = true
  }

  //编辑
  const edit = row => {
    Object.assign(selection, row)
    mode.value = 'edit'
    saveVisible.value = true
  }

  //预览
  const view = row => {
    Object.assign(selection, row)
    mode.value = 'view'
    saveVisible.value = true
  }

  //刷新
  const refresh = () => {
    listRef.value.refresh()
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
  }
}

export const entityBaseCols = [
  { prop: 'creator', label: '创建人', width: 80 },
  { prop: 'createdTime', label: '创建时间', width: 150 },
  { prop: 'modifier', label: '修改人', width: 80, show: false },
  { prop: 'modifiedTime', label: '修改时间', width: 150, show: false },
]
