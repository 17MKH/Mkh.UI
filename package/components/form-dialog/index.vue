<template>
  <m-dialog
    ref="dialogRef"
    v-model="visible"
    :header="header"
    :title="title"
    :icon="icon"
    :icon-color="iconColor"
    :no-padding="noPadding"
    :no-scrollbar="noScrollbar"
    :custom-class="customClass_"
    :size="size"
    :width="width"
    :height="height"
    :top="top"
    :show-close="showClose"
    :show-fullscreen="showFullscreen"
    :modal="modal"
    :append-to-body="appendToBody"
    :draggable="draggable"
    :lock-scroll="lockScroll"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :before-close="beforeClose"
    :destroy-on-close="destroyOnClose"
    :loading="loading || loading_"
    :loading-text="loadingText"
    :loading-background="loadingBackground"
    :loading-spinner="loadingSpinner"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
    @open-auto-focus="handleOpenAutoFocus"
    @close-auto-focus="handleCloseAutoFocus"
  >
    <m-form
      ref="formRef"
      no-loading
      :size="size"
      :action="action"
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
      :custom-validate="customValidate"
      :before-submit="beforeSubmit"
      :disabled-enter="disabledEnter"
      @validate-success="handleValidateSuccess"
      @validate-error="handleValidateError"
      @success="handleSuccess"
      @error="handleError"
    >
      <slot />
    </m-form>

    <template v-if="footer" #footer>
      <slot name="footer"> </slot>
      <m-button v-if="btnOk" type="success" :icon="btnOkIcon" :disabled="disabled" @click="submit">{{ btnOkText || $t('mkh.save') }}</m-button>
      <m-button v-if="btnReset" type="info" :icon="btnResetIcon" :disabled="disabled" @click="reset">{{ $t('mkh.reset') }}</m-button>
    </template>
  </m-dialog>
</template>
<script>
import { computed, ref } from 'vue'
import { useVisible, useMessage } from '../../composables'
import { fullscreenMixins } from '../../composables/fullscreen'
import _ from 'lodash'
import props from './props'
export default {
  inheritAttrs: false,
  props,
  emits: ['update:modelValue', 'open', 'opened', 'close', 'closed', 'open-auto-focus', 'close-auto-focus', 'success', 'error', 'reset', 'validate-success', 'validate-error'],
  setup(props, { emit }) {
    const { $t } = mkh
    const message = useMessage()
    const dialogRef = ref(null)
    const formRef = ref(null)
    const loading_ = ref(false)

    const customClass_ = computed(() => {
      let list = ['m-form-dialog']
      if (props.customClass) {
        list.push(props.customClass)
      }
      return list.join(' ')
    })

    const model_ = _.cloneDeep(props.model)

    const { visible, open, close } = useVisible(props, emit)

    const submit = () => {
      formRef.value.submit()
    }

    const reset = () => {
      formRef.value.reset()
      if (props.autoFocusRef) props.autoFocusRef.focus()
      emit('reset')
    }

    const resize = () => {
      dialogRef.value.resize()
    }

    const handleSuccess = data => {
      loading_.value = false
      message.success(props.successMessage || $t('mkh.save_success_msg'))

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
        Object.assign(props.model, model_)
      }
      emit('closed')
    }

    const handleOpenAutoFocus = () => {
      emit('open-auto-focus')
    }

    const handleCloseAutoFocus = () => {
      emit('close-auto-focus')
    }

    const handleValidateSuccess = () => {
      loading_.value = true
      emit('validate-success')
    }

    const handleValidateError = () => {
      emit('validate-error')
    }

    return {
      ...fullscreenMixins(dialogRef),
      visible,
      open,
      close,
      dialogRef,
      formRef,
      loading_,
      customClass_,
      submit,
      reset,
      resize,
      handleSuccess,
      handleError,
      handleOpen,
      handleOpened,
      handleClose,
      handleClosed,
      handleOpenAutoFocus,
      handleCloseAutoFocus,
      handleValidateSuccess,
      handleValidateError,
      validateField: (props, callback) => formRef.value.validateField(props, callback),
      scrollToField: prop => formRef.value.scrollToField(prop),
      clearValidate: props => formRef.value.clearValidate(props),
    }
  },
}
</script>
