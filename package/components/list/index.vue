<template>
  <div
    v-loading="loading"
    :class="class_"
    :style="{ width, height }"
    :element-loading-text="loadingText || $t('mkh.loading_text')"
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
      <m-form ref="queryFormRef" :inline="true" :model="queryModel" :rules="queryRules" :size="size_" disabled-enter>
        <slot name="querybar" :selection="selection" :total="total" />
      </m-form>
    </div>
    <!--自定义按钮-->
    <div class="m-list_buttons">
      <m-button v-if="!noQuerybar && showSearchBtn" type="primary" icon="search" @click="query">{{ searchBtnText || $t('mkh.search') }}</m-button>
      <m-button v-if="!noQuerybar && showResetBtn" type="info" icon="refresh" @click="reset">{{ resetBtnText || $t('mkh.reset') }}</m-button>
      <m-button v-if="showExport" v-m-has="exportBtnCode" type="warning" icon="export" @click="openExport">{{ $t('mkh.export') }}</m-button>
      <m-button v-if="showDeleteBtn" type="danger" icon="delete" @click="remove">{{ deleteBtnText || $t('mkh.delete') }}</m-button>
      <slot name="buttons" :selection="selection" :total="total" @click="remove" />

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
            <el-table-column v-if="isShowExpand" type="expand">
              <template #default="{ row }">
                <div class="m-list_expand">
                  <slot name="expand" :row="row">
                    <header class="m-list_expand_title">{{ $t('mkh.more_info') }}</header>
                    <section class="m-list_expand_body">
                      <table class="m-list_expand_table">
                        <tr v-for="col in expandCols" :key="col.prop">
                          <td class="m-list_expand_label">
                            <slot :name="`col-${col.prop}-header`">
                              {{ $t(col.label) }}
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
            <el-table-column v-if="index" type="index" :index="indexMethod_" :label="$t('mkh.serial_number')" align="center" width="60"> </el-table-column>

            <!--渲染列-->
            <template v-for="col in tableCols">
              <el-table-column
                v-if="col.show"
                :key="col.prop"
                :prop="col.prop"
                :label="$t(col.label)"
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
                    {{ $t(col.label) }}
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
                <slot name="operation-header">{{ $t('mkh.operate') }}</slot>
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
    <m-flex-row v-if="!noFooter" class="m-list_footer">
      <m-flex-auto class="m-list_footer_left m-center-v">
        <slot name="footer" :selection="selection" :total="total" />
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
            <m-button v-if="!disableSetColumn" type="primary" class="m-list_setcolumn_btn" @click="showSetColDialog = true">{{ $t('mkh.set_column') }}</m-button>
          </m-flex-auto>
        </m-flex-row>
      </m-flex-fixed>
    </m-flex-row>

    <!--配置列信息-->
    <m-dialog
      v-if="!disableSetColumn"
      v-model="showSetColDialog"
      custom-class="m-list_setcolumn_dialog"
      :title="$t('mkh.set_column')"
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
<script>
import { computed, getCurrentInstance, nextTick, onMounted, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { useFullscreen, useLoading, useMessage, useSize } from '../../composables'
import { columnOptions, paginationOptions } from './default'
import props from './props'
import SetColumn from './components/set-column.vue'
import MExport from './components/export.vue'
import _ from 'lodash'
import dom from '../../utils/dom'
import { SIZE_DEFINITIONS } from '../../utils/constants'

export default {
  components: { SetColumn, MExport },
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
    const { store } = mkh

    const cit = getCurrentInstance().proxy
    const message = useMessage()

    //全屏操作
    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(emit)
    //加载动画配置
    const loadingOptions = store.state.app.config.component.loading
    const globalLoading = useLoading()

    //折叠查询栏
    const foldQueryBar = ref(false)

    const { size: size_ } = useSize(props)
    const class_ = computed(() => {
      return ['m-list', size_, isFullscreen.value ? 'is-fullscreen' : '', foldQueryBar.value ? 'fold-query-bar' : '', props.paginationOnRight ? 'pagination-on-right' : '']
    })
    const pagination_ = computed(() => Object.assign({}, paginationOptions, props.pagination || {}))

    //处理列配置信息
    const cols_ = ref(props.cols.map(m => _.merge({}, columnOptions, m)))

    //在表格中显示的列
    const tableCols = computed(() => cols_.value.filter(m => !m.expand))

    //在折叠区域显示的列
    const expandCols = computed(() => cols_.value.filter(m => m.expand))

    //是否显示折叠区域
    const isShowExpand = computed(() => expandCols.value.length > 0)

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
    const page = reactive({ index: 1, size: props.defaultPageSize, sort: [] })
    //查询表单引用
    const queryFormRef = ref(null)
    //表格引用
    const tableRef = ref(null)
    //加载动画
    const loading = ref(false)
    //多选模式下已选择项列表
    const selection = ref([])
    //根据字体大小判断是否启用小的分页
    const pageSmall = computed(() => size_.value == SIZE_DEFINITIONS.SMALL)
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
      operationWidth_.value = parseInt(props.operationWidth || maxWidth + 40)
    }

    /**序号 */
    const indexMethod_ = computed(() => (props.indexMethod ? props.indexMethod : calcIndex))
    /**序号计算 */
    const calcIndex = index => {
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

        props
          .queryMethod(params)
          .then(data => {
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
      const { $t } = cit
      if (selection.value.length < 1) {
        message.error($t('mkh.select_delete_data'))
        return
      }

      message
        .confirm($t('mkh.delete_confirm_msg'), $t('mkh.delete_confirm_title'), {
          confirmButtonText: $t('mkh.ok'),
          cancelButtonText: $t('mkh.cancel'),
        })
        .then(() => {
          globalLoading.open($t('mkh.delete_loading'))
          props
            .deleteMethod(selection.value.map(item => item.id))
            .then(() => {
              message.success($t('mkh.delete_success'))
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
      const ft = col.formatter
      if (ft) {
        const { formatters } = store.state.app.config.component.list
        const t = typeof ft
        if (t === 'function') {
          return ft(row, col, val)
        } else if (t === 'string') {
          const func = formatters.get(ft)
          if (func) {
            return func(val)
          }
        } else if (t === 'object') {
          const func = formatters.get(ft.type)
          if (func) {
            return func(val, ft.params)
          }
        }
      }
      return val
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
        page.sort.push({ field: prop, order: order === 'ascending' ? 0 : 1 })
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
      nextTick(() => {
        query()
      })
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

    return {
      isFullscreen,
      pageSmall,
      indexMethod_,
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
      foldQueryBar,
      loading,
      size_,
      class_,
      cols_,
      tableCols,
      expandCols,
      isShowExpand,
      operationWidth_,
      pagination_,
      query,
      refresh,
      reset,
      openExport,
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
