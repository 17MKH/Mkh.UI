<template>
  <div
    v-loading="loading"
    :class="class_"
    :style="{ width, height }"
    :element-loading-text="loadingText || $t('mkh.list.loadingText')"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
    <!--头部-->
    <m-head v-if="header" class="m-list_header" :icon="icon" :icon-color="iconColor" :size="size_">
      <slot name="title" :selection="selection" :total="total">{{ title }}</slot>
      <template #toolbar>
        <!--工具栏插槽-->
        <slot name="toolbar" :selection="selection" :total="total" />
        <!--刷新按钮-->
        <m-button v-if="!noRefresh" icon="refresh" @click="refresh" />
        <!--全屏按钮-->
        <m-button v-if="!noFullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
      </template>
    </m-head>
    <!--查询栏-->
    <div v-if="!noQuerybar" class="m-list_querybar">
      <m-form ref="queryFormRef" :inline="true" :model="queryModel" :size="size_" disabled-enter>
        <slot name="querybar" :selection="selection" :total="total" />
        <el-form-item>
          <m-button v-if="showSearchBtn" type="primary" icon="search" :text="searchBtnText || $t('mkh.list.search')" @click="query"></m-button>
          <m-button v-if="showResetBtn" type="info" icon="refresh" :text="resetBtnText || $t('mkh.list.reset')" @click="reset"></m-button>
          <m-button v-if="showDeleteBtn" type="danger" icon="delete" :text="deleteBtnText || $t('mkh.list.delete')" @click="remove" />
        </el-form-item>
      </m-form>
    </div>
    <!--自定义按钮-->
    <div v-if="$slots.buttons" class="m-list_buttons">
      <slot name="buttons" :selection="selection" :total="total" @click="remove" />
    </div>
    <!--数据表格-->
    <div class="m-list_body">
      <div class="m-list_table">
        <slot :rows="rows">
          <el-table
            ref="tableRef"
            :data="rows"
            height="100%"
            :size="size_"
            :row-key="rowKey"
            :show-summary="showSummary"
            :sum-text="sumText"
            :summary-method="summaryMethod"
            :empty-text="emptyText"
            :span-method="spanMethod"
            :default-expand-all="defaultExpandAll"
            :expand-row-keys="expandRowKeys"
            :tooltip-effect="tooltipEffect"
            :indent="indent"
            :lazy="lazy"
            :load="load"
            :tree-props="treeProps"
            border
            stripe
            :highlight-current-row="highlightCurrentRow"
            @select="(selection, row) => $emit('select', selection, row)"
            @select-all="selection => $emit('select-all', selection)"
            @selection-change="handleSelectionChange"
            @cell-mouse-enter="(row, column, cell, event) => $emit('cell-mouse-enter', row, column, cell, event)"
            @cell-mouse-leave="(row, column, cell, event) => $emit('cell-mouse-leave', row, column, cell, event)"
            @cell-click="(row, column, cell, event) => $emit('cell-click', row, column, cell, event)"
            @cell-dblclick="(row, column, cell, event) => $emit('cell-dblclick', row, column, cell, event)"
            @row-click="(row, column, event) => $emit('row-click', row, column, event)"
            @row-contextmenu="(row, column, event) => $emit('row-contextmenu', row, column, event)"
            @row-dblclick="(row, column, event) => $emit('row-dblclick', row, column, event)"
            @header-click="(column, event) => $emit('header-click', column, event)"
            @header-contextmenu="(column, event) => $emit('header-contextmenu', column, event)"
            @sort-change="handleSortChange"
            @current-change="(currentRow, oldCurrentRow) => $emit('current-change', currentRow, oldCurrentRow)"
            @header-dragend="(newWidth, oldWidth, column, event) => $emit('header-dragend', newWidth, oldWidth, column, eventt)"
            @expand-change="(row, expandedRows) => $emit('expand-change', row, expandedRows)"
          >
            <!--展开行-->
            <el-table-column v-if="$slots.expand" type="expand">
              <template #default="{ row }">
                <div class="m-list_expand">
                  <slot name="expand" :row="row"> </slot>
                </div>
              </template>
            </el-table-column>

            <!-- 多选 -->
            <el-table-column v-if="multiple" type="selection" align="center" width="55" />

            <!--序号-->
            <el-table-column v-if="index" type="index" :index="indexMethod" :label="$t('mkh.list.index')" align="center" width="60"> </el-table-column>

            <!--渲染列-->
            <template v-for="col in cols_">
              <el-table-column
                v-if="col.show"
                :key="col.prop"
                :prop="col.prop"
                :label="col.label"
                :width="col.width"
                :min-width="col.minWidth"
                :fixed="col.fixed"
                :sortable="col.sortable"
                :show-overflow-tooltip="col.showOverflowTooltip"
                :align="col.align"
                :header-align="col.headerAlign"
                :class-name="col.className"
                :label-class-name="col.labelClassName"
              >
                <!--自定义头-->
                <template #header>
                  <slot :name="`col-${col.prop}-header`">
                    {{ col.label }}
                  </slot>
                </template>

                <template #default="{ row }">
                  <slot :name="'col-' + col.prop" :row="row" :rows="rows">{{ formatter(row, col) }}</slot>
                </template>
              </el-table-column>
            </template>

            <!--操作列-->
            <el-table-column v-if="$slots.operation" :width="operationWidth || operationWidth_" align="center">
              <template #header>
                <slot name="operation-header">{{ $t('mkh.list.operationHeader') }}</slot>
              </template>
              <template #default="{ row }">
                <div class="m-list_operation">
                  <slot name="operation" :row="row" :rows="rows" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </slot>
      </div>
    </div>
    <!--底部-->
    <m-flex-row class="m-list_footer">
      <m-flex-auto class="m-list_footer_left">
        <slot name="footer" :selection="selection" :total="total" />
      </m-flex-auto>
      <m-flex-fixed>
        <m-flex-row>
          <m-flex-fixed class="m-list_pagination">
            <!--分页-->
            <el-pagination
              :page-size="page.size"
              :current-page="page.index"
              :small="pagination_.small"
              :background="pagination_.background"
              :page-sizes="pagination_.pageSizes"
              :layout="pagination_.layout"
              :total="total"
              @size-change="handlePaginationSizeChange"
              @current-change="handlePaginationCurrentChange"
            >
            </el-pagination>
          </m-flex-fixed>
          <m-flex-auto>
            <!--配置列-->
            <m-button v-if="!disableSetColumn" class="m-list_setcolumn_btn" :text="$t('mkh.list.setCol')" @click="showSetColDialog = true" />
          </m-flex-auto>
        </m-flex-row>
      </m-flex-fixed>
    </m-flex-row>

    <!--配置列信息-->
    <m-dialog
      v-if="!disableSetColumn"
      v-model="showSetColDialog"
      custom-class="m-list_setcolumn_dialog"
      :title="$t('mkh.list.setColDialogTitle')"
      icon="table"
      width="1200px"
      height="80%"
      no-padding
      draggable
    >
      <set-column v-model="cols_" :size="size_" />
    </m-dialog>

    <m-dialog v-model="showExportDialog" :title="$t('mkh.list.exportDialogTitle')" custom-class="m-list_export_dialog"></m-dialog>
  </div>
