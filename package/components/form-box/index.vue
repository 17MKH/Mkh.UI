<template>
  <m-box
    class="m-form-box"
    :header="header"
    :size="size"
    :loading="loading"
    :loading-text="loadingText"
    :loading-background="loadingBackground"
    :loading-spinner="loadingSpinner"
    @closed="handleClosed"
  >
    <m-form
      ref="formRef"
      :style="{ marginRight: formMarginRight }"
      :action="action"
      :model="model"
      :rules="rules"
      :size="size"
      :disabled="disabled"
      :before-submit="beforeSubmit"
      no-loading
      @validate-success="loading = true"
      @success="handleSuccess"
      @error="handleError"
    >
      <slot />
    </m-form>

    <template #footer>
      <slot name="footer"> </slot>
      <m-button v-if="btnOk" type="success" :icon="btnOkIcon" :text="btnOkText || $t('mkh.save')" :disabled="disabled" @click="submit"></m-button>
      <m-button v-if="btnReset" type="info" :icon="btnResetIcon" :text="$t('mkh.reset')" :disabled="disabled" @click="reset"></m-button>
    </template>
  </m-box>
</template>
<script>
import { ref } from 'vue'
import { useMessage } from '../../composables'
import props from './props'
export default {
  props,
  emits: ['success', 'error'],
  setup(props, { emit }) {
    const { $t } = mkh
    const message = useMessage()
    const formRef = ref(null)
    const loading = ref(false)

    const submit = () => {
      formRef.value.submit()
    }

    const reset = () => {
      formRef.value.reset()
    }

    const handleSuccess = data => {
      loading.value = false
      message.success($t('mkh.save_success_msg'))
      emit('success', data)
    }

    const handleError = () => {
      loading.value = false
      emit('error', data)
    }

    const handleClosed = () => {
      if (props.resetOnClosed) {
        formRef.value.reset()
      }
    }

    return {
      formRef,
      loading,
      submit,
      reset,
      handleSuccess,
      handleError,
      handleClosed,
      validateField: (props, callback) => formRef.value.validateField(props, callback),
      scrollToField: prop => formRef.value.scrollToField(prop),
      clearValidate: props => formRef.value.clearValidate(props),
    }
  },
}
</script>
