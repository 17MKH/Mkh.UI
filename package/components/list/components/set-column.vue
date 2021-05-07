<template>
  <el-table ref="tableRef" class="mu-list_setcolumn_table" :data="cols" row-key="prop" height="100%" :size="size" border stripe highlight-current-row>
    <el-table-column :label="$t('mkh.list.setColLabel.label')" prop="label" align="center"> </el-table-column>
    <el-table-column :label="$t('mkh.list.setColLabel.prop')" prop="prop" align="center"> </el-table-column>
    <el-table-column :label="$t('mkh.list.setColLabel.show')" prop="show" align="center" width="80">
      <template #default="scope">
        <el-switch v-model="scope.row.show"> </el-switch>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.list.setColLabel.sortable')" prop="sortable" align="center" width="80">
      <template #default="scope">
        <el-switch v-model="scope.row.sortable"></el-switch>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.list.setColLabel.fixed')" prop="fixed" align="center" width="220">
      <template #default="scope">
        <el-radio-group v-model="scope.row.fixed" size="mini">
          <el-radio-button label="">不固定</el-radio-button>
          <el-radio-button label="left">左侧</el-radio-button>
          <el-radio-button label="right">右侧</el-radio-button>
        </el-radio-group>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.list.setColLabel.align')" prop="align" align="center" width="220">
      <template #default="scope">
        <el-radio-group v-model="scope.row.align" size="mini" fill="#67C23A">
          <el-radio-button label="left">居左</el-radio-button>
          <el-radio-button label="center">居中</el-radio-button>
          <el-radio-button label="right">居右</el-radio-button>
        </el-radio-group>
      </template>
    </el-table-column>
    <el-table-column :label="$t('mkh.list.setColLabel.headerAlign')" prop="headerAlign" align="center" width="220">
      <template #default="scope">
        <el-radio-group v-model="scope.row.headerAlign" size="mini" fill="#E6A23C">
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
      console.log(cols)
      return props.modelValue
    })

    onMounted(() => {
      new Sortable(tableRef.value.$el.querySelector('.el-table__body>tbody'), {
        ghostClass: 'mu-list_setcolumn_table_dragging',
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
    }
  },
}
</script>