</template>
<script>
import { computed, getCurrentInstance, nextTick, onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import { useFullscreen, useLoading, useMessage } from '../../composables'
import { store } from '../../store'
import { columnOptions, paginationOptions } from './default'
import props from './props'
import SetColumn from './components/set-column.vue'
import _ from 'lodash'
import dom from '../../utils/dom'

export default {
  name: 'List',
  components: { SetColumn },
  props,
  emits: [
    'select',
    'select-all',
    'selection-change',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-click',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu',
    'sort-change',
    'current-change',
    'header-dragend',
    'expand-change',
    'pagination-size-change',
    'pagination-current-change',
    'query',
    'reset',
    'success',
    'error',
  ],
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy
    const message = useMessage()

    //全屏操作
    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(emit)
    //加载动画配置
    const loadingOptions = mkh.config.component.loading
    const globalLoading = useLoading()

    const size_ = computed(() => props.size || store.state.app.profile.skin.size)
    const class_ = computed(() => {
      return ['m-list', size_, isFullscreen.value ? 'is-fullscreen' : '']
    })
    const pagination_ = computed(() => Object.assign({}, paginationOptions, props.pagination || {}))

    //处理列配置信息
    const cols_ = ref(props.cols.map(m => _.merge({}, columnOptions, m)))
    //操作列宽度
    const operationWidth_ = ref(0)

    //显示设置列信息的对话框
    const showSetColDialog = ref(false)
    //显示导出数据对话框
    const showExportDialog = ref(false)

    //数据集
    const rows = ref([])
    //总数量
    const total = ref(0)
    //分页信息
    const page = reactive({ index: 1, size: 15, sort: [] })
    //查询表单引用
    const queryFormRef = ref(null)
    //表格引用
    const tableRef = ref(null)
    //加载动画
    const loading = ref(false)
    //多选模式下已选择项列表
    const selection = ref([])

    //计算操作列最大宽度
    const computeOperationWidth = () => {
      if (!tableRef.value) return

      let maxWidth = 0
      tableRef.value.$el.querySelectorAll('.m-list_operation').forEach(node => {
        const { width } = node.getBoundingClientRect()
        if (width > maxWidth) {
          maxWidth = width
        }
      })

      //设置最小宽度
      if (maxWidth === 0) {
        maxWidth = 50
      }
      operationWidth_.value = maxWidth + +30
    }

    //查询操作
    const query = () => {
      loading.value = true

      const params = { ...props.queryModel, page }

      //查询前执行的函数
      if (props.beforeQuery) {
        props.beforeQuery(params)
      }

      props
        .queryMethod(params)
        .then(data => {
          rows.value = data.rows
          total.value = data.total

          nextTick(() => {
            computeOperationWidth()

            clearSelection()
          })

          emit('query', data)
        })
        .finally(() => {
          loading.value = false
        })
    }

    //刷新
    const refresh = () => {
      page.index = 1
      query()
    }

    //重置
    const reset = () => {
      queryFormRef.value.resetFields()
      refresh()
      emit('reset')
    }

    //删除
    const remove = () => {
      const { $t } = cit
      if (selection.value.length < 1) {
        message.error($t('mkh.list.deleteNoData'))
        return
      }

      message
        .confirm($t('mkh.list.deleteMsg'), $t('mkh.delete.title'), {
          confirmButtonText: $t('mkh.delete.ok'),
          cancelButtonText: $t('mkh.delete.cancel'),
        })
        .then(() => {
          globalLoading.open($t('mkh.delete.loading'))
          props
            .deleteMethod(selection.value.map(item => item.id))
            .then(() => {
              message.success($t('mkh.delete.success'))
              emit('success')
            })
            .catch(() => {
              emit('error')
            })
            .finally(() => {
              globalLoading.close()
            })
        })
        .catch(() => {})
    }

    //格式化
    const formatter = (row, col) => {
      const val = row[col.prop]
      if (!col.formatter) return val

      return col.formatter(row, col, val)
    }

    //处理选择事件
    const handleSelectionChange = val => {
      selection.value = val

      emit('selection-change', val)
    }

    //处理排序事件
    const handleSortChange = ({ column, prop, order }) => {
      page.sort = []

      // 将排序信息转化成后端的格式
      if (prop !== null) {
        page.sort.push({ field: prop, order: order })
      }

      refresh()

      emit('sort-change', page.sort, column, prop, order)
    }

    //处理页大小更改事件
    const handlePaginationSizeChange = size => {
      page.index = 1
      page.size = size
      query()
      emit('pagination-size-change', size)
    }

    //处理页码更改事件
    const handlePaginationCurrentChange = index => {
      page.index = index
      query()
      emit('pagination-current-change', index)
    }

    //清空已选择数据
    const clearSelection = () => {
      if (tableRef.value) tableRef.value.clearSelection()
    }

    if (props.queryOnCreated) {
      query()
    }

    const handleEnterQuery = e => {
      if (e.keyCode === 13) {
        query()
      }
    }

    onMounted(() => {
      nextTick(() => {
        dom.on(queryFormRef.value.$el, 'keydown', handleEnterQuery)
      })
    })

    onBeforeUnmount(() => {
      dom.off(queryFormRef.value.$el, 'keydown', handleEnterQuery)
    })

    return {
      isFullscreen,
      openFullscreen,
      closeFullscreen,
      toggleFullscreen,
      loadingOptions,
      rows,
      total,
      page,
      selection,
      queryFormRef,
      tableRef,
      loading,
      size_,
      class_,
      cols_,
      operationWidth_,
      pagination_,
      query,
      refresh,
      reset,
      remove,
      formatter,
      showSetColDialog,
      showExportDialog,
      handleSelectionChange,
      handleSortChange,
      handlePaginationSizeChange,
      handlePaginationCurrentChange,
      clearSelection,
      toggleRowSelection(row, selected) {
        tableRef.value.toggleRowSelection(row, selected)
      },
      toggleAllSelection() {
        tableRef.value.toggleAllSelection()
      },
      toggleRowExpansion(row, expanded) {
        tableRef.value.toggleRowExpansion(row, expanded)
      },
      setCurrentRow(row) {
        tableRef.value.setCurrentRow(row)
      },
      clearSort() {
        tableRef.value.clearSort()
      },
      doLayout() {
        tableRef.value.doLayout()
      },
    }
  },
}
</script>
