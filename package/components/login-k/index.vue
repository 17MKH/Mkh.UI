<template>
  <section class="m-login-k">
    <m-toolbar-lang v-if="$mkh.toolbars && $mkh.toolbars.lang && $mkh.toolbars.lang.show" class="m-login-k_toolbar_lang" />
    <a href="#" class="m-login-k_logo">
      <img :src="site.logo" class="m-login-k_logo_img" />
      <span class="m-login-k_logo_title">{{ typeof site.title === 'object' ? site.title[$i18n.locale] : site.title }}</span>
    </a>
    <div class="m-login-k_left">
      <img class="m-login-k_bg" :src="'./assets/mkh/login-bg.svg'" />
    </div>
    <div class="m-login-k_right">
      <div class="m-login-k_box">
        <h1 class="m-login-k_title">{{ typeof site.title === 'object' ? site.title[$i18n.locale] : site.title }}</h1>
        <h4 class="m-login-k_tip">{{ $t('mkh.login.k.tip') }}</h4>
        <el-form ref="formRef" class="m-login-k_form" :model="model" :rules="rules" label-position="top">
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
            <el-button class="m-login-k_btn" type="primary" :loading="loading" @click="tryLogin">{{ $t(loading ? 'mkh.login.logining' : 'mkh.login.login') }}</el-button>
          </el-form-item>
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
