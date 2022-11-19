import type { BootstrapOptions, HttpClient } from '@/types'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import qs from 'qs'
import dayjs from 'dayjs'
import { ElNotification } from 'element-plus'
import { i18n } from '@/locales'
import { useTokenStore } from '../store/modules/token'
import { useConfigStore } from '../store/modules/config'
import { router } from '@/router'

export class Http implements HttpClient {
  axios: AxiosInstance

  constructor(options) {
    const _axios = axios.create(options)

    _axios.defaults.headers.post['Content-Type'] = 'application/json'
    _axios.defaults.headers.put['Content-Type'] = 'application/json'

    //请求前拦截器，附加令牌
    _axios.interceptors.request.use(
      (config) => {
        const tokenStore = useTokenStore()
        if (tokenStore.accessToken && config.headers) {
          config.headers.Authorization = 'Bearer ' + tokenStore.accessToken
        }
        return config
      },
      (error) => {
        console.error(error)
        return Promise.reject(error)
      }
    )

    // 响应前拦截器
    _axios.interceptors.response.use(
      (response) => {
        const { config } = response
        if (config.responseType && config.responseType === 'blob') {
          const url = window.URL.createObjectURL(response.data)

          //预览模式直接返回
          if (response.config.headers && response.config.headers['mkh_preview']) return url

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
        } else if (!response.data.successful && !config.notShowErrorMsg) {
          //noErrorMsg表示不显示错误信息，有时候希望在业务中根据返回的code自行进行信息提醒时可用
          ElNotification({
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
      (error) => {
        if (error && error.response) {
          switch (error.response.status) {
            case 401:
              const tokenStore = useTokenStore()
              const configStore = useConfigStore()
              const refreshTokenAction = configStore.systemActions.refreshToken
              if (tokenStore.refreshToken && refreshTokenAction) {
                //尝试刷新令牌
                return refreshTokenAction({
                  accountId: tokenStore.accountId,
                  platform: 0,
                  refreshToken: tokenStore.refreshToken,
                })
                  .then((data) => {
                    tokenStore.set(data)
                    //重新发一起一次上次的的请求
                    error.config.headers.Authorization = 'Bearer ' + data.accessToken
                    return _axios.request(error.config)
                  })
                  .catch(() => {
                    tokenStore.clear()
                    router.push({ name: 'login' })
                  })
              } else {
                tokenStore.clear()
                router.push({ name: 'login' })
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
        return Promise.reject(i18n.global.t('mkh.http_error'))
      }
    )

    this.axios = _axios
  }

  post<T>(url: string, params?: object, config?: AxiosRequestConfig) {
    return this.axios.post(url, params, config) as Promise<T>
  }

  get<T>(url: string, params?: object, config?: AxiosRequestConfig) {
    const config_ = Object.assign({}, config, {
      // 参数
      params,
      // 修改参数序列化方法
      paramsSerializer: {
        serialize: (p) => {
          // 使用逗号分隔参数
          return qs.stringify(p, {
            allowDots: true,
          })
        },
      },
    })
    return this.axios.get(url, config_) as Promise<T>
  }

  delete<T>(url: string, params?: object, config?: AxiosRequestConfig) {
    const config_ = Object.assign({}, config, {
      // 参数
      params,
      // 修改参数序列化方法
      paramsSerializer: {
        serialize: (p) => {
          // 使用逗号分隔参数
          return qs.stringify(p, {
            allowDots: true,
          })
        },
      },
    })
    return this.axios.delete(url, config_) as Promise<T>
  }

  put<T>(url: string, params?: object, config?: AxiosRequestConfig) {
    return this.axios.put(url, params, config) as Promise<T>
  }

  download(url: string, params?: object, config?: AxiosRequestConfig) {
    return this.axios.post(url, params, Object.assign({ responseType: 'blob' }, config)) as Promise<void>
  }

  preview(url: string, params?: object, config?: AxiosRequestConfig) {
    const config_ = Object.assign({ responseType: 'blob', headers: { mkh_preview: true } }, config, {
      // 参数
      params,
      // 修改参数序列化方法
      paramsSerializer: {
        serialize: (p) => {
          // 使用逗号分隔参数
          return qs.stringify(p, {
            allowDots: true,
          })
        },
      },
    })
    return this.axios.get(url, config_) as Promise<void>
  }

  getUrl(url: string): string {
    return this.axios.defaults.baseURL + url
  }
}

/**
 * 获取指定实体的通用增删改查方法
 * @param http - 当前模块的HttpClient实例
 * @param entityName - 实体名称
 */
export const crud = (http: HttpClient, entityName: string) => {
  return {
    /**
     * 分页查询列表
     */
    query(model) {
      return http.get(`${entityName}/query`, model)
    },
    /**
     * 新增
     */
    add(params) {
      return http.post(`${entityName}/add`, params)
    },
    /**
     * 删除
     */
    remove(id) {
      return http.delete(`${entityName}/delete`, { id })
    },
    /**
     * 编辑
     */
    edit(id) {
      return http.get(`${entityName}/edit`, { id })
    },
    /**
     * 更新
     */
    update(params) {
      return http.post(`${entityName}/update`, params)
    },
  }
}

/**
 * 为模块创建HTTP实例
 * @param options - 应用启动配置项
 * @param code - 模块编码
 * @returns 当前模块的HttpClient实例
 */
export const createHttp = (options: BootstrapOptions, code: string): HttpClient => {
  if (options.http) {
    const http = options.http
    let httpOptions = Object.assign({}, http.global)

    if (http.modules && http.modules[code]) {
      httpOptions = http.modules[code]
    }
    if (httpOptions.baseURL) {
      httpOptions.baseURL = `${httpOptions.baseURL}${httpOptions.baseURL.endsWith('/') ? '' : '/'}${code}/`
    }
    //创建模块的Http实例
    return new Http(httpOptions)
  }

  return new Http({})
}
