<template>
  <header :class="['m-head', size_]">
    <div v-if="icon" class="m-head_icon">
      <m-icon :name="icon" :style="{ color: iconColor || '' }" />
    </div>
    <div class="m-head_title">
      <slot>{{ title }}</slot>
    </div>
    <div v-if="$slots.toolbar" class="m-head_toolbar">
      <slot name="toolbar"></slot>
    </div>
  </header>
</template>
<script setup lang="ts">
  import propsDefinition from './props'
  import { useSize } from '@/composables'
  import { size } from '@/types'

  const props = defineProps(propsDefinition)

  const size_ = useSize(props as { size: size })
</script>
