<template>
  <div class="Chat">
    <van-nav-bar>
      <template #left>
        <img src="@/assets/img/AItext.png" alt="" />
      </template>
      <template #right>
        <img src="@/assets/img/LW.png" @click="router.push('/recharge')" alt="" />
      </template>
    </van-nav-bar>
    <div class="home">
      <div class="homebox">
        <van-swipe
          ref="swipe"
          :duration="1000"
          :show-indicators="false"
          :touchable="false"
          indicator-color="white"
          @change="change"
        >
          <van-swipe-item v-for="(item, index) in List" :key="index">
            <div class="chatbox">
              {{ item.description }}
              <div class="chatsjx"></div>
            </div>
            <div class="imgbox">
              <img :src="item.avatarUrl" alt="" />
            </div>
          </van-swipe-item>
        </van-swipe>
        <div class="sjx l" @click="swipeTo(1)"></div>
        <div class="sjx r" @click="swipeTo(2)"></div>
        <div class="bt">
          <div class="botto" @click="ChatTo()">
            <span class="bo1">CHAT NOW</span>
            <span class="bo2">Free message today: {{ user.chatNum }}</span>
          </div>
          <img src="@/assets/img/mengban.png" class="mb" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { getElorList } from '@/api/user'
import { useRouter, useRoute } from 'vue-router'
import useStore from '@/stores/index'
const { counter, user, chat }: any = useStore()
const router = useRouter()
const route = useRoute()
const getImageUrl = (image: any) => {
  // 里面可以根据需求写逻辑
  return new URL(`../assets/img/${image}`, import.meta.url).href
}
const index = ref(0)
const List: any = ref([])
getElorList({ type: 1 }).then((res) => {
  List.value = res.data.list
})
const change = (val: any) => {
  index.value = val
}
const swipe: any = ref()
const swipeTo = (val: any) => {
  if (val == 1) {
    swipe.value.prev()
  }
  if (val == 2) {
    swipe.value.next()
  }
}
const ChatTo = () => {
  router.push({
    path: '/ChatView',
    query: {
      id: List.value[index.value].id,
      name: List.value[index.value].name
    }
  })
}
</script>
<style lang="scss" scoped>
:deep(.van-nav-bar__content) {
  height: 80px !important;
}
:deep(.van-swipe__track) {
  display: flex;
  height: 100%;
  align-items: flex-end;
}
.Chat {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  .home {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    position: relative;
    .chatbox {
      width: 90%;
      line-height: 20px;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 15px;
      color: #fff;
      background-color: #24323f;
      position: relative;
      margin: 0 auto;
      .chatsjx {
        border-top: 15px solid #24323f;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        position: absolute;
        left: 30px;
        bottom: -25px;
        z-index: 2;
      }
    }
    .sjx {
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      position: absolute;
      z-index: 2;
    }

    .homebox {
      width: 100%;
      .l {
        border-right: 25px solid #b6fbff;
        bottom: 250px;
        left: 0px;
        box-shadow: #b6fbff;
      }
      .r {
        border-left: 25px solid #b6fbff;
        bottom: 250px;
        right: 0px;
      }
    }
    .imgbox {
      width: 100%;
      height: 380px;
      overflow: hidden;
      position: relative;
      margin-bottom: 60px;
      img {
        width: 100%;
        mix-blend-mode: multiply;
      }
    }
    .mb {
      width: 100%;
      position: absolute;
      bottom: 0px;
      left: 0;
      height: 130px;
    }
    .bt {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      // background-color: rgba(0, 0, 0, 0.3);
      // background-image: url('@/assets/img/mengban.png');
      // backdrop-filter: blur(6px);
      // background-image: radial-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      .botto {
        width: 80%;
        height: 90%;
        border-radius: 50px;
        display: flex;
        background-image: url('@/assets/img/bt.png');
        background-size: 100% 100%;
        flex-direction: column;
        align-items: center;
        position: relative;
        justify-content: center;
        overflow: hidden;
        z-index: 99;
        .bo1 {
          font-weight: 700;
          font-size: 25px;
          color: #b6fbff;
          margin-bottom: 5px;
        }
        .bo2 {
          color: #295a5a;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
