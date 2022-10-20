<template>
  <el-select v-model="value_" v-loading="loading" class="m-select" element-loading-background="rgba(255,255,255,.6)" :placeholder="placeholder || t('mkh.please_select')">
    <slot :options="options">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
    </slot>
  </el-select>
</template>
<script setup lang="ts">
  import { computed, inject, ref, watch } from 'vue'
  import { useI18n } from '@/composables/i18n'

  const props = defineProps({
    modelValue: {
      type: [String, Number],
    },
    action: {
      type: Function,
      required: true,
    },
    /** 是否选中第一个 */
    checkedFirst: Boolean,
    /** 是否创建时进行刷新 */
    refreshOnCreated: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['update:modelValue', 'update:label', 'change'])

  const { t } = useI18n()

  const resetMethods: Array<() => void> = inject('resetMethods', [])

  const value_ = computed({
    get() {
      return props.modelValue || null
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  //是否首次刷新
  let firstRefresh = true

  const loading = ref(false)
  const options = ref<any[]>([])

  const refresh = () => {
    loading.value = true
    props
      .action()
      .then((data: any) => {
        options.value = data

        if (firstRefresh) {
          if (value_.value) {
            //首次刷新并且存在初始值
            handleChange(value_.value)
          } else if (props.checkedFirst && data.length > 0) {
            //首次刷新并且默认选中第一个选项
            const checkedValue = data[0].value
            value_.value = checkedValue
            handleChange(checkedValue)
          }

          firstRefresh = false
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  const handleChange = (val: any) => {
    const option = options.value.find((m) => m.value === val)
    emit('update:label', option != undefined ? option.label : '')
    emit('change', val, option, options)
  }

  if (props.refreshOnCreated) refresh()

  const reset = () => {
    value_.value = null
    handleChange('')
  }

  watch(value_, handleChange)

  resetMethods.push(reset)

  defineExpose({
    refresh,
    reset,
  })
</script>
