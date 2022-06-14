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
      <slot />
    </m-form>

    <template #footer>
      <slot name="footer"> </slot>
      <m-button v-if="btnOk" type="success" :icon="btnOkIcon" :disabled="disabled" @click="submit">{{ btnOkText || $t('mkh.save') }}</m-button>
      <m-button v-if="btnReset" type="info" :icon="btnResetIcon" :disabled="disabled" @click="reset">{{ $t('mkh.reset') }}</m-button>
    </template>
  </m-box>
</template>
<script>
import { ref } from 'vue'
import { useMessage } from '../../composables'
import props from './props'
export default {
  props,
  emits: ['success', 'error', 'validate-success', 'validate-error'],
  setup(props, { emit }) {
    const { $t } = mkh
    const message = useMessage()
    const formRef = ref(null)
    const loading_ = ref(false)

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

    const handleValidateSuccess = () => {
      loading_.value = true
      emit('validate-success')
    }

    const handleValidateError = () => {
      emit('validate-error')
    }

    return {
      formRef,
      loading_,
      submit,
      reset,
      handleSuccess,
      handleError,
      handleValidateSuccess,
      handleValidateError,
      validateField: (props, callback) => formRef.value.validateField(props, callback),
      scrollToField: prop => formRef.value.scrollToField(prop),
      clearValidate: props => formRef.value.clearValidate(props),
    }
  },
}
</script>
