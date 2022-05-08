<template>
  <el-table ref="tableRef" class="m-list_setcolumn_table" :data="cols" row-key="prop" height="100%" border stripe highlight-current-row>
    <el-table-column :label="$t('mkh.name')" prop="label" align="center"> </el-table-column>
    <el-table-column :label="$t('mkh.property')" prop="prop" align="center"> </el-table-column>
    <el-table-column :label="$t('mkh.show')" prop="show" align="center" width="80">
      <template #default="scope">
        <el-switch v-model="scope.row.show"> </el-switch>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.sortable')" prop="sortable" align="center" width="80">
      <template #default="scope">
        <el-switch v-model="scope.row.sortable"></el-switch>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.fixed_mode')" prop="fixed" align="center" :width="width_ + 10">
      <template #default="scope">
        <el-radio-group v-model="scope.row.fixed">
          <el-radio-button label="">不固定</el-radio-button>
          <el-radio-button label="left">左侧</el-radio-button>
          <el-radio-button label="right">右侧</el-radio-button>
        </el-radio-group>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.align')" prop="align" align="center" :width="width_">
      <template #default="scope">
        <el-radio-group v-model="scope.row.align" fill="#67C23A">
          <el-radio-button label="left">居左</el-radio-button>
          <el-radio-button label="center">居中</el-radio-button>
          <el-radio-button label="right">居右</el-radio-button>
        </el-radio-group>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.table_header_align')" prop="headerAlign" align="center" :width="width_">
      <template #default="scope">
        <el-radio-group v-model="scope.row.headerAlign" fill="#E6A23C">
          <el-radio-button label="left">居左</el-radio-button>
          <el-radio-button label="center">居中</el-radio-button>
          <el-radio-button label="right">居右</el-radio-button>
        </el-radio-group>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import Sortable from 'sortablejs'
import { SIZE_DEFINITIONS } from '../../../utils/constants'

export default {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    size: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const tableRef = ref(null)
    var cols = computed(() => {
      return props.modelValue
    })

    const SIZE_WIDTH = {
      [SIZE_DEFINITIONS.SMALL]: 200,
      [SIZE_DEFINITIONS.DEFAULT]: 220,
      [SIZE_DEFINITIONS.LARGE]: 240,
    }

    const width_ = computed(() => {
      return SIZE_WIDTH[props.size]
    })

    onMounted(() => {
      new Sortable(tableRef.value.$el.querySelector('.el-table__body>tbody'), {
        ghostClass: 'm-list_setcolumn_table_dragging',
        animate: 150,
        onSort(evt) {
          const newList = [...props.modelValue]
          let s = newList.splice(evt.oldIndex, 1)[0]
          newList.splice(evt.newIndex, 0, s)
          emit('update:modelValue', newList)
        },
      })
    })

    return {
      tableRef,
      cols,
      width_,
    }
  },
}
</script>
