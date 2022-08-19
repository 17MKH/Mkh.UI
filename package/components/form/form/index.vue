<template>
  <el-form
    ref="formRef"
    v-loading="!noLoading && loading"
    class="m-form"
    :size="size"
    :model="model"
    :rules="rules"
    :inline="inline"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :label-suffix="labelSuffix"
    :hide-required-asterisk="hideRequiredAsterisk"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :status-icon="statusIcon"
    :validate-on-rule-change="validateOnRuleChange"
    :disabled="disabled"
    :element-loading-text="loadingText || $t('mkh.loading_text_save')"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
    <slot></slot>
  </el-form>
</template>
<script setup lang="ts">
  import { provide, nextTick, onMounted, onBeforeUnmount, ref } from 'vue'
  import propsDefinition from './props'
  import dom from '@/utils/dom'
  import { useConfigStore } from '@/store'

  const props = defineProps(propsDefinition)
  const emit = defineEmits(['success', 'error', 'validate-success', 'validate-error'])

  const configSotre = useConfigStore()
  const loadingOptions = configSotre.component.loading

  const formRef = ref()
  //加载动画
  const loading = ref(false)

  /** 自定义表单的重置方法数组 */
  const resetMethods: Array<() => void> = []
  provide('resetMethods', resetMethods)

  /** 表单验证 */
  const validate = (callback: () => void) => {
    formRef.value.validate(async (valid: any) => {
      // 自定义验证
      if (valid && (!props.customValidate || props.customValidate())) {
        emit('validate-success')
        callback()
      } else {
        // 验证失败
        emit('validate-error')
      }
    })
  }

  /** 提交 */
  const submit = () => {
    validate(() => {
      const { action, model, beforeSubmit } = props
      if (action) {
        //执行器的操作
        beforeSubmit && beforeSubmit()

        loading.value = true
        action(model)
          .then((data: any) => {
            loading.value = false
            emit('success', data)
          })
          .catch(() => {
            loading.value = false
            emit('error')
          })
      } else {
        loading.value = false
      }
    })
  }

  /** 重置 */
  const reset = () => {
    formRef.value!.resetFields()
    resetMethods.forEach((m) => m())
  }

  const handleEnterSubmit = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.keyCode === 13) {
      submit()
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!props.disabledEnter) dom.on(formRef.value!.$el, 'keydown', handleEnterSubmit)
    })
  })

  onBeforeUnmount(() => {
    if (!props.disabledEnter) dom.off(formRef.value!.$el, 'keydown', handleEnterSubmit)
  })

  defineExpose({
    submit,
    reset,
    validateField: (props: any, callback: any) => formRef.value.validateField(props, callback),
    scrollToField: (prop: any) => formRef.value.scrollToField(prop),
    clearValidate: (props: any) => formRef.value.clearValidate(props),
  })
</script>
<style lang="scss">
  @import './index';
</style>
