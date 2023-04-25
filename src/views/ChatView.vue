<template>
  <div class="ChatView">
    <div class="nav">
      <van-nav-bar>
        <template #left>
          <img src="@/assets/img/back.png" @click="router.back()" alt="" />
        </template>
        <template #title>
          <div class="navtitle" v-if="loding">对方正在输入...</div>
          <div class="navtitle" v-else>{{ route.query.name }}</div>
        </template>
        <template #right>
          <!-- <img src="@/assets/img/LW.png" alt="" /> -->
        </template>
      </van-nav-bar>
    </div>

    <div class="chatbox" ref="Chatbox">
      <div>
        <template v-for="(item, index) in ChatList" :key="index">
          <div class="time">{{ item.time }}</div>
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
              <van-image round class="usericon" :src="item.avatarUrl" />
            </div>
            <div class="chatvalue">
              {{ item.txt }}
            </div>
          </div>
        </template>
      </div>

      <div
        class="quickQuestion"
        v-if="UserInfo.type == 2"
  
      >
        <div class="quickQuestionshow">
          <van-icon
            size="2rem"
            @click="quickQuestionshow = false"
            name="arrow-down"
            v-if="quickQuestionshow"
          />
          <van-icon size="2rem" @click="quickQuestionshow = true" name="arrow-up" v-else />
        </div>
        <div class="quickQuestionBox" v-if="quickQuestionshow">
          <div
            class="quickQuestionBoxitem"
            @click="quickQuestionspush(item)"
            v-for="item in UserInfo.quickQuestion"
            :key="item"
          >
            {{ item }}
          </div>
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
import { chatQuestion, chatUserInit, chatpage } from '@/api/chat'

const { counter, user, chat }: any = useStore()
const router = useRouter()
const route: any = useRoute()
const Chatbox = ref()
const loding = ref(false)
const ChatList: any = ref([])
const UserInfo: any = ref({
  type: null
})
const quickQuestionshow = ref(false)
chatUserInit(route.query.id).then((res: any) => {
  UserInfo.value = res
  UserInfo.value.quickQuestion = JSON.parse(res.quickQuestion)
})
chatpage({ pageNum: 1, pageSize: 10, chatRoleld: route.query.id }).then((res) => {
  if (res.data.list.length < 1) {
    quickQuestionshow.value = true
  }
  for (let i = res.data.list.length - 1; i >= 0; i--) {
    const element = res.data.list[i]
    let a = new Date(element.answerTime)
    let b = a.valueOf()
    let c = new Date(element.questionTime)
    let d = c.valueOf()
    if (b > d) {
      if (element.question) {
        ChatList.value.push({
          type: 'my',
          txt: element.question,
          time: element.questionTime
        })
      }
      if (element.answer) {
        ChatList.value.push({
          type: 'ai',
          txt: element.answer,
          time: element.answerTime,
          avatarUrl: element.avatarUrl
        })
      }
    } else {
      if (element.answer) {
        ChatList.value.push({
          type: 'ai',
          txt: element.answer,
          time: element.answerTime,
          avatarUrl: element.avatarUrl
        })
      }
      if (element.question) {
        ChatList.value.push({
          type: 'my',
          txt: element.question,
          time: element.questionTime
        })
      }
    }
  }
})
const pushChatList = (val: any) => {
  if (val == '' || val == null || val == undefined) {
    return
  }
  if (user.chatNum < 1) {
    router.push('/recharge')
  }
  ChatList.value.push({ type: 'my', txt: val })
  chatQuestion({ question: val, chatRoleName: route.query.name, chatRoleId: route.query.id }).then(
    (res: any) => {
      loding.value = true
      if (res.code == 2000) {
        router.push('/login')
      }
      if (res.code == 2001 || res.code == 2002) {
        router.push('/recharge')
      }
    }
  )
}
const quickQuestionspush = (val: any) => {
  if (!loding.value) {
    pushChatList(val)
    quickQuestionshow.value = false
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
  () => chat.chatObj,
  (newVal) => {
    if (newVal) {
      loding.value = false
      ChatList.value.push({ type: 'ai', txt: newVal.result })
    }
  },
  {
    deep: true
  }
)
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
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    .quickQuestionshow1 {
      position: absolute !important;
      left: 0;
      bottom: 0 !important;
    }
    .quickQuestion {
      width: 100%;
      position: sticky ;
      bottom: 0 !important;
      background-color: #02080c;
      .quickQuestionshow {
        display: flex;
        color: #fff;
        align-items: center;
        justify-content: center;
        height: 50px;
      }
      .quickQuestionBox {
        padding: 0 20px 10px;
        .quickQuestionBoxitem {
          padding: 10px;
          box-sizing: border-box;
          width: 100%;
          border-radius: 10px;
          background-color: #20323e;
          margin: 10px 0;
          color: #fff;
        }
      }
    }
    .time {
      text-align: center;
      color: #d5e2e9;
      font-size: 14px;
    }
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
