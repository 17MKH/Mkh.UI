<template>
  <m-flex-row class="m-header">
    <m-flex-auto>
      <ul class="m-header_left">
        <li>
          <img class="m-header_logo" :src="site.logo" />
        </li>
        <li>
          <span class="m-header_title">{{ typeof site.title === 'object' ? site.title[$i18n.locale] : site.title }}</span>
        </li>
      </ul>
    </m-flex-auto>
    <m-flex-fixed>
      <!--账户信息-->
      <div class="m-header_userinfo">
        <el-dropdown trigger="click" @command="handleCommand">
          <a class="m-header_userinfo_avatar" href="javascript:void(0);">
            <img :src="profile.avatar || './assets/mkh/avatar.png'" />
          </a>
          <template #dropdown>
            <el-dropdown-menu class="m-header_userinfo_dropdown">
              <el-dropdown-item command="profile">
                <m-icon name="user"></m-icon>
                {{ $t('mkh.profile') }}
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <m-icon name="sign-out"></m-icon>
                {{ $t('mkh.logout') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!--工具栏-->
      <div class="m-header_toolbar">
        <template v-for="item in toolbars" :key="item.code">
          <component :is="`m-toolbar-${item.code}`"></component>
        </template>
      </div>
    </m-flex-fixed>
  </m-flex-row>
</template>
<script>
import { computed, getCurrentInstance } from 'vue'
import { useMessage } from '../../../../composables'

export default {
  setup() {
    const cit = getCurrentInstance().proxy
    const { store, router } = mkh
    const message = useMessage()
    const site = store.state.app.config.site
    const profile = computed(() => store.state.app.profile)
    const toolbars = Object.values(mkh.toolbars)
      .filter(m => m.show)
      .sort((x, y) => x.sort - y.sort)

    const handleCommand = cmd => {
      const { $t } = cit
      switch (cmd) {
        case 'profile':
          if (site.profile) {
            router.push(site.profile)
          }
          break
        case 'logout':
          message
            .confirm($t('mkh.logout_confirm'), $t('mkh.warning'), {
              confirmButtonText: $t('mkh.ok'),
              cancelButtonText: $t('mkh.cancel'),
            })
            .then(() => {
              store.dispatch('app/token/logout')
            })
            .catch(() => {})
          break
      }
    }

    return {
      site,
      profile,
      toolbars,
      handleCommand,
    }
  },
}
</script>
