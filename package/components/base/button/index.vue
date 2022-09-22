<template>
  <el-button
    v-if="$slots.default"
    v-m-has="code"
    class="m-button"
    :type="type"
    :text="text"
    :link="link"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="handleClick"
  >
    <template v-if="!loading && icon" #icon>
      <svg aria-hidden="true">
        <use :xlink:href="`#m-${icon}`" />
      </svg>
    </template>
    <slot> </slot>
  </el-button>
  <el-button
    v-else
    v-m-has="code"
    class="m-button"
    :type="type"
    :text="text"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="handleClick"
  >
    <template v-if="!loading && icon" #icon>
      <svg aria-hidden="true">
        <use :xlink:href="`#m-${icon}`" />
      </svg>
    </template>
  </el-button>
</template>
<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import propsDefinition from './props'

  const props = defineProps(propsDefinition)
  const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>()

  const router = useRouter()

  const handleClick = (event: MouseEvent) => {
    if (props.to) {
      router.push(props.to)
    } else {
      emit('click', event)
    }
  }
</script>
