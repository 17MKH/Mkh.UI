<template>
  <el-config-provider :locale="messages[locale].el" :size="size">
    <!--框架内显示-->
    <component :is="skinComponent" v-if="$route.meta.inFrame"></component>
    <!--不在框架中显示-->
    <router-view v-else />
  </el-config-provider>
</template>
<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { useSize } from '@/composables'
  import { useI18n } from '@/composables/i18n'
  import { useProfileStore } from '@/store'
  const formRef = ref<FormInstance>()
  const size = useSize()

  const { messages, locale } = useI18n()

  const skinComponent = ref('')
  const profileStore = useProfileStore()
  const skin = computed(() => profileStore.skin)

  watchEffect(() => {
    skinComponent.value = `m-skin-${skin.value.code.toLowerCase()}`
    document.body.className = `${skinComponent.value} theme-${skin.value.theme}`
  })
</script>
