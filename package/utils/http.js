import axios from 'axios'
import qs from 'qs'
import { store } from '../store'

function Http(baseURL) {
  this.axios = axios.create({
    baseURL,
  })

  this.axios.defaults.headers.post['Content-Type'] = 'application/json'
  this.axios.defaults.headers.put['Content-Type'] = 'application/json'

  //请求前拦截器，附加令牌
  this.axios.interceptors.request.use(
    config => {
      const { accessToken } = store.state.app.token
      if (accessToken) {
        config.headers.Authorization = 'Bearer ' + t.accessToken
      }
    },
    error => {
      console.error(error)
      return Promise.reject(error)
    }
  )

  // 响应前拦截器
  this.axios.interceptors.response.use(
    response => {
      const { config } = response

      if (response.data.code === 1) {
        return response.data.data
      } else {
        return response.data
      }
    },
    error => {
      let currentRoute = router.currentRoute
      if (error && error.response) {
        switch (error.response.status) {
          case 401:
            break
          case 403:
            break
          default:
            console.error(error.response.data.msg)
            break
        }
      } else {
        if (currentRoute.name === 'login') {
        } else {
        }
      }
      return Promise.reject(error)
    }
  )
}

Http.prototype.post = (url, params, config) => {
  return this.axios.post(url, params, config)
}

Http.prototype.get = (url, params, config) => {
  const config_ = Object.assign({}, config, {
    // 参数
    params,
    // 修改参数序列化方法
    paramsSerializer: p => {
      // 使用逗号分隔参数
      return qs.stringify(p, {
        allowDots: true,
      })
    },
  })
  return this.axios.get(url, config_)
}

Http.prototype.delete = (url, params, config) => {
  const config_ = Object.assign({}, config, {
    // 参数
    params,
    // 修改参数序列化方法
    paramsSerializer: p => {
      // 使用逗号分隔参数
      return qs.stringify(p, {
        allowDots: true,
      })
    },
  })
  return this.axios.delete(url, config_)
}

Http.prototype.put = (url, params, config) => {
  return this.axios.put(url, params, config)
}

export default Http
