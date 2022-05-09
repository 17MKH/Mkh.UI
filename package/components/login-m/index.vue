<template>
  <section class="m-login-m">
    <m-toolbar-lang v-if="$mkh.toolbars && $mkh.toolbars.lang && $mkh.toolbars.lang.show" class="m-login-m_toolbar_lang" />
    <div class="m-login-m_wrapper">
      <div class="m-login-m_logo">
        <img :src="site.logo" />
      </div>
      <h1 class="m-login-m_title">{{ typeof site.title === 'object' ? site.title[$i18n.locale] : site.title }}</h1>
      <h4 class="m-login-m_tip">{{ $t('mkh.login.k.tip') }}</h4>
      <el-form ref="formRef" class="m-login-m_form" :model="model" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="model.username" :placeholder="$t('mkh.login.input_username')" clearable>
            <template #prefix>
              <m-icon name="user" input />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="model.password" type="password" autocomplete="off" :placeholder="$t('mkh.login.input_password')" clearable>
            <template #prefix>
              <m-icon name="lock" input />
            </template>
          </el-input>
        </el-form-item>
        <m-verifycode-input v-if="enableVerifyCode" v-model="model.verifyCode" v-model:id="model.verifyCodeId" />
        <el-form-item>
          <el-button class="m-login-m_btn" type="primary" :loading="loading" @click="tryLogin">{{ $t(loading ? 'mkh.login.logining' : 'mkh.login.login') }}</el-button>
        </el-form-item>
      </el-form>
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
