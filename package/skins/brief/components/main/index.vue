<template>
  <div class="m-main">
    <m-menu :collapse="store.menuIsCollapse" />
    <div class="m-content">
      <div class="m-content_wrapper">
        <router-view v-slot="{ Component }">
          <transition name="m-animate-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useStore } from '../../store'
  const store = useStore()
</script>
