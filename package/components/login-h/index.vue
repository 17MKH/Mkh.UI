<template>
  <section class="mu-login-h">
    <div class="mu-login-h_wrapper">
      <div class="mu-login-h_left">
        <div class="mu-login-h_modal"></div>
        <img class="mu-login-h_bg" src="./login-bg.jpg" />
        <a href="#" class="mu-login-h_logo">
          <img :src="logo" class="mu-login-h_logo_img" />
          <span class="mu-login-h_logo-title">{{ title }}</span>
        </a>
        <h1 class="mu-login-h_tip">欢迎登录</h1>
      </div>
      <div class="mu-login-h_right">
        <h1 class="mu-login-h_title">登录</h1>
        <el-form ref="formRef" class="mu-login-h_form" :model="model" :rules="rules" label-position="top">
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
            <el-button class="mu-login-h_btn" type="primary" :loading="loading" @click="tryLogin">{{ loading ? '登录中...' : '登录' }}</el-button>
          </el-form-item>
          <el-divider>您也可以使用以下方式登录</el-divider>
          <div style="text-align: center">
            <ul class="mu-login-h_applist">
              <li>
                <mu-icon name="github" />
              </li>
              <li>
                <mu-icon name="weixin" />
              </li>
              <li>
                <mu-icon name="qq" />
              </li>
              <li>
                <mu-icon name="weibo" />
              </li>
            </ul>
          </div>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script>
import { useLogin } from '../../composables'
export default {
  name: 'LoginH',
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
