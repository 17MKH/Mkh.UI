<template>
  <div class="m-doc-flex-demo1">
    <m-flex-row>
      <m-flex-left width="200px">左侧固定 </m-flex-left>
      <m-flex-right>右侧自适应 </m-flex-right>
    </m-flex-row>
  </div>
  <div class="m-doc-flex-demo2">
    <m-flex-row mode="right">
      <m-flex-left>左侧自适应 </m-flex-left>
      <m-flex-right width="200px">右侧固定 </m-flex-right>
    </m-flex-row>
  </div>
  <div class="m-doc-flex-demo3">
    <m-flex-column>
      <m-flex-top height="50px">顶部固定 </m-flex-top>
      <m-flex-bottom>底部自适应 </m-flex-bottom>
    </m-flex-column>
  </div>
  <div class="m-doc-flex-demo4">
    <m-flex-column mode="bottom">
      <m-flex-top>顶部自适应 </m-flex-top>
      <m-flex-bottom height="50px">底部固定 </m-flex-bottom>
    </m-flex-column>
  </div>
</template>
<style lang="scss">
.m-doc-flex-demo1 {
  margin-bottom: 20px;
  height: 200px;

  .m-flex-left {
    background-color: #ccc;
    line-height: 200px;
    text-align: center;
  }
  .m-flex-right {
    background-color: #eee;
    line-height: 200px;
    text-align: center;
  }
}
.m-doc-flex-demo2 {
  margin-bottom: 20px;
  height: 200px;

  .m-flex-left {
    background-color: #ccc;
    line-height: 200px;
    text-align: center;
  }

  .m-flex-right {
    background-color: #eee;
    line-height: 200px;
    text-align: center;
  }
}
.m-doc-flex-demo3 {
  margin-bottom: 20px;
  height: 200px;

  .m-flex-top {
    background-color: #ccc;
    line-height: 50px;
    text-align: center;
  }

  .m-flex-bottom {
    background-color: #eee;
    line-height: 150px;
    text-align: center;
  }
}
.m-doc-flex-demo4 {
  margin-bottom: 20px;
  height: 200px;

  .m-flex-top {
    background-color: #eee;
    line-height: 150px;
    text-align: center;
  }

  .m-flex-bottom {
    background-color: #ccc;
    line-height: 50px;
    text-align: center;
  }
}
</style>
