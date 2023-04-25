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
import socketInstance from '@/plugins/socket/socket-instance'
import { register } from '@/api/user'
const router = useRouter()
const route = useRoute()
const tabBarShow = ref(false)
const { counter, user, config }: any = useStore()
const week = Week.NewWeek()
console.log(import.meta.url)


setTimeout(() => {}, 1000)
watch(
  () => config.client.aid,
  (val) => {
    if (val && !user.token) {
      register({ deviceId: config.client.device_id, packageName: config.client.package_name }).then(
        (res) => {
          user.token = res.data.token
        }
      )
    }
  },
  { deep: true, immediate: true }
)
watch(
  () => user.userInfo?.customerId,
  (val) => {
    if (val) {
      socketInstance.connect(val)
    }
  },
  { deep: true, immediate: true }
)
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
