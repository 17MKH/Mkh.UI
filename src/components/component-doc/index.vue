<template>
  <m-container class="m-doc-component" scrollbar>
    <el-backtop target=".m-container_main .el-scrollbar__wrap"> </el-backtop>
    <div ref="componentRef" class="m-doc-component_wrapper">
      <h1 class="m-doc-component_title">{{ title }}</h1>
      <div class="m-doc-component_content">
        <slot></slot>
      </div>
      <section v-if="props" class="m-padding-lr-15">
        <h3 class="title">属性(Attributes)</h3>
        <el-table class="m-doc-component_table" :data="props" border>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="desc" label="说明"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="values" label="可选值"></el-table-column>
          <el-table-column prop="default" label="默认值"></el-table-column>
        </el-table>
      </section>
      <section v-if="events" class="m-padding-lr-15">
        <h3 class="title">事件(Events)</h3>
        <el-table class="m-doc-component_table" :data="events" border>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="desc" label="说明"></el-table-column>
          <el-table-column prop="params" label="参数"></el-table-column>
        </el-table>
      </section>
      <section v-if="methods" class="m-padding-lr-15">
        <h3 class="title">方法(Methods)</h3>
        <el-table class="m-doc-component_table" :data="methods" border>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="desc" label="说明"></el-table-column>
          <el-table-column prop="params" label="参数"></el-table-column>
        </el-table>
      </section>
      <section v-if="slots" class="m-padding-lr-15">
        <h3 class="title">插槽(Slots)</h3>
        <el-table class="m-doc-component_table" :data="slots" border>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="desc" label="说明"></el-table-column>
          <el-table-column prop="params" label="参数"></el-table-column>
        </el-table>
      </section>
      <transition name="el-zoom-in-bottom">
        <section v-show="catalog.length > 0" class="m-doc-component_catalog">
          <p>目录</p>
          <a v-for="(item, i) in catalog" :key="i" @click.prevent="scrollIntoView(i)">
            <span>{{ item }}</span>
          </a>
        </section>
      </transition>
    </div>
  </m-container>
</template>
<script>
import { nextTick, onMounted, ref } from 'vue'
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    props: {
      type: Array,
      default: null,
    },
    events: {
      type: Array,
      default: null,
    },
    methods: {
      type: Array,
      default: null,
    },
    slots: {
      type: Array,
      default: null,
    },
  },
  setup() {
    const componentRef = ref()
    const catalog = ref([])

    const scrollIntoView = i => {
      componentRef.value.querySelector('#title-' + i).scrollIntoView()
    }

    onMounted(() => {
      nextTick(() => {
        componentRef.value.querySelectorAll('.title').forEach((element, i) => {
          catalog.value.push(element.innerText)
          element.setAttribute('id', 'title-' + i)
        })
      })
    })
    return { componentRef, catalog, scrollIntoView }
  },
}
</script>
<style lang="scss">
.m-doc-component {
  &_wrapper {
    padding: 10px 200px 10px 10px;
    background-color: #fff;
  }

  &_title {
    padding: 15px 15px 0 15px;
    font-size: 28px;
    font-weight: 400;
    color: #1f2f3d;
  }

  h3 {
    margin: 40px 0 20px;
    font-weight: 700;
    font-size: 26px;
    color: #1f2f3d;
  }

  &_table {
    height: 100%;
    width: 100%;
  }

  &_catalog {
    position: absolute;
    padding: 10px;
    right: 15px;
    top: 10px;
    border: 1px solid rgb(220, 223, 230);
    border-radius: 3px;
    min-width: 180px;

    p {
      margin-bottom: 10px;
      font-size: 20px;
    }

    a {
      display: block;
      margin: 5px 2px;
      font-size: 11px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #909399;
      cursor: pointer;
      &:hover {
        color: #409eff;
        text-decoration: underline;
      }
    }
  }
}
</style>
