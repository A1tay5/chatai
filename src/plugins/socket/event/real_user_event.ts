import { store } from '@/store/index'

/**
 * @description: 真实用户信息
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
    store.dispatch("userData/setRealUser", this.data);
  }
}

export default MarketInitEvent
