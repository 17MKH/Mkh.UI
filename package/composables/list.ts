import { reactive, Ref, ref, UnwrapNestedRefs } from 'vue'
import _ from 'lodash'
import { Id, ActionMode } from './action'
import List from '@/components/advanced/list/index.vue'

export type ListType = InstanceType<typeof List>

export interface IRow {
  /**
   * 主键
   */
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
   * 当前操作的数据编号
   */
  id: Ref<TRow['id'] | undefined>
  /**
   * 当前操作的数据
   */
  selection: Ref<TRow | undefined>
  /**
   * 操作属性
   */
  actionProps: {
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
export const useList = function <TRow extends IRow = { id: string }>(): ListObject<TRow> {
  //列表组件引用
  const listRef = ref()

  //当前操作选择的列
  const id: Ref<TRow['id'] | undefined> = ref()

  const selection: Ref<TRow | undefined> = ref()

  const actionProps: { visible: boolean; mode: ActionMode } = reactive({
    visible: false,
    mode: 'add',
  })

  //添加
  const handleAdd = () => {
    id.value = undefined
    selection.value = undefined
    actionProps.mode = 'add'
    actionProps.visible = true
  }

  //编辑
  const handleEdit = (row: TRow) => {
    id.value = row.id
    selection.value = row
    actionProps.mode = 'edit'
    actionProps.visible = true
  }

  //预览
  const handleView = (row: TRow) => {
    id.value = row.id
    selection.value = row
    actionProps.mode = 'view'
    actionProps.visible = true
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
    id,
    selection,
    actionProps,
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
