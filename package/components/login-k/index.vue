<template>
  <section class="m-login-k">
    <a href="#" class="m-login-k_logo">
      <img :src="logo" class="m-login-k_logo_img" />
      <span class="m-login-k_logo_title">{{ title }}</span>
    </a>
    <div class="m-login-k_left">
      <img src="./login-bg.svg" class="m-login-k_bg" />
    </div>
    <div class="m-login-k_right">
      <div class="m-login-k_box">
        <h1 class="m-login-k_title">{{ title }}</h1>
        <h4 class="m-login-k_tip">请输入您的用户名和密码</h4>
        <el-form ref="formRef" class="m-login-k_form" :model="model" :rules="rules" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username" placeholder="用户名" clearable>
              <template #prefix>
                <m-icon name="user" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="model.password" type="password" placeholder="密码" clearable>
              <template #prefix>
                <m-icon name="lock" />
              </template>
            </el-input>
          </el-form-item>
          <m-verifycode-input v-if="enableVerifyCode" v-model="model.verifyCode" v-model:id="model.verifyCodeId" label="验证码" />
          <el-form-item>
            <el-button class="m-login-k_btn" :loading="loading" @click="tryLogin">{{ loading ? '登录中...' : '登录' }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script>
import { useLogin } from '../../composables'
export default {
  name: 'LoginK',
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
      enableVerifyCode: mkh.config.auth.enableVerifyCoee,
    }
  },
}
</script>
