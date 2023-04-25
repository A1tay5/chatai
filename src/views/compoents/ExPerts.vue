<template>
  <div class="message">
    <div class="box" v-for="(i, inedx) in List" :key="inedx">
      <div class="item">
        <img :src="i.avatarUrl" alt="" />
        <div class="txtbox">
          <div class="t">
            <span>{{ i.name }}</span>
            <span class="description">{{ i.description }}</span>
          </div>
          <div class="botto" @click="ChatTo(i)">
            <span class="bo1">CHAT NOW</span>
          </div>
        </div>
        <div class="pro" v-if="!i.trial">pro</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getElorList } from '@/api/user'
import useStore from '@/stores/index'
import { useRouter, useRoute } from 'vue-router'
const { counter, user, chat }: any = useStore()

const router = useRouter()
const route = useRoute()
const List: any = ref([])
getElorList({ type: 2 }).then((res) => {
  List.value = res.data.list
})
const ChatTo = (val: any) => {
  router.push({
    path: '/ChatView',
    query: {
      id: val.id,
      name: val.name
    }
  })
}
</script>

<style lang="scss" scoped>
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
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      height: 150px;
      position: relative;
      overflow: auto;
      .pro {
        position: absolute;
        top: 0;
        background-color: #fab106;
        font-weight: 700;
        font-size: 17px;
        padding: 5px 8px;
        border-radius: 0 10px 0 15px;
        text-align: center;
        right: 0;
      }
      .txtbox {
        position: relative;
        flex: 1;
        .t {
          display: flex;
          flex-direction: column;
          color: #fff;
          margin: 10px 0;
          font-size: 18px;
          position: relative;
          .description {
            font-size: 10px;
            margin: 10px 0;
          }
        }
        .botto {
          width: 150px;
          height: 50px;
          border-radius: 50px;
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          background-image: url('@/assets/img/bt.png');
          background-size: 100% 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 99;
          .bo1 {
            font-weight: 400;
            font-size: 20px;
            color: #b6fbff;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
