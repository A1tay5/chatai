<template>
  <div class="Chatinput">
    <div class="tips">
      Free message today: {{ user.chatNum }} <span @click="router.push('/recharge')">Get VIP</span>
    </div>
    <div class="inputbox">
      <img src="../assets/img/Ly.png" alt="" />
      <van-field v-model="value" :disabled="props.loding" placeholder="Type your message here" />
      <img src="../assets/img/Zfj.png" alt="" @click="emitchat(value)" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import useStore from '@/stores/index'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const { counter, user }: any = useStore()
const props = defineProps({
  loding: Boolean
})

// 使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['clickChild'])

const value = ref()
const emitchat = (val: any) => {
  emit('clickChild', val)
  value.value = ''
}
</script>

<style lang="scss" scoped>
.van-cell:after {
  border: none !important;
}
.van-cell {
  background-color: #23313c;
  border-radius: 15px;
}
:deep(.van-field__control) {
  color: #fff !important;
}

.Chatinput {
  background-color: #000;
  height: 120px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .tips {
    color: #fff;
    span {
      color: #3d8391;
    }
  }
  .inputbox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    img {
      margin: 0 15px;
    }
  }
}
</style>
