import { computed } from 'vue'

export default function (props: { modelValue: boolean }, emit: { (e: 'update:modelValue', value: boolean): void }) {
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

const test = (props: { name: string }) => {
  console.log(props.name)
}

const props = { name: '111', type: 222, store: {} }

test(props)
