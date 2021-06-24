<template>
  <section class="m-login-m">
    <div class="m-login-m_wrapper">
      <div class="m-login-m_logo">
        <img :src="logo" />
      </div>
      <h1 class="m-login-m_title">{{ title }}</h1>
      <h4 class="m-login-m_tip">请输入您的用户名和密码</h4>
      <el-form ref="formRef" class="m-login-m_form" :model="model" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="用户名" clearable>
            <template #prefix>
              <m-icon name="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="model.password" type="password" autocomplete="off" placeholder="密码" clearable>
            <template #prefix>
              <m-icon name="lock" />
            </template>
          </el-input>
        </el-form-item>
        <m-verifycode-input v-model="model.verifyCode" v-model:id="model.verifyCodeId" />
        <el-form-item>
          <el-button class="m-login-m_btn" :loading="loading" @click="tryLogin">{{ loading ? '登录中...' : '登录' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
import { useLogin } from '../../composables'
export default {
  name: 'LoginM',
  setup() {
    const { title, logo } = mkh.config.site
    const { model, rules, loading, formRef, tryLogin } = useLogin()

    return {
      title,
      logo,
      formRef,
      model,
      rules,
      loading,
      tryLogin,
    }
  },
}
</script>
