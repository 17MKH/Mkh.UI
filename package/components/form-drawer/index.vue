<template>
  <m-drawer
    ref="drawerRef"
    v-model="visible"
    custom-class="m-form-drawer"
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
      :size="size_"
      :auto-focus-ref="autoFocusRef"
      no-loading
      :disabled="disabled"
      @validate-success="loading = true"
      @success="handleSuccess"
      @error="handleError"
    >
      <slot />
    </m-form>

    <template #footer>
      <slot name="footer">
        <slot name="footer-buttons"></slot>
        <m-button v-if="btnOk" type="success" :icon="btnOkIcon" :text="btnOkText || $t('mkh.form.btnOkText')" :disabled="disabled" @click="submit"></m-button>
        <m-button v-if="btnReset" type="info" :icon="btnResetIcon" :text="$t('mkh.form.btnResetText')" :disabled="disabled" @click="reset"></m-button>
      </slot>
    </template>
  </m-drawer>
</template>
<script>
import { computed, getCurrentInstance, ref } from 'vue'
import { useVisible } from '../../composables'
import { fullscreenMixins } from '../../composables/fullscreen'
import props from './props'
import { useStore } from 'vuex'
export default {
  name: 'FormDrawer',
  props,
  emits: ['update:modelValue', 'success', 'error', 'closed'],
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy
    const store = useStore()
    const drawerRef = ref(null)
    const formRef = ref(null)
    const loading = ref(false)
    const size_ = computed(() => props.size || store.state.app.profile.skin.size)

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
      emit('closed')
    }

    return {
      ...useVisible(props, emit),
      ...fullscreenMixins(drawerRef),
      drawerRef,
      formRef,
      size_,
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
