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
        >
          <van-swipe-item v-for="(item, index) in List" :key="index">
            <div class="chatbox">
              {{ item.title }}
              <div class="chatsjx"></div>
            </div>
            <div class="imgbox">
              <img :src="item.img" alt="" />
            </div>
          </van-swipe-item>
        </van-swipe>
        <div class="sjx l" @click="swipeTo(1)"></div>
        <div class="sjx r" @click="swipeTo(2)"></div>
      </div>
      <div class="bt">
        <div class="botto" @click="ChatTo">
          <span class="bo1">CHAT NOW</span>
          <span class="bo2">Free message today: 3</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const List = ref([
  {
    title: `To be honest, you're not my type. Butif you want to know something about entertainment, no one knows better thanme.`,
    img: 'src/assets/img/pep.png'
  },
  {
    title: `To be honest, you're not my type. Butif you want to know something about entertainment, no one knows better thanme.`,
    img: 'src/assets/img/pep1.png'
  },
  {
    title: `To be honest, you're not my type. Butif you want to know something about entertainment, no one knows better thanme.`,
    img: 'src/assets/img/pep2.png'
  },
  {
    title: `To be honest, you're not my type. Butif you want to know something about entertainment, no one knows better thanme.`,
    img: 'src/assets/img/pep3.png'
  }
])
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
  router.push('/ChatView')
}
</script>
<style lang="scss" scoped>
:deep(.van-nav-bar__content) {
  height: 80px !important;
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
      margin-bottom: 10px;
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
      img {
        width: 100%;
        mix-blend-mode: multiply;
      }
    }
    .bt {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      .botto {
        width: 80%;
        height: 80%;
        border-radius: 50px;
        border: #295a5a 1px solid;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        .bo1 {
          font-weight: 700;
          font-size: 25px;
          color: #b6fbff;
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
