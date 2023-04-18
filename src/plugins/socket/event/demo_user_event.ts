import { store } from '@/store/index'

/**
 * @description: demo用户信息
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
    store.dispatch("userData/setDemoUser", this.data);
  }
}

export default MarketInitEvent
