<template>
  <m-flex-row class="m-header">
    <m-flex-auto>
      <ul class="m-header_left">
        <li>
          <img class="m-header_logo" :src="site.logo" />
        </li>
        <li>
          <span class="m-header_title">{{ title }}</span>
        </li>
      </ul>
    </m-flex-auto>
    <m-flex-fixed>
      <!--账户信息-->
      <div class="m-header_userinfo">
        <el-dropdown trigger="click" @command="handleCommand">
          <a class="m-header_userinfo_avatar" href="javascript:void(0);">
            <img :src="profileStore.avatar || './assets/mkh/avatar.png'" />
          </a>
          <template #dropdown>
            <el-dropdown-menu class="m-header_userinfo_dropdown">
              <el-dropdown-item command="profile">
                <m-icon name="user"></m-icon>
                {{ t('mkh.profile') }}
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <m-icon name="sign-out"></m-icon>
                {{ t('mkh.logout') }}
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
<script setup lang="ts">
  import { useMessage } from '@/composables'
  import { useComponentStore, useConfigStore, useProfileStore, useTokenStore } from '@/store'
  import { useI18n } from '@/composables/i18n'
  import { useRouter } from 'vue-router'
  import { computed } from 'vue'

  const componentStore = useComponentStore()
  const configStore = useConfigStore()
  const profileStore = useProfileStore()
  const tokenStore = useTokenStore()

  const { t, locale } = useI18n()

  const router = useRouter()

  const message = useMessage()
  const site = configStore.site
  const toolbars = componentStore.toolbars.filter((m) => m.show).sort((x, y) => x.sort - y.sort)

  const title = computed(() => {
    return typeof site.title === 'object' ? site.title[locale.value] : site.title
  })

  const handleCommand = (cmd: string) => {
    switch (cmd) {
      case 'profile':
        if (site.profilePage) {
          router.push(site.profilePage)
        }
        break
      case 'logout':
        message
          .confirm(t('mkh.logout_confirm'), t('mkh.warning'), {
            confirmButtonText: t('mkh.ok'),
            cancelButtonText: t('mkh.cancel'),
          })
          .then(() => {
            tokenStore.clear()

            router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
          })
          .catch(() => {})
        break
    }
  }
</script>
