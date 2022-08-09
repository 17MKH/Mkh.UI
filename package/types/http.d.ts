import type { AxiosInstance, AxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    /** 表示不显示错误信息，有时候希望在业务中根据返回的code自行进行信息提醒时可用 */
    notShowErrorMsg: boolean
  }
}

/** 用于发起Http请求的客户端 */
export interface HttpClient {
  /** axios实例 */
  readonly axios: AxiosInstance
  /**
   * 发起 POST 请求
   * @param url 请求地址
   * @param params  请求参数
   * @param config  请求配置
   */
  post(url: string, params?: object, config?: AxiosRequestConfig): any
  /**
   * 发起 GET 请求
   * @param url 请求地址
   * @param params  请求参数
   * @param config  请求配置
   */
  get(url: string, params?: object, config?: AxiosRequestConfig): any
  /**
   * 发起 DELETE 请求
   * @param url 请求地址
   * @param params  请求参数
   * @param config  请求配置
   */
  delete(url: string, params?: object, config?: AxiosRequestConfig): any
  /**
   * 发起 PUT 请求
   * @param url 请求地址
   * @param params  请求参数
   * @param config  请求配置
   */
  put(url: string, params?: object, config?: AxiosRequestConfig): any
  /**
   * 文件下载
   * @param url 请求地址
   * @param params  请求参数
   * @param config  请求配置
   */
  download(url: string, params?: object, config?: AxiosRequestConfig): any
  /**
   * 文件预览
   * @param url 请求地址
   * @param params  请求参数
   * @param config  请求配置
   */
  preview(url: string, params?: object, config?: AxiosRequestConfig): any
  /**
   * 获取完整URL
   * @param url 要拼接的url地址
   */
  getUrl(url: string): string
}
