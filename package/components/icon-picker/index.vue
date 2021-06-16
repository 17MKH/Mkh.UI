<template>
  <section class="m-icon-picker">
    <div class="m-icon-picker_input">
      <el-input v-model="icon" :placeholder="placeholder || $t('mkh.iconPicker.placeholder')">
        <template #prepend>
          <m-icon :name="icon" />
        </template>
      </el-input>
    </div>
    <div class="m-icon-picker_button">
      <m-button icon="search" @click="showPannel = true" />
    </div>
    <panel v-model="showPannel" @success="handleSelect" />
  </section>
</template>
<script>
import { computed, inject, ref } from 'vue'
import Panel from './panel.vue'
export default {
  name: 'IconPicker',
  components: { Panel },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const resetMethods = inject('resetMethods')
    const icon = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        emit('update:modelValue', val)
      },
    })

    const showPannel = ref(false)

    const handleSelect = val => {
      icon.value = val
    }

    const reset = () => {
      icon.value = ''
    }

    resetMethods.value.push(reset)

    return {
      icon,
      showPannel,
      handleSelect,
      reset,
    }
  },
}
</script>
