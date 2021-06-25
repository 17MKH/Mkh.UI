<template>
  <div class="m-doc-flex-demo1">
    <m-flex-row>
      <m-flex-fixed width="200px">左侧固定 </m-flex-fixed>
      <m-flex-auto>右侧自适应 </m-flex-auto>
    </m-flex-row>
  </div>
  <div class="m-doc-flex-demo2">
    <m-flex-row>
      <m-flex-auto>左侧自适应 </m-flex-auto>
      <m-flex-fixed width="200px">右侧固定 </m-flex-fixed>
    </m-flex-row>
  </div>
  <div class="m-doc-flex-demo3">
    <m-flex-column>
      <m-flex-fixed height="50px">顶部固定 </m-flex-fixed>
      <m-flex-auto>底部自适应 </m-flex-auto>
    </m-flex-column>
  </div>
  <div class="m-doc-flex-demo4">
    <m-flex-column>
      <m-flex-auto>顶部自适应 </m-flex-auto>
      <m-flex-fixed height="50px">底部固定 </m-flex-fixed>
    </m-flex-column>
  </div>
</template>
<style lang="scss">
.m-doc-flex-demo1 {
  margin-bottom: 20px;
  height: 200px;

  .m-flex-fixed {
    background-color: #ccc;
    line-height: 200px;
    text-align: center;
  }
  .m-flex-auto {
    background-color: #eee;
    line-height: 200px;
    text-align: center;
  }
}
.m-doc-flex-demo2 {
  margin-bottom: 20px;
  height: 200px;

  .m-flex-auto {
    background-color: #ccc;
    line-height: 200px;
    text-align: center;
  }

  .m-flex-fixed {
    background-color: #eee;
    line-height: 200px;
    text-align: center;
  }
}
.m-doc-flex-demo3 {
  margin-bottom: 20px;
  height: 200px;

  .m-flex-fixed {
    background-color: #ccc;
    line-height: 50px;
    text-align: center;
  }

  .m-flex-auto {
    background-color: #eee;
    line-height: 150px;
    text-align: center;
  }
}
.m-doc-flex-demo4 {
  margin-bottom: 20px;
  height: 200px;

  .m-flex-fixed {
    background-color: #eee;
    line-height: 150px;
    text-align: center;
  }

  .m-flex-auto {
    background-color: #ccc;
    line-height: 50px;
    text-align: center;
  }
}
</style>
