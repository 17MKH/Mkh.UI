<template>
  <section class="m-login-h">
    <div class="m-login-h_wrapper">
      <div class="m-login-h_left">
        <div class="m-login-h_modal"></div>
        <img class="m-login-h_bg" :src="'./assets/mkh/login-bg.jpg'" />
        <a href="#" class="m-login-h_logo">
          <img :src="site.logo" class="m-login-h_logo_img" />
          <span class="m-login-h_logo-title">{{ site.title }}</span>
        </a>
        <h1 class="m-login-h_tip">欢迎登录</h1>
      </div>
      <div class="m-login-h_right">
        <h1 class="m-login-h_title">登录</h1>
        <el-form ref="formRef" class="m-login-h_form" :model="model" :rules="rules" label-position="top">
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
            <el-button class="m-login-h_btn" type="primary" :loading="loading" @click="tryLogin">{{ loading ? '登录中...' : '登录' }}</el-button>
          </el-form-item>
          <el-divider>您也可以使用以下方式登录</el-divider>
          <div style="text-align: center">
            <ul class="m-login-h_applist">
              <li>
                <m-icon name="github" />
              </li>
              <li>
                <m-icon name="weixin" />
              </li>
              <li>
                <m-icon name="qq" />
              </li>
              <li>
                <m-icon name="weibo" />
              </li>
            </ul>
          </div>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script>
import { computed } from '@vue/reactivity'
import { useLogin } from '../../composables'
import { store } from '../../store'
export default {
  name: 'LoginH',
  setup() {
    const site = store.state.app.config.site
    const { model, rules, loading, formRef, tryLogin } = useLogin()

    return {
      site,
      formRef,
      model,
      rules,
      loading,
      tryLogin,
      enableVerifyCode: computed(() => store.state.app.config.auth.enableVerifyCoee),
    }
  },
}
</script>
