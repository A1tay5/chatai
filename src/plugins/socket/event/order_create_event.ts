import { store } from '@/store/index'


/**
 * @description: 新订单
 * @param {*}
 * @return {*}
 */
class OrderCreateEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    store.dispatch("socket/setTransactionBtnLoading", false); // 下单按钮loading
    store.dispatch("socket/PUSH_TRADE_LIST", this.data);
  }
}

export default OrderCreateEvent