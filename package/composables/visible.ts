import { computed, ComputedRef, Ref, WritableComputedRef } from 'vue'

/**
 * 显示隐藏事件触发器
 */
export interface VisibleEmit {
  (e: 'update:modelValue', value: boolean): void
}

export interface VisibleObject {
  visible: WritableComputedRef<boolean>
  open: () => void
  close: () => void
}

/**
 * 使用显示隐藏
 * @param props - 属性
 * @param emit - 事件触发器
 */
export const useVisible = function (props: { modelValue: boolean }, emit: VisibleEmit): VisibleObject {
  const visible = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const open = () => {
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  return {
    visible,
    open,
    close,
  }
}
