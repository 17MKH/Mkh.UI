<template>
  <el-config-provider :locale="$i18n.messages[$i18n.locale]" :size="size">
    <!--框架内显示-->
    <component :is="skinComponent" v-if="$route.meta.inFrame"></component>
    <!--不在框架中显示-->
    <router-view v-else />
  </el-config-provider>
</template>
<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue'
  import useSize from '@/composables/size'
  import { useProfileStore } from '@/store'

  const { size } = useSize()

  const skinComponent = ref('')
  const emit = defineEmits(['change', 'delete'])
  const profileStore = useProfileStore()
  const skin = computed(() => profileStore.skin)

  watchEffect(() => {
    skinComponent.value = `m-skin-${skin.value.code.toLowerCase()}`
    document.body.className = `${skinComponent.value} theme-${skin.value.theme}`
  })
</script>
