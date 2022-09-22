<template>
  <m-box
    class="m-form-box"
    :header="header"
    :title="title"
    :icon="icon"
    :icon-color="iconColor"
    :height="height"
    :size="size"
    :page="page"
    :horizontal-scrollbar="horizontalScrollbar"
    :no-scrollbar="noScrollbar"
    :no-padding="noPadding"
    :show-collapse="showCollapse"
    :show-fullscreen="showFullscreen"
    :loading="loading || loading_"
    :loading-text="loadingText"
    :loading-background="loadingBackground"
    :loading-spinner="loadingSpinner"
  >
    <m-form
      ref="formRef"
      :action="action"
      :model="model"
      :rules="rules"
      :size="size"
      :disabled="disabled"
      :before-submit="beforeSubmit"
      no-loading
      @validate-success="handleValidateSuccess"
      @validate-error="handleValidateError"
      @success="handleSuccess"
      @error="handleError"
    >
      <slot></slot>
    </m-form>

    <template #footer>
      <slot name="footer"> </slot>
      <m-button v-if="btnOk" type="success" :icon="btnOkIcon" :disabled="disabled" @click="submit">{{ btnOkText || t('mkh.save') }}</m-button>
      <m-button v-if="btnReset" type="info" :icon="btnResetIcon" :disabled="disabled" @click="reset">{{ t('mkh.reset') }}</m-button>
    </template>
  </m-box>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useMessage } from '@/composables'
  import propsDefinition from './props'
  import { useI18n } from '@/composables/i18n'

  defineProps(propsDefinition)
  const emit = defineEmits(['success', 'error', 'validate-success', 'validate-error'])
  const { t } = useI18n()

  const message = useMessage()
  const formRef = ref()
  const loading_ = ref(false)

  const submit = () => {
    formRef.value.submit()
  }

  const reset = () => {
    formRef.value.reset()
  }

  const handleSuccess = (data: any) => {
    loading_.value = false
    message.success(t('mkh.save_success_msg'))
    emit('success', data)
  }

  const handleError = () => {
    loading_.value = false
    emit('error')
  }

  const handleValidateSuccess = () => {
    loading_.value = true
    emit('validate-success')
  }

  const handleValidateError = () => {
    emit('validate-error')
  }

  defineExpose({
    submit,
    reset,
    validateField: (props: any, callback: any) => formRef.value.validateField(props, callback),
    scrollToField: (prop: any) => formRef.value.scrollToField(prop),
    clearValidate: (props: any) => formRef.value.clearValidate(props),
  })
</script>
