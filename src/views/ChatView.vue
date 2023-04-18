<template>
  <div class="ChatView">
    <div class="nav">
      <van-nav-bar>
        <template #left>
          <img src="@/assets/img/back.png" @click="router.back()" alt="" />
        </template>
        <template #title>
          <div class="navtitle">Language Expert</div>
        </template>
        <template #right>
          <!-- <img src="@/assets/img/LW.png" alt="" /> -->
        </template>
      </van-nav-bar>
    </div>

    <div class="chatbox" ref="Chatbox">
      <template v-for="(item, index) in ChatList" :key="index">
        <div class="my" v-if="item.type == 'my'">
          <div class="chatvalue">
            {{ item.txt }}
          </div>
          <div class="userimg">
            <van-image
              round
              class="usericon"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </div>
        </div>
        <div class="Ai" v-if="item.type == 'ai'">
          <div class="userimg">
            <van-image
              round
              class="usericon"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </div>
          <div class="chatvalue">
            {{ item.txt }}
          </div>
        </div>
      </template>
      <div class="Ai" v-if="loding">
        <div class="userimg">
          <van-image
            round
            class="usericon"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
        </div>
        <div class="chatvalue">
          <van-loading type="spinner" />
        </div>
      </div>
    </div>
    <ChatInput :loding="loding" @clickChild="pushChatList"></ChatInput>
  </div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, nextTick, watch } from 'vue'
import ChatInput from '@/components/ChatInput.vue'
import useStore from '@/stores/index'
const { counter, user }: any = useStore()
const router = useRouter()
const route = useRoute()
const Chatbox = ref()
const loding = ref(false)
const ChatList = ref([
  {
    type: 'ai',
    txt: `你好`
  }
])
const pushChatList = (val: any) => {
  if (user.chatNum > 0) {
    ChatList.value.push({ type: 'my', txt: val })
    loding.value = true
    setTimeout(() => {
      ChatList.value.push({
        type: 'ai',
        txt: ` 第一、数据是怎么展示到界面上去的？
          经过简单分析，我们需要两个数据来实现我们的功能，分别是message和message_array,其中message是用来监听input用户输入的，而message_array是用来动态记录聊天消息的。
          经过简单分析，我们需要两个数据来实现我们的功能，分别是message和message_array,其中message是用来监听input用户输入的，而message_array是用来动态记录聊天消息的。
          经过简单分析，我们需要两个数据来实现我们的功能，分别是message和message_array,其中message是用来监听input用户输入的，而message_array是用来动态记录聊天消息的。`
      })
      user.chatNum -= 1
      loding.value = false
    }, 2000)
  } else {
    router.push('/recharge')
  }
}
nextTick(() => {
  Chatbox.value.scrollTo({
    top: Chatbox.value.scrollHeight,
    //滚动过渡效果
    behavior: 'smooth'
  })
})
watch(
  () => ChatList,
  (newVal) => {
    nextTick(() => {
      Chatbox.value.scrollTo({
        top: Chatbox.value.scrollHeight,
        //滚动过渡效果
        behavior: 'smooth'
      })
    })
  },
  {
    deep: true
  }
)
</script>
<style lang="scss" scoped>
:deep(.van-ellipsis) {
  overflow: visible !important;
}
.nav {
  position: fixed;
  top: 0;
  height: 80px;
  width: 100%;
}
.navtitle {
  color: #fff;
  font-size: 20px;
  font-weight: 400;
}
.ChatView {
  height: 100vh;
  width: 100%;

  .chatbox {
    margin-top: 80px;
    height: calc(100vh - 200px);
    overflow: auto;
    padding: 10px;

    .Ai {
      display: flex;
      margin: 10px 0;

      .userimg {
        margin-right: 10px;
        .usericon {
          width: 50px;
          height: 50px;
        }
      }
    }
    .my {
      display: flex;
      justify-content: flex-end;
      margin: 10px 0;
      .userimg {
        margin-left: 10px;
        .usericon {
          width: 50px;
          height: 50px;
        }
      }
    }
    .chatvalue {
      max-width: 70%;
      padding: 10px;
      box-sizing: border-box;
      background-color: #20323e;
      border-radius: 10px;
      color: #d5e2e9;
      line-height: 20px;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
