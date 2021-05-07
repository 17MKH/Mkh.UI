<template>
  <div class="mu-toolbar_item">
    <el-dropdown @command="handleCommand">
      <mu-icon name="language"></mu-icon>
      <template #dropdown>
        <el-dropdown-menu class="mu-toolbar_item_lang">
          <template v-for="locale in locales" :key="`locale-${locale.value}`">
            <el-dropdown-item :class="locale.value === $i18n.locale ? 'is-active' : ''" :command="locale.value">{{ locale.label }}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'ToolbarLang',
  setup() {
    const cit = getCurrentInstance().proxy

    const handleCommand = command => {
      cit.$i18n.locale = command
    }

    return {
      handleCommand,
      locales: MkhUI.locales,
    }
  },
}
</script>
