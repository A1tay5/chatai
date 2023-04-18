import { store } from '@/store/index'

/**
 * @description: 交易结果
 * @param {*}
 * @return {*}
 */
class OrderResultEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    if (store.state.socket.tradeResult.indexOf(this.data) != -1) {
      return;
    }
    // 设置订单结束货币icon
    store.state.socket.businessConfig.forEach((el) => {
      if (el["id"] == this.data["business_id"]) {
        this.data.icon = el["icon"];
        store.dispatch("socket/setTradeResult", this.data)
        store.dispatch("socket/setTradeResultShow", true);
      }
    });
    // 删除结束订单的画线
    store.state.socket.tradeList.forEach((item, index) => {
      if (item['order_no'] == this.data.order_no) {
        store.state.socket.tradeList.splice(index, 1);
      }
    })
    store.state.socket.realTradeList.forEach((item, index) => {
      if (item['order_no'] == this.data.order_no) {
        store.state.socket.realTradeList.splice(index, 1);
      }
    })
    
    if (this.data.demo == 1) {
      let orderData = {
        win_number: this.data.situation.win, //连赢局数
        loss_number: this.data.situation.loss, //连输局数
      }
      store.dispatch("userData/setDemoWin", orderData)
    } else {
      let winActiveList = { ...store.state.userData.realWin.win_active_no }
      let LossActiveList = { ...store.state.userData.realWin.loss_active_no }
      let orderData = {
        win_number: this.data.situation.win, //连赢局数
        loss_number: this.data.situation.loss, //连输局数
        win_active_no: winActiveList,
        loss_active_no: LossActiveList,
      }
      store.dispatch("userData/setRealWin", orderData)
    }
  }
}

export default OrderResultEvent


// amount: 40
// bonus: 0
// business_id: 22
// create_time: 1638512811
// hit_status: -1
// open_price: 56791.44
// open_time: 1638512868255
// order_hz: 60
// order_no: "edf59df2-be78-e93c-a5f4-217de00a2aa6"
// order_option: 1
// order_price: 56799.17
// order_time: 1638512808255
// reward_amount: 0
// reward_ratio: 1.8
// reward_status: 1
// reward_time: 1638512868
// total: 40
// user_id: 227