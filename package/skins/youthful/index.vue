<template>
  <div class="m-wrapper">
    <header>
      <span>青春皮肤(youthful)--顶部导航栏</span>
      <el-button type="primary" @click="$store.commit('app/skins/toggle', { name: '简约', code: 'brief' })">切换皮肤</el-button>
    </header>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
