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
    <mu-head class="mu-list_header" :icon="icon" :icon-color="iconColor" :size="size_">
      <slot name="title" :selection="selection" :total="total">{{ title }}</slot>
      <template #toolbar>
        <!--工具栏插槽-->
        <slot name="toolbar" :selection="selection" :total="total" />
        <!--刷新按钮-->
        <mu-button v-if="!noRefresh" icon="refresh" />
        <!--全屏按钮-->
        <mu-button v-if="!noFullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
      </template>
    </mu-head>
    <!--查询栏-->
    <div v-if="!noQuerybar" class="mu-list_querybar">
      <el-form ref="queryFormRef" :inline="true" :model="queryModel" :size="size_">
        <slot name="querybar" :selection="selection" :total="total" />
        <el-form-item>
          <mu-button v-if="showSearchBtn" type="primary" icon="search" :text="searchBtnText || $t('mkh.list.search')" @click="query"></mu-button>
          <mu-button v-if="showResetBtn" type="info" icon="refresh" :text="resetBtnText || $t('mkh.list.reset')" @click="reset"></mu-button>
          <mu-button v-if="showDeleteBtn" type="danger" icon="delete" :text="deleteBtnText || $t('mkh.list.delete')" @click="remove" />
          <!--自定义按钮-->
          <slot name="querybar-buttons" :selection="selection" :total="total" @click="remove" />
        </el-form-item>
      </el-form>
    </div>
    <!--数据表格-->
    <div class="mu-list_body">
      <div class="mu-list_table">
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
            highlight-current-row
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
            >
            <!-- 多选 -->
            <el-table-column v-if="multiple" type="selection" fixed="left" align="center" width="55" />

            <!--序号-->
            <el-table-column v-if="index" type="index" fixed="left" :index="indexMethod" :label="$t('mkh.list.index')" align="center" width="60"> </el-table-column>

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
          </el-table>
        </slot>
      </div>
    </div>
    <!--底部-->
    <mu-flex-row class="mu-list_footer" mode="right">
      <mu-flex-left class="mu-list_footer_left">
        <slot name="footer" :selection="selection" :total="total" />
      </mu-flex-left>
      <mu-flex-right>
        <mu-flex-row mode="left">
          <mu-flex-left class="mu-list_pagination">
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
          </mu-flex-left>
          <mu-flex-right>
            <!--配置列-->
            <mu-button v-if="!disableSetColumn" class="mu-list_setcolumn_btn" :text="$t('mkh.list.setCol')" @click="showSetColDialog = true" />
          </mu-flex-right>
        </mu-flex-row>
      </mu-flex-right>
    </mu-flex-row>

    <!--配置列信息-->
    <mu-dialog
      v-if="!disableSetColumn"
      v-model="showSetColDialog"
      custom-class="mu-list_setcolumn_dialog"
      :title="$t('mkh.list.setColDialogTitle')"
      icon="table"
      width="80%"
      no-padding
      no-scrollbar
      draggable
    >
      <set-column v-model="cols_" :size="size_" />
    </mu-dialog>

    <mu-dialog v-model="showExportDialog" :title="$t('mkh.list.exportDialogTitle')" custom-class="mu-list_export_dialog"></mu-dialog>
  </div>
</template>
<script>
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { useFullscreen, useLoading } from '../../composables'
import { useStore } from 'vuex'
import { columnOptions, paginationOptions } from './default'
import props from './props'
import emits from './emits'
import SetColumn from './components/set-column.vue'
import _ from 'lodash'
export default {
  name: 'List',
  components: { SetColumn },
  props,
  emits,
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy

    //全屏操作
    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(emit)
    //加载动画配置
    const loadingOptions = MkhUI.config.component.loading
    const globalLoading = useLoading(cit)

    const store = useStore()
    const size_ = computed(() => props.size || store.state.app.account.skin.size)
    const class_ = computed(() => {
      return ['mu-list', size_, isFullscreen.value ? 'is-fullscreen' : '']
    })
    const pagination_ = computed(() => Object.assign({}, paginationOptions, props.pagination || {}))

    //处理列配置信息
    const cols_ = ref(props.cols.map(m => _.merge({}, columnOptions, m)))

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

    //查询操作
    const query = () => {
      loading.value = true
      props
        .queryMethod({ ...props.queryModel, page })
        .then(data => {
          rows.value = data.rows
          total.value = data.total

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
      const { $confirm, $message, $t } = cit
      console.log($t)
      if (selection.value.length < 1) {
        $message({
          message: $t('mkh.list.deleteNoData'),
          showClose: true,
          type: 'error',
          duration: 2000,
        })
        return
      }

      $confirm($t('mkh.list.deleteMsg'), $t('mkh.delete.title'), {
        type: 'warning',
        confirmButtonText: $t('mkh.delete.ok'),
        cancelButtonText: $t('mkh.delete.cancel'),
      })
        .then(() => {
          globalLoading.open($t('mkh.delete.loading'))
          props
            .deleteMethod(selection.value.map(item => item.id))
            .then(() => {
              $message.success({
                message: $t('mkh.delete.success'),
                type: 'success',
              })
              ctx.emit('success')
            })
            .catch(() => {
              ctx.emit('error')
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

    if (props.queryOnCreated) query()

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
      clearSelection() {
        tableRef.value.clearSelection()
      },
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
