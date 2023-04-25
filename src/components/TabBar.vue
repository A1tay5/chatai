<template>
  <div class="Tabbar">
    <van-tabbar fixed route placeholder v-model="active" @change="onChange" :border="false">
      <van-tabbar-item v-for="(item, index) in tabBar" :key="index">
        <img v-if="active == index" :src="item.active" alt="" />
        <img v-else :src="item.icon" alt="" />
        <span v-if="active == index" style="color: #b6fbff">{{ item.title }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import useStore from '@/stores/index'
import router from '@/router'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'TabBar',
  setup() {
    console.log(useStore)
    const getImageUrl = (image: any) => {
      // 里面可以根据需求写逻辑
      return new URL(`../assets/icon/${image}`, import.meta.url).href
    }
    const store = useStore()
    const state = reactive({
      tabBar: [
        {
          title: 'Experts',
          to: {
            name: '/Experts'
          },
          icon: getImageUrl('experts_dark.svg'),
          active: getImageUrl('experts.svg')
        },
        {
          title: 'Chat',
          to: {
            name: '/'
          },
          icon: getImageUrl('chating_dark.svg'),
          active: getImageUrl('chat.svg')
        },
        {
          title: 'Settings',
          to: {
            name: '/setting'
          },
          icon: getImageUrl('setting_dark.svg'),
          active: getImageUrl('setting.svg')
        }
      ],
      active: 1
    })
    const route = useRoute()
    if (route.name == 'Experts') {
      state.active = 0
    }
    if (route.name == 'setting') {
      state.active = 2
    }
    const onChange = (value: string) => {
      router.push(`${state.tabBar[state.active].to.name}`)
    }
    return { ...toRefs(state), onChange, store }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
:deep(.van-tabbar-item__text) {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 10px;
  align-items: center;
}
.Tabbar {
  position: relative;
  z-index: 999;
  height: 60px;
  &.high {
    position: relative;
    z-index: 1000;
  }
  &:deep(.van-tabbar) {
    height: 60px;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    .van-tabbar__placeholder {
      height: 100%;
    }
    .van-tabbar-item {
      color: #999;
      .van-tabbar-item__icon {
        i {
          font-size: 24px;
        }
      }
    }
    .van-tabbar-item--active {
      background-color: transparent;
      color: $mainBlue;
    }
  }
}
</style>
