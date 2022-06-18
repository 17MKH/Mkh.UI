<template>
  <m-form-drawer
    :title="$t('mkh.export')"
    icon="export"
    width="50%"
    :model="model"
    :rules="rules"
    label-width="130px"
    custom-class="m-list_export"
    :loading-text="$t('mkh.exporting_data')"
    :action="handleExport"
    :custom-validate="handleCustomValidate"
    :success-message="$t('export_success')"
    @open="handleOpen"
  >
    <el-form-item :label="$t('mkh.export_file_name')" prop="fileName">
      <el-input v-model="model.fileName" clearable>
        <template #append>
          <el-select v-model="model.format" style="width: 85px">
            <el-option label=".xlsx" :value="0"></el-option>
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('mkh.title')" prop="title">
      <el-input v-model="model.title" clearable :disabled="!model.showTitle">
        <template #prepend>
          <el-switch v-model="model.showTitle"> </el-switch>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('mkh.copyright')" prop="copyright">
      <el-input v-model="model.copyright" clearable :disabled="!model.showCopyright">
        <template #prepend>
          <el-switch v-model="model.showCopyright"> </el-switch>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('mkh.export_mode')" prop="mode">
      <el-radio-group v-model="model.mode">
        <el-radio :label="0">{{ $t('mkh.export_mode_0') }}</el-radio>
        <el-radio :label="1">{{ $t('mkh.export_mode_1') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item label="显示列名：" prop="showColumnName">
          <el-switch v-model="model.showColumnName"> </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="显示导出日期：" prop="showExportDate">
          <el-switch v-model="model.showExportDate"> </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="显示导出人：" prop="showExportPeople">
          <el-switch v-model="model.showExportPeople"> </el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider> {{ $t('mkh.set_field') }} </el-divider>
    <el-form-item label-width="0">
      <el-table ref="table" :data="columns" border stripe size="small" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="prop" label="字段"></el-table-column>
        <el-table-column prop="label" label="名称">
          <template #default="{ row }">
            <el-input v-model="row.label" />
          </template>
        </el-table-column>
        <el-table-column prop="align" :label="$t('mkh.align_mode')">
          <template #default="{ row }">
            <el-select v-model="row.align" :placeholder="$t('mkh.please_select')">
              <el-option :label="$t('mkh.align_left')" :value="0"> </el-option>
              <el-option :label="$t('mkh.align_center')" :value="1"> </el-option>
              <el-option :label="$t('mkh.align_right')" :value="2"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="format">
          <template #header>
            <span>{{ $t('mkh.formatting') }}</span>
            <el-tooltip effect="dark" :content="$t('mkh.only_supported_date')" placement="top">
              <span class="caret-wrapper m-text-warning">
                <m-icon name="info"></m-icon>
              </span>
            </el-tooltip>
          </template>
          <template #default="{ row }">
            <el-select v-model="row.format">
              <el-option label="yyyy-MM-dd HH:mm:ss" value="yyyy-MM-dd HH:mm:ss"></el-option>
              <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </m-form-drawer>
</template>
<script>
import { computed, ref, reactive, watchEffect } from 'vue'
import dayjs from 'dayjs'
import useNotification from '../../../composables/notification'
export default {
  props: {
    cols: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    queryModel: {
      type: Object,
      default() {
        return {}
      },
    },
    exportMethod: {
      type: Function,
      default: null,
    },
  },
  setup(props) {
    const notification = useNotification()

    const model = reactive({
      showTitle: true,
      title: props.title,
      showCopyright: false,
      copyright: '',
      fileName: '',
      format: 0,
      mode: 0,
      showColumnName: true,
      showExportDate: true,
      showExportPeople: true,
      columns: [],
    })

    const rules = computed(() => {
      let r = {
        fileName: [{ required: true, message: mkh.$t('mkh.please_input_file_name'), trigger: 'change' }],
      }
      if (model.showTitle) {
        r['title'] = [{ required: true, message: mkh.$t('mkh.please_input_title'), trigger: 'change' }]
      }

      return r
    })

    const fileExt = computed(() => {
      switch (model.format) {
        case 0:
          return '.xlsx'
        default:
          return ''
      }
    })

    const columns = ref([])

    watchEffect(() => {
      columns.value = props.cols.map(m => {
        return {
          prop: m.prop,
          label: mkh.$t(m.label),
          align: m.align === 'left' ? 0 : m.laign === 'right' ? 2 : 1,
          format: '',
        }
      })
    })

    const handleOpen = () => {
      model.fileName = `${props.title}_${dayjs().format('YYYYMMDDHHmmss')}`
    }

    const handleSelectionChange = selection => {
      model.columns = selection
    }

    const handleCustomValidate = () => {
      if (model.columns.length < 1) {
        notification.warning(mkh.$t('mkh.select_export_filed'))
        return false
      }

      return true
    }

    const handleExport = () => {
      const params = { ...props.queryModel, isExport: true, export_model: model }
      return props.exportMethod(params)
    }

    return {
      model,
      rules,
      fileExt,
      columns,
      handleOpen,
      handleSelectionChange,
      handleCustomValidate,
      handleExport,
    }
  },
}
</script>
