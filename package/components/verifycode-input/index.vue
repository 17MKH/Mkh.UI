<template>
  <div class="m-verifycode-input">
    <div>
      <el-form-item :label="label" :prop="prop">
        <el-input :model-value="modelValue" autocomplete="off" :placeholder="$t('mkh.login.code')" clearable @input="handleInput">
          <template #prefix>
            <m-icon name="captcha"></m-icon>
          </template>
        </el-input>
      </el-form-item>
    </div>
    <div class="m-verifycode-input_img">
      <el-tooltip effect="dark" :content="$t('mkh.click_refresh')" placement="top">
        <img :src="verifyCodeUrl" @click="refreshVerifyCode" />
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
export default {
  props: {
    prop: {
      type: String,
      default: 'verifyCode',
    },
    modelValue: {
      type: String,
      default: '',
    },
    id: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'update:id'],
  setup(props, { emit }) {
    const { store } = mkh

    const getVerifyCode = computed(() => store.state.app.config.actions.getVerifyCode)
    const verifyCodeUrl = ref()

    //刷新验证码
    const refreshVerifyCode = () => {
      getVerifyCode.value().then(data => {
        verifyCodeUrl.value = data.base64
        emit('update:id', data.id)
        emit('update:modelValue', '')
      })
    }
    refreshVerifyCode()

    const handleInput = val => {
      emit('update:modelValue', val)
    }

    return {
      verifyCodeUrl,
      refreshVerifyCode,
      handleInput,
    }
  },
}
</script>
