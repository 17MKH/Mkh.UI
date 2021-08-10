<template>
  <div class="m-main">
    <m-menu :collapse="$store.state.skin.brief.menuIsCollapse" />
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
