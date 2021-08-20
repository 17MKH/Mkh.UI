import axios from 'axios'
import qs from 'qs'
import { store } from '../store'
import { router } from '../router'
import { ElMessage } from 'element-plus'
import { i18n } from './locale'

function Http(options) {
  let _axios = axios.create(options)

  _axios.defaults.headers.post['Content-Type'] = 'application/json'
  _axios.defaults.headers.put['Content-Type'] = 'application/json'

  //请求前拦截器，附加令牌
  _axios.interceptors.request.use(
    config => {
      const { accessToken } = store.state.app.token
      if (accessToken) {
        config.headers.Authorization = 'Bearer ' + accessToken
      }
      return config
    },
    error => {
      console.error(error)
      return Promise.reject(error)
    }
  )

  // 响应前拦截器
  _axios.interceptors.response.use(
    response => {
      const { config } = response
      if (response.data.successful) {
        return response.data.data
      } else if (!response.data.successful && !config.noErrorMsg) {
        //noErrorMsg表示不显示错误信息，有时候希望在业务中根据返回的code自行进行信息提醒时可用
        ElMessage({
          type: 'error',
          title: i18n.global.t('mkh.http.errorTitle'),
          message: response.data.msg,
          showClose: true,
          duration: 1500,
        })
        return Promise.reject(response.data.msg)
      } else {
        return response.data
      }
    },
    error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 401:
            const { accountId, refreshToken } = store.state.app.token
            const refreshTokenAction = store.state.app.config.actions.refreshToken
            if (refreshToken && refreshTokenAction) {
              //尝试刷新令牌
              return refreshTokenAction({
                accountId,
                platform: 0,
                refreshToken,
              })
                .then(data => {
                  return store.dispatch('app/token/login', data).then(() => {
                    //重新发一起一次上次的的请求
                    error.config.headers.Authorization = 'Bearer ' + data.accessToken
                    return _axios.request(error.config)
                  })
                })
                .catch(e => {
                  store.dispatch('app/token/logout')
                })
            } else {
              store.dispatch('app/token/logout')
            }
            break
          case 403:
            router.push('/error/403')
            break
          default:
            console.error(error.response.data.msg)
            router.push('/error/500')
            break
        }

        return
      }
      return Promise.reject(i18n.global.t('mkh.http.errorTitle'))
    }
  )

  this._axios = _axios
}

Http.prototype.post = function (url, params, config) {
  return this._axios.post(url, params, config)
}

Http.prototype.get = function (url, params, config) {
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
  return this._axios.get(url, config_)
}

Http.prototype.delete = function (url, params, config) {
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
  return this._axios.delete(url, config_)
}

Http.prototype.put = function (url, params, config) {
  return this._axios.put(url, params, config)
}

//通用的增删改查方法
const crud = (http, root) => {
  return {
    query(params) {
      return http.get(`${root}/query`, params)
    },
    add(params) {
      return http.post(`${root}/add`, params)
    },
    remove(id) {
      return http.delete(`${root}/delete`, { id })
    },
    edit(id) {
      return http.get(`${root}/edit`, { id })
    },
    update(params) {
      return http.post(`${root}/update`, params)
    },
  }
}

export default (app, config) => {
  mkh.api = {}

  mkh.modules.forEach(m => {
    const { code, api } = m
    let $api = {}
    //先判断模块的http配置是否存在，如果不存在则使用全局配置
    let httpOptions = Object.assign({}, config.global)
    let httpModuleOptions = config.modules[code]
    if (httpModuleOptions) {
      Object.assign(httpOptions, httpModuleOptions)
    } else {
      httpOptions.baseURL = `${httpOptions.baseURL}${httpOptions.baseURL.endsWith('/') ? '' : '/'}${code}/`
    }

    //创建模块的Http实例
    const http = new Http(httpOptions)

    for (let p in api) {
      $api[p] = { ...crud(http, p), ...api[p](http) }
    }

    //绑定到mkh全局对象的$api属性上，方便访问
    mkh.api[code] = $api
  })
}
