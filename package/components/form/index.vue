<template>
  <el-form
    ref="formRef"
    v-loading="!noLoading && loading"
    class="mu-form"
    :label-width="labelWidth"
    :size="size_"
    :element-loading-text="loadingText || $t('mkh.form.loadingText')"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
    <slot />
  </el-form>
</template>
<script>
import { computed, provide, ref } from 'vue'
import { useStore } from 'vuex'
import props from './props'
export default {
  name: 'Form',
  props,
  emits: ['success', 'error', 'validate-success', 'validate-error'],
  setup(props, { emit }) {
    const store = useStore()
    const size_ = computed(() => props.size || store.state.app.account.skin.size)
    const loadingOptions = MkhUI.config.component.loading

    const formRef = ref(null)
    //加载动画
    const loading = ref(false)

    /** 自定义表单的重置方法数组 */
    const resetMethods = ref([])
    provide('resetMethods', resetMethods)

    /** 表单验证 */
    const validate = callback => {
      formRef.value.validate(async valid => {
        // 自定义验证
        if (valid && (!props.customValidate || props.customValidate() === true)) {
          emit('validate-success')
          callback()
        } else {
          // 验证失败
          emit('validate-error')
        }
      })
    }

    /** 提交 */
    const submit = () => {
      validate(() => {
        const { action, model } = props
        if (action) {
          loading.value = true
          action(model)
            .then(data => {
              loading.value = false
              emit('success', data)
            })
            .catch(() => {
              loading.value = false
              emit('error')
            })
        }
      })
    }

    /** 重置 */
    const reset = () => {
      formRef.value.resetFields()
      resetMethods.value.forEach(m => m())
    }

    return { size_, loading, loadingOptions, formRef, validate, submit, reset }
  },
}
</script>
