import { store } from '@/store/index'


/**
 * @description: 业务切换
 * @param {*}
 * @return {*}
 */
class MarketInitEvent {
  data: any
  $mittBus: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    store.dispatch("socket/setLineData", this.data)
  }
}

export default MarketInitEvent
