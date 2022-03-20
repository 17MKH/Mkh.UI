<template>
  <m-drawer
    ref="drawerRef"
    v-model="visible"
    :custom-class="customClass_"
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
      :before-submit="beforeSubmit"
      @validate-success="loading = true"
      @success="handleSuccess"
      @error="handleError"
    >
      <slot />
    </m-form>

    <template #footer>
      <slot name="footer">
        <slot name="footer-buttons"></slot>
        <m-button v-if="btnOk" type="success" :icon="btnOkIcon" :text="btnOkText || $t('mkh.save')" :disabled="disabled" @click="submit"></m-button>
        <m-button v-if="btnReset" type="info" :icon="btnResetIcon" :text="$t('mkh.reset')" :disabled="disabled" @click="reset"></m-button>
      </slot>
    </template>
  </m-drawer>
</template>
<script>
import { computed, ref } from 'vue'
import { useVisible, useMessage } from '../../composables'
import { fullscreenMixins } from '../../composables/fullscreen'
import props from './props'
export default {
  props,
  emits: ['update:modelValue', 'success', 'error', 'closed', 'opened', 'reset'],
  setup(props, { emit }) {
    const { $t } = mkh
    const message = useMessage()
    const drawerRef = ref(null)
    const formRef = ref(null)
    const loading = ref(false)

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
      emit('closed')
    }

    const handleOpened = () => {
      if (props.autoFocusRef) props.autoFocusRef.focus()

      emit('opened')
    }

    return {
      ...useVisible(props, emit),
      ...fullscreenMixins(drawerRef),
      drawerRef,
      formRef,
      loading,
      customClass_,
      submit,
      reset,
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
