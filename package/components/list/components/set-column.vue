<template>
  <el-table ref="tableRef" class="m-list_setcolumn_table" :data="cols" row-key="prop" height="100%" border stripe highlight-current-row>
    <el-table-column :label="$t('mkh.name')" prop="label" align="center">
      <template #default="{ row }">
        {{ $t(row.label) }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.property')" prop="prop" align="center"> </el-table-column>
    <el-table-column :label="$t('mkh.show')" prop="show" align="center" width="100">
      <template #default="scope">
        <el-switch v-model="scope.row.show" size="small"> </el-switch>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.displayed_expand')" prop="show" align="center" width="100">
      <template #default="scope">
        <el-switch v-model="scope.row.expand" size="small"> </el-switch>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.sortable')" prop="sortable" align="center" width="100">
      <template #default="scope">
        <el-switch v-model="scope.row.sortable" size="small"></el-switch>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.fixed_mode')" prop="fixed" align="center" :width="width_ + 50">
      <template #default="scope">
        <el-radio-group v-model="scope.row.fixed" size="small">
          <el-radio-button :label="false">{{ $t('mkh.no_fixed') }}</el-radio-button>
          <el-radio-button label="left">{{ $t('mkh.left_side') }}</el-radio-button>
          <el-radio-button label="right">{{ $t('mkh.right_side') }}</el-radio-button>
        </el-radio-group>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.align')" prop="align" align="center" :width="width_">
      <template #default="scope">
        <el-radio-group v-model="scope.row.align" size="small" fill="#67C23A">
          <el-radio-button label="left">{{ $t('mkh.align_left') }}</el-radio-button>
          <el-radio-button label="center">{{ $t('mkh.align_center') }}</el-radio-button>
          <el-radio-button label="right">{{ $t('mkh.align_right') }}</el-radio-button>
        </el-radio-group>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.table_header_align')" prop="headerAlign" align="center" :width="width_">
      <template #default="scope">
        <el-radio-group v-model="scope.row.headerAlign" size="small" fill="#E6A23C">
          <el-radio-button label="left">{{ $t('mkh.align_left') }}</el-radio-button>
          <el-radio-button label="center">{{ $t('mkh.align_center') }}</el-radio-button>
          <el-radio-button label="right">{{ $t('mkh.align_right') }}</el-radio-button>
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
