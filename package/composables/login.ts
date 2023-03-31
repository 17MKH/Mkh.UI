import type { HttpResponse, JwtCredential, LoginDto } from '@/types'
import type { FormInstance } from 'element-plus'
import { onMounted, onUnmounted, reactive, Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dom from '@/utils/dom'
import { useI18n } from './i18n'
import { useConfigStore, useTokenStore } from '@/store'
import { useNotification } from './notification'

export const useLogin = function () {
  const { t } = useI18n()
  const configStore = useConfigStore()
  const tokenStore = useTokenStore()
  const route = useRoute()
  const router = useRouter()
  const loading = ref(false)
  const formRef: Ref<FormInstance | undefined> = ref()

  const notify = useNotification()

  let redirect = route.query.redirect
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

    formRef.value.validate((valid: boolean) => {
      if (valid) {
        loading.value = true
        const loginAction = configStore.systemActions.login
        if (loginAction)
          loginAction(model).then((res: HttpResponse<JwtCredential>) => {
            loading.value = false
            if (res.successful) {
              notify.success(t('mkh.login.notify_success'), t('mkh.login.notify_title'), () => {
                tokenStore.set(res.data)
                if (typeof redirect === 'string') router.push(redirect as string)
              })
            } else {
              notify.error(res.msg, t('mkh.login.notify_title'))
            }
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
  if (tokenStore.accessToken) {
    if (typeof redirect === 'string') router.push(redirect as string)
  }

  return {
    model,
    rules,
    loading,
    formRef,
    tryLogin,
  }
}
