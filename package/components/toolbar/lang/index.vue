<template>
  <el-dropdown @command="handleCommand">
    <div class="m-toolbar_item">
      <m-icon name="language"></m-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="m-toolbar_item_lang">
        <el-dropdown-item command="zh-cn">
          <div :class="'zh-cn' === locale ? 'is-active' : ''">简体中文</div>
        </el-dropdown-item>
        <el-dropdown-item command="en">
          <div :class="'en' === locale ? 'is-active' : ''">English</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
  import db from '@/utils/db'
  import { useI18n } from '@/composables/i18n'
  import type { locales } from '@/locales'

  const { locale } = useI18n()

  const handleCommand = (command: locales) => {
    locale.value = command
    db.set('lang', command)
  }
</script>
