<template>
  <div class="recharge">
    <span @click="router.back">X</span>
    <div class="rechargebt" @click="Numadd">recharge</div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { watch, reactive, ref } from 'vue'
import useStore from '@/stores/index'
const router = useRouter()
const route = useRoute()
const { counter, user } = useStore()
const Numadd = () => {
  user.chatNum += 3
  router.back()
}
</script>
<style lang="scss" scoped>
.recharge {
  background-image: url('@/assets/img/recharge.png');
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
  font-size: 20px;
  .rechargebt {
    position: absolute;
    bottom: 100px;
    left: 100px;
    width: 50%;
    background-color: aqua;
    text-align: center;
  }
}
</style>
