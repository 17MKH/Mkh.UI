<template>
  <div class="mu-doc-flex-demo1">
    <mu-flex-row>
      <mu-flex-left width="200px">左侧固定 </mu-flex-left>
      <mu-flex-right>右侧自适应 </mu-flex-right>
    </mu-flex-row>
  </div>
  <div class="mu-doc-flex-demo2">
    <mu-flex-row mode="right">
      <mu-flex-left>左侧自适应 </mu-flex-left>
      <mu-flex-right width="200px">右侧固定 </mu-flex-right>
    </mu-flex-row>
  </div>
  <div class="mu-doc-flex-demo3">
    <mu-flex-column>
      <mu-flex-top height="50px">顶部固定 </mu-flex-top>
      <mu-flex-bottom>底部自适应 </mu-flex-bottom>
    </mu-flex-column>
  </div>
  <div class="mu-doc-flex-demo4">
    <mu-flex-column mode="bottom">
      <mu-flex-top>顶部自适应 </mu-flex-top>
      <mu-flex-bottom height="50px">底部固定 </mu-flex-bottom>
    </mu-flex-column>
  </div>
</template>
<style lang="scss">
.mu-doc-flex-demo1 {
  margin-bottom: 20px;
  height: 200px;

  .mu-flex-left {
    background-color: #ccc;
    line-height: 200px;
    text-align: center;
  }
  .mu-flex-right {
    background-color: #eee;
    line-height: 200px;
    text-align: center;
  }
}
.mu-doc-flex-demo2 {
  margin-bottom: 20px;
  height: 200px;

  .mu-flex-left {
    background-color: #ccc;
    line-height: 200px;
    text-align: center;
  }

  .mu-flex-right {
    background-color: #eee;
    line-height: 200px;
    text-align: center;
  }
}
.mu-doc-flex-demo3 {
  margin-bottom: 20px;
  height: 200px;

  .mu-flex-top {
    background-color: #ccc;
    line-height: 50px;
    text-align: center;
  }

  .mu-flex-bottom {
    background-color: #eee;
    line-height: 150px;
    text-align: center;
  }
}
.mu-doc-flex-demo4 {
  margin-bottom: 20px;
  height: 200px;

  .mu-flex-top {
    background-color: #eee;
    line-height: 150px;
    text-align: center;
  }

  .mu-flex-bottom {
    background-color: #ccc;
    line-height: 50px;
    text-align: center;
  }
}
</style>
