<template>
  <mu-flex-row mode="right" class="mu-header">
    <mu-flex-left>
      <ul class="mu-header_left">
        <li>
          <img class="mu-header_logo" :src="logo" />
        </li>
        <li>
          <span class="mu-header_title">{{ title }}</span>
        </li>
      </ul>
    </mu-flex-left>
    <mu-flex-right>
      <!--账户信息-->
      <div class="mu-header_userinfo">
        <el-dropdown trigger="click" @command="handleCommand">
          <a class="mu-header_userinfo_avatar" href="javascript:void(0);">
            <img :src="account.avatar" />
          </a>
          <template #dropdown>
            <el-dropdown-menu class="mu-header_userinfo_dropdown">
              <el-dropdown-item command="userinfo">
                <mu-icon name="user"></mu-icon>
                账户信息
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <mu-icon name="sign-out"></mu-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!--工具栏-->
      <div class="mu-header_toolbar">
        <!--多语言-->
        <mu-toolbar-lang />
        <!--皮肤-->
        <mu-toolbar-skin />
        <!--全屏-->
        <mu-toolbar-fullscreen />
      </div>
    </mu-flex-right>
  </mu-flex-row>
</template>
<script>
import { computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const { $confirm } = getCurrentInstance().proxy
    const store = useStore()
    const { title, logo } = MkhUI.config.site
    const account = computed(() => store.state.app.account)

    const handleCommand = cmd => {
      switch (cmd) {
        case 'logout':
          $confirm('您确定要退出系统吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
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
      handleCommand,
    }
  },
}
</script>
