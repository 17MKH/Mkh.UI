/**
 * 分页查询结果
 */
export interface PagingQueryResult<T> {
  /**
   * 总数量
   */
  total: number
  /**
   * 数据集
   */
  rows: T[]
  /**
   * 扩展数据
   */
  data: object
}
