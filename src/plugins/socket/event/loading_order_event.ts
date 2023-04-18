import { store } from '@/store/index'

/**
 * @description: 下单数据(图表画线)
 * @param {*}
 * @return {*}
 */
class MarketRowEvent {
  data: any
  $mittBus: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    if (this.data.length > 0) {
      store.dispatch('socket/setTradeList', this.data)
      if (store.state.config.account_type == 'real') {
        store.dispatch("socket/setRealTradeList", { flag: 1, data: this.data })
      }
    }
  }
}

export default MarketRowEvent
