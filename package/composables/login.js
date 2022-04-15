import { computed, getCurrentInstance, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import dom from '../utils/dom'
import { i18n } from '../locales'

export default function () {
  const { $notify } = getCurrentInstance().proxy
  const { router, store } = mkh
  const route = useRoute()
  const loading = ref(false)
  const formRef = ref(null)

  let { redirect } = route.query
  if (!redirect) {
    redirect = '/'
  }

  const model = reactive({ username: '', password: '', verifyCode: '', verifyCodeId: '' })
  const rules = {
    username: [
      {
        required: true,
        message: i18n.global.t('mkh.login.input_username'),
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: i18n.global.t('mkh.login.input_password'),
        trigger: 'blur',
      },
    ],
    verifyCode: [
      {
        required: true,
        message: i18n.global.t('mkh.login.input_code'),
        trigger: 'blur',
      },
    ],
  }

  const login = computed(() => store.state.app.config.actions.login)
  const tryLogin = () => {
    formRef.value.validate(valid => {
      if (valid) {
        loading.value = true
        login
          .value(model)
          .then(data => {
            $notify({
              title: i18n.global.t('mkh.login.notify_title'),
              message: i18n.global.t('mkh.login.notify_success'),
              type: 'success',
              duration: 1500,
              onClose() {
                store.dispatch('app/token/login', data)
                router.push(redirect)
              },
            })
          })
          .catch(msg => {
            loading.value = false
            $notify.error({
              title: i18n.global.t('mkh.login.notify_title'),
              duration: 1500,
              message: msg,
            })
          })
      }
    })
  }

  const handleEnterLogin = e => {
    if (e.code === 'Enter') {
      tryLogin()
    }
  }

  onMounted(() => {
    dom.on(document, 'keydown', handleEnterLogin)
  })

  onUnmounted(() => {
    dom.off(document, 'keydown', handleEnterLogin)
  })

  //如果令牌存在，则直接跳转
  const { accessToken } = store.state.app.token
  if (accessToken) {
    router.push(redirect)
  }

  return {
    model,
    rules,
    loading,
    formRef,
    tryLogin,
  }
}
