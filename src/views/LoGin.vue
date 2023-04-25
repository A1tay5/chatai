<template>
  <div class="Login">
    <div class="loginbox">
      <template v-if="box"
        ><div class="title">Sign In</div>
        <div class="ipt"><van-field v-model="email" placeholder="Enter Email" /></div>
        <div class="bt">
          <van-button type="default" color="#6285c1" @click="GetEmailcode">Confirm</van-button>
        </div></template
      >
      <template v-else
        ><div class="title">Sign In</div>
        <div class="ipt">
          <van-field v-model="Code" placeholder="Enter Verification Code" />
          <div class="ipt"><van-field v-model="password" placeholder="Enter Password" /></div>
        </div>
        <div class="bt">
          <van-button type="default" color="#6285c1" @click="PostEmailcode">Complete</van-button>
        </div></template
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { watch, reactive, ref } from 'vue'
import useStore from '@/stores/index'
import { login, getEmailcode, postEmailcode } from '@/api/user'

const router = useRouter()
const route: any = useRoute()
const { counter, user }: any = useStore()
const email = ref()
const password = ref()
const Code = ref()
const box = ref(true)
const GetEmailcode = () => {
  getEmailcode(email.value).then((res: any) => {
    if (res.code == 200) {
      Code.value = res.data
      box.value = false
    }
  })
}
const PostEmailcode = () => {
  postEmailcode({ email: email.value, code: Code.value, password: password.value }).then(
    (res: any) => {
      if (res.code == 200) {
        Getlogin()
      }
    }
  )
}
const Getlogin = () => {
  login({ email: email.value, password: password.value }).then((res: any) => {
    if (res.code == 200) {
      user.userInfo = res.data
      setTimeout(() => {
        if (route.query.redirect) {
          router.replace(route.query.redirect)
        } else {
          router.back()
        }
      })
    }
  })
}
</script>
<style lang="scss" scoped>
.van-cell {
  background-color: rgba(0, 0, 0, 0);
}
.Login {
  background-image: url('@/assets/img/home.png');
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginbox {
    border-radius: 20px;
    background-color: rgb(255 255 255 / 90%);
    width: 80%;
    color: #6285c1;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    justify-content: space-evenly;
    .title {
      font-weight: 700;
      font-size: 25px;
      margin: 20px 0;
    }
    .ipt {
    }
    .bt {
      margin: 20px 0;
    }
  }
}
</style>
