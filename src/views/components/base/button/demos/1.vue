<template>
  <el-row>
    <p>{{ $t('') }}</p>
    <m-button text="默认按钮"></m-button>
    <m-button text="主要按钮" type="primary"></m-button>
    <m-button text="成功按钮" type="success"></m-button>
    <m-button text="信息按钮" type="info"></m-button>
    <m-button text="警告按钮" type="warning"></m-button>
    <m-button text="危险按钮" type="danger"></m-button>
    <el-button type="primary" icon="m-checked" circle></el-button>
    <el-icon><m-checked></m-checked></el-icon>
  </el-row>
</template>
