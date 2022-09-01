import { computed, ComputedRef, ExtractPropTypes, reactive, Ref, ref, toRef } from 'vue'
import _ from 'lodash'
import { useI18n } from './i18n'
import FormDialog from '@/components/form/form-dialog/index.vue'
import List from '@/components/advanced/list/index.vue'

/**
 * 主键
 */
export declare type Id = Ref<string | number>

/**
 * 操作模式
 */
export type ActionMode = 'add' | 'edit' | 'view'

/**
 * 操作选项
 */
export interface ActionOptions<TModel, TId> {
  /**
   *属性
   */
  props: Readonly<
    ExtractPropTypes<{
      /**
       * 主键
       */
      id: TId
      /**
       *模式
       */
      mode: ActionMode
      [key: string]: any
    }>
  >
  /**
   * 接口
   */
  api: {
    add?: (model: TModel) => Promise<any>
    edit: (id: TId) => Promise<void>
    update?: (model: TModel) => Promise<void>
  }
  /**
   * 模型
   */
  model: TModel
  /**
   * 事件触发器
   */
  emit: { (e: 'success', data: any): void; (e: 'error'): void; (e: 'reset'): void }
  /**
   * 自定义方法，在获取编辑信息后执行，可用于对数据进行修改
   */
  afterEdit?: () => void
}

/**
 * 操作表单
 */
export declare type ActionForm = InstanceType<typeof FormDialog>['$props']

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
  form: ActionForm
  on: {
    open: () => void
    reset: () => void
    success: (data: any) => void
    error: () => void
  }
}

/**
 * 使用通用操作
 * @param param0 - 操作配置项
 * @remarks
 *
 * 包含通用的新增、编辑、预览
 */
export const useAction = function <TModel, TId extends Id>({ props, api, model, emit, afterEdit }: ActionOptions<TModel, TId>): ActionObject {
  const { t } = useI18n()
  const { add, edit, update } = api

  const id: Ref<TId> = toRef(props, 'id')
  const mode: Ref<ActionMode> = toRef(props, 'mode')

  const model_ = reactive({})
  //绑定属性
  const form: ActionForm = reactive({
    title: '',
    icon: '',
    action: undefined,
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
        form.title = t('mkh.add')
        form.icon = 'plus'
        form.action = add
        form.disabled = false
        break
      case 'edit':
        form.title = t('mkh.edit')
        form.icon = 'edit'
        form.action = update
        form.disabled = false

        form.loading = true
        if (id.value) {
          edit(id.value).then((data) => {
            _.merge(model_, data)
            _.merge(model, model_)

            afterEdit && afterEdit()

            form.loading = false
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
    form,
    on: { open: handleOpen, reset: handleReset, success: handleSuccess, error: handleError },
  }
}

/**
 * 操作通用属性
 */
export const withActionProps = {
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

export type ListType = InstanceType<typeof List>

export interface ListObject<TRow> {
  /**
   * 列表组件的引用
   */
  listRef: Ref<ListType | null>
  /**
   * 当前选择的列
   */
  selection: Ref<TRow | undefined>
  /**
   *当前操作模式
   */
  actionMode: Ref<ActionMode>
  /**
   * 显示操作对话框
   */
  actionDialogVisible: Ref<boolean>
  /**
   * 处理新增操作
   */
  handleAdd: () => void
  /**
   * 处理编辑操作
   */
  handleEdit: (row: TRow) => void
  /**
   * 处理预览操作
   */
  handleView: (row: TRow) => void
  /**
   * 刷新列表
   */
  refresh: () => void
  /**
   * 重置搜索条件
   */
  reset: () => void
}

/**
 * 使用列表
 * @returns
 */
export const useList = function <TRow>(): ListObject<TRow> {
  //列表组件引用
  const listRef = ref<ListType | null>(null)
  //当前操作选择的列
  const selection: Ref<TRow | undefined> = ref()
  //当前操作模式
  const mode: Ref<ActionMode> = ref('add')
  //显示编辑或添加
  const visible = ref(false)

  //添加
  const handleAdd = () => {
    mode.value = 'add'
    visible.value = true
  }

  //编辑
  const handleEdit = (row: TRow) => {
    selection.value = row
    mode.value = 'edit'
    visible.value = true
  }

  //预览
  const handleView = (row: TRow) => {
    selection.value = row
    mode.value = 'view'
    visible.value = true
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
    actionMode: mode,
    actionDialogVisible: visible,
    handleAdd,
    handleEdit,
    handleView,
    refresh,
    reset,
  }
}

const s = useList()

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
