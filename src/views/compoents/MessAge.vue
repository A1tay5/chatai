<template>
  <div class="message">
    <div class="box" v-for="(i, inedx) in List" :key="inedx">
      <!-- <div class="item" @click="ChatTo(i)" @touchend="touchend"> -->
      <div class="item" @touchstart.prevent="touchin(i)" @touchend.prevent="touchend">
        <van-image round class="usericon" :src="i.chatRoleAvatarUrl" width="45px" height="45px" />
        <div class="txtbox">
          <div class="t">
            <span>{{ i.chatRoleName }}</span>
            <span class="date">{{ i.chatDate }}</span>
          </div>
          <div class="b">{{ i.answer ? i.answer : i.question }}</div>
        </div>
      </div>
    </div>
  </div>
  <van-popup
    v-model:show="show"
    position="bottom"
    round
    :style="{
      height: '30%',
      background: 'linear-gradient(to right, #335f62, #172838)'
    }"
  >
    <div class="del">
      <div class="deltitle">Are you sure want to delete it?</div>
      <div class="delbut" @click="delChat">Confirm</div>
      <div class="delbut" @click="show = false" style="background-color: #4d8f8e">Cancel</div>
    </div>
  </van-popup>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getChatoageList, DelChatoageList } from '@/api/chat'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route: any = useRoute()
const List: any = ref([])
const time: any = ref(0)
const show = ref(false)
const value: any = ref()
const showPopup = () => {
  show.value = true
}
getChatoageList('').then((res) => {
  List.value = res.data
})

const ChatTo = (val: any) => {
  router.push({
    path: '/ChatView',
    query: {
      id: val.chatRoleId,
      name: val.chatRoleName
    }
  })
}
const delChat = () => {
  DelChatoageList(value.value.chatRoleId).then(() => {
    getChatoageList('').then((res) => {
      List.value = res.data
    })
    show.value = false
  })
}
const touchin = (val: any) => {
  value.value = val
  clearTimeout(time.value)
  time.value = setTimeout(() => {
    time.value = 0
    showPopup()
  }, 500)
}
const touchend = (val: any) => {
  clearTimeout(time.value)
  if (time.value !== 0) {
    ChatTo(value.value)
  }
}
</script>

<style lang="scss" scoped>
.del {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .deltitle {
    font-size: 19px;
    margin: 30px 0;
    color: #d2f5f1;
    font-weight: 700;
  }
  .delbut {
    border-radius: 15px;
    display: flex;
    width: 300px;
    height: 50px;
    background-color: #2e555c;
    margin: 5px 10px;
    justify-content: center;
    align-items: center;
    font-size: 19px;
    color: #d2f5f1;
    font-weight: 700;
  }
}
.message {
  width: 100%;
  height: calc(100vh - 104px);
  overflow-y: auto;
  // background: #fff;
  .box {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    .item {
      border-radius: 15px;
      background-color: #172a38;
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .txtbox {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1;
        margin-left: 20px;
        .t {
          display: flex;
          justify-content: space-between;
          color: #caedea;
          font-weight: 700;
          font-size: 14px;
          .date {
            font-size: 12px;
            font-weight: 400;
          }
        }
        .b {
          font-size: 13px;
          color: #2f4f5c !important;
        }
      }
    }
  }
}
</style>
