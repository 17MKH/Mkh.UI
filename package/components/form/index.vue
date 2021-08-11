<template>
  <el-form
    ref="formRef"
    v-loading="!noLoading && loading"
    class="m-form"
    :label-width="labelWidth"
    :size="size_"
    :model="model"
    :rules="rules"
    :element-loading-text="loadingText || $t('mkh.form.loadingText')"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
    <slot />
  </el-form>
</template>
<script>
import { computed, provide, nextTick, onMounted, onBeforeUnmount, ref } from 'vue'
import { store } from '../../store'
import props from './props'
import dom from '../../utils/dom'

export default {
  name: 'Form',
  props,
  emits: ['success', 'error', 'validate-success', 'validate-error'],
  setup(props, { emit }) {
    const size_ = computed(() => props.size || store.state.app.profile.skin.size)
    const loadingOptions = mkh.config.component.loading

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
        const { action, model, beforeSubmit } = props
        if (action) {
          //执行器的操作
          beforeSubmit && beforeSubmit()

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

    const handleEnterSubmit = e => {
      if (e.keyCode === 13) {
        query()
      }
    }

    onMounted(() => {
      nextTick(() => {
        if (!props.disabledEnter) dom.on(formRef.value.$el, 'keydown', handleEnterSubmit)
      })
    })

    onBeforeUnmount(() => {
      if (!props.disabledEnter) dom.off(formRef.value.$el, 'keydown', handleEnterSubmit)
    })

    return { size_, loading, loadingOptions, formRef, validate, submit, reset }
  },
}
</script>
