<template>
  <section class="mu-login-k">
    <a href="#" class="mu-login-k_logo">
      <img :src="logo" class="mu-login-k_logo_img" />
      <span class="mu-login-k_logo_title">{{ title }}</span>
    </a>
    <div class="mu-login-k_left">
      <img src="./login-bg.svg" class="mu-login-k_bg" />
    </div>
    <div class="mu-login-k_right">
      <div class="mu-login-k_box">
        <h1 class="mu-login-k_title">{{ title }}</h1>
        <h4 class="mu-login-k_tip">请输入您的用户名和密码</h4>
        <el-form ref="formRef" class="mu-login-k_form" :model="model" :rules="rules" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username" placeholder="用户名" clearable>
              <template #prefix>
                <mu-icon name="user" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="model.password" type="password" placeholder="密码" clearable>
              <template #prefix>
                <mu-icon name="lock" />
              </template>
            </el-input>
          </el-form-item>
          <mu-verifycode-input v-model="model.verifyCode.code" v-model:id="model.verifyCode.id" label="验证码" />
          <el-form-item>
            <el-button class="mu-login-k_btn" :loading="loading" @click="tryLogin">{{ loading ? '登录中...' : '登录' }}</el-button>
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
    const { title, logo } = MkhUI.config.site
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
