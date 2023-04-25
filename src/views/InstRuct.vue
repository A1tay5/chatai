<template>
  <div class="Instruct">
    <img src="@/assets/img/home.png" style="width: 100%; height: 100%" alt="" />
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { watch, reactive, ref } from 'vue'
import useStore from '@/stores/index'
const router = useRouter()
const route = useRoute()
const { counter, user } = useStore()
setTimeout(() => {
  // counter.step = 1
  router.replace('/')
}, 3000)
</script>
<style lang="scss" scoped></style>
