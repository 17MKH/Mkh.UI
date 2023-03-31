import type { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * Http请求配置
 */
export interface HttpRequestConfig extends AxiosRequestConfig {
  /**
   * 表示axios拦截器不对当前请求做任何拦截处理，直接返回原始的HttpResponse
   */
  ignoreResponseInterceptor: boolean
}

/** 用于发起Http请求的客户端 */
export interface HttpClient {
  /** axios实例 */
  readonly axios: AxiosInstance
  /**
   * 发起 POST 请求
   * @param url - 请求地址
   * @param params - 请求参数
   * @param config - 请求配置
   */
  post<T>(url: string, params?: object, config?: HttpRequestConfig): Promise<T>
  /**
   * 发起 GET 请求
   * @param url - 请求地址
   * @param params - 请求参数
   * @param config - 请求配置
   */
  get<T>(url: string, params?: object, config?: HttpRequestConfig): Promise<T>
  /**
   * 发起 DELETE 请求
   * @param url - 请求地址
   * @param params - 请求参数
   * @param config - 请求配置
   */
  delete<T>(url: string, params?: object, config?: HttpRequestConfig): Promise<T>
  /**
   * 发起 PUT 请求
   * @param url - 请求地址
   * @param params - 请求参数
   * @param config - 请求配置
   */
  put<T>(url: string, params?: object, config?: HttpRequestConfig): Promise<T>
  /**
   * 文件下载
   * @param url - 请求地址
   * @param params - 请求参数
   * @param config - 请求配置
   */
  download(url: string, params?: object, config?: HttpRequestConfig): Promise<void>
  /**
   * 文件预览
   * @param url - 请求地址
   * @param params - 请求参数
   * @param config - 请求配置
   */
  preview(url: string, params?: object, config?: HttpRequestConfig): Promise<void>
  /**
   * 获取完整URL
   * @param url - 要拼接的url地址
   */
  getUrl(url: string): string
}

/**
 * 请求响应
 */
export interface HttpResponse<T> {
  /**
   * 请求是否成功
   */
  successful: Boolean
  /**
   * 业务码
   */
  code: string
  /**
   * 错误码
   */
  errorCode: string
  /**
   * 错误信息
   */
  msg: string
  /**
   * 时间戳
   */
  timestamp: number
  /**
   * 响应内容
   */
  data: T
}
