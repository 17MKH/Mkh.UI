<template>
  <section class="m-login-h">
    <m-toolbar-lang v-if="$mkh.toolbars && $mkh.toolbars.lang && $mkh.toolbars.lang.show" class="m-login-h_toolbar_lang" />
    <div class="m-login-h_wrapper">
      <div class="m-login-h_left">
        <div class="m-login-h_modal"></div>
        <img class="m-login-h_bg" :src="'./assets/mkh/login-bg.jpg'" />
        <a href="#" class="m-login-h_logo">
          <img :src="site.logo" class="m-login-h_logo_img" />
          <span class="m-login-h_logo-title">{{ typeof site.title === 'object' ? site.title[$i18n.locale] : site.title }}</span>
        </a>
        <h1 class="m-login-h_tip">{{ $t('mkh.login.h.welcome') }}</h1>
      </div>
      <div class="m-login-h_right">
        <h1 class="m-login-h_title">{{ $t('mkh.login.login') }}</h1>
        <el-form ref="formRef" class="m-login-h_form" :model="model" :rules="rules" label-position="top">
          <el-form-item :label="$t('mkh.login.username')" prop="username">
            <el-input v-model="model.username" :placeholder="$t('mkh.login.input_username')" clearable>
              <template #prefix>
                <m-icon name="user" input />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('mkh.login.password')" prop="password">
            <el-input v-model="model.password" type="password" :placeholder="$t('mkh.login.input_password')" clearable>
              <template #prefix>
                <m-icon name="lock" input />
              </template>
            </el-input>
          </el-form-item>
          <m-verifycode-input v-if="enableVerifyCode" v-model="model.verifyCode" v-model:id="model.verifyCodeId" :label="$t('mkh.login.code')" />
          <el-form-item>
            <el-button class="m-login-h_btn" type="primary" :loading="loading" @click="tryLogin">{{ $t(loading ? 'mkh.login.logining' : 'mkh.login.login') }}</el-button>
          </el-form-item>
          <el-divider>{{ $t('mkh.login.h.select_login_mode') }}</el-divider>
          <div style="text-align: center">
            <ul class="m-login-h_applist">
              <li>
                <m-icon name="github" />
              </li>
              <li>
                <m-icon name="wechat" />
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
export default {
  setup() {
    const { store } = mkh

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
