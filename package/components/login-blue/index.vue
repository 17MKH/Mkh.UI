<template>
  <div class="m-login-blue">
    <div class="m-login-main">
      <div class="m-login-logo">
        <div class="m-login-logo_wrap">
          <img :src="site.logo" class="m-login-blue_icon" />
          <div class="title">{{ typeof site.title === 'object' ? site.title[$i18n.locale] : site.title }}</div>
        </div>
      </div>
      <div style="width: 1px; height: 222px; background: #1b83ee"></div>
      <div class="m-form-login">
        <div style="font-size: 24px; color: #fff">{{$t('mkh.login.user_login')}}</div>
        <m-toolbar-lang v-if="$mkh.toolbars && $mkh.toolbars.lang && $mkh.toolbars.lang.show" class="m-login-blue_toolbar_lang" />
        <div class="m-form-login_wrap">
          <div class="login-info">
            <el-form ref="formRef" :model="model" hide-required-asterisk :rules="rules" label-position="left" @submit.native.prevent>
              <el-form-item prop="username">
                <el-input v-model="model.username" :placeholder="$t('mkh.login.input_username')">
                  <template #prefix>
                    <m-icon name="user" input />
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="model.password" type="password" :placeholder="$t('mkh.login.input_password')">
                  <template #prefix> <m-icon name="lock" input /> </template
                ></el-input>
              </el-form-item>
              <el-form-item v-if="enableVerifyCode" prop="captchaCode">
                <m-verifycode-input v-if="enableVerifyCode" v-model="model.verifyCode" v-model:id="model.verifyCodeId" :label="$t('mkh.login.code')" />
              </el-form-item>
            </el-form>
            <el-button type="warning" style="margin-top: 10px" :loading="loading" @click="tryLogin">{{ $t(loading ? 'mkh.login.logining' : 'mkh.login.login') }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">技术支持：oldli</div>
  </div>
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
