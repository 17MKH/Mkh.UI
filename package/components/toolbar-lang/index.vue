<template>
  <el-dropdown @command="handleCommand">
    <div class="m-toolbar_item">
      <m-icon name="language"></m-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="m-toolbar_item_lang">
        <template v-for="locale in locales" :key="`locale-${locale.value}`">
          <el-dropdown-item :command="locale.value">
            <div :class="locale.value === $i18n.locale ? 'is-active' : ''">{{ locale.label }}</div>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { getCurrentInstance } from 'vue'
export default {
  setup() {
    const cit = getCurrentInstance().proxy

    const handleCommand = command => {
      cit.$i18n.locale = command
    }

    return {
      handleCommand,
      locales: mkh.locales,
    }
  },
}
</script>
