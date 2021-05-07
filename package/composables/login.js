import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default function () {
  const { $notify } = getCurrentInstance().proxy
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const loading = ref(false)
  const formRef = ref(null)

  let { redirect } = route.query
  if (!redirect) {
    redirect = '/'
  }

  //如果令牌存在，则直接跳转
  const { accessToken } = store.state.app.token
  if (accessToken) {
    router.push(redirect)
    return
  }

  const model = reactive({ username: '', password: '', verifyCode: { id: '', code: '' } })
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
    'verifyCode.code': [
      {
        required: true,
        message: '请输入验证码',
        trigger: 'blur',
      },
    ],
  }

  const { login } = MkhUI.config.actions
  const tryLogin = () => {
    formRef.value.validate(valid => {
      if (valid) {
        loading.value = true
        login(model)
          .then(data => {
            $notify({
              title: '登录提示',
              message: '登录成功，正在跳转~',
              type: 'success',
              duration: 1500,
              onClose() {
                store.commit('app/token/init', data)
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

  onMounted(() => {
    //监听键盘enter事件
    document.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        tryLogin()
      }
    })
  })

  return {
    model,
    rules,
    loading,
    formRef,
    tryLogin,
  }
}
