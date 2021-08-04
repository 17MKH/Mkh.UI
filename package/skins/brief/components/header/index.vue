<template>
  <m-flex-row class="m-header">
    <m-flex-auto>
      <ul class="m-header_left">
        <li>
          <img class="m-header_logo" :src="logo" />
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
            <img :src="account.avatar" />
          </a>
          <template #dropdown>
            <el-dropdown-menu class="m-header_userinfo_dropdown">
              <el-dropdown-item command="userinfo">
                <m-icon name="user"></m-icon>
                账户信息
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <m-icon name="sign-out"></m-icon>
                退出登录
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage } from '../../../../composables'

export default {
  setup() {
    const message = useMessage()
    const store = useStore()
    const { title, logo } = mkh.config.site
    const account = computed(() => store.state.app.profile)
    const toolbars = Object.values(mkh.toolbars)
      .filter(m => m.show)
      .sort((x, y) => x.sort - y.sort)

    const handleCommand = cmd => {
      switch (cmd) {
        case 'logout':
          message
            .confirm('您确定要退出系统吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            })
            .then(() => {
              store.dispatch('app/token/logout')
            })
            .catch(() => {})
          break
      }
    }
    return {
      title,
      logo,
      account,
      toolbars,
      handleCommand,
    }
  },
}
</script>
