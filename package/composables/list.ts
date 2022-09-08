import { reactive, Ref, ref } from 'vue'
import _ from 'lodash'
import { Id, ActionMode } from './action'
import List from '@/components/advanced/list/index.vue'

export type ListType = InstanceType<typeof List>

export interface IRow {
  id: Id
}

/**
 * 列表页对象
 */
export interface ListObject<TRow extends IRow> {
  /**
   * 列表组件的引用
   */
  listRef: Ref<ListType>
  /**
   * 当前操作的数据
   */
  selection: Ref<TRow | undefined>
  /**
   * 操作属性
   */
  action: {
    /**
     * 显示
     */
    visible: boolean
    /**
     * 操作类型
     */
    mode: ActionMode
  }
  /**
   * 方法
   */
  methods: {
    /**
     * 处理新增操作
     */
    add: () => void
    /**
     * 处理编辑操作
     */
    edit: (row: TRow) => void
    /**
     * 处理预览操作
     */
    view: (row: TRow) => void
    /**
     * 刷新列表
     */
    refresh: () => void
    /**
     * 重置搜索条件
     */
    reset: () => void
  }
}

/**
 * 使用列表
 * @returns
 */
export const useList = function <TRow extends IRow>(): ListObject<TRow> {
  //列表组件引用
  const listRef = ref()
  //当前操作选择的列
  const selection: TRow = reactive({ id: '' })

  const action: { visible: boolean; mode: ActionMode } = reactive({
    visible: false,
    mode: 'add',
  })

  //添加
  const handleAdd = () => {
    selection.value = undefined
    action.mode = 'add'
    action.visible = true
  }

  //编辑
  const handleEdit = (row: TRow) => {
    selection.value = row
    action.mode = 'edit'
    action.visible = true
  }

  //预览
  const handleView = (row: TRow) => {
    selection.value = row
    action.mode = 'view'
    action.visible = true
  }

  //刷新
  const handleRefresh = () => {
    listRef.value!.refresh()
  }

  //重置
  const handleReset = () => {
    listRef.value!.reset()
  }

  return {
    listRef,
    selection,
    action,
    methods: {
      add: handleAdd,
      edit: handleEdit,
      view: handleView,
      refresh: handleRefresh,
      reset: handleReset,
    },
  }
}

/**
 * 使用基类实体的列信息
 */
export const useEntityBaseCols = function () {
  return [
    { prop: 'creator', label: 'mkh.creator', width: 150, expand: true },
    { prop: 'createdTime', label: 'mkh.created_time', width: 200, expand: true },
    { prop: 'modifier', label: 'mkh.modifier', width: 150, expand: true },
    { prop: 'modifiedTime', label: 'mkh.modified_time', width: 200, expand: true },
  ]
}
