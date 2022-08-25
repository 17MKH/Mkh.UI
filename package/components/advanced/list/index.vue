<template>
  <div
    v-loading="loading"
    :class="class_"
    :style="{ width, height }"
    :element-loading-text="loadingText || t('mkh.loading_text')"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
    <!--头部-->
    <m-head v-if="header" class="m-list_header" :icon="icon" :icon-color="iconColor" :size="size_">
      <slot name="title" :selection="selection" :total="total">{{ title }}</slot>
      <template #toolbar>
        <!--工具栏插槽-->
        <slot name="toolbar" :selection="selection" :total="total"></slot>
        <!--刷新按钮-->
        <m-button v-if="!noRefresh" icon="refresh" @click="refresh" />
        <!--全屏按钮-->
        <m-button v-if="!noFullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
      </template>
    </m-head>
    <!--查询栏-->
    <div v-if="!noQuerybar" class="m-list_querybar">
      <m-form ref="queryFormRef" :inline="true" :model="queryModel" :rules="queryRules" :size="size_" disabled-enter>
        <slot name="querybar" :selection="selection" :total="total"></slot>
      </m-form>
    </div>
    <!--自定义按钮-->
    <div class="m-list_buttons">
      <m-button v-if="!noQuerybar && showSearchBtn" type="primary" icon="search" @click="query">{{ searchBtnText || t('mkh.search') }}</m-button>
      <m-button v-if="!noQuerybar && showResetBtn" type="info" icon="refresh" @click="reset">{{ resetBtnText || t('mkh.reset') }}</m-button>
      <m-button v-if="showExport" v-m-has="exportBtnCode" type="warning" icon="export" @click="openExport">{{ t('mkh.export') }}</m-button>
      <m-button v-if="showDeleteBtn" type="danger" icon="delete" @click="remove">{{ deleteBtnText || t('mkh.delete') }}</m-button>
      <slot name="buttons" :selection="selection" :total="total" @click="remove"></slot>

      <!--折叠查询栏-->
      <el-link :underline="false" type="primary" class="m-margin-l-15 m-margin-r-5" @click="foldQueryBar = !foldQueryBar">
        <m-icon :name="foldQueryBar ? 'fold-b' : 'fold-u'" />
      </el-link>
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
            :border="border"
            :stripe="stripe"
            :highlight-current-row="highlightCurrentRow"
            @select="(selection: any, row: any) => $emit('select', selection, row)"
            @select-all="(selection: any) => $emit('select-all', selection)"
            @selection-change="handleSelectionChange"
            @cell-mouse-enter="(row: any, column: any, cell: any, event: any) => $emit('cell-mouse-enter', row, column, cell, event)"
            @cell-mouse-leave="(row: any,column: any, cell: any, event: any) => $emit('cell-mouse-leave', row, column, cell, event)"
            @cell-click="(row: any, column: any, cell: any, event: any) => $emit('cell-click', row, column, cell, event)"
            @cell-dblclick="(row: any, column: any, cell: any, event: any) => $emit('cell-dblclick', row, column, cell, event)"
            @row-click="(row: any, column: any, event: any) => $emit('row-click', row, column, event)"
            @row-contextmenu="(row: any, column: any, event: any) => $emit('row-contextmenu', row, column, event)"
            @row-dblclick="(row: any, column: any, event: any) => $emit('row-dblclick', row, column, event)"
            @header-click="(column: any, event: any) => $emit('header-click', column, event)"
            @header-contextmenu="(column: any, event: any) => $emit('header-contextmenu', column, event)"
            @sort-change="handleSortChange"
            @current-change="(currentRow: any, oldCurrentRow: any) => $emit('current-change', currentRow, oldCurrentRow)"
            @header-dragend="(newWidth: any, oldWidth: any, column: any, event: any) => $emit('header-dragend', newWidth, oldWidth, column, event)"
            @expand-change="(row: any, expandedRows: any) => $emit('expand-change', row, expandedRows)"
          >
            <!--展开行-->
            <el-table-column v-if="isShowExpand" type="expand">
              <template #default="{ row }">
                <div class="m-list_expand">
                  <slot name="expand" :row="row">
                    <header class="m-list_expand_title">{{ t('mkh.more_info') }}</header>
                    <section class="m-list_expand_body">
                      <table class="m-list_expand_table">
                        <tr v-for="col in expandCols" :key="col.prop">
                          <td class="m-list_expand_label">
                            <slot :name="`col-${col.prop}-header`">
                              {{ t(col.label) }}
                            </slot>
                            <span>：</span>
                          </td>
                          <td class="m-list_expand_content">
                            <slot :name="'col-' + col.prop" :row="row" :rows="rows">
                              <!--图标-->
                              <template v-if="col.formatter && col.formatter === 'icon'">
                                <m-icon v-if="row[col.prop]" :name="row[col.prop]"></m-icon>
                                <span v-else>-</span>
                              </template>
                              <template v-else>{{ formatter(row, col) }}</template>
                            </slot>
                          </td>
                        </tr>
                      </table>
                    </section>
                  </slot>
                </div>
              </template>
            </el-table-column>

            <!-- 多选 -->
            <el-table-column v-if="multiple" type="selection" align="center" width="55" />

            <!--序号-->
            <el-table-column v-if="index" type="index" :index="indexMethod_" :label="t('mkh.serial_number')" align="center" width="60"> </el-table-column>

            <!--渲染列-->
            <template v-for="col in tableCols">
              <el-table-column
                v-if="col.show"
                :key="col.prop"
                :prop="col.prop"
                :label="t(col.label)"
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
                    {{ t(col.label) }}
                  </slot>
                </template>

                <template #default="{ row }">
                  <slot :name="'col-' + col.prop" :row="row" :rows="rows">
                    <!--图标-->
                    <template v-if="col.formatter && col.formatter === 'icon'">
                      <m-icon v-if="row[col.prop]" :name="row[col.prop]"></m-icon>
                      <span v-else>-</span>
                    </template>
                    <template v-else>{{ formatter(row, col) }}</template>
                  </slot>
                </template>
              </el-table-column>
            </template>

            <!--操作列-->
            <el-table-column v-if="$slots.operation" :width="operationWidth_" fixed="right" align="center">
              <template #header>
                <slot name="operation-header">{{ t('mkh.operate') }}</slot>
              </template>
              <template #default="{ row }">
                <div class="m-list_operation">
                  <slot name="operation" :row="row" :rows="rows"></slot>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </slot>
      </div>
    </div>
    <!--底部-->
    <m-flex-row v-if="!noFooter" class="m-list_footer">
      <m-flex-auto class="m-list_footer_left m-center-v">
        <slot name="footer" :selection="selection" :total="total"></slot>
      </m-flex-auto>
      <m-flex-fixed>
        <m-flex-row>
          <m-flex-fixed class="m-list_pagination m-center-v">
            <!--分页-->
            <el-pagination
              v-if="!noPagination"
              :page-size="page.size"
              :current-page="page.index"
              :small="pageSmall"
              :background="pagination_.background"
              :page-sizes="pagination_.pageSizes"
              :layout="pagination_.layout"
              :total="total"
              @size-change="handlePaginationSizeChange"
              @current-change="handlePaginationCurrentChange"
            >
            </el-pagination>
          </m-flex-fixed>
          <m-flex-auto class="m-center-v">
            <!--配置列-->
            <m-button v-if="!disableSetColumn" type="primary" class="m-list_setcolumn_btn" @click="showSetColDialog = true">{{ t('mkh.set_column') }}</m-button>
          </m-flex-auto>
        </m-flex-row>
      </m-flex-fixed>
    </m-flex-row>

    <!--配置列信息-->
    <m-dialog
      v-if="!disableSetColumn"
      v-model="showSetColDialog"
      custom-class="m-list_setcolumn_dialog"
      :title="t('mkh.set_column')"
      icon="table"
      width="1200px"
      height="500px"
      no-scrollbar
      no-padding
      draggable
    >
      <set-column v-model="cols_" :size="size_" />
    </m-dialog>

    <!--导出-->
    <div v-m-has="exportBtnCode">
      <m-export v-if="showExport" v-model="showExportDialog" :export-method="exportMethod || queryMethod" :query-model="queryModel" :cols="cols_" :title="title" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { size, Row, Column, FormatterFunction } from '@/types/index'
  import { computed, nextTick, onMounted, onBeforeUnmount, reactive, ref, watch } from 'vue'
  import { useFullscreen, useLoading, useMessage, useSize } from '@/composables'
  import { columnOptions, paginationOptions } from './default'
  import propsDefinition from './props'
  import SetColumn from './components/set-column.vue'
  import MExport from './components/export.vue'
  import _ from 'lodash'
  import dom from '@/utils/dom'
  import { SIZE_DEFINITIONS } from '@/utils/constants'
  import { useConfigStore } from '@/store'
  import { useI18n } from '@/composables/i18n'

  const props = defineProps(propsDefinition)

  const emit = defineEmits([
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
    'fullscreen-change',
  ])

  const { t } = useI18n()
  const message = useMessage()

  const configStore = useConfigStore()

  //全屏操作
  const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(emit)
  //加载动画配置
  const loadingOptions = configStore.component.loading
  const globalLoading = useLoading()

  //折叠查询栏
  const foldQueryBar = ref(false)

  const size_ = useSize(props as { size: size })
  const class_ = computed(() => {
    return ['m-list', size_, isFullscreen.value ? 'is-fullscreen' : '', foldQueryBar.value ? 'fold-query-bar' : '', props.paginationOnRight ? 'pagination-on-right' : '']
  })
  const pagination_ = computed(() => Object.assign({}, paginationOptions, props.pagination || {}))

  //处理列配置信息
  const cols_ = computed(() => (props.cols as Column[]).map((m) => _.merge({}, columnOptions, m)) as Column[])

  //在表格中显示的列
  const tableCols = computed(() => cols_.value.filter((m) => !m.expand))

  //在折叠区域显示的列
  const expandCols = computed(() => cols_.value.filter((m) => m.expand))

  //是否显示折叠区域
  const isShowExpand = computed(() => expandCols.value && expandCols.value.length > 0)

  //操作列宽度
  const operationWidth_ = ref(0)

  //显示设置列信息的对话框
  const showSetColDialog = ref(false)
  //显示导出数据对话框
  const showExportDialog = ref(false)

  //数据集
  const rows = ref<Row[]>([])
  //总数量
  const total = ref(0)

  interface Sort {
    index: number
    size: number
    sort: Array<{
      field: string
      order: number
    }>
  }

  //分页信息
  const page = reactive<Sort>({ index: 1, size: props.defaultPageSize, sort: [] })
  //查询表单引用
  const queryFormRef = ref()
  //表格引用
  const tableRef = ref()
  //加载动画
  const loading = ref(false)
  //多选模式下已选择项列表
  const selection = ref<Row[]>([])
  //根据字体大小判断是否启用小的分页
  const pageSmall = computed(() => size_.value == SIZE_DEFINITIONS.SMALL)
  //计算操作列最大宽度
  const computeOperationWidth = () => {
    if (!tableRef.value) return

    let maxWidth = 0

    tableRef.value.$el.querySelectorAll('.m-list_operation').forEach((node: { getBoundingClientRect: () => { width: any } }) => {
      const { width } = node.getBoundingClientRect()

      if (width > maxWidth) {
        maxWidth = width
      }
    })

    //设置最小宽度
    if (maxWidth === 0) {
      maxWidth = 50
    }

    if (!props.operationWidth) {
      operationWidth_.value = maxWidth + 40
    } else {
      if (typeof props.operationWidth === 'number') {
        operationWidth_.value = props.operationWidth
      } else if (typeof props.operationWidth === 'string') {
        operationWidth_.value = parseInt(props.operationWidth)
      }
    }
  }

  /**序号 */
  const indexMethod_ = computed(() => (props.indexMethod ? props.indexMethod : calcIndex))
  /**序号计算 */
  const calcIndex = (index: number) => {
    return index + page.size * (page.index - 1) + 1
  }

  //查询操作
  const query = () => {
    queryFormRef.value.validate(() => {
      loading.value = true

      const params = { ...props.queryModel, page }

      //查询前执行的函数
      if (props.beforeQuery) {
        props.beforeQuery(params)
      }

      if (props.queryMethod) {
        props
          .queryMethod(params)
          .then((data: any) => {
            rows.value = data[props.actionDataStr] || []
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
    })
  }

  //刷新
  const refresh = () => {
    page.index = 1
    query()
  }

  //重置
  const reset = () => {
    queryFormRef.value.reset()
    refresh()
    emit('reset')
  }

  const openExport = () => {
    showExportDialog.value = true
  }

  //删除
  const remove = () => {
    if (selection.value.length < 1) {
      message.error(t('mkh.select_delete_data'))
      return
    }

    message
      .confirm(t('mkh.delete_confirm_msg'), t('mkh.delete_confirm_title'), {
        confirmButtonText: t('mkh.ok'),
        cancelButtonText: t('mkh.cancel'),
      })
      .then(() => {
        globalLoading.open(t('mkh.delete_loading'))
        props
          .deleteMethod(selection.value.map((item) => item.id))
          .then(() => {
            message.success(t('mkh.delete_success'))
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
  const formatter = (row: Row, col: Column) => {
    const val = row[col.prop]
    const ft = col.formatter
    if (ft) {
      const { formatters } = configStore.component.list
      const t = typeof ft
      if (t === 'function') {
        return (ft as FormatterFunction)(val, row, col)
      } else if (t === 'object') {
        const func = formatters.get((ft as { type: string }).type)
        if (func) {
          return func(val, row, col, (ft as { params: any }).params)
        }
      }
    }
    return val
  }

  //处理选择事件
  const handleSelectionChange = (val: Row[]) => {
    selection.value = val

    emit('selection-change', val)
  }

  //处理排序事件
  const handleSortChange = ({ column, prop, order }: { column: Column; prop: string; order: string }) => {
    page.sort = []

    // 将排序信息转化成后端的格式
    if (prop !== null) {
      page.sort.push({ field: prop, order: order === 'ascending' ? 0 : 1 })
    }

    refresh()

    emit('sort-change', page.sort, column, prop, order)
  }

  //处理页大小更改事件
  const handlePaginationSizeChange = (size: number) => {
    page.index = 1
    page.size = size
    query()
    emit('pagination-size-change', size)
  }

  //处理页码更改事件
  const handlePaginationCurrentChange = (index: number) => {
    page.index = index
    query()
    emit('pagination-current-change', index)
  }

  //清空已选择数据
  const clearSelection = () => {
    if (tableRef.value) tableRef.value.clearSelection()
  }

  if (props.queryOnCreated) {
    nextTick(() => {
      query()
    })
  }

  const handleEnterQuery = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.keyCode === 13) {
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

  watch(
    size_,
    () => {
      setTimeout(() => {
        computeOperationWidth()
      }, 1000)
    },
    {
      immediate: true,
    }
  )

  defineExpose({
    openFullscreen,
    closeFullscreen,
    toggleFullscreen,
    query,
    refresh,
    reset,
    openExport,
    remove,
    formatter,
    showSetColDialog,
    showExportDialog,
    handleSortChange,
    handlePaginationSizeChange,
    handlePaginationCurrentChange,
    clearSelection,
    toggleRowSelection(row: Row, selected: boolean) {
      tableRef.value.toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      tableRef.value.toggleAllSelection()
    },
    toggleRowExpansion(row: Row, expanded: boolean) {
      tableRef.value.toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row: Row) {
      tableRef.value.setCurrentRow(row)
    },
    clearSort() {
      tableRef.value.clearSort()
    },
    doLayout() {
      tableRef.value.doLayout()
    },
  })
</script>
