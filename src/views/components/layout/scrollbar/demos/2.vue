<template>
  <div style="height: 100px; border: 1px solid #ccc">
    <mu-scrollbar horizontal>
      <div style="width: 4000px">
        <span v-for="i in 50" :key="i">这是第{{ i + 1 }}行</span>
      </div>
    </mu-scrollbar>
  </div>
</template>
