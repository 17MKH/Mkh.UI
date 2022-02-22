import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import { i18n } from '../locales'

function Http(options) {
  let _axios = axios.create(options)

  _axios.defaults.headers.post['Content-Type'] = 'application/json'
  _axios.defaults.headers.put['Content-Type'] = 'application/json'

  //请求前拦截器，附加令牌
  _axios.interceptors.request.use(
    config => {
      const { accessToken } = mkh.store.state.app.token
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
      if (config.responseType && config.responseType === 'blob') {
        const url = window.URL.createObjectURL(response.data)

        //预览模式直接返回
        if (response.config.headers['mkh_preview']) return url

        let fileName = ''
        let cd = response.headers['content-disposition']
        if (cd) {
          fileName = decodeURI(cd.split("''")[1])
        }
        //如果文件名不存在，则使用时间戳
        if (!fileName) {
          fileName = dayjs().format('YYYYMMDDHHMMSSS')
        }

        //通过模拟a标签点击事件下载文件
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        return
      } else if (response.data.successful) {
        return response.data.data
      } else if (!response.data.successful && !config.noErrorMsg) {
        //noErrorMsg表示不显示错误信息，有时候希望在业务中根据返回的code自行进行信息提醒时可用
        ElMessage({
          type: 'error',
          title: i18n.global.t('mkh.http_error_title'),
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
        const { store } = mkh
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
            mkh.router.push('/error/403')
            break
          default:
            console.error(error.response.data.msg)
            mkh.router.push('/error/500')
            break
        }

        return
      }
      return Promise.reject(i18n.global.t('mkh.http_error'))
    }
  )

  this._axios = _axios
}

/**
 * POST请求
 * @param {*} url 相对路径
 * @param {*} params 参数
 * @param {*} config 自定义配置
 * @returns
 */
Http.prototype.post = function (url, params, config) {
  return this._axios.post(url, params, config)
}

/**
 * GET请求
 * @param {*} url 相对路径
 * @param {*} params 参数
 * @param {*} config 自定义配置
 * @returns
 */
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

/**
 * DELETE请求
 * @param {*} url 相对路径
 * @param {*} params 参数
 * @param {*} config 自定义配置
 * @returns
 */
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

/**
 * PUT请求
 * @param {*} url 相对路径
 * @param {*} params 参数
 * @param {*} config 自定义配置
 * @returns
 */
Http.prototype.put = function (url, params, config) {
  return this._axios.put(url, params, config)
}

/**
 * 文件下载
 * @param {*} url 相对路径
 * @param {*} params 参数
 * @param {*} config 自定义配置
 * @returns
 */
Http.prototype.download = function (url, params, config) {
  return this._axios.post(url, params, Object.assign({ responseType: 'blob' }, config))
}

/**
 * 文件预览
 * @param {*} url 相对路径
 * @param {*} params 参数
 * @param {*} config 自定义配置
 * @returns
 */
Http.prototype.preview = function (url, params, config) {
  const config_ = Object.assign({ responseType: 'blob', headers: { mkh_preview: true } }, config, {
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

/**
 * 获取完整接口地址
 * @param {*} url 相对路径
 * @returns
 */
Http.prototype.getUrl = function (url) {
  return this._axios.defaults.baseURL + url
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
