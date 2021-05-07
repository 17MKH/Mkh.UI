<template>
  <mu-box class="mu-form-box" :loading="loading" :loading-text="loadingText" :loading-background="loadingBackground" :loading-spinner="loadingSpinner" @closed="handleClosed">
    <mu-form ref="formRef" :action="action" :model="model" :rules="rules" no-loading :disabled="disabled" @validate-success="loading = true" @success="handleSuccess" @error="handleError">
      <slot />
    </mu-form>

    <template #footer>
      <slot name="footer"> </slot>
      <mu-button v-if="btnOk" type="success" :icon="btnOkIcon" :text="btnOkText || $t('mkh.form.btnOkText')" :disabled="disabled" @click="submit"></mu-button>
      <mu-button v-if="btnReset" type="info" :icon="btnResetIcon" :text="$t('mkh.form.btnResetText')" :disabled="disabled" @click="reset"></mu-button>
    </template>
  </mu-box>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import props from './props'
export default {
  name: 'FormBox',
  props,
  emits: ['success', 'error'],
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy
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
      cit.$message({
        type: 'success',
        message: cit.$t('mkh.form.successMsg'),
      })
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
    }
  },
}
</script>
