<template>
  <div class="m-layout-right_body">
    <div class="m-layout-right_body_wrap">
      <router-view v-slot="{ Component }">
        <m-page-transition :animate="animateCode" :direction="directCode">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.cache" :key="$route.name" />
          </keep-alive>
        </m-page-transition>
        <m-page-transition :animate="animateCode" :direction="directCode">
          <component :is="Component" v-if="!$route.meta.cache" :key="$route.name" />
        </m-page-transition>
      </router-view>
    </div>
  </div>
</template>
<script setup>
 import { computed } from 'vue'
import {useStore} from 'vuex'
 const store =useStore()
 const animateCode=computed(()=> store.state.app.profile.transition.animateCode) 
 const directCode=computed(()=> store.state.app.profile.transition.directCode) 
</script>
