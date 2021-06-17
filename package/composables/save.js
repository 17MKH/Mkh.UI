//通用新增、编辑、预览功能
export default function (props) {
  //是否新增模式
  const isAdd = computed(() => {
    const { id } = props
    return id === null || id === '' || typeof id === 'undefined'
  })
}

export const widthProps = {
  //id不为null，表示编辑或预览，反之为新增
  id: {
    type: [String, Number],
    default: null,
  },
  /**是否只读 */
  readonly: {
    type: Boolean,
    default: false,
  },
}
