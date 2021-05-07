<template>
  <div style="height: 300px; border: 1px solid #ccc">
    <mu-scrollbar>
      <p v-for="i in 50" :key="i">这是第{{ i + 1 }}行</p>
    </mu-scrollbar>
  </div>
</template>
