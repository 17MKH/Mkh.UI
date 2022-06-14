<template>
  <div class="m-toolbar_item" @click="show = true">
    <m-icon name="skin"></m-icon>
  </div>
  <m-drawer v-model="show" :loading="loading" custom-class="m-skin-toggle" :title="$t('mkh.skin_switch')" icon="toggle" width="600px" no-padding no-scrollbar>
    <m-flex-col>
      <m-flex-auto class="m-skin-toggle_wrapper">
        <m-scrollbar>
          <div v-for="skin in $mkh.skins" :key="skin.code" :class="['m-skin-toggle_item', skin.code === model.code ? 'active' : '']" @click="toggleSkin(skin)">
            <div class="preview">
              <img :src="skin.preview" />
              <div class="check"><m-icon name="check" /></div>
            </div>
            <p class="name">{{ skin.name }}</p>
          </div>
        </m-scrollbar>
      </m-flex-auto>
      <m-flex-fixed height="260px" style="border-left: 1px solid #ebeef5">
        <el-divider content-position="center">{{ $t('mkh.font_size') }}</el-divider>
        <div class="m-skin-toggle_sizes">
          <el-radio-group v-model="model.size">
            <el-radio label="large" size="large" border>{{ $t('mkh.large') }}</el-radio>
            <el-radio label="default" size="default" border>{{ $t('mkh.default') }}</el-radio>
            <el-radio label="small" size="small" border>{{ $t('mkh.small') }}</el-radio>
          </el-radio-group>
        </div>
        <el-divider content-position="center">{{ $t('mkh.theme') }}</el-divider>
        <div class="m-skin-toggle_themes">
          <div v-for="theme in current.themes" :key="theme.name" :class="['m-skin-toggle_theme', theme.name === model.theme ? 'active' : '']" @click="toggleTheme(theme)">
            <div :style="{ backgroundColor: theme.color }"></div>
            <p>{{ theme.name }}</p>
          </div>
        </div>
      </m-flex-fixed>
    </m-flex-col>
    <template #footer>
      <m-button type="success" @click="save">{{ $t('mkh.ok') }}</m-button>
      <m-button type="info" @click="show = false">{{ $t('mkh.cancel') }}</m-button>
    </template>
  </m-drawer>
</template>
<script>
import { reactive, ref } from 'vue'
import useMessage from '../../composables/message'
export default {
  setup() {
    const { store, $t } = mkh

    const show = ref(false)
    const loading = ref(false)
    const message = useMessage()

    const skin = store.state.app.profile.skin
    const actions = store.state.app.config.actions
    const current = ref(mkh.skins.find(m => m.code === skin.code))

    const model = reactive({
      name: skin.name,
      code: skin.code,
      theme: skin.theme,
      size: skin.size || 'default',
    })

    const toggleSkin = skin => {
      const { name, code, themes } = skin
      if (code === current.value.code) return

      model.name = name
      model.code = code
      model.size = 'default'

      if (themes && themes.length > 0) {
        model.theme = themes[0].name
      }

      current.value = skin
    }

    const toggleTheme = theme => {
      model.theme = theme.name
    }

    const save = () => {
      store.commit('app/profile/toggleSkin', model)

      //如果配置了切换服务接口，则调用
      const { toggleSkin: saveSkin } = actions
      if (saveSkin) {
        loading.value = true
        saveSkin(model)
          .then(() => {
            message.success($t('mkh.skin_switch_success'))
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        message.success($t('mkh.skin_switch_success'))
      }
    }

    return {
      show,
      current,
      model,
      loading,
      toggleSkin,
      toggleTheme,
      save,
    }
  },
}
</script>
