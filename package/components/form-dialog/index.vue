<template>
  <m-dialog
    ref="dialogRef"
    v-model="visible"
    custom-class="m-form-dialog"
    :size="size"
    :loading="loading || loading_"
    :loading-text="loadingText"
    :loading-background="loadingBackground"
    :loading-spinner="loadingSpinner"
    @opened="handleOpened"
    @closed="handleClosed"
  >
    <m-form
      ref="formRef"
      no-loading
      :action="action"
      :model="model"
      :rules="rules"
      :size="size"
      :custom-validate="customValidate"
      :disabled="disabled"
      :label-width="labelWidth"
      :before-submit="beforeSubmit"
      @validate-success="loading_ = true"
      @success="handleSuccess"
      @error="handleError"
    >
      <slot />
    </m-form>

    <template v-if="footer" #footer>
      <slot name="footer"> </slot>
      <m-button v-if="btnOk" type="success" :icon="btnOkIcon" :text="btnOkText || $t('mkh.save')" :disabled="disabled" @click="submit"></m-button>
      <m-button v-if="btnReset" type="info" :icon="btnResetIcon" :text="$t('mkh.reset')" :disabled="disabled" @click="reset"></m-button>
    </template>
  </m-dialog>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import { useVisible, useMessage } from '../../composables'
import { fullscreenMixins } from '../../composables/fullscreen'
import _ from 'lodash'
import props from './props'
export default {
  props,
  emits: ['update:modelValue', 'success', 'error', 'closed', 'opened', 'reset'],
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy
    const message = useMessage()
    const dialogRef = ref(null)
    const formRef = ref(null)
    const loading_ = ref(false)

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
      message.success(cit.$t('mkh.save_success_msg'))

      if (props.closeOnSuccess) {
        visible.value = false
      }

      emit('success', data)
    }

    const handleError = () => {
      loading_.value = false
      emit('error')
    }

    const handleOpened = () => {
      if (props.autoFocusRef) props.autoFocusRef.focus()

      emit('opened')
    }

    const handleClosed = () => {
      if (props.resetOnClosed) {
        Object.assign(props.model, model_)
      }
      emit('closed')
    }

    return {
      ...fullscreenMixins(dialogRef),
      visible,
      open,
      close,
      dialogRef,
      formRef,
      loading_,
      submit,
      reset,
      resize,
      handleSuccess,
      handleError,
      handleOpened,
      handleClosed,
      validateField: (props, callback) => formRef.value.validateField(props, callback),
      scrollToField: prop => formRef.value.scrollToField(prop),
      clearValidate: props => formRef.value.clearValidate(props),
    }
  },
}
</script>
