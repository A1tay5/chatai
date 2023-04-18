<template>
  <RouterView />
  <TabBar v-if="tabBarShow" />
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { watch, reactive, ref } from 'vue'
import { RouterView } from 'vue-router'
import TabBar from '@/components/TabBar.vue'
import useStore from '@/stores/index'
import Week from '@/utils/days'
const router = useRouter()
const route = useRoute()
const tabBarShow = ref(false)
const { counter, user }: any = useStore()
const week = Week.NewWeek()

if (week > counter.week || !counter.week) {
  counter.week = week
  if (user.chatNum < 3) {
    user.chatNum = 3
  }
}
watch(
  () => route,
  (val) => {
    if (val.meta.tabbar) {
      tabBarShow.value = true
    } else {
      tabBarShow.value = false
    }
  },
  { deep: true }
)
</script>
<style scoped lang="scss">
:deep(.van-nav-bar) {
  background-color: rgba(0, 0, 0, 0);
}
:deep(.van-hairline--bottom:after) {
  border: none !important;
}
:deep(.van-nav-bar__content) {
  height: 80px !important;
}
</style>
