<template>
  <div class="m-layout-left" :style="isCollapse? 'width:0':''">
    <div class="m-layout-left_wrap">
      <div class="m-layout-logo">
        <div class="m-layout-logo_wrap">
          <m-icon name="home" size="32px"></m-icon>
          <div class="title" style="color: var(--el-color-primary)">系统首页</div>
        </div>
      </div>
      <div class="m-layout-nav" :style="isCollapse? 'width:0':''">
        <div class="btn" @click="toggleCollapse">
          <m-icon :name="isCollapse?'fold-r':'fold-l'" size="12px"></m-icon>
        </div>
        <m-menu :collapse="isCollapse"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import {useStore} from 'vuex'
const store =useStore()
const  isCollapse  =computed(()=>store.state.skin.blue.menuIsCollapse)    

const toggleCollapse = () => {
  store.commit('skin/blue/toggleMenuCollapse')
}
</script>
