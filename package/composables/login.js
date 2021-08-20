import { computed, getCurrentInstance, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { router } from '../router'
import { store } from '../store'
import dom from '../utils/dom'

export default function () {
  const { $notify } = getCurrentInstance().proxy
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
        message: '请输入用户名',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
    ],
    verifyCode: [
      {
        required: true,
        message: '请输入验证码',
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
              title: '登录提示',
              message: '登录成功，正在跳转~',
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
              title: '登录提示',
              duration: 1500,
              message: msg,
            })
          })
      }
    })
  }

  const handleEnterLogin = e => {
    if (e.code === 'Enter') {
      console.log('登录')
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
