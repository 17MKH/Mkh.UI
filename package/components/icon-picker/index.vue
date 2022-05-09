<template>
  <section class="m-icon-picker">
    <div class="m-icon-picker_input">
      <el-input v-model="icon" :placeholder="placeholder || $t('mkh.icon_picker_placeholder')">
        <template #prepend>
          <m-icon :name="icon" />
        </template>
        <template #append>
          <m-button type="primary" icon="search" @click="showPannel = true" />
        </template>
      </el-input>
    </div>
    <panel v-model="showPannel" @success="handleSelect" />
  </section>
</template>
<script>
import { computed, inject, ref } from 'vue'
import Panel from './panel.vue'
export default {
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
    const resetMethods = inject('resetMethods', [])
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

    resetMethods.push(reset)

    return {
      icon,
      showPannel,
      handleSelect,
      reset,
    }
  },
}
</script>
