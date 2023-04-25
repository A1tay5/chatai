<template>
  <div class="about">
    <van-tabs v-model:active="counter.active" @change="change">
      <van-tab title="Message"><message /></van-tab>
      <van-tab title="ExPerts"><ExPerts /></van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import message from './compoents/MessAge.vue'
import ExPerts from './compoents/ExPerts.vue'
import useStore from '@/stores/index'
const { counter }: any = useStore()

// const active = ref(0)
const change = (val: any) => {
  counter.active = val
}
</script>
<style lang="scss" scoped>
:deep(.van-tabs__nav) {
  background-color: transparent;
}

:deep(.van-tab) {
  color: #2f4f5c !important;
}
:deep(.van-tab--active) {
  color: #caedea !important;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
