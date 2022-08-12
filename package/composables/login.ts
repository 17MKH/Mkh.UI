import type { LoginDto } from '@/types'
import type { FormInstance } from 'element-plus'
import { onMounted, onUnmounted, reactive, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'
import dom from '@/utils/dom'
import useI18n from './i18n'
import { useConfigStore } from '@/store'
import useNotification from './notification'

export default function () {
  const { t } = useI18n()
  const configStore = useConfigStore()
  const route = useRoute()
  const loading = ref(false)
  const formRef: Ref<FormInstance | undefined> = ref()

  const notify = useNotification()

  let { redirect } = route.query
  if (!redirect) {
    redirect = '/'
  }

  const model: LoginDto = reactive({ username: '', password: '', verifyCode: '', verifyCodeId: '' })
  const rules = {
    username: [
      {
        required: true,
        message: t('mkh.login.input_username'),
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: t('mkh.login.input_password'),
        trigger: 'blur',
      },
    ],
    verifyCode: [
      {
        required: true,
        message: t('mkh.login.input_code'),
        trigger: 'blur',
      },
    ],
  }

  const tryLogin = () => {
    if (!formRef.value) return

    formRef.value.validate((valid) => {
      if (valid) {
        loading.value = true
        configStore.systemActions
          .login(model)
          .then((data) => {
            notify.success(t('mkh.login.notify_success'), t('mkh.login.notify_title'), () => {
              store.dispatch('app/token/login', data)
              router.push(redirect)
            })
          })
          .catch((msg) => {
            loading.value = false
            $notify.error({
              title: t('mkh.login.notify_title'),
              duration: 1500,
              message: msg,
            })
          })
      }
    })
  }

  const handleEnterLogin = (e) => {
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
