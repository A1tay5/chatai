<template>
  <div class="Tabbar">
    <van-tabbar fixed route placeholder v-model="active" @change="onChange" :border="false">
      <van-tabbar-item v-for="(item, index) in tabBar" :key="index">
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import useStore from '@/stores/index'
import router from '@/router'

export default defineComponent({
  name: 'TabBar',
  setup() {
    console.log(useStore)

    const store = useStore()
    const state = reactive({
      tabBar: [
        {
          title: 'Experts',
          to: {
            name: '/Experts'
          },
          icon: 'icon-jurassic_warn'
        },
        {
          title: 'Chat',
          to: {
            name: '/'
          },
          icon: 'icon-xinwen'
        },
        {
          title: 'Settings',
          to: {
            name: '/setting'
          },
          icon: 'icon-trade'
        }
      ],
      active: 1
    })
    const onChange = (value: string) => {
      router.push(`${state.tabBar[state.active].to.name}`)
    }
    return { ...toRefs(state), onChange, store }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
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
