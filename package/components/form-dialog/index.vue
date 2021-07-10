<template>
  <m-dialog
    ref="dialogRef"
    v-model="visible"
    custom-class="m-form-dialog"
    :size="size"
    :loading="loading"
    :loading-text="loadingText"
    :loading-background="loadingBackground"
    :loading-spinner="loadingSpinner"
    @opened="handleOpened"
    @closed="handleClosed"
  >
    <m-form
      ref="formRef"
      no-loading
      :style="{ marginRight: formMarginRight }"
      :action="action"
      :model="model"
      :rules="rules"
      :size="size"
      :custom-validate="customValidate"
      :disabled="disabled"
      :label-width="labelWidth"
      @validate-success="loading = true"
      @success="handleSuccess"
      @error="handleError"
    >
      <slot />
    </m-form>

    <template v-if="footer" #footer>
      <slot name="footer"> </slot>
      <m-button v-if="btnOk" type="success" :icon="btnOkIcon" :text="btnOkText || $t('mkh.form.btnOkText')" :disabled="disabled" @click="submit"></m-button>
      <m-button v-if="btnReset" type="info" :icon="btnResetIcon" :text="$t('mkh.form.btnResetText')" :disabled="disabled" @click="reset"></m-button>
    </template>
  </m-dialog>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import { useVisible, useMessage } from '../../composables'
import { fullscreenMixins } from '../../composables/fullscreen'
import props from './props'
export default {
  name: 'FormDialog',
  props,
  emits: ['update:modelValue', 'success', 'error', 'closed', 'opened', 'reset'],
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy
    const message = useMessage()
    const dialogRef = ref(null)
    const formRef = ref(null)
    const loading = ref(false)

    const { visible, open, close } = useVisible(props, emit)

    const submit = () => {
      formRef.value.submit()
    }

    const reset = () => {
      formRef.value.reset()
      emit('reset')
    }

    const resize = () => {
      dialogRef.value.resize()
    }

    const handleSuccess = data => {
      loading.value = false
      message.success(cit.$t('mkh.form.successMsg'))

      if (props.closeOnSuccess) {
        visible.value = false
      }

      emit('success', data)
    }

    const handleError = () => {
      loading.value = false
      emit('error', data)
    }

    const handleOpened = () => {
      if (props.autoFocusRef) props.autoFocusRef.focus()

      emit('opened')
    }

    const handleClosed = () => {
      if (props.resetOnClosed) {
        formRef.value.reset()
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
      loading,
      submit,
      reset,
      resize,
      handleSuccess,
      handleError,
      handleOpened,
      handleClosed,
    }
  },
}
</script>
