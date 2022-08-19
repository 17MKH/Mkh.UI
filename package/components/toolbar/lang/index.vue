<template>
  <el-dropdown @command="handleCommand">
    <div class="m-toolbar_item">
      <m-icon name="language"></m-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="m-toolbar_item_lang">
        <template v-for="locale in availableLocales" :key="`locale-${locale}`">
          <el-dropdown-item :command="locale">
            <div :class="locale === $i18n.locale ? 'is-active' : ''">{{ locale }}</div>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
  import db from '@/utils/db'
  import { useI18n } from '@/composables/i18n'
  import type { locales } from '@/locales'

  const { locale, availableLocales } = useI18n()

  const handleCommand = (command: locales) => {
    locale.value = command
    db.set('lang', command)
  }
</script>
<style lang="scss">
  @import './index';
</style>
