<template>
  <div class="m-toolbar_item" @click="show = true">
    <m-icon name="skin"></m-icon>
  </div>
  <m-dialog v-model="show" custom-class="m-skin-toggle" title="皮肤切换" icon="toggle" width="910px" height="80%" no-padding no-scrollbar>
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
        <el-divider content-position="center">字号</el-divider>
        <div class="m-skin-toggle_sizes">
          <el-radio-group v-model="model.size">
            <el-radio label="" border>默认</el-radio>
            <el-radio label="medium" size="medium" border>中等</el-radio>
            <el-radio label="small" size="small" border>小号</el-radio>
            <el-radio label="mini" size="mini" border>迷你</el-radio>
          </el-radio-group>
        </div>
        <el-divider content-position="center">主题</el-divider>
        <div class="m-skin-toggle_themes">
          <div v-for="theme in current.themes" :key="theme.name" :class="['m-skin-toggle_theme', theme.name === model.theme ? 'active' : '']" @click="toggleTheme(theme)">
            <div :style="{ backgroundColor: theme.color }"></div>
            <p>{{ theme.name }}</p>
          </div>
        </div>
      </m-flex-fixed>
    </m-flex-col>
    <template #footer>
      <m-button type="success" text="确认" @click="save"></m-button>
      <m-button type="info" text="取消" @click="show = false"></m-button>
    </template>
  </m-dialog>
</template>
<script>
import { reactive, ref } from 'vue'
import { store } from '../../store'
export default {
  name: 'ToolbarSkin',
  setup() {
    const show = ref(false)
    const current = ref(mkh.skins.find(m => m.code === store.state.app.profile.skin.code))
    const model = reactive({
      name: '',
      code: '',
      theme: '',
      size: '',
    })

    const toggleSkin = skin => {
      const { name, code, size, themes } = skin
      model.name = name
      model.code = code
      model.size = size

      if (themes && themes.length > 0) {
        model.theme = themes[0].name
      }

      current.value = skin
    }

    if (!current.value) {
      current.value = mkh.skins[0]
    }

    toggleSkin(current.value)

    const toggleTheme = theme => {
      model.theme = theme.name
    }

    const save = () => {
      store.commit('app/profile/toggleSkin', model)

      //如果配置了切换服务接口，则调用
      if (mkh.config.action.toggleSkin) {
        mkh.config.action.toggleSkin(model)
      }
    }

    return {
      show,
      current,
      model,
      toggleSkin,
      toggleTheme,
      save,
    }
  },
}
</script>
