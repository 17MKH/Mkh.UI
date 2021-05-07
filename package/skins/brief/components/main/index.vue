<template>
  <div class="mu-main">
    <mu-menu />
    <div class="mu-content">
      <div class="mu-content_wrapper">
        <router-view v-slot="{ Component }">
          <transition name="mu-animate-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
