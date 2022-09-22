<template>
  <m-drawer
    ref="drawerRef"
    v-model="visible"
    :custom-class="customClass_"
    :header="header"
    :title="title"
    :icon="icon"
    :icon-color="iconColor"
    :no-padding="noPadding"
    :size="size"
    :width="width"
    :height="height"
    :direction="direction"
    :show-close="showClose"
    :show-fullscreen="showFullscreen"
    :modal="modal"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :before-close="beforeClose"
    :destroy-on-close="destroyOnClose"
    :modal-class="modalClass"
    :z-index="zIndex"
    :loading="loading || loading_"
    :loading-text="loadingText"
    :loading-background="loadingBackground"
    :loading-spinner="loadingSpinner"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
  >
    <m-form
      ref="formRef"
      no-loading
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
      :action="action"
      :custom-validate="customValidate"
      :before-submit="beforeSubmit"
      :disabled-enter="disabledEnter"
      @validate-success="handleValidateSuccess"
      @validate-error="handleValidateError"
      @success="handleSuccess"
      @error="handleError"
    >
      <slot></slot>
    </m-form>

    <template #footer>
      <slot v-if="footer" name="footer">
        <slot name="footer-buttons"></slot>
        <m-button v-if="btnOk" type="success" :icon="btnOkIcon" :disabled="disabled" @click="submit">{{ btnOkText || t('mkh.save') }}</m-button>
        <m-button v-if="btnReset" type="info" :icon="btnResetIcon" :disabled="disabled" @click="reset">{{ t('mkh.reset') }}</m-button>
      </slot>
    </template>
  </m-drawer>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useVisible, useMessage } from '@/composables'
  import { fullscreenMixins } from '@/composables/fullscreen'
  import propsDefinition from './props'
  import { useI18n } from '@/composables/i18n'

  const props = defineProps(propsDefinition)
  const emit = defineEmits(['update:modelValue', 'open', 'opened', 'close', 'closed', 'success', 'error', 'reset', 'validate-success', 'validate-error', 'open-auto-focus'])

  const { t } = useI18n()
  const { visible, open, close } = useVisible(props, emit)

  const message = useMessage()
  const drawerRef = ref()
  const formRef = ref()
  const loading_ = ref(false)

  const customClass_ = computed(() => {
    let list = ['m-form-drawer']
    if (props.customClass) {
      list.push(props.customClass)
    }
    return list.join(' ')
  })

  const submit = () => {
    formRef.value.submit()
  }

  const reset = () => {
    formRef.value.reset()
    emit('reset')
  }

  const handleSuccess = (data: any) => {
    loading_.value = false
    message.success(props.successMessage || t('mkh.save_success_msg'))

    if (props.closeOnSuccess) {
      visible.value = false
    }

    emit('success', data)
  }

  const handleError = () => {
    loading_.value = false
    emit('error')
  }

  const handleOpen = () => {
    emit('open')
  }

  const handleOpened = () => {
    if (props.autoFocusRef) props.autoFocusRef.focus()

    emit('opened')
  }

  const handleClose = () => {
    emit('close')
  }

  const handleClosed = () => {
    if (props.resetOnClosed) {
      formRef.value.reset()
    }
    emit('closed')
  }

  const handleValidateSuccess = () => {
    loading_.value = true
    emit('validate-success')
  }

  const handleValidateError = () => {
    emit('validate-error')
  }

  defineExpose({
    open,
    close,
    submit,
    reset,
    ...fullscreenMixins(drawerRef),
    validateField: (props: any, callback: any) => formRef.value.validateField(props, callback),
    scrollToField: (prop: any) => formRef.value.scrollToField(prop),
    clearValidate: (props: any) => formRef.value.clearValidate(props),
  })
</script>
